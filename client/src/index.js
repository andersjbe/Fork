import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet'
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import theme from './theme'
import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Grommet theme={theme} full >
        <App />
      </Grommet>
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);