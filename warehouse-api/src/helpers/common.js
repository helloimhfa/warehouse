const instanceToJson = (modelInstance) => {
    return JSON.stringify(modelInstance);
}

const instanceToPlainObject = (modelInstance) => {
    return JSON.parse(JSON.stringify(modelInstance));
}

const CommonHelpers = {
    instanceToJson: instanceToJson,
    instanceToPlainObject: instanceToPlainObject,
}

module.exports = CommonHelpers;