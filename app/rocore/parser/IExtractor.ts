export interface IExtractor<T> {
    extract(item: object): T;
}