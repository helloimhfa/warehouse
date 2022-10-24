import { useState } from 'react';
import WarehouseProductManager from "./WarehouseProductManager";
import WarehouseArticleManager from "./WarehouseArticleManager";
import "./WarehouseManager.css";

const WarehouseManager = ({ warehouseManagerToast }) => {

    const [articles, setArticles] = useState([]);
    const [articlesRefreshing, setArticlesRefreshing] = useState(false);

    const [products, setProducts] = useState([]);
    const [saleProductId, setSaleProductId] = useState(null);
    const [saleInProgress, setSaleInProgress] = useState(false);
    const [productsRefreshing, setProductsRefreshing] = useState(false);

    const searchArticles = (displayToast = true) => {
        fetch('http://localhost:3000/api/articles')
            .then(rawResponse => rawResponse.json())
            .then(response => {
                console.log(">>>", response.data)
                setArticles(response.data);
                if (displayToast) {
                    warehouseManagerToast.current.show({
                        severity: "success",
                        summary: "",
                        detail: `${response.data.length} articles found!`,
                        life: 5000,
                    });
                }
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

    const searchProducts = (displayToast = true) => {
        fetch('http://localhost:3000/api/products')
            .then(rawResponse => rawResponse.json())
            .then(response => {
                if (displayToast) {
                    warehouseManagerToast.current.show({
                        severity: "success",
                        summary: "",
                        detail: `${response.data.length} products found!`,
                        life: 5000,
                    });
                }
                setProducts(response.data);
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

    const revertStockChange = (articleId, oldStock) => {
        const _articles = articles.map(article => {
            console.log(article)
            const _stock = article.id === articleId ? oldStock : article.stock;
            const _article = {
                ...article,
                stock: _stock,
            }

            console.log(_article);
            return _article;
        });
        console.log("***", _articles)
        setArticles(_articles);
    }

    const updateArticleStock = (articleId, newStock, oldStock) => {
        fetch(`http://localhost:3000/api/articles/${articleId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                fields: {
                    stock: newStock,
                },
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(rawResponse => rawResponse.json())
            .then(response => {
                if (!response.status || response.status !== "OK") {
                    warehouseManagerToast.current.show({
                        severity: "error",
                        summary: "ARGH!",
                        detail: `Something happened and the stock couldn't be updated... `,
                        life: 5000,
                    });
                    revertStockChange(articleId, oldStock);
                } else {
                    searchProducts(false)
                }
            }).catch(err => {
                console.error(err);
                warehouseManagerToast.current.show({
                    severity: "error",
                    summary: "ERROR",
                    detail: "Opsie poopsie! Something terrible happened...",
                    life: 5000,
                });
                revertStockChange(articleId, oldStock);
            });
    }

    const checkProductArticlesBeforeSale = (product) => {
        fetch(`http://localhost:3000/api/products/${product.id}`)
            .then(rawResponse => rawResponse.json())
            .then(response => {
                if (response.data.stock < 1) {
                    warehouseManagerToast.current.show({
                        severity: "warn",
                        summary: "OUT OF STOCK",
                        detail: `Some article or articles needed were missing! Refresh both tables to see real values`,
                        life: 5000,
                    });
                } else {
                    sellProduct(product)
                }

                console.log(response.data)
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

    const sellProduct = (product) => {
        fetch(`http://localhost:3000/api/products/sale/${product.id}`)
            .then(rawResponse => rawResponse.json())
            .then(response => {
                console.log(response.data)
                if (response.data) {
                    warehouseManagerToast.current.show({
                        severity: "success",
                        summary: "",
                        detail: `${product.name} sold successfully`,
                        life: 5000,
                    });
                    searchArticles(false);
                } else {
                    warehouseManagerToast.current.show({
                        severity: "error",
                        summary: "",
                        detail: `Error selling ${product.name}`,
                        life: 5000,
                    });
                }
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
        <div className="col-12 grid form-grid justify-content-center align-items-center gap-4 warehouse-manager">
            <WarehouseProductManager
                products={products}
                setProducts={setProducts}
                searchProducts={searchProducts}
                saleInProgress={saleInProgress}
                saleProductId={saleProductId}
                productsRefreshing={productsRefreshing}
                checkProductArticlesBeforeSale={checkProductArticlesBeforeSale}
                warehouseManagerToast={warehouseManagerToast}
            />
            <WarehouseArticleManager
                articles={articles}
                setArticles={setArticles}
                searchArticles={searchArticles}
                saleInProgress={saleInProgress}
                updateArticleStock={updateArticleStock}
                articlesRefreshing={articlesRefreshing}
                saleProductId={saleProductId}
                warehouseManagerToast={warehouseManagerToast}
            />
        </div>
    );
};

export default WarehouseManager;