import {Mob} from "../model/Mob";
import {MobsDb} from "../db/MobsDb";
import {IExtractor} from "../parser/IExtractor";
import {TextDbLoader} from "./TextDbLoader";

export class MobsDbLoader extends TextDbLoader<Mob, MobsDb> {
    constructor(file: string, parser: IExtractor<Mob>) {
        super(file, null, parser);
    }

    protected createDbInternal(data: Mob[]): MobsDb {
        return new MobsDb(data);
    }
}
