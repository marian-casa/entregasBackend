const fs = require('fs');
const path = require('path');
const productosPath = path.join(__dirname, '../data/productos.json');

const getProducts = (req, res) => {
  try {
    const productsData = fs.readFileSync(productosPath, 'utf-8');
    const products = JSON.parse(productsData);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

const getProductById = (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const productsData = fs.readFileSync(productosPath, 'utf-8');
    const products = JSON.parse(productsData);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

const addProduct = (req, res) => {
  const newProduct = req.body;
  try {
    const productsData = fs.readFileSync(productosPath, 'utf-8');
    const products = JSON.parse(productsData);

    // Asignar un ID único al nuevo producto (podrías implementar lógica más robusta)
    newProduct.id = products.length + 1;

    products.push(newProduct);

    fs.writeFileSync(productosPath, JSON.stringify(products, null, 2), 'utf-8');

    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
};

const updateProduct = (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body;
  try {
    const productsData = fs.readFileSync(productosPath, 'utf-8');
    let products = JSON.parse(productsData);

    const index = products.findIndex((p) => p.id === productId);

    if (index === -1) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      products[index] = { ...products[index], ...updatedProduct };

      fs.writeFileSync(productosPath, JSON.stringify(products, null, 2), 'utf-8');

      res.json(products[index]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const productsData = fs.readFileSync(productosPath, 'utf-8');
    let products = JSON.parse(productsData);

    products = products.filter((p) => p.id !== productId);

    fs.writeFileSync(productosPath, JSON.stringify(products, null, 2), 'utf-8');

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};

