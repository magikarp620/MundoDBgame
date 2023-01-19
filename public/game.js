const config = {
    physics: {default:"arcade"},
    type: Phaser.AUTO,
    width: 953,
    height: 720,
    scene: {
        preload: preload,
        create:create,
        update:update
    }
}
const game = new Phaser.Game(config)
let char1
let targetx = 280
let targety = 250
function preload () {
    console.log("load")
    this.load.image("background", 'images/baronpit.jpg')
    this.load.image("char1", "images/character1.webp");
}

function create () {
    this.input.mouse.disableContextMenu();
    this.add.image(this.cameras.main.width / 2,this.cameras.main.height / 2, 
    'background')
    char1 = this.physics.add.sprite(280, 250, 'char1');
    char1.setScale(0.08)
    
}

function update () {
    const distance = Phaser.Math.Distance.Between(targetx,targety, char1.x, char1.y);
    
    if(distance < 3){
        char1.setVelocity(0,0)
    }
    const pointer = this.input.activePointer;
    if(pointer.rightButtonDown()){
        targetx = pointer.worldX
        targety = pointer.worldY
        this.physics.moveTo(char1,pointer.worldX,pointer.worldY,240)
    }    
}