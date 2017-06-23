import {LookupResult} from "./utils/LookupResult";
import {IIdable} from "../model/IIdable";

export abstract class Db<T extends IIdable> {
    protected data: T[];
    protected dataMap: object;
    private lookupFields: string[];

    constructor(data: T[], lookupFields: string[]) {
        this.lookupFields = lookupFields;
        this.data = data;
        this.dataMap = {};

        for (let i=0; i<data.length; i++) {
            this.dataMap[data[i].id] = data[i];
        }
    }

    public lookup(term: string, max: number = 20): LookupResult<T> {
        term = term || '';

        if (term == '') { return new LookupResult<T>([], false); }

        let matched:T[] = [];

        let lowerTerm = term.toLowerCase();
        let hasMore:boolean = false;

        for (let i=0; i<this.data.length; i++) {
            let m = this.data[i];
            let match = false;

            for (let j=0; j<this.lookupFields.length; j++) {
                let target = m[this.lookupFields[j]];
                if (typeof target !== 'string') target = target.toString();

                if (target.toLowerCase().indexOf(lowerTerm) !== -1) {
                    match = true;
                    break;
                }
            }

            if (match) {
                if (matched.length === max) {
                    hasMore = true;
                    break;
                }

                if (matched.length < max) {
                    matched.push(m);
                }

            }
        }

        return new LookupResult(matched, hasMore);
    };

    public getById(id: number): T {
        return this.dataMap[id];
    };

    public getAll(): T[] {
        return this.data;
    }
}
