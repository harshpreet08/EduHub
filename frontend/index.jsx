import React from 'react';
import ReactDOM from 'react-dom/client';
/* internal components */
import App from './src/core/config/App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <App />,
);
