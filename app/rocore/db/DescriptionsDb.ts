export class DescriptionsDb {
    private descriptionMap: Object;

    constructor(descriptionMap: object) {
        this.descriptionMap = descriptionMap;
    }

    public getById(id): string {
        return this.descriptionMap[id] || '';
    }
}