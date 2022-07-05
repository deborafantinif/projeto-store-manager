const connection = require('./connection');

const saleModel = {
  create: async (sales) => {
    const sqlSale = 'INSERT INTO StoreManager.sales () VALUES ()';
    const sqlSaleProduct = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)
    `;
    const [{ insertId }] = await connection.query(sqlSale);
    await Promise.all(
      sales.map(async (sale) => {
        await connection.query(sqlSaleProduct, [insertId, sale.productId, sale.quantity]);
      }),
    );
    return insertId;
  },
};

module.exports = saleModel;