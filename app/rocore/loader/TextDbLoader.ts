import {TextLoader} from "./TextLoader";
import {Db} from "../db/Db";
import {IIdable} from "../model/IIdable";
import {IExtractor} from "../parser/IExtractor";

export abstract class TextDbLoader<T extends IIdable, TDb extends Db<T>> {
    private file: string;
    private format: string;
    private parser: IExtractor<T>;

    constructor(file:string, format: string, parser: IExtractor<T>) {
        this.file = file;
        this.format = format;
        this.parser = parser;
    }

    public async createDb(): Promise<TDb> {
        let data = await this.loadData();
        let db = this.createDbInternal(data);

        return db;
    }

    protected async loadData(): Promise<T[]> {
        let data: T[] = [];
        let textDb = new TextLoader(this.file, this.format);
        let rawData = await textDb.load();

        for (let i = 0; i < rawData.length; i++) {
            let item = await this.parse(rawData[i]);
            data.push(item);
        }

        return data;
    }

    protected async parse(item:object): Promise<T> {
        return this.parser.extract(item);
    }

    protected abstract createDbInternal(data:T[]): TDb;
}
