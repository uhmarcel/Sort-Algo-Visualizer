export interface SortValue {
    value: number;
    compared: boolean;
};

export interface Changes {
    index: number;
    value: number;
    compared: boolean;
};

export interface SortingAlgorithm {
    name: string;
    // complexity: string;
    sort: Function;
}

export type Playback = Changes[][];