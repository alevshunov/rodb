import {IExtractor} from "./IExtractor";
import {ItemsDb} from "../db/ItemsDb";
import {ElementsDb} from "../db/ElementsDb";
import {Mob} from "../model/Mob";
import {MvpDrop, CardDrop, Drop} from "../model/Drop";
import {Race} from "../model/Race";
import {Element} from "../model/Element";

export class MobExtractor implements IExtractor<Mob> {
    private itemsDb: ItemsDb;
    private elementMatrix: ElementsDb;

    public constructor(itemsDb: ItemsDb, elementMatrix: ElementsDb) {
        this.itemsDb = itemsDb;
        this.elementMatrix = elementMatrix;
    }

    public extract(mobInfo): Mob {
        let mob = new Mob();

        mob.id = mobInfo["ID"];
        mob.sprite = mobInfo["Sprite_Name"];
        mob.kROName = mobInfo["kROName"];
        mob.iROName = mobInfo["iROName"];
        mob.lv = mobInfo["LV"];
        mob.hp = mobInfo["HP"];
        mob.sp = mobInfo["SP"];
        mob.exp = mobInfo["EXP"];
        mob.jexp = mobInfo["JEXP"];
        mob.range1 = mobInfo["Range1"];
        mob.atk1 = mobInfo["ATK1"];
        mob.atk2 = mobInfo["ATK2"];
        mob.def = mobInfo["DEF"];
        mob.mdef = mobInfo["MDEF"];
        mob.str = mobInfo["STR"];
        mob.agi = mobInfo["AGI"];
        mob.vit = mobInfo["VIT"];
        mob.int = mobInfo["INT"];
        mob.dex = mobInfo["DEX"];
        mob.luk = mobInfo["LUK"];
        mob.range2 = mobInfo["Range2"];
        mob.range3 = mobInfo["Range3"];
        mob.scale = mobInfo["Scale"];
        mob.race = new Race(mobInfo["Race"]);
        mob.element = this.elementMatrix.getElement(Math.round(mobInfo["Element"]/20), mobInfo["Element"]%10);
        mob.mode = mobInfo["Mode"];
        mob.speed = mobInfo["Speed"];
        mob.aDelay = mobInfo["aDelay"];
        mob.aMotion = mobInfo["aMotion"];
        mob.dMotion = mobInfo["dMotion"];
        mob.mexp = mobInfo["MEXP"];
        mob.expPer = mobInfo["ExpPer"];

        new MvpDrop(mob, this.itemsDb.getById(mobInfo["Mvp1id"]), mobInfo["MVP1per"]/100).link();
        new MvpDrop(mob, this.itemsDb.getById(mobInfo["MVP2id"]), mobInfo["MVP2per"]/100).link();
        new MvpDrop(mob, this.itemsDb.getById(mobInfo["MVP3id"]), mobInfo["MVP3per"]/100).link();
        new Drop(mob, this.itemsDb.getById(mobInfo["Drop1id"]), mobInfo["Drop1per"]/100).link();
        new Drop(mob, this.itemsDb.getById(mobInfo["Drop2id"]), mobInfo["Drop2per"]/100).link();
        new Drop(mob, this.itemsDb.getById(mobInfo["Drop3id"]), mobInfo["Drop3per"]/100).link();
        new Drop(mob, this.itemsDb.getById(mobInfo["Drop4id"]), mobInfo["Drop4per"]/100).link();
        new Drop(mob, this.itemsDb.getById(mobInfo["Drop5id"]), mobInfo["Drop5per"]/100).link();
        new Drop(mob, this.itemsDb.getById(mobInfo["Drop6id"]), mobInfo["Drop6per"]/100).link();
        new Drop(mob, this.itemsDb.getById(mobInfo["Drop7id"]), mobInfo["Drop7per"]/100).link();
        new Drop(mob, this.itemsDb.getById(mobInfo["Drop8id"]), mobInfo["Drop8per"]/100).link();
        new Drop(mob, this.itemsDb.getById(mobInfo["Drop9id"]), mobInfo["Drop9per"]/100).link();
        new CardDrop(mob, this.itemsDb.getById(mobInfo["DropCardid"]), mobInfo["DropCardper"]/100).link();

        return mob;
    }
}
