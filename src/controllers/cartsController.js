const fs = require('fs');
const path = require('path');
const carritoPath = path.join(__dirname, '../data/carrito.json');

const getCartById = (req, res) => {
  const cartId = req.params.cid;
  try {
    const cartsData = fs.readFileSync(carritoPath, 'utf-8');
    const carts = JSON.parse(cartsData);
    const cart = carts.find((c) => c.id === cartId);

    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado' });
    } else {
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

const createCart = (req, res) => {
  const newCart = {
    id: generateUniqueId(), // Función para generar un ID único
    products: [],
  };

  try {
    const cartsData = fs.readFileSync(carritoPath, 'utf-8');
    const carts = JSON.parse(cartsData);

    carts.push(newCart);

    fs.writeFileSync(carritoPath, JSON.stringify(carts, null, 2), 'utf-8');

    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
};

const addProductToCart = (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = parseInt(req.body.quantity);

  try {
    const cartsData = fs.readFileSync(carritoPath, 'utf-8');
    let carts = JSON.parse(cartsData);

    const cartIndex = carts.findIndex((c) => c.id === cartId);

    if (cartIndex === -1) {
      res.status(404).json({ error: 'Carrito no encontrado' });
    } else {
      const productIndex = carts[cartIndex].products.findIndex((p) => p.id === productId);

      if (productIndex === -1) {
        // Producto no existe en el carrito, se agrega como nuevo
        const newProduct = { id: productId, quantity };
        carts[cartIndex].products.push(newProduct);
      } else {
        // Producto ya existe en el carrito, se incrementa la cantidad
        carts[cartIndex].products[productIndex].quantity += quantity;
      }

      fs.writeFileSync(carritoPath, JSON.stringify(carts, null, 2), 'utf-8');

      res.json(carts[cartIndex]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

// Función para generar un ID único
const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

module.exports = {
  getCartById,
  createCart,
  addProductToCart,
};
