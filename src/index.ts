/*Before diving into the code I need to design some things*/

// This is a static import done by web-pack @ compile-time.  
// Let's use dynamic imports to load every level json later.
// https://stackoverflow.com/a/53735869/8638218 
import test_level from "./levels/level_test.json";

// Let's also have this get imported by https://gist.github.com/xem/a7ff7215375520d89b73beeabd7b16bd as the parent framework.
// or use this as the keyboard input handler https://xem.github.io/articles/jsgamesinputs.html

console.log(test_level)