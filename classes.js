const colorBasedSpriteCoordinates = { 
    red: {
        tank: {
            x: 588,
            y: 0
        },
        barrel: {
            x: 834,
            y: 0
        }
    }, 
    green: {
        tank: {
            x: 573,
            y: 275
        },
        barrel: {
            x: 818,
            y: 110
        }
    }, 
    blue: {
        tank: {
            x: 506,
            y: 78
        },
        barrel: {
            x: 827,
            y: 226
        }
    } 
};

const keys = Object.keys(colorBasedSpriteCoordinates);


export class Player {
    constructor(socketID) {
        this.socketID = socketID;
        this.width = 50;
        this.height = 50;
        this.x = Math.floor(Math.random() * (1000 - this.width)); // CANVAS is 1000
        this.y = Math.floor(Math.random() * (1000 - this.width));
        this.speed = 5;
        this.angle = 0;
        this.colorBasedSpriteCoordinates = colorBasedSpriteCoordinates[
            keys[
                Math.floor(Math.random() * 3)
            ]
        ]
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