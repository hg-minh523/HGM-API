require('dotenv').config()
const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors');
const proxy = require("express-http-proxy");
const session = require("express-session")
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer().listen(8888);
const io = new Server(httpServer,{
  cors: "*"
});
// Setup socket.io
// io.on("connection", (socket) => {
//   socket.join("notifcation");
//   socket.on("SendNotify",async (data) => {
//     const user = await verifyUser(data.value)
//     const id = user.id
//     socket.join(id)
//     socket.emit("SendNotifyToAdmin", {
//       id
//     });
//   })
//   socket.on("AcceptOrder", (type,userId) => {
//     io.to(userId).emit("sendStatusOrder")
//   })
//   io.to("notifcation").emit("getData","getData")
// });

// io.listen(8888);
// Setup middlerware
app.use(cors({
  credentials: true,

}));
// Creating session 
app.use(session({
  name: "session-id",
  secret: "GFGEnter", // Secret key,
  saveUninitialized: false,
  resave: false,
}))


app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(express.static(path.join(__dirname, '/api/assets')));

// Run router
// routes(app);

app.use("/account", proxy("http://localhost:8002"));
app.use("/employee", proxy("http://localhost:8003"));
app.use("/", (req, res ) => {
  console.log(123)
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
