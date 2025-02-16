import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {SearchProvider} from "./hooks/useSearch";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <SearchProvider children={<App />} />
  </React.StrictMode>
);

