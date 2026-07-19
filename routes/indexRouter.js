const { Router } = require("express");
const {
  createIndex,
  createDetail,
  createNewItemForm,
  validateItem,
  addItem,
  deleteItem,
  createUpdateItemForm,
  updateItem,
  validateCategory,
  createNewCategoryForm,
  addCategory,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", createIndex);
indexRouter.get("/item", createDetail);
indexRouter.get("/new/item", createNewItemForm);
indexRouter.post("/new/item", validateItem, addItem);
indexRouter.get("/new/category", createNewCategoryForm);
indexRouter.post("/new/category", validateCategory, addCategory);
indexRouter.post("/item/delete", deleteItem);
indexRouter.get("/item/update/:id", createUpdateItemForm);
indexRouter.post("/item/update", validateItem, updateItem);

// TODO: add CRUD for categories

module.exports = indexRouter;
