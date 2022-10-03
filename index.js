const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const Products = require('./products/products');
const products = new Products();
const formatMessage = require('./utils/utils.js')
const messages = [];

const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Listen

httpServer.listen( PORT, ()=> {
    console.log('Server up and running in port ', PORT);
})

// Socket

io.on('connection', (socket) => {
    console.log('New user in');
    console.log(socket.id);

    socket.emit('product-list', products.getProducts());
    socket.on('add-product', (newProduct) =>{ 
        products.saveProduct(newProduct);
        io.emit('product-list', products.getProducts())
    });

    socket.emit('messages', [...messages]);
    socket.on('new-message', (data) =>{
        const { username, message } = data;
        const newMessage = formatMessage( username,message );
        messages.push(newMessage)
        io.emit('messages',[...messages])
    });
});
