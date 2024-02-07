import fs from "fs/promises"
import path from "path";

const cartFilePath = path.join(__dirname, '../data/carrito.json');

const getCartById = async (cartId) => {
  try {
    const fileContent = await fs.readFile(cartFilePath, 'utf-8');
    const carts = JSON.parse(fileContent);
    const cart = carts.find((c) => c.id === cartId);
    return cart || null;
  } catch (error) {
    console.error('Error reading cart file:', error.message);
    return null;
  }
};

const createCart = async () => {
  try {
    const fileContent = await fs.readFile(cartFilePath, 'utf-8');
    const carts = JSON.parse(fileContent);
    const newCart = { id: carts.length + 1, products: [] };
    carts.push(newCart);
    await fs.writeFile(cartFilePath, JSON.stringify(carts, null, 2), 'utf-8');
    return newCart;
  } catch (error) {
    console.error('Error creating cart:', error.message);
    return null;
  }
};

module.exports = {
  getCartById,
  createCart,
};
