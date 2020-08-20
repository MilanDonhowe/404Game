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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CanvasManager\", function() { return CanvasManager; });\n/* harmony import */ var _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputManager.ts */ \"./src/InputManager.ts\");\n/* harmony import */ var _entity_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity.ts */ \"./src/entity.ts\");\n\r\n\r\nclass CanvasManager {\r\n    constructor() {\r\n        this.canvas = document.getElementById('screen');\r\n        this.context = this.canvas.getContext(\"2d\");\r\n        this.entity_pool = [];\r\n        this.input_queue = [];\r\n    }\r\n    load_entity_grid(lvl) {\r\n        const block_size = 64;\r\n        console.log(lvl);\r\n        this.context.canvas.height = lvl.row * block_size;\r\n        this.context.canvas.width = lvl.col * block_size;\r\n        let pos;\r\n        if (lvl.blocks) {\r\n            for (let i = 0; i < lvl.blocks.length; i++) {\r\n                pos = [lvl.blocks[i][0], lvl.blocks[i][1]];\r\n                console.log(`Adding new block @ ${pos[0]}, ${pos[1]}`);\r\n                this.entity_pool.push(new _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"Block\"](pos));\r\n            }\r\n        }\r\n        for (let i = 0; i < lvl.tile_values.length; i++) {\r\n            pos = [lvl.tile_cords[i][0], lvl.tile_cords[i][1]];\r\n            console.log(`Adding new tile @ ${pos[0]}, ${pos[1]}`);\r\n            this.entity_pool.push(new _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"Tile\"](pos, lvl.tile_values[i]));\r\n        }\r\n        if (lvl.holes) {\r\n            for (let i = 0; i < lvl.holes.length; i++) {\r\n                pos = [lvl.holes[i][0], lvl.holes[i][1]];\r\n                this.entity_pool.push(new _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"Hole\"](pos));\r\n            }\r\n        }\r\n        console.log(\"Successfully loaded level into entity pool!\");\r\n    }\r\n    cls() {\r\n        this.context.fillStyle = \"#000000\";\r\n        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);\r\n    }\r\n    step(inp) {\r\n        if (inp != _InputManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"INPUT\"].NOTHING) {\r\n            console.log(\"Adding item to the input queue!\");\r\n            this.input_queue.push(inp);\r\n        }\r\n        if (!this.busy() && (this.input_queue.length > 0)) {\r\n            this.use_input();\r\n        }\r\n    }\r\n    use_input() {\r\n        const input = this.input_queue.shift();\r\n        for (let i = 0; i < this.entity_pool.length; i++) {\r\n            let resp = this.entity_pool[i].ask({ option: _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"RequestType\"].Move, dir: input });\r\n        }\r\n    }\r\n    draw() {\r\n        this.cls();\r\n        for (let i = 0; i < this.entity_pool.length; i++) {\r\n            this.entity_pool[i].draw(this.context);\r\n        }\r\n    }\r\n    move(dir) {\r\n    }\r\n    busy() {\r\n        for (let i = 0; i < this.entity_pool.length; i++) {\r\n            let entity_status = this.entity_pool[i].ask({ option: _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"RequestType\"].Status });\r\n            if (entity_status.type == _entity_ts__WEBPACK_IMPORTED_MODULE_1__[\"EntityResponseType\"].Busy) {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/CanvasManager.ts?");

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
/*! exports provided: RequestType, EntityType, EntityResponseType, Block, Tile, Hole */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RequestType\", function() { return RequestType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EntityType\", function() { return EntityType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EntityResponseType\", function() { return EntityResponseType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Block\", function() { return Block; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tile\", function() { return Tile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Hole\", function() { return Hole; });\nfunction entityAT(location, pool) {\r\n    let x = location[0];\r\n    let y = location[1];\r\n    return false;\r\n}\r\nvar RequestType;\r\n(function (RequestType) {\r\n    RequestType[RequestType[\"Move\"] = 0] = \"Move\";\r\n    RequestType[RequestType[\"Merge\"] = 1] = \"Merge\";\r\n    RequestType[RequestType[\"Status\"] = 2] = \"Status\";\r\n    RequestType[RequestType[\"ID\"] = 3] = \"ID\";\r\n})(RequestType || (RequestType = {}));\r\n;\r\nvar EntityType;\r\n(function (EntityType) {\r\n    EntityType[EntityType[\"BLOCK\"] = 0] = \"BLOCK\";\r\n    EntityType[EntityType[\"TILE\"] = 1] = \"TILE\";\r\n    EntityType[EntityType[\"HOLE\"] = 2] = \"HOLE\";\r\n})(EntityType || (EntityType = {}));\r\n;\r\n;\r\nvar EntityResponseType;\r\n(function (EntityResponseType) {\r\n    EntityResponseType[EntityResponseType[\"Busy\"] = 0] = \"Busy\";\r\n    EntityResponseType[EntityResponseType[\"Free\"] = 1] = \"Free\";\r\n    EntityResponseType[EntityResponseType[\"Success\"] = 2] = \"Success\";\r\n    EntityResponseType[EntityResponseType[\"ERROR\"] = 3] = \"ERROR\";\r\n    EntityResponseType[EntityResponseType[\"ID\"] = 4] = \"ID\";\r\n})(EntityResponseType || (EntityResponseType = {}));\r\n;\r\nclass Block {\r\n    constructor(pos) {\r\n        this.coordinates = [this.x = pos[0] * 64, this.y = pos[1] * 64];\r\n    }\r\n    ask(req) {\r\n        if (req.option == RequestType.ID) {\r\n            return { type: EntityResponseType.ID, success_value: EntityType.BLOCK };\r\n        }\r\n        return { type: EntityResponseType.ERROR };\r\n    }\r\n    draw(ctx) {\r\n        ctx.fillStyle = \"#FFFFFF\";\r\n        ctx.fillRect(this.x, this.y, 64, 64);\r\n    }\r\n    ;\r\n}\r\nclass Tile extends Block {\r\n    constructor(pos, points) {\r\n        super(pos);\r\n        this.score = points;\r\n        this.moving = true;\r\n    }\r\n    ask(req) {\r\n        switch (req.option) {\r\n            case RequestType.Move:\r\n                return { type: EntityResponseType.Success };\r\n                break;\r\n            case RequestType.Merge:\r\n                this.score += req.add;\r\n                break;\r\n            case RequestType.Status:\r\n                if (this.moving) {\r\n                    return { type: EntityResponseType.Busy };\r\n                }\r\n                else {\r\n                    return { type: EntityResponseType.Free };\r\n                }\r\n                break;\r\n            case RequestType.ID:\r\n                return { type: EntityResponseType.ID, success_value: EntityType.TILE };\r\n                break;\r\n        }\r\n        return { type: EntityResponseType.ERROR };\r\n    }\r\n    draw(ctx) {\r\n        ctx.fillStyle = \"#FF0000\";\r\n        ctx.fillRect(this.coordinates[0], this.coordinates[1], 64, 64);\r\n    }\r\n    Move(dir, mag) {\r\n    }\r\n}\r\nclass Hole extends Block {\r\n    ask(req) {\r\n        if (req.option == RequestType.ID) {\r\n            return { type: EntityResponseType.ID, success_value: EntityType.HOLE };\r\n        }\r\n        return { type: EntityResponseType.ERROR };\r\n    }\r\n}\r\nfunction roundSquare(ctx, x, y, w, h) {\r\n    ctx.beginPath();\r\n    ctx.moveTo(x, y + 10);\r\n    ctx.quadraticCurveTo(x, y, x + 10, y);\r\n    ctx.lineTo(x + w - 10, y);\r\n    ctx.quadraticCurveTo(x + w, y, x + w, y - 10);\r\n    ctx.lineTo(x + w, y + h - 10);\r\n    ctx.quadraticCurveTo(x + w, y + h, x + w - 10, y + h);\r\n    ctx.moveTo(x - 10, y + h);\r\n    ctx.quadraticCurveTo(x, y + h, x, y + h - 10);\r\n    ctx.closePath();\r\n    ctx.stroke();\r\n}\r\nfunction fillRoundSquare(ctx, x, y, w, h, style) {\r\n    roundSquare(ctx, x, y, w, h);\r\n    ctx.fillStyle = style;\r\n    ctx.fill();\r\n}\r\n\n\n//# sourceURL=webpack:///./src/entity.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasManager.ts */ \"./src/CanvasManager.ts\");\n/* harmony import */ var _InputManager_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InputManager.ts */ \"./src/InputManager.ts\");\n/* harmony import */ var _levels_level_test_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./levels/level_test.json */ \"./src/levels/level_test.json\");\nvar _levels_level_test_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./levels/level_test.json */ \"./src/levels/level_test.json\", 1);\n\r\n\r\n\r\nconst cnv = new _CanvasManager_ts__WEBPACK_IMPORTED_MODULE_0__[\"CanvasManager\"]();\r\nconst inp = new _InputManager_ts__WEBPACK_IMPORTED_MODULE_1__[\"InputManager\"]();\r\ndocument.addEventListener('keydown', inp);\r\ndocument.addEventListener('keyup', inp);\r\nconst lvl = _levels_level_test_json__WEBPACK_IMPORTED_MODULE_2__;\r\ncnv.load_entity_grid(_levels_level_test_json__WEBPACK_IMPORTED_MODULE_2__);\r\nsetInterval((e) => {\r\n    cnv.step(inp.step());\r\n    cnv.draw();\r\n}, 16);\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/levels/level_test.json":
/*!************************************!*\
  !*** ./src/levels/level_test.json ***!
  \************************************/
/*! exports provided: row, col, blocks, tile_cords, tile_values, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"row\\\":4,\\\"col\\\":4,\\\"blocks\\\":[[1,2],[3,3]],\\\"tile_cords\\\":[[0,0],[2,0],[1,0],[2,3]],\\\"tile_values\\\":[100,100,2,2]}\");\n\n//# sourceURL=webpack:///./src/levels/level_test.json?");

/***/ })

/******/ });