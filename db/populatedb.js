const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INTEGER REFERENCES categories (id) NOT NULL,
  name VARCHAR ( 255 ) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL CONSTRAINT positive_price CHECK(price > 0)
);

INSERT INTO categories (name)
VALUES
  ('Computers & Tablets'),
  ('Cell Phones'),
  ('Video Games'),
  ('Cameras'),
  ('Wearable Technology');


INSERT INTO items (category_id, name, description, price)
VALUES
((SELECT id from categories WHERE name = 'Computers & Tablets'), 'Apple 14" MacBook Pro (M5 Pro, Space Black)', 'Now with the powerful M5 Pro chip, the Apple 14" MacBook Pro delivers advanced single- and multithreaded CPU performance and faster unified memory. Designed for scientists, engineers, software developers, and creative pros tackling intensive projects, the M5 Pro 15-Core chip features a next-generation 16-Core GPU with a Neural Accelerator in each core, which helps speed up AI tasks like LLM prompt processing and on-device transformer model training. The M5 Pro chip also brings up to 2x faster SSD performance than the previous generation for tasks that include importing RAW image files or exporting videos. Additionally, it offers optimal battery life of up to 24 hours, so you can take your pro workflows anywhere.', 3099.00);
`;
async function main() {
  console.log("seeding...");
  const client = new Client({
    host: "localhost", // or wherever the db is hosted
    user: process.env.DATABASE_USER,
    database: "my_store",
    password: process.env.DATABASE_PASSWORD,
    port: 5432, // The default port
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
