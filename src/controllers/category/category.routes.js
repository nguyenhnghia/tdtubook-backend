const express = require("express");

const categoryService = require("./category.service");
const authMiddleware = require("../../middlewares/auth.middleware");
const permit = require("../../middlewares/role.middleware");
const asyncHandler = require("../../utils/asyncHandler");
const pick = require("../../utils/pick");

const categoryRouter = express.Router();

// Top level middlewares
categoryRouter.use(authMiddleware, permit("admin"));

// [GET] /api/categories/:categoryId
categoryRouter.get(
  "/:categoryId",
  asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const category = await categoryService.getCategoryById(categoryId);

    res.status(200).json({ status: "success", category });
  })
);

// [GET] /api/categories
categoryRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const query = pick(req.query, ["name", "tag"]);
    const options = pick(req.query, ["sort", "limit", "page"]);

    const { pagination } = req.query;
    if (pagination && pagination === "false") {
      options.pagination = false;
    }

    const { docs: categories, ...pageInfo } = await categoryService.queryCategories(query, options);

    res.status(200).json({ status: "success", categories, ...pageInfo });
  })
);

// [POST] /api/categories
categoryRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const createBody = pick(req.body, ["name", "tag"]);

    const category = await categoryService.createCategory(createBody, req.user);

    res.status(200).json({ status: "success", category });
  })
);

// [PUT] /api/categories/:categoryId
categoryRouter.put(
  "/:categoryId",
  asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const updateBody = pick(req.body, ["name", "tag"]);

    const category = await categoryService.updateCategory(categoryId, updateBody);

    res.status(200).json({ status: "success", category });
  })
);

// [DELETE] /api/categories/:categoryId
categoryRouter.delete(
  "/:categoryId",
  asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const category = await categoryService.deleteCategory(categoryId);

    res.status(200).json({ status: "success", category });
  })
);

module.exports = categoryRouter;
