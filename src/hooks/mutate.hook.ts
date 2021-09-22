import { useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react'
import { IResponseError } from '../types/models/Error';
import { isApiError } from '../utils/fetch';

export const useMutateWithAlert = () => {

  const toast = useToast()
  const toastIdError: string = 'mutateError'
  const [errorData, setErrorData] = useState<IResponseError | null>(null)

  const asyncMutate = useCallback(async <T>(callback: any) => {
    try {
      return await callback.unwrap() as T
    } catch ({ data }) {
      if (isApiError(data)) {
        setErrorData(data)
        return Promise.reject()
      } else {
        toast({
          id: toastIdError,
          title: 'Неизвестная ошибка',
          description: 'Критическая ошибка. Невозможно отправить запрос (client)',
          status: "error",
          duration: 5000,
          isClosable: true
        })
        return Promise.reject()
      }
    }
  }, [toast])

  return { asyncMutate, errorData } as const
}


