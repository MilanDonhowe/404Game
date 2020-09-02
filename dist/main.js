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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CanvasManager\", function() { return CanvasManager; });\n/* harmony import */ var _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputManager.ts */ \"./src/InputManager.ts\");\n/* harmony import */ var _entity_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity.ts */ \"./src/entity.ts\");\n\r\n\r\nclass CanvasManager {\r\n    constructor() {\r\n        CanvasManager.canvas = document.getElementById('screen');\r\n        CanvasManager.context = CanvasManager.canvas.getContext(\"2d\");\r\n        CanvasManager.entity_pool = [];\r\n        this.input_queue = [];\r\n    }\r\n    static load_entity_grid(lvl) {\r\n        const block_size = 64;\r\n        console.log(lvl);\r\n        CanvasManager.context.canvas.height = lvl.row * block_size;\r\n        CanvasManager.context.canvas.width = lvl.col * block_size;\r\n        let pos;\r\n        if (lvl.blocks) {\r\n            for (let i = 0; i < lvl.blocks.length; i++) {\r\n                pos = [lvl.blocks[i][0], lvl.blocks[i][1]];\r\n                console.log(`Adding new block @ ${pos[0]}, ${pos[1]}`);\r\n                CanvasManager.entity_pool.push(new _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"Block\"](pos));\r\n            }\r\n        }\r\n        for (let i = 0; i < lvl.tile_values.length; i++) {\r\n            pos = [lvl.tile_cords[i][0], lvl.tile_cords[i][1]];\r\n            console.log(`Adding new tile @ ${pos[0]}, ${pos[1]}`);\r\n            CanvasManager.entity_pool.push(new _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"Tile\"](pos, lvl.tile_values[i]));\r\n        }\r\n        if (lvl.holes) {\r\n            for (let i = 0; i < lvl.holes.length; i++) {\r\n                pos = [lvl.holes[i][0], lvl.holes[i][1]];\r\n                CanvasManager.entity_pool.push(new _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"Hole\"](pos));\r\n            }\r\n        }\r\n        console.log(\"Successfully loaded level into entity pool!\");\r\n    }\r\n    cls() {\r\n        CanvasManager.context.fillStyle = \"#dddddd\";\r\n        CanvasManager.context.fillRect(0, 0, CanvasManager.context.canvas.width, CanvasManager.context.canvas.height);\r\n    }\r\n    step(inp) {\r\n        if (CanvasManager.step_entities) {\r\n            if (inp != _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].NOTHING) {\r\n                this.input_queue.push(inp);\r\n            }\r\n            if (!this.busy() && (this.input_queue.length > 0)) {\r\n                this.use_input();\r\n            }\r\n            for (let i = 0; i < CanvasManager.entity_pool.length; i++) {\r\n                CanvasManager.entity_pool[i].step();\r\n            }\r\n        }\r\n        else {\r\n            CanvasManager.entity_pool[CanvasManager.entity_pool.length - 1].step();\r\n        }\r\n    }\r\n    use_input() {\r\n        const input = this.input_queue.shift();\r\n        switch (input) {\r\n            case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].UP:\r\n                CanvasManager.entity_pool.sort((e1, e2) => e1.coordinates[1] - e2.coordinates[1]);\r\n                break;\r\n            case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].DOWN:\r\n                CanvasManager.entity_pool.sort((e1, e2) => -1 * (e1.coordinates[1] - e2.coordinates[1]));\r\n                break;\r\n            case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].LEFT:\r\n                CanvasManager.entity_pool.sort((e1, e2) => e1.coordinates[0] - e2.coordinates[0]);\r\n                break;\r\n            case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].RIGHT:\r\n                CanvasManager.entity_pool.sort((e1, e2) => -1 * (e1.coordinates[0] - e2.coordinates[0]));\r\n                break;\r\n        }\r\n        for (let i = 0; i < CanvasManager.entity_pool.length; i++) {\r\n            let resp = CanvasManager.entity_pool[i].ask({ type: _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"RequestType\"].Move, dir: input });\r\n        }\r\n    }\r\n    draw() {\r\n        this.cls();\r\n        for (let i = 0; i < CanvasManager.entity_pool.length; i++) {\r\n            CanvasManager.entity_pool[i].draw(CanvasManager.context);\r\n        }\r\n    }\r\n    busy() {\r\n        for (let i = 0; i < CanvasManager.entity_pool.length; i++) {\r\n            let entity_status = CanvasManager.entity_pool[i].ask({ type: _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"RequestType\"].Status });\r\n            if (entity_status.type == _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"ResponseType\"].Busy) {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    }\r\n    static entityAt(x, y) {\r\n        for (let i = 0; i < CanvasManager.entity_pool.length; i++) {\r\n            if (CanvasManager.entity_pool[i].coordinates[0] == x && CanvasManager.entity_pool[i].coordinates[1] == y) {\r\n                return i;\r\n            }\r\n        }\r\n        return -1;\r\n    }\r\n    static checkBorderCollision(cords) {\r\n        if (cords[0] > CanvasManager.canvas.width - 64 || cords[0] < 0) {\r\n            return true;\r\n        }\r\n        if (cords[1] > CanvasManager.canvas.height - 64 || cords[1] < 0) {\r\n            return true;\r\n        }\r\n        return false;\r\n    }\r\n    static delAt(index) {\r\n        console.log(`Deleting Object @ ${index}`);\r\n        CanvasManager.entity_pool.splice(index, 1);\r\n    }\r\n}\r\nCanvasManager.step_entities = true;\r\n\n\n//# sourceURL=webpack:///./src/CanvasManager.ts?");

/***/ }),

/***/ "./src/GameManager.ts":
/*!****************************!*\
  !*** ./src/GameManager.ts ***!
  \****************************/
/*! exports provided: GameState, GameManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameState\", function() { return GameState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameManager\", function() { return GameManager; });\n/* harmony import */ var _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasManager.ts */ \"./src/CanvasManager.ts\");\n/* harmony import */ var _entity_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity.ts */ \"./src/entity.ts\");\n/* harmony import */ var _levels_level_1_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./levels/level_1.json */ \"./src/levels/level_1.json\");\nvar _levels_level_1_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./levels/level_1.json */ \"./src/levels/level_1.json\", 1);\n/* harmony import */ var _levels_level_2_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./levels/level_2.json */ \"./src/levels/level_2.json\");\nvar _levels_level_2_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./levels/level_2.json */ \"./src/levels/level_2.json\", 1);\n\r\n\r\n\r\n\r\nvar GameState;\r\n(function (GameState) {\r\n    GameState[GameState[\"LEVEL_LOSS\"] = 0] = \"LEVEL_LOSS\";\r\n    GameState[GameState[\"LEVEL_WIN\"] = 1] = \"LEVEL_WIN\";\r\n    GameState[GameState[\"LEVEL_ONGOING\"] = 2] = \"LEVEL_ONGOING\";\r\n    GameState[GameState[\"GAME_WIN\"] = 3] = \"GAME_WIN\";\r\n    GameState[GameState[\"LEVEL_TRANSITION_START\"] = 4] = \"LEVEL_TRANSITION_START\";\r\n    GameState[GameState[\"LEVEL_TRANSITION_LOAD_1\"] = 5] = \"LEVEL_TRANSITION_LOAD_1\";\r\n    GameState[GameState[\"LEVEL_TRANISITION_LOAD_2\"] = 6] = \"LEVEL_TRANISITION_LOAD_2\";\r\n    GameState[GameState[\"LEVEL_TRANSITION_END\"] = 7] = \"LEVEL_TRANSITION_END\";\r\n})(GameState || (GameState = {}));\r\n;\r\nclass GameManager {\r\n    constructor() {\r\n        this.current_level = 0;\r\n        this.level_arr = [_levels_level_1_json__WEBPACK_IMPORTED_MODULE_2__, _levels_level_2_json__WEBPACK_IMPORTED_MODULE_3__];\r\n    }\r\n    get_level() {\r\n        return this.level_arr[this.current_level];\r\n    }\r\n    get_next_level() {\r\n        if (this.current_level < this.level_arr.length) {\r\n            this.current_level++;\r\n        }\r\n        return this.get_level();\r\n    }\r\n    load_next_level() {\r\n        _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool = [];\r\n        _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].load_entity_grid(this.get_next_level());\r\n    }\r\n    step() {\r\n        switch (GameManager.STATE) {\r\n            case GameState.LEVEL_ONGOING:\r\n                for (let i = 0; i < _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool.length; i++) {\r\n                    let e_score = _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool[i].ask({ type: _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"RequestType\"].Points });\r\n                    if (e_score.success_value == 404) {\r\n                        _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool.push(new _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"TransitionBegin\"](_CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].context.canvas.width));\r\n                        _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].step_entities = false;\r\n                        GameManager.STATE = GameState.LEVEL_TRANSITION_START;\r\n                        break;\r\n                    }\r\n                }\r\n                break;\r\n            case GameState.LEVEL_TRANSITION_LOAD_1:\r\n                this.load_next_level();\r\n                _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool.push(new _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"TransitionEnd\"](_CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].context.canvas.width));\r\n                GameManager.STATE = GameState.LEVEL_TRANISITION_LOAD_2;\r\n                break;\r\n            case GameState.LEVEL_TRANSITION_END:\r\n                GameManager.STATE = GameState.LEVEL_ONGOING;\r\n                _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].step_entities = true;\r\n                _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].delAt(_CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].entity_pool.length - 1);\r\n                break;\r\n        }\r\n    }\r\n}\r\nGameManager.STATE = GameState.LEVEL_ONGOING;\r\n;\r\n\n\n//# sourceURL=webpack:///./src/GameManager.ts?");

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

/***/ "./src/entity.ts":
/*!***********************!*\
  !*** ./src/entity.ts ***!
  \***********************/
/*! exports provided: RequestType, EntityType, ResponseType, Block, Tile, Hole, TransitionBegin, TransitionEnd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RequestType\", function() { return RequestType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EntityType\", function() { return EntityType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ResponseType\", function() { return ResponseType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Block\", function() { return Block; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tile\", function() { return Tile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Hole\", function() { return Hole; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TransitionBegin\", function() { return TransitionBegin; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TransitionEnd\", function() { return TransitionEnd; });\n/* harmony import */ var _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputManager.ts */ \"./src/InputManager.ts\");\n/* harmony import */ var _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasManager.ts */ \"./src/CanvasManager.ts\");\n/* harmony import */ var _shape_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shape.ts */ \"./src/shape.ts\");\n/* harmony import */ var _GameManager_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GameManager.ts */ \"./src/GameManager.ts\");\n\r\n\r\n\r\n\r\nconst colors = {\r\n    404: \"#f7be54\",\r\n    202: \"#f76c54\",\r\n    101: \"#54b3f7\",\r\n    50.5: \"#e284f9\",\r\n    25.25: \"#def754\"\r\n};\r\nvar RequestType;\r\n(function (RequestType) {\r\n    RequestType[RequestType[\"Move\"] = 0] = \"Move\";\r\n    RequestType[RequestType[\"Merge\"] = 1] = \"Merge\";\r\n    RequestType[RequestType[\"Status\"] = 2] = \"Status\";\r\n    RequestType[RequestType[\"ID\"] = 3] = \"ID\";\r\n    RequestType[RequestType[\"Points\"] = 4] = \"Points\";\r\n})(RequestType || (RequestType = {}));\r\n;\r\nvar EntityType;\r\n(function (EntityType) {\r\n    EntityType[EntityType[\"BLOCK\"] = 0] = \"BLOCK\";\r\n    EntityType[EntityType[\"TILE\"] = 1] = \"TILE\";\r\n    EntityType[EntityType[\"HOLE\"] = 2] = \"HOLE\";\r\n})(EntityType || (EntityType = {}));\r\n;\r\n;\r\nvar ResponseType;\r\n(function (ResponseType) {\r\n    ResponseType[ResponseType[\"Busy\"] = 0] = \"Busy\";\r\n    ResponseType[ResponseType[\"Free\"] = 1] = \"Free\";\r\n    ResponseType[ResponseType[\"Success\"] = 2] = \"Success\";\r\n    ResponseType[ResponseType[\"ERROR\"] = 3] = \"ERROR\";\r\n    ResponseType[ResponseType[\"ID\"] = 4] = \"ID\";\r\n})(ResponseType || (ResponseType = {}));\r\n;\r\nclass Block {\r\n    constructor(pos) {\r\n        this.coordinates = [pos[0] * 64, pos[1] * 64];\r\n    }\r\n    ask(req) {\r\n        if (req.type == RequestType.ID) {\r\n            return { type: ResponseType.ID, success_value: EntityType.BLOCK };\r\n        }\r\n        return { type: ResponseType.ERROR };\r\n    }\r\n    draw(ctx) {\r\n        Object(_shape_ts__WEBPACK_IMPORTED_MODULE_2__[\"fillRoundRect\"])(ctx, this.coordinates[0], this.coordinates[1], 64, 64, \"#9b9b9b\");\r\n    }\r\n    ;\r\n    step() { }\r\n    ;\r\n}\r\nclass Tile extends Block {\r\n    constructor(pos, points) {\r\n        super(pos);\r\n        this.score = points;\r\n        this.moving = false;\r\n        this.dir = _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].NOTHING;\r\n    }\r\n    ask(req) {\r\n        switch (req.type) {\r\n            case RequestType.Move:\r\n                this.moving = true;\r\n                this.dir = req.dir;\r\n                return { type: ResponseType.Success };\r\n                break;\r\n            case RequestType.Merge:\r\n                this.score += req.add;\r\n                break;\r\n            case RequestType.Status:\r\n                if (this.moving) {\r\n                    return { type: ResponseType.Busy };\r\n                }\r\n                else {\r\n                    return { type: ResponseType.Free };\r\n                }\r\n                break;\r\n            case RequestType.ID:\r\n                return { type: ResponseType.ID, success_value: EntityType.TILE };\r\n                break;\r\n            case RequestType.Points:\r\n                return { type: ResponseType.Success, success_value: this.score };\r\n                break;\r\n        }\r\n        return { type: ResponseType.ERROR };\r\n    }\r\n    draw(ctx) {\r\n        Object(_shape_ts__WEBPACK_IMPORTED_MODULE_2__[\"fillRoundRect\"])(ctx, this.coordinates[0], this.coordinates[1], 64, 64, colors[this.score]);\r\n        const p_size = 3;\r\n        Object(_shape_ts__WEBPACK_IMPORTED_MODULE_2__[\"drawPixelNumbers\"])(ctx, String(this.score), this.coordinates[0] + 14, this.coordinates[1] + 24, p_size);\r\n    }\r\n    step() {\r\n        if (this.moving && this.dir != _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].NOTHING) {\r\n            let new_pos = [this.coordinates[0], this.coordinates[1]];\r\n            let possible_entity_pos = [new_pos[0], new_pos[1]];\r\n            switch (this.dir) {\r\n                case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].UP:\r\n                    new_pos[1] -= Tile.magnitude;\r\n                    possible_entity_pos[1] -= 64;\r\n                    break;\r\n                case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].DOWN:\r\n                    new_pos[1] += Tile.magnitude;\r\n                    possible_entity_pos[1] += 64;\r\n                    break;\r\n                case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].LEFT:\r\n                    new_pos[0] -= Tile.magnitude;\r\n                    possible_entity_pos[0] -= 64;\r\n                    break;\r\n                case _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].RIGHT:\r\n                    new_pos[0] += Tile.magnitude;\r\n                    possible_entity_pos[0] += 64;\r\n                    break;\r\n            }\r\n            let status = [-1, -1];\r\n            if (_CanvasManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"CanvasManager\"].checkBorderCollision(new_pos)) {\r\n                status[0] = 1;\r\n            }\r\n            else {\r\n                status = this.check_entity_collisions(possible_entity_pos);\r\n            }\r\n            switch (status[0]) {\r\n                case 1:\r\n                    this.moving = false;\r\n                    this.dir = _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].NOTHING;\r\n                    break;\r\n                case 2:\r\n                    break;\r\n                case 3:\r\n                    this.score *= 2;\r\n                    _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"CanvasManager\"].delAt(status[1]);\r\n                    console.log(`this.score = ${this.score}`);\r\n                    break;\r\n                case 4:\r\n                    this.coordinates = new_pos;\r\n                    break;\r\n            }\r\n        }\r\n    }\r\n    check_entity_collisions(cords) {\r\n        let e_index = _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"CanvasManager\"].entityAt(cords[0], cords[1]);\r\n        if (e_index == -1)\r\n            return [4, -1];\r\n        let e_type = _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"CanvasManager\"].entity_pool[e_index].ask({ type: RequestType.ID }).success_value;\r\n        let return_tuple = [4, e_index];\r\n        switch (e_type) {\r\n            case EntityType.BLOCK:\r\n                return_tuple[0] = 1;\r\n                break;\r\n            case EntityType.HOLE:\r\n                return_tuple[0] = 2;\r\n                break;\r\n            case EntityType.TILE:\r\n                let e_value = _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"CanvasManager\"].entity_pool[e_index].ask({ type: RequestType.Points }).success_value;\r\n                return_tuple[0] = (e_value == this.score) ? 3 : 1;\r\n        }\r\n        return return_tuple;\r\n    }\r\n}\r\nTile.magnitude = 8;\r\nclass Hole extends Block {\r\n    ask(req) {\r\n        if (req.type == RequestType.ID) {\r\n            return { type: ResponseType.ID, success_value: EntityType.HOLE };\r\n        }\r\n        return { type: ResponseType.ERROR };\r\n    }\r\n}\r\nclass TransitionBegin {\r\n    constructor(diagonal) {\r\n        this.state = 0;\r\n        this.complete = diagonal;\r\n        this.coordinates = [0, 0];\r\n    }\r\n    ask(req) {\r\n        return { type: ResponseType.ERROR };\r\n    }\r\n    ;\r\n    draw(ctx) {\r\n        ctx.fillStyle = \"#000000\";\r\n        ctx.fillRect(0, 0, this.state, this.state);\r\n    }\r\n    ;\r\n    step() {\r\n        if (this.state < this.complete) {\r\n            this.state += 24;\r\n        }\r\n        else {\r\n            _GameManager_ts__WEBPACK_IMPORTED_MODULE_3__[\"GameManager\"].STATE = _GameManager_ts__WEBPACK_IMPORTED_MODULE_3__[\"GameState\"].LEVEL_TRANSITION_LOAD_1;\r\n        }\r\n    }\r\n    ;\r\n}\r\nclass TransitionEnd extends TransitionBegin {\r\n    step() {\r\n        if (this.complete > this.state) {\r\n            console.log(\"MOVING\");\r\n            this.complete -= 24;\r\n        }\r\n        else {\r\n            _GameManager_ts__WEBPACK_IMPORTED_MODULE_3__[\"GameManager\"].STATE = _GameManager_ts__WEBPACK_IMPORTED_MODULE_3__[\"GameState\"].LEVEL_TRANSITION_END;\r\n        }\r\n    }\r\n    ;\r\n    draw(ctx) {\r\n        ctx.fillStyle = \"#000000\";\r\n        ctx.fillRect(0, 0, this.complete, this.complete);\r\n    }\r\n    ;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/entity.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasManager.ts */ \"./src/CanvasManager.ts\");\n/* harmony import */ var _InputManager_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InputManager.ts */ \"./src/InputManager.ts\");\n/* harmony import */ var _GameManager_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameManager.ts */ \"./src/GameManager.ts\");\n/* harmony import */ var _levels_level_test_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./levels/level_test.json */ \"./src/levels/level_test.json\");\nvar _levels_level_test_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./levels/level_test.json */ \"./src/levels/level_test.json\", 1);\n\r\n\r\n\r\n\r\nconst cnv = new _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"]();\r\nconst inp = new _InputManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"InputManager\"]();\r\nconst gm = new _GameManager_ts__WEBPACK_IMPORTED_MODULE_2__[\"GameManager\"]();\r\ndocument.addEventListener('keydown', inp);\r\ndocument.addEventListener('keyup', inp);\r\nconst lvl = _levels_level_test_json__WEBPACK_IMPORTED_MODULE_3__;\r\n_CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"].load_entity_grid(gm.get_level());\r\nsetInterval((e) => {\r\n    gm.step();\r\n    cnv.step(inp.step());\r\n    cnv.draw();\r\n}, 16);\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/levels/level_1.json":
/*!*********************************!*\
  !*** ./src/levels/level_1.json ***!
  \*********************************/
/*! exports provided: row, col, blocks, tile_cords, tile_values, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"row\\\":6,\\\"col\\\":6,\\\"blocks\\\":[],\\\"tile_cords\\\":[[2,2],[4,2]],\\\"tile_values\\\":[202,202]}\");\n\n//# sourceURL=webpack:///./src/levels/level_1.json?");

/***/ }),

/***/ "./src/levels/level_2.json":
/*!*********************************!*\
  !*** ./src/levels/level_2.json ***!
  \*********************************/
/*! exports provided: row, col, blocks, tile_cords, tile_values, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"row\\\":6,\\\"col\\\":6,\\\"blocks\\\":[[3,2],[0,0],[5,5]],\\\"tile_cords\\\":[[2,2],[4,2],[0,1],[4,5]],\\\"tile_values\\\":[202,101,50.5,50.5]}\");\n\n//# sourceURL=webpack:///./src/levels/level_2.json?");

/***/ }),

/***/ "./src/levels/level_test.json":
/*!************************************!*\
  !*** ./src/levels/level_test.json ***!
  \************************************/
/*! exports provided: row, col, blocks, tile_cords, tile_values, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"row\\\":4,\\\"col\\\":4,\\\"blocks\\\":[[1,2],[3,3]],\\\"tile_cords\\\":[[0,0],[2,0],[1,0],[2,3]],\\\"tile_values\\\":[202,101,50.5,50.5]}\");\n\n//# sourceURL=webpack:///./src/levels/level_test.json?");

/***/ }),

/***/ "./src/shape.ts":
/*!**********************!*\
  !*** ./src/shape.ts ***!
  \**********************/
/*! exports provided: roundRect, fillRoundRect, drawPixelNumbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"roundRect\", function() { return roundRect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fillRoundRect\", function() { return fillRoundRect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawPixelNumbers\", function() { return drawPixelNumbers; });\nfunction roundRect(ctx, x, y, w, h) {\r\n    const c = 15;\r\n    ctx.beginPath();\r\n    ctx.moveTo(x, y + c);\r\n    ctx.quadraticCurveTo(x, y, x + c, y);\r\n    ctx.lineTo(x + w - c, y);\r\n    ctx.quadraticCurveTo(x + w, y, x + w, y + c);\r\n    ctx.lineTo(x + w, y + h - c);\r\n    ctx.quadraticCurveTo(x + w, y + h, x + w - c, y + h);\r\n    ctx.lineTo(x + c, y + h);\r\n    ctx.quadraticCurveTo(x, y + h, x, y + h - c);\r\n    ctx.lineTo(x, y + c);\r\n    ctx.closePath();\r\n    ctx.stroke();\r\n}\r\nfunction fillRoundRect(ctx, x, y, w, h, style) {\r\n    ctx.strokeStyle = style;\r\n    roundRect(ctx, x, y, w, h);\r\n    ctx.fillStyle = style;\r\n    ctx.fill();\r\n}\r\nconst NumericFont = {\r\n    '.': [\r\n        [,],\r\n        [,],\r\n        [,],\r\n        [,],\r\n        [1,]\r\n    ],\r\n    '0': [\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    '1': [\r\n        [, 1,],\r\n        [1, 1,],\r\n        [, 1,],\r\n        [, 1,],\r\n        [1, 1, 1]\r\n    ],\r\n    '2': [\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [1, 1, 1],\r\n        [1, ,],\r\n        [1, 1, 1]\r\n    ],\r\n    '3': [\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    '4': [\r\n        [1, , 1],\r\n        [1, , 1],\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [, , 1]\r\n    ],\r\n    '5': [\r\n        [1, 1, 1],\r\n        [1, ,],\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    '6': [\r\n        [1, 1, 1],\r\n        [1, ,],\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    '7': [\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [, , 1],\r\n        [, , 1],\r\n        [, , 1]\r\n    ],\r\n    '8': [\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, 1, 1]\r\n    ],\r\n    '9': [\r\n        [1, 1, 1],\r\n        [1, , 1],\r\n        [1, 1, 1],\r\n        [, , 1],\r\n        [1, 1, 1]\r\n    ]\r\n};\r\nfunction drawPixelNumbers(ctx, numstr, x, y, block_size) {\r\n    const num_color = \"#161616\";\r\n    ctx.fillStyle = num_color;\r\n    let x_cord = x;\r\n    let x_inter = x;\r\n    for (let i = 0; i < numstr.length; i++) {\r\n        let pxlArr = NumericFont[numstr[i]];\r\n        let y_cord = y;\r\n        x_cord = x_inter;\r\n        let j = 0;\r\n        for (j = 0; j < pxlArr.length; j++) {\r\n            x_cord = x_inter;\r\n            for (let k = 0; k < pxlArr[j].length; k++) {\r\n                if (pxlArr[j][k]) {\r\n                    ctx.fillRect(x_cord, y_cord, block_size, block_size);\r\n                }\r\n                x_cord += block_size;\r\n            }\r\n            y_cord += block_size;\r\n        }\r\n        x_inter += (block_size * (pxlArr[j - 1].length + 1));\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/shape.ts?");

/***/ })

/******/ });