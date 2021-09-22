import React from "react";
import { Preloader } from "./components/Preloader/Preloader";
import { useAuth } from "./hooks/auth.hook";
import { Routes } from "./routes";


export const App: React.FC = () => {

  const { isAppReady } = useAuth()

  return isAppReady ? <Routes /> : <Preloader />
}

