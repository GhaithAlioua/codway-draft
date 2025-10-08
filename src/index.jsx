import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.scss';

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
