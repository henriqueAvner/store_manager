const conn = require('./connection');
const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

const findAllSales = async () => {
  const [allSales] = await conn
    .execute(`SELECT sale_id AS saleId, date, product_id AS productId,quantity FROM 
    sales AS s INNER JOIN sales_products AS sp ON s.id = sp.sale_id `);
  return allSales;
};

const findSaleById = async (saleProdutcId) => {
  const [filterSales] = await conn
    .execute(
      `SELECT date, product_id AS productId, quantity FROM sales AS s INNER JOIN 
      sales_products AS sp ON s.id = sp.sale_id WHERE s.id = ? ORDER BY s.date, sp.product_id`, 
      [saleProdutcId],
    );
  return filterSales;
};

const insertSalesProductsData = async (currSale, saleId) => {
  currSale.forEach(async (sale) => {
    const newSale = { saleId, ...sale };
    const columns = getFormattedColumnNames(newSale);
    const placeholders = getFormattedPlaceholders(newSale);
    const query = `INSERT INTO sales_products (${columns}) VALUE (${placeholders});`;

    await conn.execute(query, [...Object.values(newSale)]);
  });
};

const insertNewSale = async (newSale) => {
  const [{ insertId }] = await conn.execute('INSERT INTO sales (date) VALUES (NOW())');
  await insertSalesProductsData(newSale, insertId);
  return { id: insertId, itemsSold: newSale };
};

module.exports = {
  findAllSales,
  findSaleById,
  insertNewSale,
    
};