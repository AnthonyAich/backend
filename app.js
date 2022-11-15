// // importeren van de express module
// // initialiseren van de express applicatie
// const express = require('express');
// const app = express();
// const server = require("http").Server(app);
// const io = require("socket.io")(server);

// // importeren van de body-parser module
// const bodyParser = require('body-parser');
// // dotenv PORT data importeren
// const dotenv = require('dotenv');
// dotenv.config();
// const PORT = process.env.PORT;
// const path = require('path');
// const { ExpressPeerServer } = require("peer");
// const peerServer = ExpressPeerServer(server, {
//     debug: true,
// });


// // cors
// const cors = require('cors');
// app.use(cors());

// app.use(express.json());

// //middleware
// const authenticate = require('./middleware/authenticate');
// app.use((req, res, next) => {
//     // if res is login
//     if (req.path === '/login') {
//         next();
//     } else {
//         // if res is not login
//         authenticate(req, res, next);
//     }
// });

// app.use("/public", express.static(path.join(__dirname, "static")));
// app.use("/peerjs", peerServer);

// app.get("/join/:room", (req, res) => {
//     res.render("room.ejs", { roomid: req.params.room, Myname: req.query.name });
// });

// //routes importeren
// const routes = require('./routes');
// app.use('/', routes);

// io.on("connection", (socket) => {
//     socket.on("join-room", (roomId, id, myname) => {
//         socket.join(roomId);
//         socket.to(roomId).broadcast.emit("user-connected", id, myname);

//         socket.on("messagesend", (message) => {
//             io.to(roomId).emit("createMessage", message);
//         });

//         socket.on("tellName", (myname) => {
//             socket.to(roomId).broadcast.emit("AddName", myname);
//         });

//         socket.on("disconnect", () => {
//             socket.to(roomId).broadcast.emit("user-disconnected", id);
//         });
//     });
// });

// // port 3000
// app.listen(PORT, () => {
//     console.log('🚀 Server running on port ' + PORT);
// });