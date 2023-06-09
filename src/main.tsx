import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './assets/styles/base.css';
// import App from './App.tsx';
import App from './game/App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
