class Player{
    x;
    y;
    target;
    number;
    constructor(x,y,number) {
        this.number = number
        this.x = x
        this.y = y
        this.target = {'targetx':x,'targety':y}
    }

    move(speed){

        const moveX = this.target['targetx'] - this.x;
        const moveY = this.target['targety'] - this.y;

        speed = Math.min(Math.sqrt(moveX*moveX + moveY*moveY),speed)
        const angle = Math.atan2(moveY,moveX)
        this.x += speed*Math.cos(angle)
        this.y += speed*Math.sin(angle)
    }
}
module.exports = {Player}