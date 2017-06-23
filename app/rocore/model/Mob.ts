import {IIdable} from "./IIdable";
import {Race} from "./Race";
import {Drop} from "./Drop";
import {Element} from "../model/Element";

export class Mob implements IIdable{
    public id: number;
    public sprite: string;
    public kROName: string;
    public iROName: string;
    public lv: number;
    public hp: number;
    public sp: number;
    public exp: number;
    public jexp: number;
    public atk1: number;
    public atk2: number;
    public def: number;
    public mdef: number;
    public str: number;
    public agi: number;
    public vit: number;
    public int: number;
    public dex: number;
    public luk: number;
    public range1: number;
    public range2: number;
    public range3: number;
    public scale: number;
    public race: Race;
    public element: Element;
    public mode: number;
    public speed: number;
    public aDelay: number;
    public aMotion: number;
    public dMotion: number;
    public mexp: number;
    public expPer: number;

    public drop: Drop[];

    constructor() {
        this.drop = [];
    }

    get name(): string {
        return this.iROName;
    }

    get orderedDrop(): Drop[] {
        return this.drop.sort((a, b) => { return a.percent == b.percent ? (
            a.item.name == b.item.name ? 0 : a.item.name < b.item.name ? -1 : 1
        ) : a.percent > b.percent ? -1 : 1; });
    }
}
