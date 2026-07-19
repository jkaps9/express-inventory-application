const { Router } = require("express");
const { createIndex } = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", createIndex);

module.exports = indexRouter;
