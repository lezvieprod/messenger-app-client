import { useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react'
import { IResponseError } from '../types/models/Error';
import { isApiError } from '../utils/fetch';

export const useMutateWithAlert = () => {

  const toast = useToast()
  const toastIdError: string = 'mutateError'
  const [errorData, setErrorData] = useState<IResponseError | null>(null)

  const asyncMutate = useCallback(async <T>(callback: any, withToast?: boolean) => {
    try {
      return await callback.unwrap() as T
    } catch ({ data }) {

      if (isApiError(data)) {
        setErrorData(data)
        withToast && toast({
          id: toastIdError,
          title: data.title,
          description: data.message,
          position: "bottom-right",
          status: "error",
        })
        return Promise.reject({ data })
      } else {
        toast({
          id: toastIdError,
          title: 'Неизвестная ошибка',
          position: "bottom-right",
          description: 'Критическая ошибка. Невозможно отправить запрос (client)',
          status: "error",
        })
        return Promise.reject()
      }
    }
  }, [toast])

  return { asyncMutate, errorData } as const
}


