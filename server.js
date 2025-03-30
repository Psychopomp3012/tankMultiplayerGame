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

let numberOfPlayers = 0;
// All player objects are stored here
// as socketID => Player mapping
const players = {};

// SAMPLE DATA:
// let playerObject = {
//     "socketID": {
//         this.socketID = socketID;
        // this.width = 50;
        // this.height = 50;
        // this.x = Math.floor(Math.random() * (1000 - this.width)); // CANVAS is 1000
        // this.y = Math.floor(Math.random() * (1000 - this.width));
        // this.speed = 5;
        // this.angle = angle;
//     }
// }

io.on('connection', (socket) => {
    numberOfPlayers++;
    console.log("NEW PLAYER!!, No of Players: ", numberOfPlayers);
    const socketID = socket.id;
    console.log("New Socket ID: ", socket.id);

    // 1. On connection, server creates a new player obj
    // & update the players object
    players[socketID] = new Player(socketID);

    // console.log(players);
    
    // 2. Broadcasting the updated players object to everyone except client
    socket.broadcast.emit('newPlayerJoined', players[socketID]);
    
    // 3. new player gets the entire players object
    socket.emit("dataForNewPlayer", players);

    socket.on('playerMovedLocally', ({ socketID, x, y, angle }) => {
        // console.log(playerCoordinate);
        // let  = playerCoordinate;
        
        players[socketID].x = x;
        players[socketID].y = y;
        players[socketID].angle = angle;

        // send the moved player data to all clients except sender
        socket.broadcast.emit('otherPlayerMoved', players[socketID]);
    });

    // Player Disconnected
    socket.on('disconnect', () => {
        numberOfPlayers--;
        console.log("Player Disconnected, Number of Players:", numberOfPlayers);  
        delete players[socketID];

        // 2. Broadcasting the socketID of disconnected player to everyone
        // except for the player who disconnected
        socket.broadcast.emit('playerLeft', socket.id);

        // console.log(players);
        
    })
});





server.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});