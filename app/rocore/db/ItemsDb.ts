import {Db} from "./Db";
import {Item} from "../model/Item";

export class ItemsDb extends Db<Item> {
    constructor(data) {
        super(data, ['id', 'name']);
    }
}