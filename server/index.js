require("dotenv").config();
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies */
appSockets = express();
const { users_admin } = require("./test/users");
const { findUser, getUsersAvailable } = require("./functions/f_users");
const { socketHandler, getUsers, addUser } = require("./sockets");

//appSockets.use(cors2());

app.get("/", (req, res) => {
  //console.log(`server at ${process.env.PORT}`);
  res.send(`Hola soy el server at ${process.env.PORT}`);
});

app.get("/users", (req, res) => {
  res.status(200).send(getUsers());
});

app.get("/usersAvailable", (req, res) => {
  //console.log("users_logged", getUsers());
  const users_available = getUsersAvailable(users_admin, getUsers());

  console.log("users_available", users_available);

  res.status(200).send(users_available);
});

app.post("/login", (req, res) => {
  const { user, email } = { ...req.body };
  let myUser = null;
  console.log("users", getUsers());
  let errNick = false;
  errNick = getUsers().some((u) => u.nickname === user.trim());
  myUser = findUser(users_admin, { user, email });

  myUser && !errNick
    ? res.status(200).send({ myUser })
    : res.status(404).send({ error: "Usuario no Existe o duplicado !!" });
});

//******************************************** */
const port = process.env.PORT || 8800;

const serverSockets = require("http").Server(appSockets);
const socketio = require("socket.io")(serverSockets);
appSockets.set("port", process.env.SOCKET_PORT || 5000);

//Ejecutamos la función de sockets.js
socketHandler(socketio);

const startSockets = () => {
  serverSockets.listen(appSockets.get("port"), () => {
    console.log("Servidor sockets en el puerto ", appSockets.get("port"));
  });
};

const startServer = async () => {
  try {
    app.listen(port, () => console.log(`Server escuchando puerto ${port}...`));
  } catch (error) {
    console.log("no hay conexion a datos");
  }
};

try {
  startServer().then(startSockets());
} catch (error) {}
