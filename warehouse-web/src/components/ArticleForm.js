import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import classNames from "classnames";

import "./ArticleForm.css";

const ArticleForm = ({
    showArticleForm,
    articleFormItem,
    setArticleFormItem,
    articleSubmitted,
    hideArticleFormDialog,
    submitArticleCreation,
}) => {

    const articleFormDialogHeader = <div>ARTICLE CREATION</div>;

    const articleFormDialogFooter = (
        <div className="grid justify-content-center col-12">
            <Button label="Cancel" className="p-button-secondary article-form-dialog-btn" onClick={hideArticleFormDialog} disabled={articleSubmitted} />
            <Button label="Create article" className="p-button-success article-form-dialog-btn" onClick={submitArticleCreation} disabled={articleSubmitted} />
        </div>
    );

    const onArticleInputChange = (key, value) => {
        let updateArticleItem = { ...articleFormItem };
        updateArticleItem[`${key}`] = value;
        setArticleFormItem(updateArticleItem);
    };


    return (
        <Dialog
            modal
            visible={showArticleForm}
            draggable={false}
            header={articleFormDialogHeader}
            footer={articleFormDialogFooter}
            className="article-form-dialog"
            contentClassName=""
            onHide={hideArticleFormDialog}
            baseZIndex={1337}
            blockScroll
        >
            <div className="col-12 grid justify-content-center align-items-center gap-4">
                <div className="field col-10 gap-3">
                    <label htmlFor="article-item-name">Name</label>
                    <InputText
                        id="article-item-name"
                        keyfilter="alpha"
                        className={
                            "article-form-input" +
                            classNames({
                                " p-invalid": articleSubmitted && !articleFormItem.name,
                            })
                        }
                        value={articleFormItem.name}
                        onChange={(e) => onArticleInputChange("name", e.target.value)}
                        autoComplete="off"
                        required
                    />
                    {articleSubmitted && !articleFormItem.name && <small className="p-error">Required field</small>}
                </div>
                <div className="field col-12 md:col-8">
                    <label htmlFor="article-item-stock">Stock</label>
                    <InputNumber
                        id="article-item-stock"
                        className={"article-form-input" + classNames({ " p-invalid": articleSubmitted && !articleFormItem.stock })}
                        value={articleFormItem.petName}
                        onChange={(e) => onArticleInputChange("stock", e.value)}
                        autoComplete="off"
                        required
                    />
                    {articleSubmitted && !articleFormItem.stock && <small className="p-error">Required field</small>}
                </div>
            </div>
        </Dialog>
    );
};

export default ArticleForm;