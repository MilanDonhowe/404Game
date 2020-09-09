/* 
Filename: entity.ts 
Author: Milan
Desc: Object Oriented Badness, my attempt to implement somewhat polymorphic
      types using what very little I understand of TypeScript's systems
      and probably misuing interfaces.

*/

import {INPUT} from "../InputManager.ts";

interface ColorMap {
    [index: number]: string;
}

export const BLOCK_SIZE : number = 64;

export const colors : ColorMap = {
    404:"#f7be54", //orange
    202:"#f76c54", //red
    101:"#54b3f7", //light-blue
    50.5:"#e284f9", //magenta
    25.25: "#def754"//yellow
}


export enum RequestType {
    Move,   // asking entity to move.
    Merge,  // asking entity to change
    Status, // asking if entity is busy,
    ID,      // Asking for the entity's type
    Points
};

export enum EntityType {
    BLOCK = 0,
    TILE = 1,
    HOLE = 2
};

export interface EntityRequest {
    readonly type: RequestType;
    readonly dir?: INPUT;
    readonly add?: number;
};

export enum ResponseType {
    Busy,
    Free,
    Success,
    ERROR,
    ID
};

export interface EntityResponse {
    readonly type: ResponseType;
    success_value?: number;
}



export interface Entity {
    ask(req: EntityRequest): EntityResponse;
    draw(ctx : CanvasRenderingContext2D): void;
    step(): void;
    coordinates: [number, number];
}



