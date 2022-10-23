import { useState } from "react";
import ProductsTable from "./ProductsTable";
// import ProductForm from "./ProductForm";
import ProductHelpers from "../helpers/ProductHelpers";
import "./WarehouseProductManager.css";


const WarehouseProductManager = ({
    products,
    setProducts,
    saleInProgress,
    saleProduct,    
    sellProduct,
    productsRefreshing,
    warehouseManagerToast,
}) => {

    const PRODUCT_DRAFT = {
        id: "",
        name: "",
        stock: 0,
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

    const refreshProducts = () => {
        fetch('http://localhost:3000/api/products')
            .then(rawResponse => rawResponse.json())
            .then(response => {
                warehouseManagerToast.current.show({
                    severity: "success",
                    summary: "",
                    detail: `${response.data.length} products found!`,
                    life: 5000,
                });
                console.log(response)
                const productsWithStockAndStatus = ProductHelpers.parseWithStocks(response.data);
                setProducts(productsWithStockAndStatus);
            }).catch(err => {
                console.error(err);
                warehouseManagerToast.current.show({
                    severity: "error",
                    summary: "ERROR",
                    detail: "Opsie poopsie! Something terrible happened...",
                    life: 5000,
                });
            });
    }

    return (
        <div className="col-12 xl:col-7 flex shadow-2 warehouse-product-manager">            
            <ProductsTable
                products={products}
                saleInProgress={saleInProgress}
                openNewProductForm={openNewProductForm}
                sellProduct={sellProduct}
                refreshProducts={refreshProducts}
                productsRefreshing={productsRefreshing}
            />
            {/* <ProductForm /> */}
        </div>
    );
};

export default WarehouseProductManager;