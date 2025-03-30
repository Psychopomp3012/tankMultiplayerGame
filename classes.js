export class Player {
    constructor(socketID, x = 0, y = 0, angle = 0) {
        this.socketID = socketID;
        this.width = 50;
        this.height = 50;
        this.x = Math.floor(Math.random() * (1000 - this.width)); // CANVAS is 1000
        this.y = Math.floor(Math.random() * (1000 - this.width));
        this.speed = 5;
        this.angle = angle;
        
    }
    // draw() {
    //     ctx.fillRect(this.x, this.y, this.width, this.height);
    // }
    // update() {
    //     let moved = false;
        
    //     if (keysPressed["w"] || keysPressed["ArrowUp"]) {
    //         this.y -= this.speed;
    //         moved = true;
    //     }
    //     if (keysPressed["s"] || keysPressed["ArrowDown"]) {
    //         this.y += this.speed;
    //         moved = true;
    //     }
    //     if (keysPressed["a"] || keysPressed["ArrowLeft"]) {
    //         this.x -= this.speed;
    //         moved = true;
    //     }
    //     if (keysPressed["d"] || keysPressed["ArrowRight"]) {
    //         this.x += this.speed;
    //         moved = true;
    //     }

    //     if (moved) {
    //         socket.emit("playerMove", { 
    //             "socketID": socketID,
    //             x: this.x, 
    //             y: this.y 
    //         }); // Send only if moved
    //     }
    // }
}