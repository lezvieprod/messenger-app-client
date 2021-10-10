import { useToast } from '@chakra-ui/toast'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useGetCurrentUserMutation } from '../store/api'
import { setAppIsReady, setCurrentUser } from '../store/reducers/app.reducer'
import { RootState } from '../store/store'
import { IUser } from '../types/models/User'
import { isApiError } from '../utils/fetch'
import { useMutateWithAlert } from './mutate.hook'

export const useAuth = () => {

  const storageName: string = 'currentUser'

  const {
    currentUser: { token, _id, firstName, lastName },
    isAuthenticated,
    isAppReady
  } = useSelector((state: RootState) => state.app)

  const [getCurrentUser] = useGetCurrentUserMutation()
  const { asyncMutate } = useMutateWithAlert()
  const dispatch = useDispatch()
  const history = useHistory()
  const toast = useToast()

  const login = useCallback(async (_id: string, token: string, withAlert?: boolean, isFirstTime?: boolean) => {
    try {
      const response = await asyncMutate<IUser>(getCurrentUser({ _id, token }))
      dispatch(setCurrentUser({ ...response, token }))

      if (withAlert && isFirstTime) {
        toast({ title: `Добро пожаловать ${response.firstName}!`, status: "info", position: "bottom-right" })
      } else if (withAlert && !isFirstTime) {
        toast({ title: `С возвращением ${response.firstName}!`, status: "info", position: "bottom-right" })
      }

      localStorage.setItem(storageName, JSON.stringify({ token, _id }))
    } catch ({ data }) {
      if (isApiError(data)) {
        toast({ title: data.title, description: data.message, position: "bottom-right", status: "error", isClosable: true })
      } 
      localStorage.removeItem(storageName)
    }
  }, [dispatch, asyncMutate, getCurrentUser, toast])

  const logout = useCallback(() => {
    dispatch(setCurrentUser({}))
    localStorage.removeItem(storageName)
    history.go(0)
  }, [dispatch, history])

  useEffect(() => {
    if (!isAppReady) {
      const loginOnAppInit = async () => {
        const data = JSON.parse(localStorage.getItem(storageName) || '{}')
        if (data && data.token && !isAuthenticated) {
          await login(data._id, data.token, false, false)
        }
        dispatch(setAppIsReady(true))
      }
      loginOnAppInit()
    }

  }, [login, dispatch, isAuthenticated, isAppReady])

  return {
    /* === User data === */
    token,
    _id,
    firstName,
    lastName,
    /* === Auth func === */
    login,
    logout,
    /* === App params === */
    isAppReady,
    isAuthenticated,
  } as const
}