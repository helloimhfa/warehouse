import { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import "./ProductsTable.css";

const ProductsTable = ({
    products,
    saleInProgress,
    openNewProductForm,
    checkProductArticlesBeforeSale,
    searchProducts,
    productsRefreshing,
}) => {

    const PRODUCT_STATUS_CLASSNAME_DICTIONARY = {
        I: "p-button-success",
        L: "p-button-warning",
        S: "p-button-danger",
        U: "p-button-secondary",
    }

    // To highlight rows if needed
    const PRODUCT_ROW_CLASSNAME_DICTIONARY = {
        I: "in-stock-product",
        L: "last-units-product",
        S: "sold-out-product",
        U: "unknown-status-product",
    }

    const dt = useRef(null);
    const [searchButtonIcon, setSearchButtonIcon] = useState("pi pi-search");
    const [searchButtonLabel, setSearchButtonLabel] = useState("Search products");

    const productsSearchTriggered = () => {
        searchProducts();
        setSearchButtonIcon("pi pi-refresh");
        setSearchButtonLabel("Refresh products");        
    }

    const productsTableHeader = (
        <div className="table-header products-table-header grid justify-content-between p-4">
            <span className="p-input-icon-left">
                <Button
                    label={searchButtonLabel}
                    icon={searchButtonIcon}
                    className="gap-2 mr-2"
                    onClick={productsSearchTriggered}
                    disabled={productsRefreshing || saleInProgress}
                />
            </span>
            <span className="p-input-icon-left">
                <Button
                    label="New product"
                    icon="pi pi-plus"
                    className="gap-2 mr-2"
                    onClick={openNewProductForm}
                    disabled={productsRefreshing || saleInProgress}
                />
            </span>
        </div>
    );

    const productActionsHeader = (
        <>
            <i className="actions-header-icon pi pi-cog"></i>
        </>
    );

    const productStatusBodyTemplate = (productRow) => {
        const productRowClassname = PRODUCT_STATUS_CLASSNAME_DICTIONARY[productRow.status.key];

        return (
            <>
                <Button label={productRow.status.text} className={"product-status-btn p--outlined " + productRowClassname}/>
            </>
        );
    }

    const productPriceBodyTemplate = (productRow) => {
        return <>{productRow.price} €</>;
    }

    const productSaleBodyTemplate = (productRow) => {
        return (
            <>
                <Button
                    icon="pi pi-shopping-cart"
                    className="sell-product-btn p-button-secondary"
                    onClick={() => checkProductArticlesBeforeSale(productRow)}
                />
            </>
        );
    }

    return (
        <div className="col-12">
            <DataTable
                ref={dt}
                value={products}
                className="p-datatable-responsive products-table"
                dataKey="id"
                sortField="name"
                header={productsTableHeader}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25]}
                totalRecords={products.length}
                emptyMessage="No products to display."
                responsiveLayout="stack"
                breakpoint="640px"
            >
                <Column
                    field="name"
                    header="Name"
                    className="product-column col-3"></Column>
                <Column
                    field="status"
                    header="Status"
                    className="product-column col-2"
                    body={productStatusBodyTemplate}></Column>
                <Column
                    field="stock"
                    header="Stock"
                    className="product-column col-3"></Column>
                <Column
                    field="price"
                    header="Price"
                    className="product-column col-3"
                    body={productPriceBodyTemplate}></Column>
                <Column
                    header={productActionsHeader}
                    className="product-column col-1"
                    body={productSaleBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default ProductsTable;