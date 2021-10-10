import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDialog } from '../types/models/Dialog'
import { IMessage } from '../types/models/Message'
import { IResponseSuccess } from '../types/models/Success'
import { ICurrentUser, IUser, IUserAuthorize } from '../types/models/User'
import { ILoginSubmit } from '../types/submits/LoginSubmit'
import { IMessageSubmit } from '../types/submits/MessageSubmit'
import { IRegSubmit } from '../types/submits/RegistrationSubmit'
import { RootState } from './store'
import socket from '../socket'


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).app.currentUser.token
      if (token) { headers.set('authorization', `Bearer ${token}`) }
      return headers
    },
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    /*=== Авторизация ===*/
    registration: builder.mutation<IResponseSuccess, IRegSubmit>({
      query: (data) => ({ url: 'auth/registration', method: 'POST', body: data }),
    }),
    authorize: builder.mutation<IUserAuthorize, ILoginSubmit>({
      query: (data) => ({ url: 'auth/login', method: 'POST', body: data }),
    }),
    getCurrentUser: builder.mutation<ICurrentUser, IUserAuthorize>({
      query: ({ _id, token }) => ({ url: `users/currentuser/${_id}`, headers: { 'Authorization': `Bearer ${token}` } }),
    }),
    /*=== Получение пользователей ===*/
    getAllUsers: builder.query<{ users: IUser[], total: number }, void>({
      query: () => ({ url: `users` }),
    }),
    /*=== Работа с диалогами ===*/
    createDialog: builder.mutation<void, IUser>({
      query: (user) => ({ url: `dialogs/createdialog`, method: 'POST', body: user }),
    }),
    getOneDialog: builder.query<IDialog, string>({
      query: (dialogId) => ({ url: `dialogs/dialog/${dialogId}`, method: 'GET' }),
    }),
    getAllDialogs: builder.query<IDialog[], string>({
      query: (currentUserId) => ({ url: `dialogs/${currentUserId}` }),
      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded
          const updateLastMessage = (message: string, dialogId: string) => updateCachedData((draft) => {
            const arr = draft.find((dialog) => dialog._id === dialogId)
            if (arr) arr.lastMessage = message;
          })
          socket.on('DIALOG:UPDATE_LAST_MESSAGE', updateLastMessage)
        } catch { }
        await cacheEntryRemoved
        socket.off("DIALOG:UPDATE_LAST_MESSAGE");
      },
    }),
    /*=== Работа с сообщениями ===*/
    createMessage: builder.mutation<void, IMessageSubmit>({
      query: (message) => ({ url: `messages/createmessage`, method: 'POST', body: message }),
    }),
    getMessages: builder.query<IMessage[], string>({
      query: (dialogId) => ({ url: `messages/${dialogId}` }),
      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded
          const setNewMessage = (message: IMessage) => updateCachedData((draft) => {
            draft.push({ ...message })
          })
          const deleteMessage = (_id: string) => updateCachedData((draft) => {
            draft.splice(draft.findIndex((message) => message._id === _id), 1);
          })
          socket.on('MESSAGE:SET_NEW_MESSAGE', setNewMessage)
          socket.on('MESSAGE:DELETE', deleteMessage)
        } catch { }
        await cacheEntryRemoved
        socket.off("MESSAGE:SET_NEW_MESSAGE");
        socket.off("MESSAGE:DELETE");
      },
    }),
  }),
})

export const {
  /*=== Авторизация ===*/
  useRegistrationMutation,
  useAuthorizeMutation,
  useGetCurrentUserMutation,
  /*=== Получение пользователей ===*/
  useGetAllUsersQuery,
  /*=== Работа с диалогами ===*/
  useCreateDialogMutation,
  useGetAllDialogsQuery,
  useGetOneDialogQuery,
  /*=== Работа с сообщениями ===*/
  useCreateMessageMutation,
  useGetMessagesQuery
} = api