import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../hooks/auth.hook';
import { useMutateWithAlert } from '../../hooks/mutate.hook';
import { Registration } from '../../pages/Registration/Registration';
import { useAuthorizeMutation, useRegistrationMutation } from '../../store/api';
import { IRegSubmit } from '../../types/submits/RegistrationSubmit';

const RegistrationContainer: React.FC = () => {

  const [authorize] = useAuthorizeMutation()
  const [registration] = useRegistrationMutation()
  const { asyncMutate, errorData } = useMutateWithAlert()
  const { login } = useAuth()
  const [isLoading, setLoading] = useState<boolean>(false)
  const history = useHistory()

  const onSubmitHandle = async (data: IRegSubmit) => {
    try {
      setLoading(true)
      await asyncMutate<void>(registration(data))
      const { _id, token } = await asyncMutate(authorize(data))
      await login(_id, token, true, true)
      setLoading(false)
      history.push('/')
    } catch (e) {
      setLoading(false)
    }
  }

  return <Registration onSubmitHandle={onSubmitHandle} isLoading={isLoading} errorData={errorData} />
}

export default RegistrationContainer
