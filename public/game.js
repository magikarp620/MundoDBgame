const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: {
        preload: preload,
        create:create,
        update:update
    }
}
const game = new Phaser.Game(config)

function preload () {
    console.log("load")
    this.load.image("background", 'images/baronpit.jpg')
}

function create () {
    this.add.image(0,0, 'background')
}

function update () {

}