// Global imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// Util imports
import { LockOrientation } from './utils/LockOrientation/index.tsx';

// App import
import App from './App.tsx';

// Styles import
import './styles/global.scss'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LockOrientation />
    <App />
  </React.StrictMode>,
);
