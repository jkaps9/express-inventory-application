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

module.exports = {
  getCategories,
  getAllItems,
  getItemByCategory,
  getItemById,
};
