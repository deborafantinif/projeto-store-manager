const connection = require('./connection');

const productModel = {
  getAll: async () => {
    const sql = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.query(sql);
    return products;
  },

  getById: async (id) => {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?;';
    const [[product]] = await connection.query(sql, [id]);
    return product;
  },
};

module.exports = productModel;