const conn = require('./connection');

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
      sales_products AS sp ON s.id = sp.sale_id WHERE s.id = ?`, 
      [saleProdutcId],
    );
  return filterSales;
};

module.exports = {
  findAllSales,
  findSaleById,
    
};