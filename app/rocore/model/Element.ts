import {ElementResistance} from "./ElementResistance";
export class Element {
    public static ElementNames = ['Neutral', 'Water', 'Earth', 'Fire', 'Wind', 'Poison', 'Holy', 'Shadow', 'Ghost', 'Undead'];

    private _index: number;
    private _level: number;
    private _name: string;
    private _resistance: ElementResistance[];

    constructor(index: number, leve:number) {
        this._index = index;
        this._level = leve;
        this._name = Element.ElementNames[index];
        this._resistance = [];
    }


    get index(): number {
        return this._index;
    }

    get level(): number {
        return this._level;
    }

    get name(): string {
        return this._name;
    }

    get resistance(): ElementResistance[] {
        return this._resistance;
    }
}
