import express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();
const app = express();



//
import { Player } from "./classes.js";

/**
 * @type {import("socket.io").Server}
 */


const PORT = process.env.PORT || 8001;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // client link
        methods: ["GET", "POST"]
    }
});

// const urlParams = new URLSearchParams(window.location.search);
// const roomCode = urlParams.get("room");

// if (!roomCode) {
//     alert("No room code found! Redirecting...");
//     window.location.href = "index.html"; // Redirect back if no room
// }

let socketID;
let numberOfPlayers = 0;
// All player objects are stored here
const players = {};

// SAMPLE DATA:
// let playerObject = {
//     "socketID": {
//         "socketID": socketID,
//         "x": 200,
//         "y": 200
//     }
// }

io.on('connection', (socket) => {
    // 1. On connection, server creates a new player obj
    // and stores it as socketID => Player mapping
    numberOfPlayers++;
    console.log("No of Players: ", numberOfPlayers);
    socketID = socket.id;
    console.log("New Socket ID: ", socket.id);
    players[socketID] = new Player(socketID);

    console.log(players);
    

    // 2. Broadcasting the updated players object to everyone
    io.emit('updatePlayers', Object.fromEntries(
        Object.entries(players)
              .map(([id, p]) => [id, { x: p.x, y: p.y, angle: p.angle, socketID: p.socketID }])
    ));
    

    socket.on('playerMove', (playerCoordinate) => {
        console.log(playerCoordinate);
        let { socketID, x, y, angle } = playerCoordinate;
        
        players[socketID].x = x;
        players[socketID].y = y;
        players[socketID].angle = angle;

        // send the updated data to all clients except sender
        socket.broadcast.emit('updatePlayers', Object.fromEntries(
        Object.entries(players)
              .map(([id, p]) => [id, { x: p.x, y: p.y, angle: p.angle, socketID: p.socketID }])
        ));
    });

    // Player Disconnected
    socket.on('disconnect', () => {
        numberOfPlayers--;
        console.log("Number of Players:", numberOfPlayers);  
        delete players[socketID];

        // 2. Broadcasting the updated players object to everyone
        io.emit('updatePlayers', Object.fromEntries(
            Object.entries(players)
                .map(([id, p]) => [id, { x: p.x, y: p.y, socketID: p.socketID }])
        ));

        console.log(players);
        
    })
});





server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});