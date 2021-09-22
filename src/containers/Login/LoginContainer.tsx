import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../hooks/auth.hook';
import { useMutateWithAlert } from '../../hooks/mutate.hook';
import { Login } from '../../pages/Login/Login';
import { useAuthorizeMutation } from '../../store/api';
import { ILoginSubmit } from '../../types/submits/LoginSubmit';

const LoginContainer: React.FC = () => {

  const history = useHistory()
  const [authorize, { isLoading }] = useAuthorizeMutation()
  const { asyncMutate, errorData } = useMutateWithAlert()
  const { login } = useAuth()


  const onSubmitHandle = async (data: ILoginSubmit) => {
    try {
      const { _id, token } = await asyncMutate(authorize(data))
      await login(_id, token, true, false)
      history.push('/')

    } catch (e) { }
  }

  return <Login onSubmitHandle={onSubmitHandle} isLoading={isLoading} errorData={errorData} />
}

export default LoginContainer

