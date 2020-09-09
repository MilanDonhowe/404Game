// Block.ts

import {fillRoundRect} from "../shape.ts";
import {GameManager, GameState} from "../GameManager.ts";
import {Entity, BLOCK_SIZE, RequestType, ResponseType, EntityResponse, EntityRequest, EntityType} from "./entity.ts";

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
        fillRoundRect(ctx, this.coordinates[0], this.coordinates[1], BLOCK_SIZE, BLOCK_SIZE, "#9b9b9b");
    };
    step():void{};
}

