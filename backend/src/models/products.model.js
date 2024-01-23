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

const updateProductModel = async (id, name) => {
  await conn
    .execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);

  return { id: Number(id), name };
};

const deleteProductModel = async (id) => {
  await conn.execute('DELETE FROM products WHERE id = ?', [id]);
};

const findQProducts = async (search) => {
  const [product] = await conn.execute(`SELECT * FROM products WHERE name LIKE '%${search}%'`);

  return product;
};

module.exports = {
  findAllProducts,
  findProductById,
  insertProduct,
  updateProductModel,
  deleteProductModel,
  findQProducts,

};