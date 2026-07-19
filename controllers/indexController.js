const db = require("../db/queries");

async function createIndex(req, res) {
  const categories = await db.getCategories();

  res.render("index", { title: "JKaps9 Electronics", categories: categories });
}

module.exports = {
  createIndex,
};
