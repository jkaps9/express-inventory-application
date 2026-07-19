const { Router } = require("express");
const { createIndex, createDetail } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", createIndex);
indexRouter.get("/item", createDetail);

module.exports = indexRouter;
