import { useToast } from '@chakra-ui/toast'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useGetCurrentUserMutation } from '../store/api'
// import { useGetCurrentUserMutation } from '../redux/api/api'
import { setAppIsReady, setCurrentUser } from '../store/reducers/app.reducer'
import { RootState } from '../store/store'
import { IUser } from '../types/models/User'
import { useMutateWithAlert } from './mutate.hook'

/*
 *=== СХЕМА РАБОТЫ ХУКА АВТОРИЗАЦИИ ===* 
 При использовании асинхронной функции login отправляем запрос
 о получении актуальных данных текущего пользователя
 записываем эти данные в локальное хранилище и если пользователь
 авторизован (есть токен в localstorage), то на каждую инициализацию приложения
 получаем актуальные данные и записываем в state
 ** Если юзер не авторизован, то запрос не отправляется **
 ==========
*/

const storageName: string = 'currentUser'

export const useAuth = () => {

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

      if (withAlert) {
        isFirstTime
          ? toast({ title: `Добро пожаловать ${response.firstName}!`, status: "success", duration: 5000, isClosable: true })
          : toast({ title: `С возвращением ${response.firstName}!`, status: "success", duration: 5000, isClosable: true })
      }

      localStorage.setItem(storageName, JSON.stringify({
        token, _id
      }))
    } catch (e) {
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