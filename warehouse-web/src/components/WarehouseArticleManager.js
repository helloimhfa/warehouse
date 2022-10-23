import { useEffect, useState } from "react";
import ArticlesTable from "./ArticlesTable";
import ArticleForm from "./ArticleForm";

import "./WarehouseArticleManager.css";

const WarehouseArticleManager = ({
    articles,
    setArticles,
    saleProduct,
    saleInProgress,
    articlesRefreshing,
    warehouseManagerToast,
}) => {

    const ARTICLE_DRAFT = {
        id: "",
        name: "",
        stock: 0,
    }


    const [articleFormItem, setArticleFormItem] = useState(ARTICLE_DRAFT);
    const [showArticleForm, setShowArticleForm] = useState(false);
    const [articleSubmitted, setArticleSubmitted] = useState(false);

    const openNewArticleForm = () => {
        warehouseManagerToast.current.show({
            severity: "warn",
            summary: "",
            detail: "Work in progress",
            life: 5000,
        });
        // setArticleFormItem(ARTICLE_DRAFT);
        // setShowArticleForm(true);
    }

    const hideArticleFormDialog = () => {
        setShowArticleForm(false);
    }

    const resetArticleForm = () => {
        setArticleSubmitted(false);
        setArticleFormItem(ARTICLE_DRAFT);
    }

    const submitArticleCreation = () => {
        // setArticleSubmitted(true);
        // loadingIcon en header ???
        // completar el item con la id devuelta por la API
    }

    const updateArticleStock = (articleId, newStock) => {
        console.log(`Updating ${articleId} with stock of ${newStock}`);
    }

    const refreshArticles = () => {
        fetch('http://localhost:3000/api/articles')
            .then(rawResponse => rawResponse.json())
            .then(response => {
                warehouseManagerToast.current.show({
                    severity: "success",
                    summary: "",
                    detail: `${response.data.length} articles found!`,
                    life: 5000,
                });
                setArticles(response.data);
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

    useEffect(() => {
        if (!showArticleForm) {
            resetArticleForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showArticleForm]);

    return (
        <div className="col-12 xl:col-4 flex shadow-2 p-4 warehouse-article-manager">
            <ArticlesTable
                articles={articles}
                saleInProgress={saleInProgress}
                openNewArticleForm={openNewArticleForm}
                updateArticleStock={updateArticleStock}
                refreshArticles={refreshArticles}
                articlesRefreshing={articlesRefreshing}
            />
            <ArticleForm
                showArticleForm={showArticleForm}
                articleFormItem={articleFormItem}
                setArticleFormItem={setArticleFormItem}
                articleSubmitted={articleSubmitted}
                hideArticleFormDialog={hideArticleFormDialog}
                submitArticleCreation={submitArticleCreation}
            />
        </div>
    );
};

export default WarehouseArticleManager;