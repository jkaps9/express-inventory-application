const { Router } = require("express");
const {
  createIndex,
  createDetail,
  createNewItemForm,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", createIndex);
indexRouter.get("/item", createDetail);
indexRouter.get("/new/item", createNewItemForm);

module.exports = indexRouter;
