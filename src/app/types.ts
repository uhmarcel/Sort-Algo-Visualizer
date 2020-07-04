export interface SortValue {
    value: number;
    compared: boolean;
};

export interface Changes {
    index: number;
    value: number;
    compared: boolean;
};

export interface RecordableSort {
    name: string;
    sort: Function;
}