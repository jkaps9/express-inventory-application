const pool = require("./pool");

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getAllItems() {
  const { rows } = await pool.query(`
            SELECT c.name, i.id, i.name, i.description, i.price 
            FROM items AS i
            LEFT JOIN categories AS c
            ON i.name = c.name;
        `);

  return rows;
}

async function getItemByCategory(categoryId) {
  const { rows } = await pool.query(`
            SELECT c.name, i.id, i.name, i.description, i.price 
            FROM items AS i
            LEFT JOIN categories AS c
            ON i.name = c.name
            WHERE i.category_id = ${categoryId};
        `);

  return rows;
}

async function getItemById(id) {
  const { rows } = await pool.query(`
            SELECT c.name, i.id, i.name, i.description, i.price 
            FROM items AS i
            LEFT JOIN categories AS c
            ON i.name = c.name
            WHERE i.id = ${id};
        `);

  return rows[0];
}

async function addItem({ category, name, price, description }) {
  await pool.query(`INSERT INTO items (category_id, name, description, price)
VALUES
((SELECT id from categories WHERE name = '${category}'), '${name.replace("'", "''")}', '${description.replace("'", "''")}', ${price});`);
}

async function deleteItem(id) {
  await pool.query(`DELETE FROM items WHERE id=${id};`);
}

module.exports = {
  getCategories,
  getAllItems,
  getItemByCategory,
  getItemById,
  addItem,
  deleteItem,
};
