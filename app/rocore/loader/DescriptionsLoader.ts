import {DescriptionsDb} from "../db/DescriptionsDb";
import * as fs from "fs";

export class DescriptionsLoader {
    private file: string;

    constructor(file: string) {
        this.file = file;
    }

    public async createProvider(): Promise<DescriptionsDb> {
        let data = await this.loadData();
        return new DescriptionsDb(data);
    }

    private loadData(): object {
        let me = this;
        return new Promise<object>(function(resolve, reject){
            fs.readFile(me.file, 'utf8', function(error, content) {
                if (error) {
                    reject(error);
                    return;
                }

                let lines = content.split('\n');
                let id: number;
                let description: string;
                let descriptionMap: object = {};
                let newLineRequired: boolean = false;
                for (let i=0; i<lines.length; i++) {
                    let line = lines[i];

                    if (/^[0-9]+#$/.test(line)) {
                        line = line.substring(0, line.length-1);
                        id = +(line);
                        description = "";
                        newLineRequired = false;
                    } else if (line === '#') {
                        descriptionMap[id] = description;
                    } else {
                        if (description.length > 0 && (newLineRequired || !!line.match(/\:|%|\+|\-/))) {
                            description += '<br/>';
                            newLineRequired = false;
                        }
                        description += line.replace(/\^([0-9A-Z]{6})/ig, ' <span style="color:#$1">');
                        newLineRequired = !!line.match(/\.|\:|\+|%|\]/);
                    }
                }
                resolve(descriptionMap);
            });
        });

    }
}