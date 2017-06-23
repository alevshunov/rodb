import {ElementResistance} from "../model/ElementResistance";
import {Element} from "../model/Element";

export class ElementsDb {
    private matrix: number[][][];
    private elements: Element[][];

    constructor(data: number[][][]) {
        this.matrix = data;

        this.elements = [];
        for (let level=1; level<=4; level++) {
            this.elements.push([]);
            for (let index = 0; index < 10; index++) {
                let el = new Element(index, level);
                this.elements[level-1].push(el);
            }
        }

        for (let level=1; level<=4; level++) {
            this.elements.push([]);
            for (let index = 0; index < 10; index++) {
                let el = this.getElement(level, index);
                for (let against=0; against<10; against++) {
                    let ae = this.getElement(level, against);
                    let mult = new ElementResistance(ae, this.matrix[level-1][against][index]);
                    el.resistance.push(mult);
                }
            }
        }

    }

    getElement(level: number, index: number): Element {
        return this.elements[level-1][index];
    }
}