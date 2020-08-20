/* 
Filename: entity.ts 
Author: Milan
Desc: Object Oriented Badness, my attempt to implement somewhat polymorphic
      types using what very little I understand of TypeScript's systems
      and probably misuing interfaces.

*/
import {INPUT} from "./InputManager.ts";


function entityAT(location: [number, number], pool: Entity[]): boolean{
    let x = location[0];
    let y = location[1];
    // TODO: 
    return false;
}

export enum RequestType {
    Move,   // asking entity to move.
    Merge,  // asking entity to change
    Status, // asking if entity is busy,
    ID      // Asking for the entity's type
};


export enum EntityType {
    BLOCK = 0,
    TILE = 1,
    HOLE = 2
};

export interface EntityRequest {
    readonly option: RequestType;
    readonly dir?: INPUT;
    readonly add?: number;
};

export enum EntityResponseType {
    Busy,
    Free,
    Success,
    ERROR,
    ID
};

export interface EntityResponse {
    readonly type: EntityResponseType;
    success_value?: number;
}



export interface Entity {
    ask(req: EntityRequest): EntityResponse;
    draw(ctx : CanvasRenderingContext2D): void;
    coordinates: [number, number];
}


export class Block implements Entity {
    ask(req: EntityRequest): EntityResponse {
        if (req.option == RequestType.ID){
            return {type:EntityResponseType.ID, success_value: EntityType.BLOCK};
        }
       
        return {type:EntityResponseType.ERROR};
    }
    coordinates: [number, number];
    x: number; y: number;
    constructor(pos : [number, number]){
        this.coordinates = [this.x=pos[0]*64, this.y=pos[1]*64];
    }
    draw(ctx : CanvasRenderingContext2D): void {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(this.x, this.y, 64, 64);
    };
}

export class Tile extends Block {

    ask(req: EntityRequest): EntityResponse {
        switch (req.option){
            case RequestType.Move:
                return {type:EntityResponseType.Success};
                break;
            case RequestType.Merge:
                this.score += req.add;
                break;
            case RequestType.Status:
                if (this.moving){
                    return {type:EntityResponseType.Busy};
                } else {
                    return {type:EntityResponseType.Free};
                }
                break;   
            case RequestType.ID:
                return {type:EntityResponseType.ID, success_value:EntityType.TILE};
                break;
        }
        return {type:EntityResponseType.ERROR};
    }

    score: number;
    moving: boolean;

    draw(ctx: CanvasRenderingContext2D): void {
        //console.log("This entity drawing rectangle")
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.coordinates[0], this.coordinates[1], 64, 64);
    }

    constructor(pos : [number, number], points: number){
        super(pos);
        this.score = points;
        this.moving = true; // TODO: CHANGE FOR INPUT MOVEMENT TO WORK!IMPORTANT!
    }

    Move(dir: INPUT, mag: number){

    }
}

export class Hole extends Block {
    ask(req: EntityRequest): EntityResponse {
        if (req.option == RequestType.ID){
            return {type:EntityResponseType.ID, success_value:EntityType.HOLE};
        }
        return {type:EntityResponseType.ERROR};
    }
}


function roundSquare(ctx:CanvasRenderingContext2D,  x: number, y: number, w: number, h: number){
    
    ctx.beginPath();

    //top-left corner
    ctx.moveTo(x, y+10);
    ctx.quadraticCurveTo(x, y, x+10, y);

    ctx.lineTo(x+w-10, y);
    //top-right corner
    ctx.quadraticCurveTo(x+w, y, x+w, y-10);

    ctx.lineTo(x+w, y+h-10);
    //bottom-right corner
    ctx.quadraticCurveTo(x+w, y+h, x+w-10, y+h);

    //bottom-left corner
    ctx.moveTo(x-10, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-10);

    ctx.closePath();

    ctx.stroke();

}

function fillRoundSquare(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, style: string){
    roundSquare(ctx, x, y, w, h);
    ctx.fillStyle = style;
    ctx.fill();
}