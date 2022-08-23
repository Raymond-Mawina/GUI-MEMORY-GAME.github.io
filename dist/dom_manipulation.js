/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom_manipulation.js":
/*!*********************************!*\
  !*** ./src/dom_manipulation.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Game } = __webpack_require__(/*! ./memory_game */ \"./src/memory_game.js\");\r\nconst { helper_variable } = __webpack_require__(/*! ./helper_variables */ \"./src/helper_variables.js\");\r\n\r\nlet gameSession = new Game();\r\nlet interval = null;\r\n\r\nfunction setUpGameCanvas(rows, cols) {\r\n  helper_variable.canvas.innerHTML = \"\";\r\n  helper_variable.canvas.id = \"canvas\";\r\n  helper_variable.newGameButton.style.display = \"block\";\r\n  helper_variable.chooseSize.style.display = \"none\";\r\n  helper_variable.canvas.style.display = \"grid\";\r\n  helper_variable.canvas.style.gridTemplateColumns =\r\n    \"repeat(\" + cols + \", 52px)\";\r\n  helper_variable.canvas.style.gridTemplateRows = \"repeat(\" + rows + \", 52px)\";\r\n  gameSession.setUpTiles(rows * cols);\r\n\r\n  for (const tile of gameSession.tiles) {\r\n    const domTile = document.createElement(\"div\");\r\n    domTile.id = tile.position;\r\n    domTile.className = \"tiles\";\r\n    domTile.style.backgroundColor = tile.backgroundColor;\r\n    domTile.style.backgroundImage = tile.backgroundImage;\r\n    domTile.style.backgroundSize = \"52px 52px\";\r\n    helper_variable.canvas.appendChild(domTile);\r\n  }\r\n\r\n  for (const tile of helper_variable.tiles) {\r\n    tile.addEventListener(\"click\", handleClickEvent, false);\r\n  }\r\n\r\n  helper_variable.newGameButton.addEventListener(\r\n    \"click\",\r\n    () => {\r\n      location.reload();\r\n    },\r\n    false\r\n  );\r\n}\r\n\r\nfunction gameSetUp() {\r\n  const rows = document.getElementById(\"rows\").value;\r\n  const cols = document.getElementById(\"cols\").value;\r\n\r\n  if (\r\n    rows > 0 &&\r\n    cols > 0 &&\r\n    rows <= 4 &&\r\n    cols <= 4 &&\r\n    (rows * cols) % 2 === 0\r\n  ) {\r\n    interval = setInterval(() => {\r\n      gameSession.seconds++;\r\n    }, 1000);\r\n    return setUpGameCanvas(rows, cols);\r\n  } else {\r\n    if (rows > 4 || cols > 4) {\r\n      helper_variable.errorMessage.innerText =\r\n        \"Error!!! The rows or/and columns must be less that 4 in value\";\r\n    } else if (rows <= 0 || cols <= 0) {\r\n      helper_variable.errorMessage.innerText =\r\n        \"Error!!! Rows or Columns cannot be zero(0)\";\r\n    } else {\r\n      helper_variable.errorMessage.innerText =\r\n        \"Error!!! The total number of grid tiles must be an even number\";\r\n    }\r\n  }\r\n}\r\n\r\nfunction handleTwoFlippedTiles() {\r\n  if (gameSession.twoTilesAreMatched()) {\r\n    for (const tile of gameSession.getFlippedTiles()) {\r\n      helper_variable.tiles[tile.position].style.backgroundImage = \"\";\r\n      helper_variable.tiles[tile.position].style.backgroundColor = \"green\";\r\n      tile.changeStateOfTile(\"matched\");\r\n      helper_variable.tiles[tile.position].removeEventListener(\r\n        \"click\",\r\n        handleClickEvent,\r\n        false\r\n      );\r\n    }\r\n  } else {\r\n    for (const tile of gameSession.getFlippedTiles()) {\r\n      helper_variable.tiles[tile.position].style.backgroundImage = \"\";\r\n      tile.backgroundImage = \"\";\r\n      tile.changeStateOfTile(\"unflipped\");\r\n    }\r\n  }\r\n\r\n  if (gameSession.allTilesAreMatched()) {\r\n    const timeDisplay = document.getElementById(\"time-to-completion\");\r\n    clearInterval(interval);\r\n    let finalTime = gameSession.seconds;\r\n    console.log(finalTime);\r\n    let minutes = 0;\r\n    while (finalTime >= 60) {\r\n      minutes++;\r\n      finalTime -= 60;\r\n    }\r\n\r\n    timeDisplay.innerText = `Game completed in ${minutes} minutes ${finalTime} seconds`;\r\n    helper_variable.messageDiv.innerText = \"You win!! Game Over\";\r\n  }\r\n}\r\n\r\nfunction handleClickEvent() {\r\n  if (\r\n    gameSession.tiles[this.id].state !== \"matched\" &&\r\n    gameSession.getFlippedTiles().length <= 2\r\n  )\r\n    gameSession.tiles[this.id].changeStateOfTile(\"flipped\");\r\n\r\n  if (gameSession.getFlippedTiles().length <= 2) {\r\n    this.style.backgroundImage = `url(./img/${\r\n      gameSession.tiles[this.id].possibleBackgroundImage\r\n    })`;\r\n    gameSession.tiles[this.id].changeBackgroundImageOfTile();\r\n\r\n    if (gameSession.getFlippedTiles().length === 2) {\r\n      setTimeout(() => {\r\n        handleTwoFlippedTiles();\r\n      }, 500);\r\n    }\r\n  }\r\n}\r\n\r\ndocument\r\n  .getElementById(\"game-time\")\r\n  .addEventListener(\"click\", gameSetUp, false);\r\n\r\nmodule.exports = { gameSession };\r\n\n\n//# sourceURL=webpack://raymond-mawina-222-memory-game-in-vanilla-js-javascript/./src/dom_manipulation.js?");

/***/ }),

/***/ "./src/helper_variables.js":
/*!*********************************!*\
  !*** ./src/helper_variables.js ***!
  \*********************************/
/***/ ((module) => {

eval("const helper_variable = {\r\n  canvas: document.getElementById(\"canvas\"),\r\n  messageDiv: document.getElementById(\"message\"),\r\n  tiles: document.getElementsByClassName(\"tiles\"),\r\n  newGameButton: document.getElementById(\"new-game\"),\r\n  chooseSize: document.getElementById(\"choose-size\"),\r\n  errorMessage: document.getElementById(\"error-message\"),\r\n};\r\n\r\nmodule.exports = { helper_variable };\r\n\n\n//# sourceURL=webpack://raymond-mawina-222-memory-game-in-vanilla-js-javascript/./src/helper_variables.js?");

/***/ }),

/***/ "./src/memory_game.js":
/*!****************************!*\
  !*** ./src/memory_game.js ***!
  \****************************/
/***/ ((module) => {

eval("class Tile {\r\n  constructor(\r\n    position,\r\n    possibleBackgroundImage,\r\n    backgroundImage,\r\n    backgroundColor,\r\n    state\r\n  ) {\r\n    this.position = position;\r\n    this.possibleBackgroundImage = possibleBackgroundImage;\r\n    this.backgroundImage = backgroundImage;\r\n    this.backgroundColor = backgroundColor;\r\n    this.state = state;\r\n  }\r\n\r\n  changeStateOfTile(state) {\r\n    this.state = state;\r\n  }\r\n\r\n  changeBackgroundImageOfTile() {\r\n    this.backgroundImage = this.possibleBackgroundImage;\r\n  }\r\n\r\n  changeBackgroundColorOfTile(backgroundColor) {\r\n    this.backgroundColor = backgroundColor;\r\n  }\r\n}\r\n\r\nclass Game {\r\n  constructor(boardSize = 16) {\r\n    this.boardSize = boardSize;\r\n    this.tiles = [];\r\n    this.imageNames = [\r\n      \"antman.png\",\r\n      \"batman.png\",\r\n      \"capamerica.png\",\r\n      \"hulk.png\",\r\n      \"ironman.png\",\r\n      \"lantern.png\",\r\n      \"loki.png\",\r\n      \"msmarvel.png\",\r\n    ];\r\n    this.seconds = 0;\r\n  }\r\n\r\n  setUpTiles(size) {\r\n    this.boardSize = size;\r\n    this.tiles = [];\r\n    const newer = [];\r\n    while (newer.length !== this.boardSize) {\r\n      const random = Math.floor(Math.random() * (this.boardSize / 2));\r\n      if (newer.filter((data) => data === this.imageNames[random]).length < 2) {\r\n        newer.push(this.imageNames[random]);\r\n      }\r\n    }\r\n    for (let i = 0; i < newer.length; i++) {\r\n      this.tiles.push(new Tile(i, newer[i], \"\", \"aliceblue\", \"unflipped\"));\r\n    }\r\n  }\r\n\r\n  allTilesAreMatched() {\r\n    for (let i = 0; i < this.tiles.length; i++) {\r\n      if (this.tiles[i].state !== \"matched\") return false;\r\n    }\r\n    return true;\r\n  }\r\n\r\n  twoTilesAreMatched() {\r\n    const flippedTiles = this.tiles.filter((tile) => tile.state === \"flipped\");\r\n    if (\r\n      flippedTiles.length === 2 &&\r\n      flippedTiles[0].backgroundImage === flippedTiles[1].backgroundImage\r\n    ) {\r\n      return true;\r\n    }\r\n    return false;\r\n  }\r\n\r\n  getFlippedTiles() {\r\n    return this.tiles.filter((tile) => tile.state === \"flipped\");\r\n  }\r\n}\r\n\r\nmodule.exports = { Tile, Game };\r\n\n\n//# sourceURL=webpack://raymond-mawina-222-memory-game-in-vanilla-js-javascript/./src/memory_game.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/dom_manipulation.js");
/******/ 	
/******/ })()
;