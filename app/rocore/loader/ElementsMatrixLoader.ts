import * as fs from "fs";
import {ElementsDb} from "../db/ElementsDb";

export class ElementsMatrixLoader {
    private file: string;

    constructor(file: string) {
        this.file = file;
    }

    public async createMatrix(): Promise<ElementsDb> {
        let me = this;
        return new Promise<ElementsDb>(function(resolve, reject) {
            fs.readFile(me.file, 'utf8', function(err, data: string) {
                if (err) {
                    reject(err);
                    return;
                }

                let lines = data.split('\n');
                let elementLevel;
                let elementIndex;
                let matrix = [[],[],[],[]];
                for (let i=0; i<lines.length; i++) {
                    let line = lines[i];
                    if (line.length === 0 || line.substring(0, 2) == '//') continue;
                    let parts = line.split(',');

                    if (parts.length == 2) {
                        elementLevel = parts[0];
                        elementIndex = 0;

                        matrix[elementLevel-1].push([]);
                    } else

                    if (parts.length >= 10) {
                        matrix[elementLevel-1][elementIndex] = [];

                        let values = parts.map(p => +(p.trim()));
                        for (let j=0; j<10; j++) {
                            matrix[elementLevel-1][elementIndex].push(values[j]);
                        }
                        elementIndex++;
                    }
                }

                let m = new ElementsDb(matrix);
                resolve(m);
            });
        });
    }
}
