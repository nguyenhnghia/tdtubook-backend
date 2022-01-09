const Category = require("../../models/Category");
const ApiError = require("../../utils/ApiError");

const getCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);
  if (!category) throw new ApiError(400, "Category not found");
  return category;
};

const queryCategories = async (query, options) => {
  const categories = await Category.paginate(query, options);
  return categories;
};

const createCategory = async (createBody) => {
  const category = new Category(createBody);
  await category.save();
  return category;
};

const updateCategory = async (categoryId, updateBody) => {
  const category = await Category.findByIdAndUpdate(categoryId, updateBody, {
    new: true,
  });
  return category;
};

const deleteCategory = async (categoryId) => {
  await Category.findByIdAndRemove(categoryId);
  return null;
};

const getCategoryFromName = async (categoryName) => {
  const category = await Category.findOne({ name: categoryName });
  return category;
};

const getCategoryFromTag = async (categoryTag) => {
  const category = await Category.findOne({ tag: categoryTag });
  return category;
};

module.exports = {
  getCategoryById,
  queryCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryFromName,
  getCategoryFromTag,
};
