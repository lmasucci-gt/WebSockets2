import Express from "express";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import productosRouter from "./src/routes/productos.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import archivoProductos from "./src/models/archivoProductos.js";
import archivoChat from "./src/models/archivoChat.js";
import moment from 'moment';
import {Chat} from './src/models/chat.js'

const app = Express();
const server = createServer(app);
const io = new Server(server);

app.use(Express.static("src/public"));

app.use(Express.json());
app.use("/productos", productosRouter);
app.use(errorHandlerMiddleware);

server.listen(3000, () => {
  console.log("Server WebSockets listening on port 3000");
});


let listaProductos = archivoProductos.read();
let mensajes = archivoChat.read()

io.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.emit("lista", listaProductos);
  socket.emit("chat", mensajes);
  socket.on("newProducto", (producto) => {
  producto.id = listaProductos.length + 1;
  listaProductos.push(producto);
  archivoProductos.create(producto);
  io.sockets.emit("newElement", producto);
  });
  socket.on("newMensaje", ({email, mensaje}) => {
    let msg = {
      email: email,
      time: `${moment().format("L")} ${moment().format("LTS")}`,
      mensaje: mensaje
    }    
    mensajes.push(msg);
    archivoChat.create(msg);
    io.sockets.emit("newChat", msg);
    });
})

export default app;
