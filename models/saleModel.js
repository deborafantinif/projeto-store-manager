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

  getAll: async () => {
    const sql = `
      SELECT
        s.id AS saleId,
        s.date,
        sp.product_id AS productId,
        sp.quantity
      FROM StoreManager.sales_products AS sp
      JOIN StoreManager.sales AS s
      ON s.id = sp.sale_id
    `;
    const [sales] = await connection.query(sql);
    return sales;
  },

  getById: async (id) => {
    const sql = `
      SELECT
        s.date,
        sp.product_id AS productId,
        sp.quantity
      FROM StoreManager.sales_products AS sp
      JOIN StoreManager.sales AS s
      ON s.id = sp.sale_id
      WHERE s.id = ?
    `;
    const [sales] = await connection.query(sql, [id]);
    return sales;
  },

  remove: async (id) => {
    const sqlSalesProducts = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
    const sqlSales = 'DELETE FROM StoreManager.sales WHERE id = ?';
    await connection.query(sqlSalesProducts, [id]);
    await connection.query(sqlSales, [id]);
  },
  update: async (id, sales) => {
    const sqlDelete = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?';
    await connection.query(sqlDelete, [id]);
    await Promise.all(
      sales.map(async (sale) => {
        const sqlCreate = `
          INSERT INTO StoreManager.sales_products 
            (product_id, sale_id, quantity)
          VALUES
            (?, ?, ?)
        `;
        await connection.query(sqlCreate, [sale.productId, id, sale.quantity]);
      }),
    );
  },
};

module.exports = saleModel;