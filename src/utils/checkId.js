const mongoose = require("mongoose");

const isValidId = (objectId) => mongoose.isValidObjectId(objectId);

module.exports = { isValidId };
