export class LookupResult<T> {
    private _result: T[];
    private _hasMore: boolean;


    constructor(result: T[], hasMore: boolean) {
        this._result = result;
        this._hasMore = hasMore;
    }


    get result(): T[] {
        return this._result;
    }

    get hasMore(): boolean {
        return this._hasMore;
    }
}