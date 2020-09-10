// splash.ts

import {Entity, EntityType, EntityRequest, EntityResponse, ResponseType, RequestType} from "./entity.ts";
import {drawPixelFont} from "../shape.ts";

export class Splash implements Entity {
    coordinates: [number, number];
    size_fluctuation: number;
    size_limit: number;
    block_num: number;
    delta: number;

    constructor(size: number, block_size: number){
        this.coordinates = [-1, -1];
        //this.size_fluctuation = 0;
        this.size_limit = size;
        this.block_num = block_size;
        this.delta = 1;
    }

    step(): void {
        this.delta++;
        if (this.delta > 360){
            this.delta = 0;
        }
    }

    ask(req: EntityRequest): EntityResponse {
        if (req.type == RequestType.Move){
            /* Do Transition */
        }
        return {type:ResponseType.ERROR};
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 800, 600);
        drawPixelFont(ctx, "404:", 10, 100, this.block_num, "#FEFEFE");
        drawPixelFont(ctx, "a puzzle game", 160, 120, (this.block_num/2)+(1*Math.sin(Math.PI*(this.delta/180))), "#acf990");
    }
}