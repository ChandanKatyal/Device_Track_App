const express = require("express");
const app = express();

const http = require("http");
const path = require("path");

const socketio = require("socket.io");
const myServer = http.createServer(app);
const io = socketio(myServer);
const cors = require("cors");

app.set("view engine", "ejs");
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", function (id) {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", function (req, res) {
  res.render("index");
});

// myServer.listen(3000);
const PORT = process.env.PORT || 3000;
myServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
