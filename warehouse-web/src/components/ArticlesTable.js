import { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber"

import "./ArticlesTable.css";

const ArticlesTable = ({
    articles,
    saleInProgress,
    openNewArticleForm,
    updateArticleStock,
    articlesRefreshing,
    searchArticles,
}) => {

    const dt = useRef(null);

    const articlesTableHeader = (
        <div className="table-header articles-table-header grid justify-content-between p-4">
            <span className="p-input-icon-left">
                <Button
                    label="Refresh articles"
                    icon="pi pi-refresh"
                    className="gap-2 mr-2"
                    onClick={searchArticles}
                    disabled={articlesRefreshing || saleInProgress}
                />
            </span>
            <span className="p-input-icon-left">
                <Button
                    label="New article"
                    icon="pi pi-plus"
                    className="gap-2 mr-2"
                    onClick={openNewArticleForm}
                    disabled={articlesRefreshing || saleInProgress}
                />
            </span>
        </div>
    );

    const articleStockBodyTemplate = (articleData) => {
        return (
            <InputNumber
                className=""
                value={articleData.stock}
                onValueChange={(e) => updateArticleStock(articleData.id, e.target.value)}
                showButtons
                buttonLayout="horizontal"
                min={0}
                step={1}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
            />
        );
    }

    return (
        <div className="col-12">
            <DataTable
                ref={dt}
                value={articles}
                className="p-datatable-responsive articles-table"
                dataKey="id"
                header={articlesTableHeader}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25]}
                totalRecords={articles.length}
                emptyMessage="No articles to display."
                responsiveLayout="stack"
                breakpoint="640px"
            >
                <Column
                    field="name"
                    header="Name"
                    className="article-column col-8"></Column>
                <Column
                    field="stock"
                    header="Stock"
                    className="article-column col-4"
                    body={articleStockBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default ArticlesTable;