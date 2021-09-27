import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMessage } from "../../types/models/Message"
import { ICurrentUser } from "../../types/models/User"

interface IState {
  messages: IMessage[],
  isWritingMessage: boolean,
  whoIsWritingMessage: string,
}

const initialState = {
  messages: [],
  isWritingMessage: false,
  whoIsWritingMessage: ''
} as IState

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<IMessage[]>) {
      state.messages = action.payload
    },
    addNewMessage(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload)
    },
    deleteMessage(state, action: PayloadAction<string>) {
      state.messages.splice(state.messages.findIndex((message) => message._id === action.payload), 1);
    },
    setWritingMessage(state, action: PayloadAction<{firstName: string, isWriting: boolean }>) {
      state.isWritingMessage = action.payload.isWriting
      state.whoIsWritingMessage = action.payload.firstName
    },
  },

})

export default messages.reducer
export const { setMessages, addNewMessage, deleteMessage, setWritingMessage } = messages.actions
