const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INTEGER REFERENCES categories (id) NOT NULL,
  name VARCHAR ( 255 ) NOT NULL,
  description VARCHAR (255) NOT NULL,
  price NUMERIC NOT NULL CONSTRAINT positive_price CHECK(price > 0)
);
`;

// const SQL = `DROP TABLE items;
// DROP TABLE categories;`;

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
