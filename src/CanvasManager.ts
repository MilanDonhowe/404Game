/* Canvas Manager 
    Doubles as a sort of "game state"

*/

import {Level} from "./level_parser.ts";
import {INPUT} from "./InputManager.ts";
import {
    Block, Tile, Hole, Entity, EntityRequest, 
    RequestType, EntityResponseType, EntityResponse
} from "./entity.ts";

// Should be responsible for keeping track of all entities
/* The game-logic reolves around entities within game managers we control via messages.*/




export class CanvasManager {
    // entity pool
    private entity_pool: Entity[];

    private grid_height: number;
    private grid_width: number;


    private input_queue : INPUT[];

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    // https://kernhanda.github.io/tutorial-typescript-canvas-drawing/ -> Good Canvas Tutorial for working with typescript.
    constructor (){
        this.canvas = document.getElementById('screen') as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");
        this.entity_pool = [];
        this.input_queue = [];
    }

    load_entity_grid(lvl: Level){
        const block_size : number = 64;
        console.log(lvl);
        this.context.canvas.height = lvl.row * block_size;
        this.context.canvas.width = lvl.col * block_size;
        // add solids
        let pos : [number, number];
        if (lvl.blocks){
            for (let i=0; i < lvl.blocks.length; i++){
                pos = [lvl.blocks[i][0], lvl.blocks[i][1]];
                console.log(`Adding new block @ ${pos[0]}, ${pos[1]}`)

                this.entity_pool.push(new Block(pos));
            }
        }
        // add tiles
        for (let i = 0; i < lvl.tile_values.length; i++){
            pos = [lvl.tile_cords[i][0], lvl.tile_cords[i][1]];
            console.log(`Adding new tile @ ${pos[0]}, ${pos[1]}`)

            this.entity_pool.push(new Tile(pos, lvl.tile_values[i]));
        }
        // add holes
        if (lvl.holes){
            for (let i=0; i < lvl.holes.length; i++){
                pos = [lvl.holes[i][0], lvl.holes[i][1]];
                this.entity_pool.push(new Hole(pos));
            }
        }
        console.log("Successfully loaded level into entity pool!");
    }


    // Clears Canvas Screen.
    cls(): void{
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    // Updates each object by a tick.
    // Input can be either a direction or 
    step(inp : INPUT){
        if (inp != INPUT.NOTHING){
            console.log("Adding item to the input queue!");
            this.input_queue.push(inp);
        }
        // Then if nothing is busy we perform a new action
        if (!this.busy() && (this.input_queue.length > 0)){
            this.use_input();
        }

    }


    use_input(){
        const input : INPUT = this.input_queue.shift();
        for (let i=0; i < this.entity_pool.length; i++){
         let resp : EntityResponse = this.entity_pool[i].ask({option:RequestType.Move, dir:input});
            // maybe do something with response idk
        }

    }

    // Draws the current entity pool
    draw(){
        // clear the screen
        this.cls();
        for (let i=0; i < this.entity_pool.length; i++){
            this.entity_pool[i].draw(this.context);
        }
    }

    move(dir: INPUT){
        // move item
    }

    // Checks if any entity is currently in a process.
    busy(): boolean{
        for (let i = 0; i < this.entity_pool.length; i++){

            let entity_status : EntityResponse = this.entity_pool[i].ask({option: RequestType.Status});

            if (entity_status.type == EntityResponseType.Busy){
                return true;
            }

        }
        return false;
    }

}

// Okay, so how am I going to do collision checking for each block (to determine merges and such?)
/*
    FORGET THE ENTITY POOL, LET'S USE AN ENTITY GRID
*/

// An external function or object should be calling a event loop where the Canvas Manager step() && draw() events get called.

// DOES OBJECT EXIST @ COORDINATES? YES/NO PLEASE
//function entityAT(location: [number, number], pool: Entity[]): boolean {}