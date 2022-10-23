import { Image } from 'primereact/image';
import warehouseLogo from '../images/warehouse-logo.png';
import "./WarehouseHeader.css";

const WarehouseHeader = () => {
    return (
        <div className="col-12 flex justify-content-center align-items-center shadow-2 warehouse-header">
            <div className="header-title col-12 md:col-6 flex justify-content-center align-items-center gap-3">
                <div className="header-label hidden md:inline-flex ml-3">
                    <p className="font-light">
                        Ware<span className="colored-title font-semibold">house</span>
                    </p>
                </div>
                <Image className="header-logo" src={warehouseLogo} alt="" />
            </div>
        </div>
    );
};

export default WarehouseHeader;