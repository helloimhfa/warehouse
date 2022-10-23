import { useState } from 'react';
import WarehouseProductManager from "./WarehouseProductManager";
import WarehouseArticleManager from "./WarehouseArticleManager";
import "./WarehouseManager.css";

const WarehouseManager = ({ warehouseManagerToast }) => {

    const [articles, setArticles] = useState([]);
    const [articlesRefreshing, setArticlesRefreshing] = useState(false);
    
    const [products, setProducts] = useState([]);
    const [saleProduct, setSaleProduct] = useState(null);
    const [saleInProgress, setSaleInProgress] = useState(false);
    const [productsRefreshing, setProductsRefreshing] = useState(false);
    

    const sellProduct = (product) => {
      console.log(`Selling product ${product}`);
    }

    return (
        <div className="col-12 grid form-grid justify-content-center align-items-center gap-4 warehouse-manager">
            <WarehouseProductManager
                products={products}
                setProducts={setProducts}
                saleInProgress={saleInProgress}
                saleProduct={saleProduct}
                productsRefreshing={productsRefreshing}
                sellProduct={sellProduct}
                warehouseManagerToast={warehouseManagerToast}
            />
            <WarehouseArticleManager
                articles={articles}
                setArticles={setArticles}
                saleInProgress={saleInProgress}
                articlesRefreshing={articlesRefreshing}
                saleProduct={saleProduct}
                warehouseManagerToast={warehouseManagerToast}
            />
        </div>
    );
};

export default WarehouseManager;