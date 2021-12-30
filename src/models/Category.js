const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const categorySchema = mongoose.Schema({
  tag: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Plugins
categorySchema.plugin(paginate);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
