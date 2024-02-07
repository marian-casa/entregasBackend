import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

const getCartById = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId).populate('products.productId', 'title price'); 
    return cart;
  } catch (error) {
    console.error('Error al obtener el carrito:', error.message);
    return null;
  }
};

const createCart = async () => {
  try {
    const newCart = await Cart.create({});
    return newCart;
  } catch (error) {
    console.error('Error al crear el carrito:', error.message);
    return null;
  }
};

const addProductToCart = async (cartId, productId, quantity) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { $push: { products: { productId, quantity } } },
      { new: true }
    ).populate('products.productId', 'title price'); 
    return updatedCart;
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error.message);
    return null;
  }
};



module.exports = {
  getCartById,
  createCart,
  addProductToCart,
  
};
