const config = {
    physics: {default:"arcade"},
    type: Phaser.AUTO,
    width: 953,
    height: 720,
    scene: {
        preload: preload,
        //init: init,
        create:create,
        update:update,
    }
}
const game = new Phaser.Game(config)
let char1
let targetx = 280
let targety = 250
let socket = io()

function preload () {
    console.log("load")
    this.load.image("background", 'images/baronpit.jpg')
    this.load.image("char1", "images/character1.webp")
    this.load.image("knife", "images/knife.png")
}
/*
function init() {
	// Listen to space & enter keys
	var keys = [Phaser.KeyCode.Q];
	// Create Phaser.Key objects for listening to the state
	phaserKeys = game.input.keyboard.addKeys(keys);
	// Capture these keys to stop the browser from receiving this event
	game.input.keyboard.addKeyCapture(keys);
}
*/
function create () {
    this.input.mouse.disableContextMenu();
    this.add.image(this.cameras.main.width / 2,this.cameras.main.height / 2, 
    'background')
    char1 = this.physics.add.sprite(280, 250, 'char1');
    char1.setScale(0.08);
    char2 = this.physics.add.sprite(420,450,'char1')
    socket.on('update',(msg)=>{
        console.log(msg)
        char1.x = msg[1]['x']
        char1.y = msg[1]['y']
        char2.x = msg[2]['x']
        char2.y = msg[2]['y']
    })
    char1.setScale(0.08)
    char2.setScale(0.08)
}


function update () {
    /*
    const distance = Phaser.Math.Distance.Between(targetx,targety, char1.x, char1.y);

    if(distance < 3){
        char1.setVelocity(0,0)
    }

     */
    const pointer = this.input.activePointer;
    if(pointer.rightButtonDown()){
        targetx = pointer.worldX
        targety = pointer.worldY
        console.log("down")
        socket.emit("pos", {targetx,targety })
        //this.physics.moveTo(char1,pointer.worldX,pointer.worldY,240)
    }    
}
