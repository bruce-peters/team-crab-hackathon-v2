import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';

// This will be called by the content script to mount the React app
window.mountCanvasDashboard = (container) => {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
  return root;
};