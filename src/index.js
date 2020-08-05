import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducers/index';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { RecoilRoot } from 'recoil';

const store = createStore(reducer, applyMiddleware(thunk));


ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <SnackbarProvider anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
        <Provider store={store}>
          <App />
        </Provider>
      </SnackbarProvider>
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
