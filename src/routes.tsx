import { Redirect, Route, Switch } from "react-router"
import React, { lazy } from 'react'
import { AuthLayout } from "./layouts/Auth/Auth.layout"
import { useAuth } from "./hooks/auth.hook"


const RegistrationContainer = lazy(() => import("./containers/Registration/RegistrationContainer"))
const LoginContainer = lazy(() => import("./containers/Login/LoginContainer"))

interface IRoutesProps {
  children: React.ReactNode,
  [rest: string]: any
}

export const Routes: React.FC = () => {

  return (
    <Switch>
      <AuthRoute path={'/auth/login'}>
        <LoginContainer />
      </AuthRoute>
      <AuthRoute path={'/auth/registration'}>
        <RegistrationContainer />
      </AuthRoute>

      <SecureRoute exact path={"/"}>
        Главная страница
      </SecureRoute>

      <Route exact path={'*'}>
        {/* <Error /> */}
      </Route>
    </Switch>
  )
}

const SecureRoute: React.FC<IRoutesProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth()
  return (
    <Route {...rest} render={() => isAuthenticated ? children : <Redirect to={'/auth/login'} />} />
  );
}

const AuthRoute: React.FC<IRoutesProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth()
  return (
    <Route {...rest} render={() => <AuthLayout> {!isAuthenticated ? children : 'Вы уже авторизированны'} </AuthLayout>} />
  );
}