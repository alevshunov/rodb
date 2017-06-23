import {ItemsDb} from "../db/ItemsDb";
import {Item} from "../model/Item";
import {IExtractor} from "../parser/IExtractor";
import {TextDbLoader} from "./TextDbLoader";

export class ItemsDbLoader extends TextDbLoader<Item, ItemsDb> {
    constructor(file: string, parser: IExtractor<Item>) {
        super(file, null, parser);
    }

    protected createDbInternal(data: Item[]): ItemsDb {
        return new ItemsDb(data);
    }
}
