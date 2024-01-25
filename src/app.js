const express = require('express');
const expressHandlebars = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = app.listen(8080,()=>console.log("Listening on PORT: 8080"));
const io = socketIO(server);

require('dotenv').config()

app.use(express.json());


// Configura Handlebars
app.engine(
  'handlebars',
  expressHandlebars({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// Ruta para la vista index.handlebars
app.get('/', (req, res) => {
  res.render('index');
});

// Ruta para la vista realTimeProducts.handlebars
app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

// Websockets
io.on('connection', (socket) => {
  console.log('Cliente conectado');
});


// Inicia el servidor
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

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

// 3. Add your connection string into your application code
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = mongoose.connect(process.env.mongodbPassword)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

import express from 'express';
import userRouter from './routes/userRouter';
import mongoose from 'mongoose';
import { connect } from 'http2';


mongoose.connect(uri, (error)=>{
  if(error){
    console.log('Cannot connect to database: '+error);
  }
})

app.use('/api/users', userRouter)
