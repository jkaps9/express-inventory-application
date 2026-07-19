const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");

const validateItem = [
  body("category").isLength({ min: 1 }).withMessage(`Category required`),
  body("name").isLength({ min: 1 }).withMessage(`Name required`),
  body("price").isNumeric({ min: 0 }).withMessage("Price must be positive"),
  body("description").isLength({ min: 1 }).withMessage(`Category required`),
];

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

async function createDetail(req, res) {
  if (Object.keys(req.query).length === 0) {
    res.redirect("/");
  } else {
    const item = await db.getItemById(req.query.id);
    res.render("items/itemDetails", { item: item });
  }
}

async function createNewItemForm(req, res) {
  const categories = await db.getCategories();
  res.render("createItem", {
    title: "Create New Item",
    categories: categories,
  });
}

async function addItem(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const categories = await db.getCategories();
    res.status(400).render("createItem", {
      title: "Create New Item",
      categories: categories,
      errors: errors.array(),
    });
  }

  const { category, name, price, description } = matchedData(req);

  await db.addItem({ category, name, price, description });

  res.redirect("/");
}

async function deleteItem(req, res) {
  await db.deleteItem(req.query.id);
  res.redirect("/");
}

async function createUpdateItemForm(req, res) {
  const categories = await db.getCategories();
  const item = await db.getItemById(req.params.id);
  res.render("updateItem", {
    title: "Update Item",
    categories: categories,
    item: item,
  });
}

async function updateItem(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const categories = await db.getCategories();
    res.status(400).render("updateItem", {
      title: "Update Item",
      categories: categories,
      errors: errors.array(),
    });
  }

  const { category, name, price, description } = matchedData(req);

  await db.updateItem(req.query.id, { category, name, price, description });
  res.redirect("/");
}

module.exports = {
  createIndex,
  createDetail,
  createNewItemForm,
  validateItem,
  addItem,
  deleteItem,
  createUpdateItemForm,
  updateItem,
};
