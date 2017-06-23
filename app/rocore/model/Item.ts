import {IIdable} from "./IIdable";
import {Drop} from "./Drop";

export class Item implements IIdable {
    public id: number;
    public aegisName: string;
    public name: string;
    public type: number;
    public buy: number;
    public sell: number;
    public weight: number;
    public atk: number;
    public def: number;
    public range: number;
    public slots: number;
    public job: number;
    public upper: number;
    public gender: number;
    public loc: number;
    public wLV: number;
    public eLV: number;
    public refineable: number;
    public view: number;
    public script: string;
    public onEquipScript: string;
    public onUnequipScript: string;
    public description: string;

    public drop: Drop[];

    constructor() {
        this.drop = [];
    }

    get orderedDrop(): Drop[] {
        return this.drop.sort((a, b) => { return a.percent == b.percent ? (
            a.mob.name == b.mob.name ? 0 : a.mob.name < b.mob.name ? -1 : 1
        ) : a.percent > b.percent ? -1 : 1; });
    }

    public get fullName(): string {
        return this.name + (this.slots > 0 ? ' [' + this.slots + ']': '');
    }

    public get urlName(): string {
        return this.fullName.toString().replace(/ /g, '_');
    }
}
