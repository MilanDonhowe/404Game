/* 
Filename: InputManager.ts
Author: Milan
Desc: Implements InputManager class which should handle all input event listeners used in game.
      Relays current input state to CanvasManager every step() event

*/

// used https://xem.github.io/articles/jsgamesinputs.html as a reference.

export enum INPUT {
    LEFT,
    RIGHT,
    UP,
    DOWN,
    NOTHING
};

export class InputManager {
    private current_move : INPUT;

    private up: boolean;
    private right: boolean;
    private down: boolean;
    private left: boolean;

    step(): INPUT{
        
        const prev_move : INPUT = this.current_move;

        if (this.up && (this.current_move != INPUT.UP)){
            this.current_move = INPUT.UP;
        } else if (this.down && (this.current_move != INPUT.DOWN)){
            this.current_move = INPUT.DOWN;
        } else if (this.right && (this.current_move != INPUT.RIGHT)){
            this.current_move = INPUT.RIGHT;
        } else if (this.left && (this.current_move != INPUT.LEFT)){
            this.current_move = INPUT.LEFT;
        }
        
        if (prev_move != this.current_move) return this.current_move;
        return INPUT.NOTHING
    }

    constructor(){
        this.up = this.right = this.down = this.left = false;
        this.current_move = INPUT.NOTHING;
    }


    manageKeyUp(e: KeyboardEvent): void{
       
        // Up / W / Z              
        if (e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87){
            this.up = false;
            if (this.current_move == INPUT.UP) this.current_move = INPUT.NOTHING;
        }

        // Right / D
        if (e.keyCode == 39 || e.keyCode == 68){
            this.right = false;
            if (this.current_move == INPUT.RIGHT) this.current_move = INPUT.NOTHING;

        }

        // Down / S
        if (e.keyCode == 40 || e.keyCode == 83){
            this.down = false;
            if (this.current_move == INPUT.DOWN) this.current_move = INPUT.NOTHING;

        }

        // Left / A / Q
        if (e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 81){
            this.left = false;
            if (this.current_move == INPUT.LEFT) this.current_move = INPUT.NOTHING;
        }
    }

    manageKeyDown(e: KeyboardEvent): void {
        // Up / W / Z
        console.log(`${e.keyCode} is down`);
        if (e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87){
            this.up = true;
            //if (this.current_move != INPUT.UP) this.current_move = INPUT.UP;
        }
        // Right / D
        if (e.keyCode == 39 || e.keyCode == 68){
            this.right = true;
            //console.log(this.right);
           // if (this.current_move != INPUT.RIGHT) this.current_move = INPUT.RIGHT;

        }
        // Down / S
        if (e.keyCode == 40 || e.keyCode == 83){
            this.down = true;
            //if (this.current_move != INPUT.DOWN) this.current_move = INPUT.DOWN;

        }
        // Left / A / Q
        if (e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 81){
            this.left = true;
            //if (this.current_move != INPUT.UP) this.current_move = INPUT.LEFT;
        }
    }


    // Shoutout to @Chalibou's stackoverflow answer https://stackoverflow.com/a/58149336/8638218
    handleEvent(e: KeyboardEvent): void{
        switch(e.type){
            case "keydown":
                this.manageKeyDown(e);
                break;
            case "keyup":
                this.manageKeyUp(e);
                break;
        }
    }

}