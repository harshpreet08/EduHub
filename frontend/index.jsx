import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './src/store';
import RouteConfig from './src/core/routes/route';
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <RouteConfig />,
  </Provider>,
);
