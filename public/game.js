import { HpBar } from "./hp.js";

const config = {
    physics: { default: "arcade" },
    type: Phaser.AUTO,
    width: 953,
    height: 720,
    scene: {
        preload: preload,
        //init: init,
        create: create,
        update: update,
    },
};
const game = new Phaser.Game(config);

let targetX;
let targetY;
let socket = io({
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
});
let playerNum;
let p1Color, p2Color;
socket.on("disconnect", () => console.log("disconnected"));
socket.on("assigned_number", (msg) => {
    playerNum = msg;
    console.log(`I am player ${msg}`);
    p1Color = playerNum === 2 ? 0xff0000 : 0x00ff00;
    p2Color = playerNum === 1 ? 0xff0000 : 0x00ff00;
});

function preload() {
    console.log("load");
    this.load.image("background", "images/baronpit.jpg");
    this.load.image("char1", "images/character1.webp");
    this.load.image("knife", "images/knife.png");
}

function create() {
    this.input.mouse.disableContextMenu();
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2,
        'background')

    let knife1 = this.physics.add.sprite(0, 0, 'knife');
    let knife2 = this.physics.add.sprite(0, 0, 'knife');
    knife1.setActive(true);
    knife1.setVisible(true);
    knife1.setScale(0.7);
    knife2.setScale(0.7);
    knife2.setActive(true);
    knife2.setVisible(true);
    let char1 = this.physics.add.sprite(280, 250, 'char1');
    char1.setScale(0.08);
    let hp1 = new HpBar(this, char1.x, char1.y, p1Color);
    let char2 = this.physics.add.sprite(420, 450, "char1");
    char2.setScale(0.08);
    let hp2 = new HpBar(this, char2.x, char2.y, p2Color);
    hp1.value = 1;
    hp2.value = 1;
    hp1.draw();
    hp2.draw();
    
    const pointer = this.input.activePointer;
    this.input.keyboard.on('keydown-Q', ()=>{
        let ktargetx = pointer.worldX;
        let ktargety = pointer.worldY;
        let moveX;
        let moveY;
        if(playerNum === 1){
            moveX = ktargetx - char1.x;
            moveY = ktargety - char1.y;
            knife1.angle = 90 + Math.atan2(moveY,moveX)*180/Math.PI;
            console.log(Math.atan2(moveY,moveX));
            //knife1.angle = 90 + Math.atan2(moveY,moveX);
            //knife1.angle = Math.atan2(moveY,moveX);
        }
        if(playerNum === 2){
            moveX = ktargetx - char2.x;
            moveY = ktargety - char2.y;
            knife2.angle = 90 + Math.atan2(moveY,moveX)*180/Math.PI;
        }
        const angle = Math.atan2(moveY, moveX)
        // Calculate the direction from the object to the pointer
        //console.log("q-recieve");
        socket.emit("kpos", {angle});
        // Set the object's direction to the pointer direction
    });

    socket.on('update', (msg) => {
        char1.x = msg[1]['x'];
        char1.y = msg[1]['y']
        knife1.x = msg[1]['kx'];
        knife1.y = msg[1]['ky'];
        hp1.value = msg[1]['hp'];
        hp1.x = char1.x - 75;
        hp1.y = char1.y - 120;
        //hp1.value = 0.8;
        hp1.draw();
        if (2 in msg) {
            char2.x = msg[2]['x']
            char2.y = msg[2]['y']
            knife2.x = msg[2]['kx']
            knife2.y = msg[2]['ky']
            hp2.value = msg[2]['hp']
            hp2.x = char2.x - 75;
            hp2.y = char2.y - 120;
            //hp2.value = 0.8;
            hp2.draw();
        }
    });
}

function update() {
    /*
    const distance = Phaser.Math.Distance.Between(targetx,targety, char1.x, char1.y);

    if(distance < 3){
        char1.setVelocity(0,0)
    }

     */
    const pointer = this.input.activePointer;

    if (pointer.rightButtonDown()) {
        targetX = pointer.worldX;
        targetY = pointer.worldY;
        socket.emit("pos", { targetX, targetY });
        //this.physics.moveTo(char1,pointer.worldX,pointer.worldY,240)
    }

    

}
