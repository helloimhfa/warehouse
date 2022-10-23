import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import WarehouseApp from './components/WarehouseApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WarehouseApp />
  </React.StrictMode>
);