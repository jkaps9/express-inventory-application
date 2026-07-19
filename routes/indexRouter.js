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
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", createIndex);
indexRouter.get("/item", createDetail);
indexRouter.get("/new/item", createNewItemForm);
indexRouter.post("/new/item", validateItem, addItem);
indexRouter.post("/item/delete", deleteItem);
indexRouter.get("/item/update", createUpdateItemForm);
indexRouter.post("/item/update", updateItem);

module.exports = indexRouter;
