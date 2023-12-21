const express = require('express');
const expressHandlebars = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

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
