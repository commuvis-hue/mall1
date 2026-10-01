import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from './router';
import { StoreProvider } from './store';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </RouterProvider>
  </React.StrictMode>
);
