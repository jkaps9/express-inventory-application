const db = require("../db/queries");

async function createIndex(req, res) {
  res.render("index", { title: "JKaps9 Electronics" });
}

module.exports = {
  createIndex,
};
