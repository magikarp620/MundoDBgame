class HpBar {
    constructor(scene, x, y, color) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.value = 1.0;
        this.color = color;
        scene.add.existing(this.bar);
    }

    draw() {
        this.bar.clear();
        this.bar.fillStyle(0x999999);
        this.bar.fillRect(this.x, this.y, 150, 12);

        this.bar.fillStyle(this.color);
        this.bar.fillRect(this.x, this.y, 150 * this.value, 12);
    }
}

export {HpBar}