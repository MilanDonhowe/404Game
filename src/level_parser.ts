// FUCK PARSING

export interface Level {
    readonly row: number;
    readonly col: number;
    readonly tile_values: number[];
    readonly tile_cords: number[][];
    readonly blocks?: number[][];
    readonly holes?: number[][];
}
