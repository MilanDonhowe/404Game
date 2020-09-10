/* Tile Object class */

import {INPUT} from "../InputManager.ts";
import {CanvasManager} from "../CanvasManager.ts";
import {fillRoundRect, drawPixelFont, drawX} from "../shape.ts";
import {GameManager, GameState} from "../GameManager.ts";
import {Block} from "./block.ts";
import {EntityRequest, EntityResponse, EntityType, RequestType, ResponseType, BLOCK_SIZE, colors} from "./entity.ts";

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
        fillRoundRect(ctx, this.coordinates[0], this.coordinates[1], BLOCK_SIZE, BLOCK_SIZE, colors[this.score]);
        const p_size = 3;
        drawPixelFont(ctx, String(this.score), this.coordinates[0]+14, this.coordinates[1]+24, p_size);
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
                    possible_entity_pos[1] -= BLOCK_SIZE;
                    break;
                case INPUT.DOWN:
                    new_pos[1] += Tile.magnitude;
                    possible_entity_pos[1] += BLOCK_SIZE;
                    break;
                case INPUT.LEFT:
                    new_pos[0] -= Tile.magnitude;
                    possible_entity_pos[0] -= BLOCK_SIZE;
                    break;
                case INPUT.RIGHT:
                    new_pos[0] += Tile.magnitude;
                    possible_entity_pos[0] += BLOCK_SIZE;
                    break;
            }

            // check map collision
            let status = [-1, -1];
            
            if (CanvasManager.checkBorderCollision(new_pos)){
                status[0] = 1;
            } else {
                status = this.check_entity_collisions(possible_entity_pos);
            }
            
            /* COLLISION CHECKING FOR TILE OBJECTS */
            switch(status[0]){
                case 1://BLOCK (or border collision)
                    this.moving = false;
                    this.dir = INPUT.NOTHING;
                    break;
                case 2://HOLE
                    /* IMPORTANT THIS CODE SHOULD MODIFY GAME MANAGER FOR THE LEVEL RESTART */
                    GameManager.STATE = GameState.LEVEL_LOSS;
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