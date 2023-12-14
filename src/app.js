const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('¡Tienda ecommerce!');
});

// Rutas para productos
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// Rutas para carritos
const cartsRouter = require('./routes/carts');
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
