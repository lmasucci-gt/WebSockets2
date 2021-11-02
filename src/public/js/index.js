const socket = io();

socket.on("lista", (data) => {
  console.log(data);
  for (producto of data) {
    let ul = document.getElementById("productos");
    let li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = `ID: ${producto.id} - Title: ${producto.title} - Price: ${producto.price} - Thumbnail: ${producto.thumbnail}`;
  }
});

socket.on("chat", (data) => {
  console.log(data);
  for (mensaje of data) {
    let ul = document.getElementById("chat");
    let li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = `<strong style='color: blue'>${mensaje.email}</strong> ${mensaje.time} <em style='color: green'>${mensaje.mensaje}</em>`;
  }
});

socket.on("newElement", (producto) => {
  let ul = document.getElementsByTagName("ul")[0];
  let li = document.createElement("li");
  ul.appendChild(li);
  li.innerHTML = `ID: ${producto.id} - Title: ${producto.title} - Price: ${producto.price} - Thumbnail: ${producto.thumbnail}`;
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("thumbnail").value = "";
});

socket.on("newChat", (mensaje) => {
  let ul = document.getElementById("chat");
  let li = document.createElement("li");
  ul.appendChild(li);
  li.innerHTML = `<strong style='color: blue'>${mensaje.email}</strong> ${mensaje.time} <em style='color: green'>${mensaje.mensaje}</em>`;
  document.getElementById("email").value = "";
  document.getElementById("mensaje").value = "";
});

function addProducto() {
  let titleInput = document.getElementById("title").value;
  let priceInput = document.getElementById("price").value;
  let thumbnailInput = document.getElementById("thumbnail").value;
  let producto = {
    title: titleInput,
    price: priceInput,
    thumbnail: thumbnailInput,
  };
  socket.emit("newProducto", producto);
}

function sendMsg() {
  let emailInput = document.getElementById("email").value;
  if (emailInput == "" || emailInput == null) {
    alert("El campo email es requerido");
  } else {
    let mensajeInput = document.getElementById("mensaje").value;
    let mensaje = {
      email: emailInput,
      mensaje: mensajeInput,
    };
    socket.emit("newMensaje", mensaje);
  }
}
