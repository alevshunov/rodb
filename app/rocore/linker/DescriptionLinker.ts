import {DescriptionsDb} from "../db/DescriptionsDb";
import {ItemsDb} from "../db/ItemsDb";

export class DescriptionLinker {
    private items: ItemsDb;
    private descriptions: DescriptionsDb;

    constructor(items: ItemsDb, descriptions: DescriptionsDb) {
        this.items = items;
        this.descriptions = descriptions;
    }

    public link() {
        let items = this.items.getAll();

        for (let i=0; i<items.length; i++) {
            let item = items[i];
            item.description = this.descriptions.getById(item.id);
        }
    }
}