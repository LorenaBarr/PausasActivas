import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AppRouter from './routes/AppRouter';
import './index.css';

import { BrowserRouter } from 'react-router-dom'; 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {}
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

