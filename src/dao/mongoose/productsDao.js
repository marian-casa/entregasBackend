import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number,
});

const Product = mongoose.model('Product', productSchema);

const getProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    return [];
  }
};



module.exports = {
  getProducts,

};
