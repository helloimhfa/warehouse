import { useState } from "react";
import ProductsTable from "./ProductsTable";
// import ProductForm from "./ProductForm";
import "./WarehouseProductManager.css";


const WarehouseProductManager = ({
    products,
    setProducts,
    searchProducts,
    saleInProgress,
    saleProductId,    
    checkProductArticlesBeforeSale,
    productsRefreshing,
    warehouseManagerToast,
}) => {

    const PRODUCT_DRAFT = {
        id: "",
        name: "",
        price: 0,
        articles: [],
    }

    
    const [productFormItem, setProductFormItem] = useState(PRODUCT_DRAFT);
    const [showProductForm, setShowProductForm] = useState(false);
    const [productSubmitted, setProductSubmitted] = useState(false);

    const openNewProductForm = () => {
        warehouseManagerToast.current.show({
            severity: "warn",
            summary: "",
            detail: "Work in progress",
            life: 5000,
        });
        // setProductFormItem(ARTICLE_DRAFT);
        // setShowProductForm(true);
    }

    const resetProductForm = () => {
        setShowProductForm(false);
        setProductSubmitted(false);
        setProductFormItem(PRODUCT_DRAFT)
    }    

    return (
        <div className="col-12 xl:col-7 flex shadow-2 warehouse-product-manager">            
            <ProductsTable
                products={products}
                saleInProgress={saleInProgress}
                openNewProductForm={openNewProductForm}
                checkProductArticlesBeforeSale={checkProductArticlesBeforeSale}
                searchProducts={searchProducts}
                productsRefreshing={productsRefreshing}
            />
            {/* <ProductForm /> */}
        </div>
    );
};

export default WarehouseProductManager;