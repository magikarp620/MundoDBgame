const MOVE_SPEED = 15;
const MAX_HP = 100;
const Q_DMG = 10;
class Player{
    x;
    y;
    kx;
    ky;
    kangle;
    target;
    ktarget;
    number;


    constructor(x,y,number) {
        this.number = number;
        this.x = x;
        this.y = y;
        this.hp = MAX_HP;
        this.target = {'targetX':x,'targetY':y};
        this.kx = x
        this.ky = y
    }

    move(){

        const moveX = this.target['targetX'] - this.x;
        const moveY = this.target['targetY'] - this.y;
        let speed = Math.min(Math.sqrt(moveX*moveX + moveY*moveY),MOVE_SPEED)
        const angle = Math.atan2(moveY,moveX)
        this.x += speed*Math.cos(angle)
        this.y += speed*Math.sin(angle)

    }

    kmove(kangle){
        const speed = 30;
        this.kx += speed*Math.cos(kangle);
        this.ky += speed*Math.sin(kangle);
    }
}
module.exports = {Player}

