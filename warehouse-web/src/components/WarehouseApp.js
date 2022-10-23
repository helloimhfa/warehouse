import { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import WarehouseHeader from "./WarehouseHeader";
import WarehouseManager from "./WarehouseManager";
import './WarehouseApp.css';


const WarehouseApp = () => {
  const toast = useRef(null);

  return (
    <div id="warehouse-container" className="flex flex-column">
      <Toast ref={toast} position="bottom-right" />
      <WarehouseHeader />
      <WarehouseManager
        warehouseManagerToast={toast}
      />
    </div>
  );
}

export default WarehouseApp;
