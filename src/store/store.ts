import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { api } from "./api";
import app from "./reducers/app.reducer"

const reducers = combineReducers({
  app,
  [api.reducerPath]: api.reducer,
})

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
