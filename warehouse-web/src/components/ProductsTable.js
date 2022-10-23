import { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import "./ProductsTable.css";

const ProductsTable = ({
    products,
    saleInProgress,
    openNewProductForm,
    sellProduct,
    refreshProducts,
    productsRefreshing,
}) => {

    const dt = useRef(null);

    const productsTableHeader = (
        <div className="table-header products-table-header grid justify-content-between p-4">
            <span className="p-input-icon-left">
                <Button
                    label="Refresh products"
                    icon="pi pi-refresh"
                    className="gap-2 mr-2"
                    onClick={refreshProducts}
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

    const productStatusBodyTemplate = (productData) => {
        return (<></>);
    }

    const productSaleBodyTemplate = (productRow) => {
        return (
            <>
                <Button
                    icon="pi pi-shopping-cart"
                    className="sell-product-btn"
                    onClick={() => sellProduct(productRow)}
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
                    field="status"
                    header="Status"
                    className="product-column col-2"
                    body={productStatusBodyTemplate}></Column>
                <Column
                    field="name"
                    header="Name"
                    className="product-column col-3"></Column>
                <Column
                    field="stock"
                    header="Stock"
                    className="product-column col-5"></Column>
                <Column
                    header={productActionsHeader}
                    className="product-column col-2"
                    body={productSaleBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default ProductsTable;