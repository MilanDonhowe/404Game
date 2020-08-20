/*Before diving into the code I need to design some things*/

// This is a static import done by web-pack @ compile-time.  
// Let's use dynamic imports to load every level json later.
// https://stackoverflow.com/a/53735869/8638218 


import {Level} from "./level_parser.ts";

import {CanvasManager} from "./CanvasManager.ts";

import {InputManager} from "./InputManager.ts";

import test_level from "./levels/level_test.json";


// Let's also have this get imported by https://gist.github.com/xem/a7ff7215375520d89b73beeabd7b16bd as the parent framework.
// or use this as the keyboard input handler https://xem.github.io/articles/jsgamesinputs.html


// TODO: change this.
const cnv = new CanvasManager();
const inp = new InputManager();
document.addEventListener('keydown', inp);
document.addEventListener('keyup', inp);



const lvl : Level = test_level;

cnv.load_entity_grid(test_level);

/* Main Event Loop */
setInterval( (e: Event) => {
    cnv.step(inp.step());
    cnv.draw();
}, 16);