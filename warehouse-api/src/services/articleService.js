const articleRepository = require("../repositories/articleRepository");
const lockedArticleRepository = require("../repositories/lockedArticleRepository");

const getAllArticles = async () => {
    try {
        const allArticles = await articleRepository.getAllArticles();
        const responseCode = (allArticles.length > 0) ? 200 : 204;
        return {
            code: responseCode,
            data: allArticles,
        };
    } catch (error) {
        throw error;
    }
}

const getArticleById = async (articleId) => {
    try {
        const requestedArticle = await articleRepository.getArticleById(articleId);
        if (requestedArticle) {
            return requestedArticle;
        } else {
            throw { status: 404, message: `No article with id '${articleId}' was found` };
        }
    } catch (error) {
        throw error;
    }
}

const getArticleByName = async (articleName) => {
    try {
        const requestedArticle = await articleRepository.getArticleByName(articleName);
        if (requestedArticle) {
            return requestedArticle;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

const createArticle = async (articleName, articleStock) => {
    const existingArticle = await getArticleByName(articleName);
    if (existingArticle) {
        throw { status: 400, message: `An article with the name '${articleName}' already exists` };
    }

    const newArticle = {
        name: articleName,
        stock: articleStock,
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    }

    try {
        const createdArticle = await articleRepository.createArticle(newArticle);
        return createdArticle;
    } catch (error) {
        throw error;
    }
}

const updateArticle = async (articleId, fieldsToUpdate) => {
    try {
        const lockedArticle = await lockedArticleRepository.getLockedArticleByArticleId(articleId);
        if (lockedArticle && lockedArticle.length > 0) {
            throw { status: 403, message: `Article ${articleId} is currently locked` };
        } else {
            const newLock = {
                articleId: articleId,
                createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
                updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
            }
            
            const createdArticleLock = await lockedArticleRepository.createLockedArticle(newLock);
            if (createdArticleLock) {
                const updatedArticle = await articleRepository.updateArticle(articleId, fieldsToUpdate);
                if (updatedArticle[0] === 1) {
                    const lockReleaseResult = await lockedArticleRepository.deleteLockedArticle(createdArticleLock.id);
                    if (lockReleaseResult) {
                        return `Article ${articleId} updated successfully`;
                    } else {
                        throw { status: 500, message: `Article ${articleId} release failed` }; // FIXME: this should be stored somewhere to deal with it (!!!!!)
                    }
                } else {
                    throw { status: 500, message: `Article ${articleId} update failed` };
                }
            }            
        }        
    } catch (error) {
        throw error;
    }
}

const deleteArticle = async (articleId) => {
    return;
}

module.exports = {
    getAllArticles,
    getArticleById,
    getArticleByName,
    createArticle,
    updateArticle,
    deleteArticle,
}