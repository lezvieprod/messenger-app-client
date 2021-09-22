import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IResponseError } from '../types/models/Error'
import { IResponseSuccess } from '../types/models/Success'
import { ICurrentUser, IUserAuthorize } from '../types/models/User'
import { ILoginSubmit } from '../types/submits/LoginSubmit'
import { IRegSubmit } from '../types/submits/RegistrationSubmit'


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/'
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    /*=== Авторизация ===*/
    registration: builder.mutation<IResponseSuccess | IResponseError, IRegSubmit>({
      query: (data) => ({ url: 'auth/registration', method: 'POST', body: data }),
    }),
    authorize: builder.mutation<IUserAuthorize, ILoginSubmit>({
      query: (data) => ({ url: 'auth/login', method: 'POST', body: data }),
    }),
    getCurrentUser: builder.mutation<ICurrentUser, IUserAuthorize>({
      query: ({_id, token}) => ({ url:`users/currentuser/${_id}`, headers: { 'Authorization': `Bearer ${token}` } }),
    }),
  }),
})

export const {
  useRegistrationMutation,
  useAuthorizeMutation,
  useGetCurrentUserMutation
} = api