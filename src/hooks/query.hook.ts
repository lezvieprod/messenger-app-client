import { IResponseError } from '../types/models/Error';



type UseQueryResult<T, P> = {
  originalArgs?: unknown
  data?: T
  error?: {
    data: P
  }
  requestId?: string
  endpointName?: string
  startedTimeStamp?: number
  fulfilledTimeStamp?: number
  isUninitialized: boolean
  isLoading: boolean
  isFetching: boolean
  isSuccess: boolean
  isError: boolean
  refetch: () => void
}

type UseQueryOptions = {
  pollingInterval?: number
  refetchOnReconnect?: boolean
  refetchOnFocus?: boolean
  skip?: boolean
  refetchOnMountOrArgChange?: boolean | number
  selectFromResult?: (result: any /* UseQueryStateDefaultResult */) => any
}

/**
* ХУК ДЛЯ USEQUERY ИЗ RTK QUERY.
* Основная задача хука - сократить кол-во написаний вывода ошибки
* @param {Function} hook хук мутации из RTK Query
* @param {R} query строка, часть запроса
* @param {UseQueryOptions} params настройка запроса RTK Query
*/


export const useQueryWithErrorHandling = <T, R = string | {}, S = IResponseError>(
  hook: Function, query?: R, params?: UseQueryOptions
) => {

  const { data, error, isLoading, isFetching, refetch }: UseQueryResult<T, S> = hook(query, params)

  return { data, error, isLoading, isFetching, refetch } as const
}


