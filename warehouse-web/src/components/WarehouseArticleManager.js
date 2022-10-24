import { useEffect, useState } from "react";
import ArticlesTable from "./ArticlesTable";
import ArticleForm from "./ArticleForm";

import "./WarehouseArticleManager.css";

const WarehouseArticleManager = ({
    articles,
    setArticles,
    searchArticles,
    saleProductId,
    saleInProgress,
    updateArticleStock,
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

    useEffect(() => {
        if (!showArticleForm) {
            resetArticleForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showArticleForm]);

    // // useEffect(() => {
    // //     if (articles.length === 0) {
    // //         searchArticles();
    // //     }
    // //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // // }, []);

    return (
        <div className="col-12 xl:col-4 flex shadow-2 p-4 warehouse-article-manager">
            <ArticlesTable
                articles={articles}
                saleInProgress={saleInProgress}
                openNewArticleForm={openNewArticleForm}
                updateArticleStock={updateArticleStock}
                searchArticles={searchArticles}
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