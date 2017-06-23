import * as fs from "fs";

export class TextLoader {
    private file: string;
    private format? : string;


    constructor(file: string, format?: string) {
        this.file = file;
        this.format = format;
    }

    public async load(): Promise<any> {
        let me = this;
        return new Promise(function(resolve, reject) {
            fs.readFile(me.file, 'utf8', function(err, data: string) {
                if (err) {
                    // throw err;
                    reject(err);
                    return;
                }

                let lines = data.split('\n');
                let format = me.format || me.lookupFormat(lines);
                let parts = format.split(',');

                let items = [];

                for (let i=0; i<lines.length; i++) {
                    let line = lines[i];
                    if (line.length === 0 || line.substring(0, 2) === '//') continue;

                    let item = me.parseLine(line, parts);
                    items.push(item);
                }

                resolve(items);
            })
        });
    }

    private lookupFormat(lines: string[]): string {
        if (lines.length < 4) return "";
        return lines[3].substring(3);
    }

    private parseLine(line: string, parts: string[]): object {
        let items = this.split(line);
        let data = {};
        for (let i=0; i<parts.length; i++) {
            if (/^((0x[0-9A-Fa-f]+)|([0-9]+))$/.test(items[i])) {
                data[parts[i]] = +(items[i]);
            } else {
                data[parts[i]] = items[i];
            }
        }

        return data;
    }

    private split(line: string): string[] {
        line += ",";

        let part = "";
        let parts = [];
        let index = 0;
        let inside = false;
        let deepLevel = 0;

        while (index < line.length) {
            if (line[index] === ',' && !inside) {
                parts.push(part);
                part = "";
            } else {
                part += line[index];
                switch (line[index]) {
                    case '{':
                        deepLevel++;
                        inside = true;
                        break;
                    case '}':
                        deepLevel--;
                        inside = deepLevel > 0;
                        break;
                }
            }

            index++;
        }

        return parts;
    }
}