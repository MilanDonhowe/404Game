/* Canvas Manager 
    Doubles as a sort of "game state"

*/

import {Level} from "./level_parser.ts";
import {INPUT} from "./InputManager.ts";
import {
    Block, Tile, Hole, Entity, EntityRequest, 
    RequestType, ResponseType, EntityResponse,
    EntityType
} from "./entity.ts";

// Should be responsible for keeping track of all entities
/* The game-logic reolves around entities within game managers we control via messages.*/



export class CanvasManager {
    // entity pool
    static entity_pool: Entity[];


    static step_entities : boolean = true;
    private input_queue : INPUT[];

    static canvas: HTMLCanvasElement;
    static context: CanvasRenderingContext2D;

    // https://kernhanda.github.io/tutorial-typescript-canvas-drawing/ -> Good Canvas Tutorial for working with typescript.
    constructor (){
        CanvasManager.canvas = document.getElementById('screen') as HTMLCanvasElement;
        CanvasManager.context = CanvasManager.canvas.getContext("2d");
        CanvasManager.entity_pool = [];
        this.input_queue = [];
    }



    static load_entity_grid(lvl: Level){
        const block_size : number = 64;
        console.log(lvl);
        CanvasManager.context.canvas.height = lvl.row * block_size;
        CanvasManager.context.canvas.width = lvl.col * block_size;
        
        // add solids
        let pos : [number, number];
        if (lvl.blocks){
            for (let i=0; i < lvl.blocks.length; i++){
                pos = [lvl.blocks[i][0], lvl.blocks[i][1]];
                console.log(`Adding new block @ ${pos[0]}, ${pos[1]}`)

                CanvasManager.entity_pool.push(new Block(pos));
            }
        }
        // add tiles
        for (let i = 0; i < lvl.tile_values.length; i++){
            pos = [lvl.tile_cords[i][0], lvl.tile_cords[i][1]];
            console.log(`Adding new tile @ ${pos[0]}, ${pos[1]}`)

            CanvasManager.entity_pool.push(new Tile(pos, lvl.tile_values[i]));
        }
        // add holes
        if (lvl.holes){
            for (let i=0; i < lvl.holes.length; i++){
                pos = [lvl.holes[i][0], lvl.holes[i][1]];
                CanvasManager.entity_pool.push(new Hole(pos));
            }
        }
        console.log("Successfully loaded level into entity pool!");
    }


    // Clears Canvas Screen.
    cls(): void{
        CanvasManager.context.fillStyle = "#dddddd";
        CanvasManager.context.fillRect(0, 0, CanvasManager.context.canvas.width, CanvasManager.context.canvas.height);
    }

    // Updates each object by a tick.
    // Input can be either a direction or 
    step(inp : INPUT){
        if (CanvasManager.step_entities){
            if (inp != INPUT.NOTHING){
                this.input_queue.push(inp);
            }
            // Then if nothing is busy we perform a new action
            if (!this.busy() && (this.input_queue.length > 0)){
                this.use_input();
            }
            for (let i=0;i<CanvasManager.entity_pool.length;i++){
                CanvasManager.entity_pool[i].step();
            }
        } else {
            CanvasManager.entity_pool[CanvasManager.entity_pool.length-1].step();
        }
    }


    use_input(){
        const input : INPUT = this.input_queue.shift();
        // filter items
        switch(input){
            case INPUT.UP:
                CanvasManager.entity_pool.sort( (e1, e2) => e1.coordinates[1] - e2.coordinates[1] );
                break;
            case INPUT.DOWN:
                CanvasManager.entity_pool.sort( (e1, e2) => -1*(e1.coordinates[1] - e2.coordinates[1]));
                break;
            case INPUT.LEFT:
                CanvasManager.entity_pool.sort( (e1, e2) => e1.coordinates[0] - e2.coordinates[0] );
                break;
            case INPUT.RIGHT:
                CanvasManager.entity_pool.sort( (e1, e2) => -1*(e1.coordinates[0] - e2.coordinates[0]));
                break;

        }

        for (let i=0; i < CanvasManager.entity_pool.length; i++){
         let resp : EntityResponse = CanvasManager.entity_pool[i].ask({type:RequestType.Move, dir:input});
            // maybe do something with response idk
        }

    }

    // Draws the current entity pool
    draw(){
        // clear the screen
        this.cls();
        for (let i=0; i < CanvasManager.entity_pool.length; i++){
            CanvasManager.entity_pool[i].draw(CanvasManager.context);
        }
    }


    // Checks if any entity is currently in a process.
    busy(): boolean{
        for (let i = 0; i < CanvasManager.entity_pool.length; i++){

            let entity_status : EntityResponse = CanvasManager.entity_pool[i].ask({type: RequestType.Status});

            if (entity_status.type == ResponseType.Busy){
                return true;
            }

        }
        return false;
    }

    static entityAt(x: number, y: number): number{
        for (let i=0; i < CanvasManager.entity_pool.length; i++){
            //if (CanvasManager.entity_pool[i].ask({type:RequestType.ID}) == {type:ResponseType.ID, success_value:e_type}){
                if (CanvasManager.entity_pool[i].coordinates[0] == x && CanvasManager.entity_pool[i].coordinates[1] == y){
                    return i;
                }
            //}
        }
        return -1;
    }

    // [x, y]
    static checkBorderCollision(cords: [number, number]): boolean{
        //console.log(`grid_w = ${CanvasManager.grid_width}, grid_h = ${CanvasManager.grid_height}`);
        //console.log(`cords = ${cords[0]}, ${cords[1]}`);
        if (cords[0] > CanvasManager.canvas.width -64 || cords[0] < 0){
            return true;
        }
        if (cords[1] > CanvasManager.canvas.height -64 || cords[1] < 0){
            return true;
        }
        
        return false;   
    }
    static delAt(index: number){
        console.log(`Deleting Object @ ${index}`);
        CanvasManager.entity_pool.splice(index, 1);
    }

}

// An external function or object should be calling a event loop where the Canvas Manager step() && draw() events get called.
