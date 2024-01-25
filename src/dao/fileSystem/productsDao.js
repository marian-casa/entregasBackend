const fs = require('fs/promises');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const getProducts = async () => {
  try {
    const fileContent = await fs.readFile(productsFilePath, 'utf-8');
    const products = JSON.parse(fileContent);
    return products;
  } catch (error) {
    console.error('Error al leer el archivo products:', error.message);
    return [];
  }
};

const getProductById = async (productId) => {
  try {
    const fileContent = await fs.readFile(productsFilePath, 'utf-8');
    const products = JSON.parse(fileContent);
    const product = products.find((p) => p.id === productId);
    return product || null;
  } catch (error) {
    console.error('Error al leer el archivo products:', error.message);
    return null;
  }
};

module.exports = {
  getProducts,
  getProductById,
  // ... other functions
};
