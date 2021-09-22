import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICurrentUser } from "../../types/models/User"

interface IState {
  currentUser: Partial<ICurrentUser>,
  isAuthenticated: boolean,
  isAppReady: boolean,
}

const initialState = {
  currentUser: {},
  isAppReady: false,
  isAuthenticated: false,
} as IState

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppIsReady(state, action: PayloadAction<boolean>) {
      state.isAppReady = action.payload
    },
    setCurrentUser(state, action: PayloadAction<Partial<ICurrentUser>>) {
      state.currentUser = action.payload
      state.isAuthenticated = true
    },
  },

})

export default app.reducer
export const { setAppIsReady, setCurrentUser } = app.actions
