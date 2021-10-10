import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMessage } from "../../types/models/Message"
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
    setWritingMessage(state, action: PayloadAction<{ firstName: string, isWriting: boolean }>) {
      state.isWritingMessage = action.payload.isWriting
      state.whoIsWritingMessage = action.payload.firstName
    },
  },

})

export default messages.reducer
export const { setWritingMessage } = messages.actions
