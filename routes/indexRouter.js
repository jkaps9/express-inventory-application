const { Router } = require("express");
const {
  createIndex,
  createDetail,
  createNewItemForm,
  addItem,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", createIndex);
indexRouter.get("/item", createDetail);
indexRouter.get("/new/item", createNewItemForm);
indexRouter.post("/new/item", addItem);

module.exports = indexRouter;
