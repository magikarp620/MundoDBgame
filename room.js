const p = require("./player.js");

class Room {
    ids = {};
    #size;

    constructor() {
        this.#size = 0;
    }

    numPlayers() {
        return this.#size;
    }

    //returns true if within range
    knifeHit(knife, player) {
        return (
            Math.pow(knife.ky - player.y, 2) +
            Math.pow(knife.kx - player.x, 2) <
            800
        );
    }

    update() {
        let msg = {};
        const playerKeys = Object.keys(this.ids);
        for (const id in this.ids) {
            const player = this.ids[id];
            if (playerKeys.length === 2) {
                if (id === playerKeys[0]) {
                    //check distance of opponent's knife
                    if (this.knifeHit(this.ids[playerKeys[1]], player)) {
                        player.hp -= 0.25;
                        console.log("hit");
                    }
                } else {
                    if (this.knifeHit(this.ids[playerKeys[1]], player)) {
                        player.hp -= 0.25;
                        console.log("hit");
                    }
                }
            }
            player.move();
            player.kmove();
            msg[player.number] = {
                x: player.x,
                y: player.y,
                kx: player.kx,
                ky: player.ky,
                hp: player.hp,
            };
        }
        return msg;
    }

    addPlayer(id) {
        if (this.numPlayers() === 0) {
            this.ids[id] = new p.Player(250, 250, 1);
            this.#size += 1;
            return true;
        }
        if (this.numPlayers() === 1) {
            this.ids[id] = new p.Player(450, 450, 2);
            this.#size += 1;
            return true;
        } else {
            return false;
        }
    }

    removePlayer(id) {
        if (id in this.ids) {
            delete this.ids[id];
            this.#size -= 1;
        }
    }
}

module.exports = {Room};
