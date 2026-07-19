const pool = require("./pool");

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getAllItems() {
  const { rows } = await pool.query(`
            SELECT c.name, i.name, i.description, i.price 
            FROM items AS i
            LEFT JOIN categories AS c
            ON i.name = c.name;
        `);

  return rows;
}

module.exports = {
  getCategories,
  getAllItems,
};
