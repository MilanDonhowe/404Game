/* hole.ts */

import {Block} from "./block.ts";
import {EntityRequest, EntityResponse, EntityType, ResponseType, RequestType, BLOCK_SIZE} from "./entity.ts";
import {drawX, fillRoundRect} from "../shape.ts";

export class Hole extends Block {
    ask(req: EntityRequest): EntityResponse {
        if (req.type == RequestType.ID){
            return {type:ResponseType.ID, success_value:EntityType.HOLE};
        }
        return {type:ResponseType.ERROR};
    }
    draw(ctx: CanvasRenderingContext2D): void {
        // wait what should the holes look like? Xs?
        fillRoundRect(ctx, this.coordinates[0], this.coordinates[1], BLOCK_SIZE, BLOCK_SIZE, "#111111");
        // draw X
        drawX(ctx, "#FEFEFE", this.coordinates[0], this.coordinates[1], BLOCK_SIZE);
    }
}
