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
let targetX;
let targetY;
let socket = io()

function preload () {
    console.log("load")
    this.load.image("background", 'images/baronpit.jpg')
    this.load.image("char1", "images/character1.webp")
    this.load.image("knife", "images/knife.png")
}

function create () {
    this.input.mouse.disableContextMenu();
    this.add.image(this.cameras.main.width / 2,this.cameras.main.height / 2, 
    'background')
    char1 = this.physics.add.sprite(280, 250, 'char1');
    knife1 = this.physics.add.sprite(0,0,'knife');
    knife2 = this.physics.add.sprite(0,0,'knife');
    knife1.setActive(false);
    knife1.setVisible(false);
    knife1.setScale(0.7);
    knife2.setActive(false);
    knife2.setVisible(false);
    char1.setScale(0.08);
    let char2 = this.physics.add.sprite(420, 450, 'char1')
    socket.on('update',(msg)=>{
        char1.x = msg[1]['x']
        char1.y = msg[1]['y']
        if(2 in msg) {
            char2.x = msg[2]['x']
            char2.y = msg[2]['y']
    
        }
    })
    socket.on('kupdate', (kang) =>{
        knife1.x = kang[1]['kx']
        knife1.y = kang[1]['ky']
        if(2 in msg) {
            knife2.x = kang[2]['kx']
            knife2.y = kang[2]['ky']
        }
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
        targetX = pointer.worldX
        targetY = pointer.worldY
        socket.emit("pos", {targetX,targetY})
        //this.physics.moveTo(char1,pointer.worldX,pointer.worldY,240)
    }    

    this.input.keyboard.on('keydown-Q', ()=>{
        ktargetx = pointer.worldX;
        ktargety = pointer.worldY;
        const moveX = ktargetx - char1.x;
        const moveY = ktargety - char1.y;
        const angle = Math.atan2(moveY,moveX)
        // Calculate the direction from the object to the pointer
        socket.emit("kpos1", {angle});
        // Set the object's direction to the pointer direction
    });
       
    
}
