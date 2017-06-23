import {Mob} from "./Mob";
import {Item} from "./Item";
export class Drop {
    public mob: Mob;
    public item: Item;
    public percent: number;
    public isMvp: boolean;
    public isCard: boolean;

    constructor(mob: Mob, item: Item, percent: number) {
        this.mob = mob;
        this.item = item;
        this.percent = percent;
        this.isMvp = false;
        this.isCard = false;
    }

    public link() {
        if (!this.item || !this.mob) {
            return;
        }

        this.mob.drop.push(this);
        this.item.drop.push(this);
    }

    public toString(): string {
        return this.item.toString() + ' ' + this.mob.toString() + ' ' + this.percent;
    }
}

export class MvpDrop extends Drop {
    constructor(mob: Mob, item: Item, percent: number) {
        super(mob, item, percent);
        this.isMvp = true;
    }
}

export class CardDrop extends Drop {
    constructor(mob: Mob, item: Item, percent: number) {
        super(mob, item, percent);
        this.isCard = true;
    }
}
