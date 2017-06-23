import {ElementsDb} from "./db/ElementsDb";
import {MobsDb} from "./db/MobsDb";
import {ItemsDb} from "./db/ItemsDb";
import {DescriptionsLoader} from "./loader/DescriptionsLoader";
import {ItemsDbLoader} from "./loader/ItemsDbLoader";
import {ItemExtractor} from "./parser/ItemExtractor";
import {ElementsMatrixLoader} from "./loader/ElementsMatrixLoader";
import {MobsDbLoader} from "./loader/MobsDbLoader";
import {MobExtractor} from "./parser/MobExtractor";
import {DescriptionLinker} from "./linker/DescriptionLinker";

export interface RoDb {
    readonly elements: ElementsDb;

    readonly mobs: MobsDb;

    readonly items: ItemsDb;
}

export class RoDbLoader {
    private basedir: string;

    constructor(basedir: string) {
        this.basedir = basedir;
        console.log('Core loader is set to ' + basedir + ' folder.')
    }

    public async loadDb(): Promise<RoDb> {
        let descriptions = await new DescriptionsLoader(this.basedir + 'client/idnum2itemdesctable.txt')
            .createProvider();

        let items = await new ItemsDbLoader(
                this.basedir + "server/db/item_db.txt",
                new ItemExtractor()
            ).createDb();

        let elements = await new ElementsMatrixLoader(this.basedir + 'server/db/attr_fix.txt')
            .createMatrix();

        let mobs = await new MobsDbLoader(
                this.basedir + "server/db/mob_db.txt",
                new MobExtractor(items, elements)
            ).createDb();

        new DescriptionLinker(items, descriptions).link();

        let core = new Core(elements, mobs, items);

        return core;
    }
}

class Core implements RoDb{
    private _elements: ElementsDb;
    private _mobs: MobsDb;
    private _items: ItemsDb;

    constructor(elements: ElementsDb, mobs: MobsDb, items: ItemsDb) {
        this._elements = elements;
        this._mobs = mobs;
        this._items = items;
    }

    get elements(): ElementsDb {
        return this._elements;
    }

    get mobs(): MobsDb {
        return this._mobs;
    }

    get items(): ItemsDb {
        return this._items;
    }
}