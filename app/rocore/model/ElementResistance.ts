import {Element} from "../model/Element";

export class ElementResistance {
    private _versus: Element;
    private _multiplier: number;

    constructor(versus: Element, multiplier: number) {
        this._versus = versus;
        this._multiplier = multiplier;
    }


    get versus(): Element {
        return this._versus;
    }

    get multiplier(): number {
        return this._multiplier;
    }
}