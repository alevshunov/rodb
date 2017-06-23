import {IExtractor} from "./IExtractor";
import {Item} from "../model/Item";

export class ItemExtractor implements IExtractor<Item> {
    constructor() {
    }

    public extract(itemInfo): Item {
        let item = new Item();

        item.id = itemInfo["ID"];
        item.aegisName = itemInfo["AegisName"];
        item.name = itemInfo["Name"];
        item.type = itemInfo["Type"];
        item.buy = itemInfo["Buy"];
        item.sell = itemInfo["Sell"];
        item.weight = itemInfo["Weight"];
        item.atk = itemInfo["ATK"];
        item.def = itemInfo["DEF"];
        item.range = itemInfo["Range"];
        item.slots = itemInfo["Slots"];
        item.job = itemInfo["Job"];
        item.upper = itemInfo["Upper"];
        item.gender = itemInfo["Gender"];
        item.loc = itemInfo["Loc"];
        item.wLV = itemInfo["wLV"];
        item.eLV = itemInfo["eLV"];
        item.refineable = itemInfo["Refineable"];
        item.view = itemInfo["View"];
        item.script = this.adjustScript(itemInfo['{ Script }']);
        item.onEquipScript = itemInfo['{ OnEquip_Script }'];
        item.onUnequipScript = itemInfo['{ OnUnequipScript }'];

        if (item.script == '{}') { item.script = ''; }

        return item;
    }

    private adjustScript(script: string): string {
        script = script.replace(/; /g, ';\n').replace(/(\{|\}) ?/g,'$1\n');

        let parts = script.split('\n');
        let deep = 0;
        for (let i=0; i<parts.length; i++) {
            if (parts[i].indexOf('}') !== -1) {
                deep--;
            }

            for (let j=0; j<deep; j++) {
                parts[i] = '...' + parts[i];
            }

            if (parts[i].indexOf('{') !== -1) {
                deep++;
            }

        }

        return parts.join('\n');
    }
}