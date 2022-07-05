const connection = require('./connection');

const productModel = {
  getAll: async () => {
    const sql = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.query(sql);
    return products;
  },

  getById: async (id) => {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[product]] = await connection.query(sql, [id]);
    return product;
  },

  create: async (name) => {
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await connection.query(sql, [name]);
    return insertId;
  },

  change: async (name, id) => {
    const sql = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    await connection.query(sql, [name, id]);
  },

  remove: async (id) => {
    const sql = 'DELETE FROM StoreManager.products WHERE id = ?';
    await connection.query(sql, [id]);
  },
};

module.exports = productModel;