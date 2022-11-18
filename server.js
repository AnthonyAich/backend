const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const helmet = require("helmet");
const peerServer = ExpressPeerServer(server, {
    debug: true,
});
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

app.use("/public", express.static(path.join(__dirname, "static")));
app.use("/peerjs", peerServer);
app.get("/join/:rooms", (req, res) => {
    res.render("room.ejs", { roomid: req.params.rooms, Myname: req.query.name });
});
app.get("/endCall", (req, res) => {
    res.render("endCall.ejs");
});
app.use(cookieParser());

// cors
const cors = require('cors');
app.use(cors(
    {
        origin: ['https://cuddly-trains-mate-195-62-90-242.loca.lt', 'http://localhost:3000', 'https://web3node.herokuapp.com'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        //allow all headers and the cookie
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin'],
        exposedHeaders: ["set-cookie"]
    }
));

app.use(helmet());

app.use(express.json());

//middleware
const authenticate = require('./middleware/authenticate');
app.use((req, res, next) => {
    // if res is login
    if (req.path === '/login') {
        next();
    } else {
        // if res is not login
        authenticate(req, res, next);
    }
});

//routes importeren
const routes = require('./routes');
const { all } = require("./routes");
app.use('/', routes);

io.on("connection", (socket) => {
    socket.on("join-room", (roomId, id, myname) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit("user-connected", id, myname);

        socket.on("messagesend", (message) => {
            console.log(message);
            io.to(roomId).emit("createMessage", message);
        });

        socket.on("tellName", (myname) => {
            console.log(myname);
            socket.to(roomId).broadcast.emit("AddName", myname);
        });

        socket.on("disconnect", () => {
            socket.to(roomId).broadcast.emit("user-disconnected", id);
        });
    });
});

server.listen(PORT, () => {
    console.log('🚀 Server running on port ' + PORT);
});