// Global imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// App import
import App from './App.tsx';

// Styles import
import './styles/global.scss'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
