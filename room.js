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

    update() {
        let msg = {};
        for (const id in this.ids) {
            const player = this.ids[id];
            player.move();
            player.kmove();
            msg[player.number] = {
                x: player.x,
                y: player.y,
                kx: player.kx,
                ky: player.ky,
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