export class Race {
    public static Races: string[] = ['FORMLESS','UNDEAD','BRUTE','PLANT','INSECT','FISH','DEMON','DEMIHUMAN','ANGEL','DRAGON','BOSS','NONBOSS','NONDEMIHUMAN'];

    private _index: number;
    private _name: string;


    constructor(index: number) {
        this._index = index;
        this._name = Race.Races[index];
    }


    get index(): number {
        return this._index;
    }

    get name(): string {
        return this._name;
    }
}