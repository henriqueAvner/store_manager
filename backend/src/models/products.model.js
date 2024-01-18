const conn = require('./connection');

const findAllProducts = async () => {
  const [products] = await conn.execute('SELECT * FROM products ORDER BY id');
  return products;
};

const findProductById = async (id) => {
  const [[currProduct]] = await conn
    .execute('SELECT * FROM products WHERE id = ?', [id]);
  return currProduct;
};

const insertProduct = async (name) => {
  const [newProduct] = await conn
    .execute('INSERT INTO products (name) VALUES (?)', [name]);
  const { insertId } = newProduct;
  return { id: insertId, name };
};

module.exports = {
  findAllProducts,
  findProductById,
  insertProduct,
};