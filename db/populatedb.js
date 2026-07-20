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

INSERT INTO items (category_id, name, description, price)
VALUES
((SELECT id from categories WHERE name = 'Cell Phones'), 'Apple iPhone 17', 'iPhone 17. More delightful. More durable. 6.3-inch ProMotion display, Ceramic Shield, all 48MP rear cameras, Center Stage front camera, A19 chip, and more.', 830.00);

INSERT INTO items (category_id, name, description, price)
VALUES
((SELECT id from categories WHERE name = 'Wearable Technology'), 'Apple Watch Series 11', 'Introducing Apple Watch Series 11. With hypertension notifications, sleep score, speedy 5G, and up to 24 hours of battery life.', 399.00);

INSERT INTO items (category_id, name, description, price)
VALUES
((SELECT id from categories WHERE name = 'Video Games'), 'Steam Machine', 'Your games on the big screen. Powerful PC gaming made easy, 
in a small and mighty package.', 1049.00);

INSERT INTO items (category_id, name, description, price)
VALUES
((SELECT id from categories WHERE name = 'Cameras'), 'Nikon D780 DSLR Camera', 'Mixing a contemporary imaging approach with traditional form and function, the Nikon D780 is a versatile DSLR excelling in both photography and video applications. Featuring a 24.5MP full-frame CMOS sensor, high-resolution stills and video recording are possible, and the sensor features a BSI design for heightened clarity and reduced noise levels to suit working in a variety of lighting conditions. This sensor also enables a wide sensitivity range from ISO 100-51200, which can be expanded to ISO 50-204800, along with a quick 7 fps shooting rate with the viewfinder or 12 fps in live view. This sensor also permits UHD 4K video recording up to 30 fps using either full-frame or cropped areas. Full HD recording up to 120 fps is available, too, along with integrated N-Log Gamma and HLG settings for refined color control.', 1746.95);
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
