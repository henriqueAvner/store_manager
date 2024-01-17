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

module.exports = {
  findAllProducts,
  findProductById,
};