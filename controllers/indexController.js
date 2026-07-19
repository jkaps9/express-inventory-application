const db = require("../db/queries");

async function createIndex(req, res) {
  const categories = await db.getCategories();
  const items = await db.getAllItems();
  res.render("index", {
    title: "JKaps9 Electronics",
    categories: categories,
    items: items,
  });
}

module.exports = {
  createIndex,
};
