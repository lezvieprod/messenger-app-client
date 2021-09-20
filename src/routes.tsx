import { Route, Switch } from "react-router"
import React, { lazy } from 'react'
import { Error } from "./components/Error/Error"
import { AuthLayout } from "./layouts/Auth/Auth.layout"


const RegistrationContainer = lazy(() => import("./containers/Registration/RegistrationContainer"))
const LoginContainer = lazy(() => import("./containers/Login/LoginContainer"))


export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={'/auth/login'}>
        <AuthLayout>
          <LoginContainer />
        </AuthLayout>
      </Route>

      <Route path={'/auth/registration'}>
        <AuthLayout>
          <RegistrationContainer />
        </AuthLayout>
      </Route>

      <Route exact path={'*'}>
        <Error />
      </Route>
    </Switch>
  )
}