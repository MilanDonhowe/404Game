/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/CanvasManager.ts":
/*!******************************!*\
  !*** ./src/CanvasManager.ts ***!
  \******************************/
/*! exports provided: CanvasManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CanvasManager\", function() { return CanvasManager; });\n/* harmony import */ var _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputManager.ts */ \"./src/InputManager.ts\");\n/* harmony import */ var _entities_entity_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/entity.ts */ \"./src/entities/entity.ts\");\n/* harmony import */ var _entities_block_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/block.ts */ \"./src/entities/block.ts\");\n/* harmony import */ var _entities_tile_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/tile.ts */ \"./src/entities/tile.ts\");\n/* harmony import */ var _entities_hole_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entities/hole.ts */ \"./src/entities/hole.ts\");\n\r\n\r\n\r\n\r\n\r\nclass CanvasManager {\r\n    constructor() {\r\n        CanvasManager.canvas = document.getElementById('screen');\r\n        CanvasManager.context = CanvasManager.canvas.getContext(\"2d\");\r\n        CanvasManager.entity_pool = [];\r\n        this.input_queue = [];\r\n    }\r\n    static load_entity_grid(lvl) {\r\n        const block_size = 64;\r\n        console.log(lvl);\r\n        CanvasManager.context.canvas.height = lvl.row * block_size;\r\n        CanvasManager.context.canvas.width = lvl.col * block_size;\r\n        let pos;\r\n        if (lvl.blocks) {\r\n            for (let i = 0; i < lvl.blocks.length; i++) {\r\n                pos = [lvl.blocks[i][0], lvl.blocks[i][1]];\r\n                CanvasManager.entity_pool.push(new _entities_block_ts__WEBPACK_IMPORTED_MODULE_2__[\"Block\"](pos));\r\n            }\r\n        }\r\n        for (let i = 0; i < lvl.tile_values.length; i++) {\r\n            pos = [lvl.tile_cords[i][0], lvl.tile_cords[i][1]];\r\n            CanvasManager.entity_pool.push(new _entities_tile_ts__WEBPACK_IMPORTED_MODULE_3__[\"Tile\"](pos, lvl.tile_values[i]));\r\n        }\r\n        if (lvl.holes) {\r\n            for (let i = 0; i < lvl.holes.length; i++) {\r\n                pos = [lvl.holes[i][0], lvl.holes[i][1]];\r\n                CanvasManager.entity_pool.push(new _entities_hole_ts__WEBPACK_IMPORTED_MODULE_4__[\"Hole\"](pos));\r\n            }\r\n        }\r\n        console.log(\"Successfully loaded level into entity pool!\");\r\n    }\r\n    cls() {\r\n        CanvasManager.context.fillStyle = \"#dddddd\";\r\n        CanvasManager.context.fillRect(0, 0, CanvasManager.context.canvas.width, CanvasManager.context.canvas.height);\r\n    }\r\n    step(inp) {\r\n        if (CanvasManager.step_entities) {\r\n            if (inp != _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].NOTHING) {\r\n                this.input_queue.push(inp);\r\n            }\r\n            if (!this.busy() && (this.input_queue.length > 0)) {\r\n                this.use_input();\r\n            }\r\n            for (let i = 0; i < CanvasManager.entity_pool.length; i++) {\r\n                CanvasManager.entity_pool[i].step();\r\n            }\r\n        }\r\n        else {\r\n            CanvasManager.entity_pool[CanvasManager.entity_pool.length - 1].step();\r\n        }\r\n    }\r\n    use_input() {\r\n        const input = this.input_queue.shift();\r\n        switch (input) {\r\n            case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].UP:\r\n                CanvasManager.entity_pool.sort((e1, e2) => e1.coordinates[1] - e2.coordinates[1]);\r\n                break;\r\n            case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].DOWN:\r\n                CanvasManager.entity_pool.sort((e1, e2) => -1 * (e1.coordinates[1] - e2.coordinates[1]));\r\n                break;\r\n            case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].LEFT:\r\n                CanvasManager.entity_pool.sort((e1, e2) => e1.coordinates[0] - e2.coordinates[0]);\r\n                break;\r\n            case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].RIGHT:\r\n                CanvasManager.entity_pool.sort((e1, e2) => -1 * (e1.coordinates[0] - e2.coordinates[0]));\r\n                break;\r\n        }\r\n        for (let i = 0; i < CanvasManager.entity_pool.length; i++) {\r\n            let resp = CanvasManager.entity_pool[i].ask({ type: _entities_entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"RequestType\"].Move, dir: input });\r\n        }\r\n    }\r\n    draw() {\r\n        this.cls();\r\n        for (let i = 0; i < CanvasManager.entity_pool.length; i++) {\r\n            CanvasManager.entity_pool[i].draw(CanvasManager.context);\r\n        }\r\n    }\r\n    busy() {\r\n        for (let i = 0; i < CanvasManager.entity_pool.length; i++) {\r\n            let entity_status = CanvasManager.entity_pool[i].ask({ type: _entities_entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"RequestType\"].Status });\r\n            if (entity_status.type == _entities_entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"ResponseType\"].Busy) {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    }\r\n    static entityAt(x, y) {\r\n        for (let i = 0; i < CanvasManager.entity_pool.length; i++) {\r\n            if (CanvasManager.entity_pool[i].coordinates[0] == x && CanvasManager.entity_pool[i].coordinates[1] == y) {\r\n                return i;\r\n            }\r\n        }\r\n        return -1;\r\n    }\r\n    static checkBorderCollision(cords) {\r\n        if (cords[0] > CanvasManager.canvas.width - 64 || cords[0] < 0) {\r\n            return true;\r\n        }\r\n        if (cords[1] > CanvasManager.canvas.height - 64 || cords[1] < 0) {\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n    static delAt(index) {\r\n        console.log(`Deleting Object @ ${index}`);\r\n        CanvasManager.entity_pool.splice(index, 1);\r\n    }\r\n}\r\nCanvasManager.step_entities = true;\r\n\n\n//# sourceURL=webpack:///./src/CanvasManager.ts?");

/***/ }),

/***/ "./src/GameManager.ts":
/*!****************************!*\
  !*** ./src/GameManager.ts ***!
  \****************************/
/*! exports provided: GameState, GameManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameState\", function() { return GameState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameManager\", function() { return GameManager; });\n/* harmony import */ var _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasManager.ts */ \"./src/CanvasManager.ts\");\n/* harmony import */ var _entities_entity_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/entity.ts */ \"./src/entities/entity.ts\");\n/* harmony import */ var _entities_transitions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/transitions.ts */ \"./src/entities/transitions.ts\");\n/* harmony import */ var _levels_level_1_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./levels/level_1.json */ \"./src/levels/level_1.json\");\nvar _levels_level_1_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./levels/level_1.json */ \"./src/levels/level_1.json\", 1);\n/* harmony import */ var _levels_level_2_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./levels/level_2.json */ \"./src/levels/level_2.json\");\nvar _levels_level_2_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./levels/level_2.json */ \"./src/levels/level_2.json\", 1);\n\r\n\r\n\r\n\r\n\r\nvar GameState;\r\n(function (GameState) {\r\n    GameState[GameState[\"LEVEL_LOSS\"] = 0] = \"LEVEL_LOSS\";\r\n    GameState[GameState[\"LEVEL_LOSS_TRANSITON\"] = 1] = \"LEVEL_LOSS_TRANSITON\";\r\n    GameState[GameState[\"LEVEL_WIN\"] = 2] = \"LEVEL_WIN\";\r\n    GameState[GameState[\"LEVEL_ONGOING\"] = 3] = \"LEVEL_ONGOING\";\r\n    GameState[GameState[\"GAME_WIN\"] = 4] = \"GAME_WIN\";\r\n    GameState[GameState[\"LEVEL_TRANSITION_START\"] = 5] = \"LEVEL_TRANSITION_START\";\r\n    GameState[GameState[\"LEVEL_TRANSITION_LOAD\"] = 6] = \"LEVEL_TRANSITION_LOAD\";\r\n    GameState[GameState[\"LEVEL_TRANSITION_END\"] = 7] = \"LEVEL_TRANSITION_END\";\r\n    GameState[GameState[\"TRANSITION_WAIT\"] = 8] = \"TRANSITION_WAIT\";\r\n})(GameState || (GameState = {}));\r\n;\r\nclass GameManager {\r\n    constructor() {\r\n        this.current_level = 0;\r\n        this.level_arr = [_levels_level_1_json__WEBPACK_IMPORTED_MODULE_3__, _levels_level_2_json__WEBPACK_IMPORTED_MODULE_4__];\r\n    }\r\n    get_level() {\r\n        return this.level_arr[this.current_level];\r\n    }\r\n    get_next_level() {\r\n        if (this.current_level < this.level_arr.length) {\r\n            this.current_level++;\r\n        }\r\n        return this.get_level();\r\n    }\r\n    load_next_level() {\r\n        _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool = [];\r\n        _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].load_entity_grid(this.get_next_level());\r\n    }\r\n    step() {\r\n        switch (GameManager.STATE) {\r\n            case GameState.LEVEL_ONGOING:\r\n                for (let i = 0; i < _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool.length; i++) {\r\n                    let e_score = _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool[i].ask({ type: _entities_entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"RequestType\"].Points });\r\n                    if (e_score.success_value == 404) {\r\n                        _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool.push(new _entities_transitions_ts__WEBPACK_IMPORTED_MODULE_2__[\"TransitionIn\"](_CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].context.canvas.width, GameState.LEVEL_TRANSITION_LOAD, \"#000000\"));\r\n                        _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].step_entities = false;\r\n                        GameManager.STATE = GameState.LEVEL_TRANSITION_START;\r\n                        break;\r\n                    }\r\n                }\r\n                break;\r\n            case GameState.LEVEL_TRANSITION_LOAD:\r\n                this.load_next_level();\r\n                _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool.push(new _entities_transitions_ts__WEBPACK_IMPORTED_MODULE_2__[\"TransitionOut\"](_CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].context.canvas.width, GameState.LEVEL_TRANSITION_END, \"#000000\"));\r\n                GameManager.STATE = GameState.TRANSITION_WAIT;\r\n                break;\r\n            case GameState.LEVEL_TRANSITION_END:\r\n                GameManager.STATE = GameState.LEVEL_ONGOING;\r\n                _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].step_entities = true;\r\n                _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].delAt(_CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool.length - 1);\r\n                break;\r\n            case GameState.LEVEL_LOSS:\r\n                _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].step_entities = false;\r\n                _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool.push(new _entities_transitions_ts__WEBPACK_IMPORTED_MODULE_2__[\"TransitionOutLevelRestart\"](_CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].context.canvas.width, GameState.LEVEL_LOSS_TRANSITON, \"#fc4225\"));\r\n                GameManager.STATE = GameState.TRANSITION_WAIT;\r\n                break;\r\n            case GameState.LEVEL_LOSS_TRANSITON:\r\n                _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool = [];\r\n                _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].load_entity_grid(this.get_level());\r\n                _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool.push(new _entities_transitions_ts__WEBPACK_IMPORTED_MODULE_2__[\"TransitionInLevelRestart\"](_CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].context.canvas.width, GameState.LEVEL_TRANSITION_END, \"#fc4225\"));\r\n                GameManager.STATE = GameState.TRANSITION_WAIT;\r\n                break;\r\n        }\r\n    }\r\n}\r\nGameManager.STATE = GameState.LEVEL_ONGOING;\r\n;\r\n\n\n//# sourceURL=webpack:///./src/GameManager.ts?");

/***/ }),

/***/ "./src/InputManager.ts":
/*!*****************************!*\
  !*** ./src/InputManager.ts ***!
  \*****************************/
/*! exports provided: INPUT, InputManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"INPUT\", function() { return INPUT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InputManager\", function() { return InputManager; });\nvar INPUT;\r\n(function (INPUT) {\r\n    INPUT[INPUT[\"LEFT\"] = 0] = \"LEFT\";\r\n    INPUT[INPUT[\"RIGHT\"] = 1] = \"RIGHT\";\r\n    INPUT[INPUT[\"UP\"] = 2] = \"UP\";\r\n    INPUT[INPUT[\"DOWN\"] = 3] = \"DOWN\";\r\n    INPUT[INPUT[\"NOTHING\"] = 4] = \"NOTHING\";\r\n})(INPUT || (INPUT = {}));\r\n;\r\nclass InputManager {\r\n    constructor() {\r\n        this.up = this.right = this.down = this.left = false;\r\n        this.current_move = INPUT.NOTHING;\r\n    }\r\n    step() {\r\n        const prev_move = this.current_move;\r\n        if (this.up && (this.current_move != INPUT.UP)) {\r\n            this.current_move = INPUT.UP;\r\n        }\r\n        else if (this.down && (this.current_move != INPUT.DOWN)) {\r\n            this.current_move = INPUT.DOWN;\r\n        }\r\n        else if (this.right && (this.current_move != INPUT.RIGHT)) {\r\n            this.current_move = INPUT.RIGHT;\r\n        }\r\n        else if (this.left && (this.current_move != INPUT.LEFT)) {\r\n            this.current_move = INPUT.LEFT;\r\n        }\r\n        if (prev_move != this.current_move)\r\n            return this.current_move;\r\n        return INPUT.NOTHING;\r\n    }\r\n    manageKeyUp(e) {\r\n        if (e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87) {\r\n            this.up = false;\r\n            if (this.current_move == INPUT.UP)\r\n                this.current_move = INPUT.NOTHING;\r\n        }\r\n        if (e.keyCode == 39 || e.keyCode == 68) {\r\n            this.right = false;\r\n            if (this.current_move == INPUT.RIGHT)\r\n                this.current_move = INPUT.NOTHING;\r\n        }\r\n        if (e.keyCode == 40 || e.keyCode == 83) {\r\n            this.down = false;\r\n            if (this.current_move == INPUT.DOWN)\r\n                this.current_move = INPUT.NOTHING;\r\n        }\r\n        if (e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 81) {\r\n            this.left = false;\r\n            if (this.current_move == INPUT.LEFT)\r\n                this.current_move = INPUT.NOTHING;\r\n        }\r\n    }\r\n    manageKeyDown(e) {\r\n        console.log(`${e.keyCode} is down`);\r\n        if (e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87) {\r\n            this.up = true;\r\n        }\r\n        if (e.keyCode == 39 || e.keyCode == 68) {\r\n            this.right = true;\r\n        }\r\n        if (e.keyCode == 40 || e.keyCode == 83) {\r\n            this.down = true;\r\n        }\r\n        if (e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 81) {\r\n            this.left = true;\r\n        }\r\n    }\r\n    handleEvent(e) {\r\n        switch (e.type) {\r\n            case \"keydown\":\r\n                this.manageKeyDown(e);\r\n                break;\r\n            case \"keyup\":\r\n                this.manageKeyUp(e);\r\n                break;\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/InputManager.ts?");

/***/ }),

/***/ "./src/entities/block.ts":
/*!*******************************!*\
  !*** ./src/entities/block.ts ***!
  \*******************************/
/*! exports provided: Block */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Block\", function() { return Block; });\n/* harmony import */ var _shape_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shape.ts */ \"./src/shape.ts\");\n/* harmony import */ var _entity_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity.ts */ \"./src/entities/entity.ts\");\n\r\n\r\nclass Block {\r\n    constructor(pos) {\r\n        this.coordinates = [pos[0] * 64, pos[1] * 64];\r\n    }\r\n    ask(req) {\r\n        if (req.type == _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"RequestType\"].ID) {\r\n            return { type: _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"ResponseType\"].ID, success_value: _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"EntityType\"].BLOCK };\r\n        }\r\n        return { type: _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"ResponseType\"].ERROR };\r\n    }\r\n    draw(ctx) {\r\n        Object(_shape_ts__WEBPACK_IMPORTED_MODULE_0__[\"fillRoundRect\"])(ctx, this.coordinates[0], this.coordinates[1], _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"BLOCK_SIZE\"], _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"BLOCK_SIZE\"], \"#9b9b9b\");\r\n    }\r\n    ;\r\n    step() { }\r\n    ;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/entities/block.ts?");

/***/ }),

/***/ "./src/entities/entity.ts":
/*!********************************!*\
  !*** ./src/entities/entity.ts ***!
  \********************************/
/*! exports provided: BLOCK_SIZE, colors, RequestType, EntityType, ResponseType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BLOCK_SIZE\", function() { return BLOCK_SIZE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"colors\", function() { return colors; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RequestType\", function() { return RequestType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EntityType\", function() { return EntityType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ResponseType\", function() { return ResponseType; });\nconst BLOCK_SIZE = 64;\r\nconst colors = {\r\n    404: \"#f7be54\",\r\n    202: \"#f76c54\",\r\n    101: \"#54b3f7\",\r\n    50.5: \"#e284f9\",\r\n    25.25: \"#def754\"\r\n};\r\nvar RequestType;\r\n(function (RequestType) {\r\n    RequestType[RequestType[\"Move\"] = 0] = \"Move\";\r\n    RequestType[RequestType[\"Merge\"] = 1] = \"Merge\";\r\n    RequestType[RequestType[\"Status\"] = 2] = \"Status\";\r\n    RequestType[RequestType[\"ID\"] = 3] = \"ID\";\r\n    RequestType[RequestType[\"Points\"] = 4] = \"Points\";\r\n})(RequestType || (RequestType = {}));\r\n;\r\nvar EntityType;\r\n(function (EntityType) {\r\n    EntityType[EntityType[\"BLOCK\"] = 0] = \"BLOCK\";\r\n    EntityType[EntityType[\"TILE\"] = 1] = \"TILE\";\r\n    EntityType[EntityType[\"HOLE\"] = 2] = \"HOLE\";\r\n})(EntityType || (EntityType = {}));\r\n;\r\n;\r\nvar ResponseType;\r\n(function (ResponseType) {\r\n    ResponseType[ResponseType[\"Busy\"] = 0] = \"Busy\";\r\n    ResponseType[ResponseType[\"Free\"] = 1] = \"Free\";\r\n    ResponseType[ResponseType[\"Success\"] = 2] = \"Success\";\r\n    ResponseType[ResponseType[\"ERROR\"] = 3] = \"ERROR\";\r\n    ResponseType[ResponseType[\"ID\"] = 4] = \"ID\";\r\n})(ResponseType || (ResponseType = {}));\r\n;\r\n\n\n//# sourceURL=webpack:///./src/entities/entity.ts?");

/***/ }),

/***/ "./src/entities/hole.ts":
/*!******************************!*\
  !*** ./src/entities/hole.ts ***!
  \******************************/
/*! exports provided: Hole */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Hole\", function() { return Hole; });\n/* harmony import */ var _block_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block.ts */ \"./src/entities/block.ts\");\n/* harmony import */ var _entity_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity.ts */ \"./src/entities/entity.ts\");\n/* harmony import */ var _shape_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shape.ts */ \"./src/shape.ts\");\n\r\n\r\n\r\nclass Hole extends _block_ts__WEBPACK_IMPORTED_MODULE_0__[\"Block\"] {\r\n    ask(req) {\r\n        if (req.type == _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"RequestType\"].ID) {\r\n            return { type: _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"ResponseType\"].ID, success_value: _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"EntityType\"].HOLE };\r\n        }\r\n        return { type: _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"ResponseType\"].ERROR };\r\n    }\r\n    draw(ctx) {\r\n        Object(_shape_ts__WEBPACK_IMPORTED_MODULE_2__[\"fillRoundRect\"])(ctx, this.coordinates[0], this.coordinates[1], _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"BLOCK_SIZE\"], _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"BLOCK_SIZE\"], \"#111111\");\r\n        Object(_shape_ts__WEBPACK_IMPORTED_MODULE_2__[\"drawX\"])(ctx, \"#FEFEFE\", this.coordinates[0], this.coordinates[1], _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"BLOCK_SIZE\"]);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/entities/hole.ts?");

/***/ }),

/***/ "./src/entities/splash.ts":
/*!********************************!*\
  !*** ./src/entities/splash.ts ***!
  \********************************/
/*! exports provided: Splash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Splash\", function() { return Splash; });\n/* harmony import */ var _entity_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity.ts */ \"./src/entities/entity.ts\");\n/* harmony import */ var _shape_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shape.ts */ \"./src/shape.ts\");\n\r\n\r\nclass Splash {\r\n    constructor(size, block_size) {\r\n        this.coordinates = [-1, -1];\r\n        this.size_limit = size;\r\n        this.block_num = block_size;\r\n        this.delta = 1;\r\n    }\r\n    step() {\r\n        this.delta++;\r\n        if (this.delta > 360) {\r\n            this.delta = 0;\r\n        }\r\n    }\r\n    ask(req) {\r\n        if (req.type == _entity_ts__WEBPACK_IMPORTED_MODULE_0__[\"RequestType\"].Move) {\r\n        }\r\n        return { type: _entity_ts__WEBPACK_IMPORTED_MODULE_0__[\"ResponseType\"].ERROR };\r\n    }\r\n    draw(ctx) {\r\n        ctx.fillStyle = \"#000000\";\r\n        ctx.fillRect(0, 0, 800, 600);\r\n        Object(_shape_ts__WEBPACK_IMPORTED_MODULE_1__[\"drawPixelFont\"])(ctx, \"404:\", 10, 100, this.block_num, \"#FEFEFE\");\r\n        Object(_shape_ts__WEBPACK_IMPORTED_MODULE_1__[\"drawPixelFont\"])(ctx, \"a puzzle game\", 160, 120, (this.block_num / 2) + (1 * Math.sin(Math.PI * (this.delta / 180))), \"#acf990\");\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/entities/splash.ts?");

/***/ }),

/***/ "./src/entities/tile.ts":
/*!******************************!*\
  !*** ./src/entities/tile.ts ***!
  \******************************/
/*! exports provided: Tile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tile\", function() { return Tile; });\n/* harmony import */ var _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../InputManager.ts */ \"./src/InputManager.ts\");\n/* harmony import */ var _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CanvasManager.ts */ \"./src/CanvasManager.ts\");\n/* harmony import */ var _shape_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shape.ts */ \"./src/shape.ts\");\n/* harmony import */ var _GameManager_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../GameManager.ts */ \"./src/GameManager.ts\");\n/* harmony import */ var _block_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.ts */ \"./src/entities/block.ts\");\n/* harmony import */ var _entity_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entity.ts */ \"./src/entities/entity.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Tile extends _block_ts__WEBPACK_IMPORTED_MODULE_4__[\"Block\"] {\r\n    constructor(pos, points) {\r\n        super(pos);\r\n        this.score = points;\r\n        this.moving = false;\r\n        this.dir = _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].NOTHING;\r\n    }\r\n    ask(req) {\r\n        switch (req.type) {\r\n            case _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"RequestType\"].Move:\r\n                this.moving = true;\r\n                this.dir = req.dir;\r\n                return { type: _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"ResponseType\"].Success };\r\n                break;\r\n            case _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"RequestType\"].Merge:\r\n                this.score += req.add;\r\n                break;\r\n            case _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"RequestType\"].Status:\r\n                if (this.moving) {\r\n                    return { type: _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"ResponseType\"].Busy };\r\n                }\r\n                else {\r\n                    return { type: _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"ResponseType\"].Free };\r\n                }\r\n                break;\r\n            case _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"RequestType\"].ID:\r\n                return { type: _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"ResponseType\"].ID, success_value: _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"EntityType\"].TILE };\r\n                break;\r\n            case _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"RequestType\"].Points:\r\n                return { type: _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"ResponseType\"].Success, success_value: this.score };\r\n                break;\r\n        }\r\n        return { type: _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"ResponseType\"].ERROR };\r\n    }\r\n    draw(ctx) {\r\n        Object(_shape_ts__WEBPACK_IMPORTED_MODULE_2__[\"fillRoundRect\"])(ctx, this.coordinates[0], this.coordinates[1], _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"BLOCK_SIZE\"], _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"BLOCK_SIZE\"], _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"colors\"][this.score]);\r\n        const p_size = 3;\r\n        Object(_shape_ts__WEBPACK_IMPORTED_MODULE_2__[\"drawPixelFont\"])(ctx, String(this.score), this.coordinates[0] + 14, this.coordinates[1] + 24, p_size);\r\n    }\r\n    step() {\r\n        if (this.moving && this.dir != _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].NOTHING) {\r\n            let new_pos = [this.coordinates[0], this.coordinates[1]];\r\n            let possible_entity_pos = [new_pos[0], new_pos[1]];\r\n            switch (this.dir) {\r\n                case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].UP:\r\n                    new_pos[1] -= Tile.magnitude;\r\n                    possible_entity_pos[1] -= _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"BLOCK_SIZE\"];\r\n                    break;\r\n                case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].DOWN:\r\n                    new_pos[1] += Tile.magnitude;\r\n                    possible_entity_pos[1] += _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"BLOCK_SIZE\"];\r\n                    break;\r\n                case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].LEFT:\r\n                    new_pos[0] -= Tile.magnitude;\r\n                    possible_entity_pos[0] -= _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"BLOCK_SIZE\"];\r\n                    break;\r\n                case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].RIGHT:\r\n                    new_pos[0] += Tile.magnitude;\r\n                    possible_entity_pos[0] += _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"BLOCK_SIZE\"];\r\n                    break;\r\n            }\r\n            let status = [-1, -1];\r\n            if (_CanvasManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"CanvasManager\"].checkBorderCollision(new_pos)) {\r\n                status[0] = 1;\r\n            }\r\n            else {\r\n                status = this.check_entity_collisions(possible_entity_pos);\r\n            }\r\n            switch (status[0]) {\r\n                case 1:\r\n                    this.moving = false;\r\n                    this.dir = _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].NOTHING;\r\n                    break;\r\n                case 2:\r\n                    _GameManager_ts__WEBPACK_IMPORTED_MODULE_3__[\"GameManager\"].STATE = _GameManager_ts__WEBPACK_IMPORTED_MODULE_3__[\"GameState\"].LEVEL_LOSS;\r\n                    break;\r\n                case 3:\r\n                    this.score *= 2;\r\n                    _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"CanvasManager\"].delAt(status[1]);\r\n                    console.log(`this.score = ${this.score}`);\r\n                    break;\r\n                case 4:\r\n                    this.coordinates = new_pos;\r\n                    break;\r\n            }\r\n        }\r\n    }\r\n    check_entity_collisions(cords) {\r\n        let e_index = _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"CanvasManager\"].entityAt(cords[0], cords[1]);\r\n        if (e_index == -1)\r\n            return [4, -1];\r\n        let e_type = _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"CanvasManager\"].entity_pool[e_index].ask({ type: _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"RequestType\"].ID }).success_value;\r\n        let return_tuple = [4, e_index];\r\n        switch (e_type) {\r\n            case _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"EntityType\"].BLOCK:\r\n                return_tuple[0] = 1;\r\n                break;\r\n            case _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"EntityType\"].HOLE:\r\n                return_tuple[0] = 2;\r\n                break;\r\n            case _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"EntityType\"].TILE:\r\n                let e_value = _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"CanvasManager\"].entity_pool[e_index].ask({ type: _entity_ts__WEBPACK_IMPORTED_MODULE_5__[\"RequestType\"].Points }).success_value;\r\n                return_tuple[0] = (e_value == this.score) ? 3 : 1;\r\n        }\r\n        return return_tuple;\r\n    }\r\n}\r\nTile.magnitude = 8;\r\n\n\n//# sourceURL=webpack:///./src/entities/tile.ts?");

/***/ }),

/***/ "./src/entities/transitions.ts":
/*!*************************************!*\
  !*** ./src/entities/transitions.ts ***!
  \*************************************/
/*! exports provided: TransitionIn, TransitionOut, TransitionOutLevelRestart, TransitionInLevelRestart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TransitionIn\", function() { return TransitionIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TransitionOut\", function() { return TransitionOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TransitionOutLevelRestart\", function() { return TransitionOutLevelRestart; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TransitionInLevelRestart\", function() { return TransitionInLevelRestart; });\n/* harmony import */ var _GameManager_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameManager.ts */ \"./src/GameManager.ts\");\n/* harmony import */ var _entity_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity.ts */ \"./src/entities/entity.ts\");\n\r\n\r\nclass TransitionIn {\r\n    constructor(end_num, new_game_state, color_code) {\r\n        this.state = 0;\r\n        this.complete = end_num;\r\n        this.next_state = new_game_state;\r\n        this.color = color_code;\r\n    }\r\n    ask(req) {\r\n        return { type: _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"ResponseType\"].ERROR };\r\n    }\r\n    ;\r\n    step() {\r\n        if (this.state < this.complete) {\r\n            this.state += 19;\r\n        }\r\n        else {\r\n            _GameManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"GameManager\"].STATE = this.next_state;\r\n        }\r\n    }\r\n    draw(ctx) {\r\n        ctx.fillStyle = this.color;\r\n        ctx.fillRect(0, 0, this.state, this.state);\r\n    }\r\n}\r\nclass TransitionOut extends TransitionIn {\r\n    draw(ctx) {\r\n        ctx.fillStyle = this.color;\r\n        ctx.fillRect(this.state, this.state, this.complete, this.complete);\r\n    }\r\n}\r\nclass TransitionOutLevelRestart extends TransitionOut {\r\n    draw(ctx) {\r\n        ctx.fillStyle = this.color;\r\n        ctx.fillRect(0, 0, this.complete, this.state);\r\n    }\r\n}\r\nclass TransitionInLevelRestart extends TransitionIn {\r\n    draw(ctx) {\r\n        ctx.fillStyle = this.color;\r\n        ctx.fillRect(0, this.state, this.complete, this.complete);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/entities/transitions.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasManager.ts */ \"./src/CanvasManager.ts\");\n/* harmony import */ var _InputManager_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InputManager.ts */ \"./src/InputManager.ts\");\n/* harmony import */ var _GameManager_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameManager.ts */ \"./src/GameManager.ts\");\n/* harmony import */ var _entities_splash_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entities/splash.ts */ \"./src/entities/splash.ts\");\n\r\n\r\n\r\n\r\nconst cnv = new _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"]();\r\nconst inp = new _InputManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"InputManager\"]();\r\nconst gm = new _GameManager_ts__WEBPACK_IMPORTED_MODULE_2__[\"GameManager\"]();\r\ndocument.addEventListener('keydown', inp);\r\ndocument.addEventListener('keyup', inp);\r\n_CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool.push(new _entities_splash_ts__WEBPACK_IMPORTED_MODULE_3__[\"Splash\"](64, 10));\r\nsetInterval((e) => {\r\n    gm.step();\r\n    cnv.step(inp.step());\r\n    cnv.draw();\r\n}, 16);\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/levels/level_1.json":
/*!*********************************!*\
  !*** ./src/levels/level_1.json ***!
  \*********************************/
/*! exports provided: row, col, blocks, tile_cords, tile_values, holes, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"row\\\":6,\\\"col\\\":6,\\\"blocks\\\":[],\\\"tile_cords\\\":[[2,2],[4,2]],\\\"tile_values\\\":[202,202],\\\"holes\\\":[[4,0]]}\");\n\n//# sourceURL=webpack:///./src/levels/level_1.json?");

/***/ }),

/***/ "./src/levels/level_2.json":
/*!*********************************!*\
  !*** ./src/levels/level_2.json ***!
  \*********************************/
/*! exports provided: row, col, blocks, tile_cords, tile_values, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"row\\\":6,\\\"col\\\":6,\\\"blocks\\\":[[3,2],[0,0],[5,5]],\\\"tile_cords\\\":[[2,2],[4,2],[0,1],[4,5]],\\\"tile_values\\\":[202,101,50.5,50.5]}\");\n\n//# sourceURL=webpack:///./src/levels/level_2.json?");

/***/ }),

/***/ "./src/shape.ts":
/*!**********************!*\
  !*** ./src/shape.ts ***!
  \**********************/
/*! exports provided: roundRect, fillRoundRect, drawPixelFont, drawX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"roundRect\", function() { return roundRect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fillRoundRect\", function() { return fillRoundRect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawPixelFont\", function() { return drawPixelFont; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawX\", function() { return drawX; });\nfunction roundRect(ctx, x, y, w, h) {\r\n    const c = 15;\r\n    ctx.beginPath();\r\n    ctx.moveTo(x, y + c);\r\n    ctx.quadraticCurveTo(x, y, x + c, y);\r\n    ctx.lineTo(x + w - c, y);\r\n    ctx.quadraticCurveTo(x + w, y, x + w, y + c);\r\n    ctx.lineTo(x + w, y + h - c);\r\n    ctx.quadraticCurveTo(x + w, y + h, x + w - c, y + h);\r\n    ctx.lineTo(x + c, y + h);\r\n    ctx.quadraticCurveTo(x, y + h, x, y + h - c);\r\n    ctx.lineTo(x, y + c);\r\n    ctx.closePath();\r\n}\r\nfunction fillRoundRect(ctx, x, y, w, h, style) {\r\n    ctx.strokeStyle = style;\r\n    roundRect(ctx, x, y, w, h);\r\n    ctx.fillStyle = style;\r\n    ctx.fill();\r\n}\r\nconst PixelFont = {\r\n    '.': [\r\n        [,],\r\n        [,],\r\n        [,],\r\n        [,],\r\n        [1,]\r\n    ],\r\n    '0': [\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    '1': [\r\n        [, 1,],\r\n        [1, 1,],\r\n        [, 1,],\r\n        [, 1,],\r\n        [1, 1, 1]\r\n    ],\r\n    '2': [\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [1, 1, 1],\r\n        [1, ,],\r\n        [1, 1, 1]\r\n    ],\r\n    '3': [\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    '4': [\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [, , 1]\r\n    ],\r\n    '5': [\r\n        [1, 1, 1],\r\n        [1, ,],\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    '6': [\r\n        [1, 1, 1],\r\n        [1, ,],\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    '7': [\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [, , 1],\r\n        [, , 1],\r\n        [, , 1]\r\n    ],\r\n    '8': [\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    '9': [\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    'A': [\r\n        [, 1],\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, 1, 1],\r\n        [1, , 1]\r\n    ],\r\n    'B': [\r\n        [1, 1],\r\n        [1, , 1],\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, 1]\r\n    ],\r\n    'C': [\r\n        [1, 1, 1],\r\n        [1],\r\n        [1],\r\n        [1],\r\n        [1, 1, 1]\r\n    ],\r\n    'D': [\r\n        [1, 1],\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, 1]\r\n    ],\r\n    'E': [\r\n        [1, 1, 1],\r\n        [1],\r\n        [1, 1, 1],\r\n        [1],\r\n        [1, 1, 1]\r\n    ],\r\n    'F': [\r\n        [1, 1, 1],\r\n        [1],\r\n        [1, 1],\r\n        [1],\r\n        [1]\r\n    ],\r\n    'G': [\r\n        [, 1, 1, ,],\r\n        [1, ,],\r\n        [1, , 1, 1, ,],\r\n        [1, , , 1, ,],\r\n        [, 1, 1, ,]\r\n    ],\r\n    'H': [\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, , 1]\r\n    ],\r\n    'I': [\r\n        [1, 1, 1],\r\n        [, 1],\r\n        [, 1],\r\n        [, 1],\r\n        [1, 1, 1]\r\n    ],\r\n    'J': [\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [, , 1],\r\n        [1, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    'K': [\r\n        [1, , , 1],\r\n        [1, , 1],\r\n        [1, 1],\r\n        [1, , 1],\r\n        [1, , , 1]\r\n    ],\r\n    'L': [\r\n        [1],\r\n        [1],\r\n        [1],\r\n        [1],\r\n        [1, 1, 1]\r\n    ],\r\n    'M': [\r\n        [1, 1, 1, 1, 1],\r\n        [1, , 1, , 1],\r\n        [1, , 1, , 1],\r\n        [1, , , , 1],\r\n        [1, , , , 1]\r\n    ],\r\n    'N': [\r\n        [1, , , 1],\r\n        [1, 1, , 1],\r\n        [1, , 1, 1],\r\n        [1, , , 1],\r\n        [1, , , 1]\r\n    ],\r\n    'O': [\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    'P': [\r\n        [1, 1, 1,],\r\n        [1, , 1,],\r\n        [1, 1, 1,],\r\n        [1, , ,],\r\n        [1, , ,]\r\n    ],\r\n    'Q': [\r\n        [0, 1, 1],\r\n        [1, , , 1],\r\n        [1, , , 1],\r\n        [1, , 1, 1],\r\n        [1, 1, 1, 1]\r\n    ],\r\n    'R': [\r\n        [1, 1],\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, 1],\r\n        [1, , 1]\r\n    ],\r\n    'S': [\r\n        [1, 1, 1],\r\n        [1],\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    'T': [\r\n        [1, 1, 1],\r\n        [, 1],\r\n        [, 1],\r\n        [, 1],\r\n        [, 1]\r\n    ],\r\n    'U': [\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    'V': [\r\n        [1, , , , 1],\r\n        [1, , , , 1],\r\n        [, 1, , 1],\r\n        [, 1, , 1],\r\n        [, , 1]\r\n    ],\r\n    'W': [\r\n        [1, , , , 1],\r\n        [1, , , , 1],\r\n        [1, , , , 1],\r\n        [1, , 1, , 1],\r\n        [1, 1, 1, 1, 1]\r\n    ],\r\n    'X': [\r\n        [1, , , , 1],\r\n        [, 1, , 1],\r\n        [, , 1],\r\n        [, 1, , 1],\r\n        [1, , , , 1]\r\n    ],\r\n    'Y': [\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [, 1],\r\n        [, 1],\r\n        [, 1]\r\n    ],\r\n    'Z': [\r\n        [1, 1, 1, 1, 1],\r\n        [, , , 1],\r\n        [, , 1],\r\n        [, 1],\r\n        [1, 1, 1, 1, 1]\r\n    ],\r\n    ' ': [\r\n        [, ,],\r\n        [, ,],\r\n        [, ,],\r\n        [, ,],\r\n        [, ,]\r\n    ],\r\n    ':': [\r\n        [1,],\r\n        [,],\r\n        [,],\r\n        [,],\r\n        [1,],\r\n    ]\r\n};\r\nfunction drawPixelFont(ctx, str, x, y, block_size, color_str = \"#161616\") {\r\n    ctx.fillStyle = color_str;\r\n    let x_cord = x;\r\n    let x_inter = x;\r\n    let sentence = str.toUpperCase();\r\n    for (let i = 0; i < str.length; i++) {\r\n        let pxlArr = PixelFont[sentence[i]];\r\n        let y_cord = y;\r\n        x_cord = x_inter;\r\n        let j = 0;\r\n        for (j = 0; j < pxlArr.length; j++) {\r\n            x_cord = x_inter;\r\n            for (let k = 0; k < pxlArr[j].length; k++) {\r\n                if (pxlArr[j][k]) {\r\n                    ctx.fillRect(x_cord, y_cord, block_size, block_size);\r\n                }\r\n                x_cord += block_size;\r\n            }\r\n            y_cord += block_size;\r\n        }\r\n        x_inter += (block_size * (pxlArr[j - 1].length + 1));\r\n    }\r\n}\r\nfunction drawX(ctx, color, x, y, side_length) {\r\n    ctx.strokeStyle = color;\r\n    let offset = 12;\r\n    ctx.beginPath();\r\n    ctx.lineWidth = 5;\r\n    ctx.moveTo(x + offset, y + offset);\r\n    ctx.lineTo(x + side_length - offset, y + side_length - offset);\r\n    ctx.stroke();\r\n    ctx.moveTo(x + side_length - offset, y + offset);\r\n    ctx.lineTo(x + offset, y + side_length - offset);\r\n    ctx.stroke();\r\n    ctx.closePath();\r\n    ctx.lineWidth = 0;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/shape.ts?");

/***/ })

/******/ });