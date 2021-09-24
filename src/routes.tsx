import { Redirect, Route, Switch } from "react-router"
import React, { lazy } from 'react'
import { AuthLayout } from "./layouts/Auth/Auth.layout"
import { useAuth } from "./hooks/auth.hook"
import { BaseLayout } from "./layouts/Base/Base.layout"
import Messenger from "./pages/Messenger/Messenger"

const RegistrationContainer = lazy(() => import("./containers/Registration/RegistrationContainer"))
const LoginContainer = lazy(() => import("./containers/Login/LoginContainer"))
const UsersListContainer = lazy(() => import( "./containers/UsersList/UsersListContainer"))


export interface IRoutesProps {
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

      <SecureRoute exact path={["/", "/dialog/:dialogId"]}>
        <Messenger />
      </SecureRoute>

      <SecureRoute exact path={"/users"}>
        <UsersListContainer />
      </SecureRoute>

      <Route exact path={'*'}>
        {/* <Error /> */}
      </Route>
    </Switch>
  )
}

export const SecureRoute: React.FC<IRoutesProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth()
  return (
    <Route {...rest}  render={() => <BaseLayout> {isAuthenticated ? children : <Redirect to={'/auth/login'} />}</BaseLayout>} />
  );
}

export const AuthRoute: React.FC<IRoutesProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth()
  return (
    <Route {...rest} render={() => <AuthLayout> {!isAuthenticated ? children : 'Вы уже авторизированны'} </AuthLayout>} />
  );
}