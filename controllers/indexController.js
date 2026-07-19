const db = require("../db/queries");

async function createIndex(req, res) {
  const categories = await db.getCategories();
  if (Object.keys(req.query).length === 0) {
    const items = await db.getAllItems();
    res.render("index", {
      title: "JKaps9 Electronics",
      categories: categories,
      items: items,
    });
  } else {
    const items = await db.getItemByCategory(req.query.category);
    res.render("index", {
      title: "JKaps9 Electronics",
      categories: categories,
      items: items,
    });
  }
}

module.exports = {
  createIndex,
};
