import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from './theme/theme';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store';


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

