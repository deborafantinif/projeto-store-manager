const express = require('express');
const productRouter = require('./routes/productRouter');
require('express-async-errors');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.use((err, _req, res, _next) => {
  console.warn(err);
  return res.status(500);
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;