/* 
Filename: entity.ts 
Author: Milan
Desc: Object Oriented Badness, my attempt to implement somewhat polymorphic
      types using what very little I understand of TypeScript's systems
      and probably misuing interfaces.

*/
import {INPUT} from "./InputManager.ts";
import {CanvasManager} from "./CanvasManager.ts";
import {fillRoundRect, drawPixelNumbers} from "./shape.ts";
import {GameManager, GameState} from "./GameManager.ts";

interface ColorMap {
    [index: number]: string;
}

const colors : ColorMap = {
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


export class Block implements Entity {
    ask(req: EntityRequest): EntityResponse {
        if (req.type == RequestType.ID){
            return {type:ResponseType.ID, success_value: EntityType.BLOCK};
        }
       
        return {type:ResponseType.ERROR};
    }
    coordinates: [number, number];
    constructor(pos : [number, number]){
        this.coordinates = [pos[0]*64, pos[1]*64];
    }
    draw(ctx : CanvasRenderingContext2D): void {
        fillRoundRect(ctx, this.coordinates[0], this.coordinates[1], 64, 64, "#9b9b9b");
        //ctx.fillStyle = "#FFFFFF";
        //ctx.fillRect(this.x, this.y, 64, 64);
    };
    step():void{};
}

export class Tile extends Block {

    ask(req: EntityRequest): EntityResponse {
        switch (req.type){
            case RequestType.Move:
                this.moving = true;
                this.dir = req.dir;
                return {type:ResponseType.Success};
                break;
            case RequestType.Merge:
                this.score += req.add;
                break;
            case RequestType.Status:
                if (this.moving){
                    return {type:ResponseType.Busy};
                } else {
                    return {type:ResponseType.Free};
                }
                break;   
            case RequestType.ID:
                return {type:ResponseType.ID, success_value:EntityType.TILE};
                break;
            case RequestType.Points:
                return {type:ResponseType.Success, success_value:this.score};
                break;
        }
        return {type:ResponseType.ERROR};
    }

    score: number;
    moving: boolean;
    dir: INPUT;
    static magnitude: number = 8;

    draw(ctx: CanvasRenderingContext2D): void {
        fillRoundRect(ctx, this.coordinates[0], this.coordinates[1], 64, 64, colors[this.score]);
        const p_size = 3;
        drawPixelNumbers(ctx, String(this.score), this.coordinates[0]+14, this.coordinates[1]+24, p_size);
    }

    constructor(pos : [number, number], points: number){
        super(pos);
        this.score = points;
        this.moving = false;
        this.dir = INPUT.NOTHING;
    }


    step():void {
        if (this.moving && this.dir != INPUT.NOTHING){
            let new_pos : [number, number] = [this.coordinates[0], this.coordinates[1]];
            let possible_entity_pos : [number, number] = [new_pos[0], new_pos[1]];
            switch(this.dir){
                case INPUT.UP:
                    new_pos[1] -= Tile.magnitude;
                    possible_entity_pos[1] -= 64;
                    break;
                case INPUT.DOWN:
                    new_pos[1] += Tile.magnitude;
                    possible_entity_pos[1] += 64;
                    break;
                case INPUT.LEFT:
                    new_pos[0] -= Tile.magnitude;
                    possible_entity_pos[0] -= 64;
                    break;
                case INPUT.RIGHT:
                    new_pos[0] += Tile.magnitude;
                    possible_entity_pos[0] += 64;
                    break;
            }

            /*
            if (CanvasManager.checkBorderCollision(new_pos)){
                this.moving = false;
                this.dir = INPUT.NOTHING;
            }
            */
            

            // check map collision
            let status = [-1, -1];
            
            if (CanvasManager.checkBorderCollision(new_pos)){
                status[0] = 1;
            } else {
                status = this.check_entity_collisions(possible_entity_pos);
            }
            
            switch(status[0]){
                case 1://BLOCK (or border collision)
                    this.moving = false;
                    this.dir = INPUT.NOTHING;
                    break;
                case 2://HOLE
                    // TODO: collision with hole
                    break;
                case 3://TILE w/ SAME SCORE
                    this.score *= 2;
                    CanvasManager.delAt(status[1]);
                    console.log(`this.score = ${this.score}`);
                    break;
                case 4: // No collision
                    this.coordinates = new_pos;
                    break;
            }
            

        }
    }

    // returns numeric tuple [return_code, ?entity_index]
    check_entity_collisions(cords: [number, number]): [number, number] {

        let e_index : number = CanvasManager.entityAt(cords[0], cords[1]);
        if (e_index == -1) return [4, -1]; 

        let e_type : EntityType = CanvasManager.entity_pool[e_index].ask({type:RequestType.ID}).success_value;


        let return_tuple : [number, number] = [4, e_index];

        switch(e_type){
            case EntityType.BLOCK:
                return_tuple[0] = 1;
                break;
            case EntityType.HOLE:
                return_tuple[0] = 2;
                break;
            case EntityType.TILE:
                let e_value : number = CanvasManager.entity_pool[e_index].ask({type:RequestType.Points}).success_value;
                return_tuple[0] = (e_value == this.score) ? 3 : 1;
        }

        return return_tuple;
    }

}

export class Hole extends Block {
    ask(req: EntityRequest): EntityResponse {
        if (req.type == RequestType.ID){
            return {type:ResponseType.ID, success_value:EntityType.HOLE};
        }
        return {type:ResponseType.ERROR};
    }
}



/* Transition Objects */

export class TransitionBegin implements Entity {
    ask(req: EntityRequest): EntityResponse {
        return {type:ResponseType.ERROR};
    };
    draw(ctx : CanvasRenderingContext2D): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, this.state, this.state);
    };
    step(): void {
        if (this.state < this.complete){
            this.state += 24;
        } else {
            // DO TRANSITION
            GameManager.STATE = GameState.LEVEL_TRANSITION_LOAD_1;
        }
    };
    coordinates: [number, number];

    state: number;
    complete: number;

    constructor(diagonal: number){
        this.state = 0;
        this.complete = diagonal;
        this.coordinates = [0, 0];
    }
}

export class TransitionEnd extends TransitionBegin {
    step(): void {
        if (this.complete > this.state){
            this.complete -= 24;
        } else {
            GameManager.STATE = GameState.LEVEL_TRANSITION_END;
        }
    };

    draw(ctx : CanvasRenderingContext2D): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, this.complete, this.complete);
    };
}