const lockedArticleRepository = require("../repositories/lockedArticleRepository");

const getAllLockedArticles = async () => {
    try {
        const allLocks = await lockedArticleRepository.getAllLockedArticles();
        const responseCode = (allLocks.length > 0) ? 200 : 204;
        return {
            code: responseCode,
            data: allLocks,
        };
    } catch (error) {
        throw error;
    }
}

const getLockedArticleById = async (lockId) => {
    try {
        const requestedLock = await lockedArticleRepository.getLockedArticleByLockId(lockId);
        if (requestedLock) {
            return requestedLock;
        } else {
            throw { status: 404, message: `No lock with id '${lockId}' was found` };
        }
    } catch (error) {
        throw error;
    }
}

const getLockedArticleByArticleId = async (articleId) => {
    try {
        const requestedArticle = await lockedArticleRepository.getLockedArticleByArticleId(articleId);
        if (requestedArticle) {
            return requestedArticle;
        } else {
            throw { status: 404, message: `No lock for article with id '${articleId}' were found` };
        }
    } catch (error) {
        throw error;
    }
}

const createLockedArticle = async (articleId) => {
    const existingLock = await lockedArticleRepository.getLockedArticleByArticleId(articleId);
    if (existingLock.length > 0) {
        throw { status: 400, message: `The article with id '${articleId}' is already locked` };
    }

    const newLock = {
        articleId: articleId,
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    }

    try {
        const createdLock = await lockedArticleRepository.createLockedArticle(newLock);
        return createdLock;
    } catch (error) {
        throw error;
    }
}

const deleteLockedArticle = async (lockId) => {
    try {
        const deletedLock = await lockedArticleRepository.deleteLockedArticle(lockId);
        const responseCode = (deletedLock) ? 200 : 404; // TODO: rework response codes and logic
        return {
            code: responseCode,
            data: deletedLock,
        };
        if (deletedLock) {
            
        }
        
        return deletedLock;
    } catch (error) {
        throw error;
    }
    ;
}

// Method to release all in case of stuck situation
const deleteLockedArticleByArticleId = async (articleId) => {
    try {
        const deletedLocks = await lockedArticleRepository.deleteLockedArticleByArticleId(articleId);
        return deletedLocks;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllLockedArticles,
    getLockedArticleById,
    getLockedArticleByArticleId,
    createLockedArticle,
    deleteLockedArticle,
    deleteLockedArticleByArticleId,
}