const { articles } = require("./models");

const getAllArticles = () => {
    return;
}

const getArticleById = (articleId) => {
    return;
}

const createArticle = async (newArticle) => {
    try {
        const result = await articles.create(newArticle)
            .then(data => {
                console.log("******", data);
                return data;
            });
        return result;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const updateArticle = (articleId, updateData) => {
    return;
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
};