import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import './index.css';
import App from './App';
import theme from './theme'
import configureStore from './store/configureStore'

const {store, persistor} = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Grommet theme={theme} full >
        <PersistGate loading={null} persistor={persistor}>
          <App />

        </PersistGate>
      </Grommet>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);