import {Db} from "./Db";
import {Mob} from "../model/Mob";

export class MobsDb extends Db<Mob> {
    constructor(data) {
        super(data.filter(m => m.drop.length > 0), ['id', 'kROName', 'iROName', 'sprite']);
    }
}