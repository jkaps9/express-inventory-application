const { Router } = require("express");
const {
  createIndex,
  createDetail,
  createNewItemForm,
  validateItem,
  addItem,
  deleteItem,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", createIndex);
indexRouter.get("/item", createDetail);
indexRouter.get("/new/item", createNewItemForm);
indexRouter.post("/new/item", validateItem, addItem);
indexRouter.post("/item/delete", deleteItem);

module.exports = indexRouter;
