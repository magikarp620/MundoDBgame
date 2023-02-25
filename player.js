const MOVE_SPEED = 15;
class Player{
    x;

    y;
    target;
    number;
    constructor(x,y,number) {
        this.number = number
        this.x = x
        this.y = y
        this.target = {'targetX':x,'targetY':y}
    }

    move(){

        const moveX = this.target['targetX'] - this.x;
        const moveY = this.target['targetY'] - this.y;
        let speed = Math.min(Math.sqrt(moveX*moveX + moveY*moveY),MOVE_SPEED)
        const angle = Math.atan2(moveY,moveX)
        this.x += speed*Math.cos(angle)
        this.y += speed*Math.sin(angle)

    }
}
module.exports = {Player}
