/* Transition Objects */

import {CanvasManager} from "../CanvasManager.ts";
import {fillRoundRect, drawX} from "../shape.ts";
import {GameManager, GameState} from "../GameManager.ts";
import {Entity, EntityRequest, EntityResponse, ResponseType} from "./entity.ts";

export class TransitionIn implements Entity {

    ask(req: EntityRequest): EntityResponse {
        return {type:ResponseType.ERROR};
    };

    protected next_state : GameState;
    protected state : number;
    protected complete: number;
    protected color: string;

    coordinates: [number, number];


    step(): void {
        if (this.state < this.complete){
            this.state += 19; // speed of transition
        } else {
            GameManager.STATE = this.next_state;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.state, this.state);
    }

    constructor(end_num: number, new_game_state: GameState, color_code: string){
        this.state = 0;
        this.complete = end_num;
        this.next_state = new_game_state;
        this.color = color_code;
    }
}

export class TransitionOut extends TransitionIn {
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.state, this.state, this.complete, this.complete);
    }
}

export class TransitionOutLevelRestart extends TransitionOut {
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.complete, this.state);
    }
}

export class TransitionInLevelRestart extends TransitionIn {
    draw (ctx: CanvasRenderingContext2D): void{
        ctx.fillStyle = this.color;
        ctx.fillRect(0, this.state, this.complete, this.complete);
    }
}