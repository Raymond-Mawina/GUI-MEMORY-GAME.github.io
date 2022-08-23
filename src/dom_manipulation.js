const { Game } = require("./memory_game");
const { helper_variable } = require("./helper_variables");

let gameSession = new Game();
let interval = null;

function setUpGameCanvas(rows, cols) {
  helper_variable.canvas.innerHTML = "";
  helper_variable.canvas.id = "canvas";
  helper_variable.newGameButton.style.display = "block";
  helper_variable.chooseSize.style.display = "none";
  helper_variable.canvas.style.display = "grid";
  helper_variable.canvas.style.gridTemplateColumns =
    "repeat(" + cols + ", 52px)";
  helper_variable.canvas.style.gridTemplateRows = "repeat(" + rows + ", 52px)";
  gameSession.setUpTiles(rows * cols);

  for (const tile of gameSession.tiles) {
    const domTile = document.createElement("div");
    domTile.id = tile.position;
    domTile.className = "tiles";
    domTile.style.backgroundColor = tile.backgroundColor;
    domTile.style.backgroundImage = tile.backgroundImage;
    domTile.style.backgroundSize = "52px 52px";
    helper_variable.canvas.appendChild(domTile);
  }

  for (const tile of helper_variable.tiles) {
    tile.addEventListener("click", handleClickEvent, false);
  }

  helper_variable.newGameButton.addEventListener(
    "click",
    () => {
      location.reload();
    },
    false
  );
}

function gameSetUp() {
  const rows = document.getElementById("rows").value;
  const cols = document.getElementById("cols").value;

  if (
    rows > 0 &&
    cols > 0 &&
    rows <= 4 &&
    cols <= 4 &&
    (rows * cols) % 2 === 0
  ) {
    interval = setInterval(() => {
      gameSession.seconds++;
    }, 1000);
    return setUpGameCanvas(rows, cols);
  } else {
    if (rows > 4 || cols > 4) {
      helper_variable.errorMessage.innerText =
        "Error!!! The rows or/and columns must be less that 4 in value";
    } else if (rows <= 0 || cols <= 0) {
      helper_variable.errorMessage.innerText =
        "Error!!! Rows or Columns cannot be zero(0)";
    } else {
      helper_variable.errorMessage.innerText =
        "Error!!! The total number of grid tiles must be an even number";
    }
  }
}

function handleTwoFlippedTiles() {
  if (gameSession.twoTilesAreMatched()) {
    for (const tile of gameSession.getFlippedTiles()) {
      helper_variable.tiles[tile.position].style.backgroundImage = "";
      helper_variable.tiles[tile.position].style.backgroundColor = "green";
      tile.changeStateOfTile("matched");
      helper_variable.tiles[tile.position].removeEventListener(
        "click",
        handleClickEvent,
        false
      );
    }
  } else {
    for (const tile of gameSession.getFlippedTiles()) {
      helper_variable.tiles[tile.position].style.backgroundImage = "";
      tile.backgroundImage = "";
      tile.changeStateOfTile("unflipped");
    }
  }

  if (gameSession.allTilesAreMatched()) {
    const timeDisplay = document.getElementById("time-to-completion");
    clearInterval(interval);
    let finalTime = gameSession.seconds;
    console.log(finalTime);
    let minutes = 0;
    while (finalTime >= 60) {
      minutes++;
      finalTime -= 60;
    }

    timeDisplay.innerText = `Game completed in ${minutes} minutes ${finalTime} seconds`;
    helper_variable.messageDiv.innerText = "You win!! Game Over";
  }
}

function handleClickEvent() {
  if (
    gameSession.tiles[this.id].state !== "matched" &&
    gameSession.getFlippedTiles().length <= 2
  )
    gameSession.tiles[this.id].changeStateOfTile("flipped");

  if (gameSession.getFlippedTiles().length <= 2) {
    this.style.backgroundImage = `url(./img/${
      gameSession.tiles[this.id].possibleBackgroundImage
    })`;
    gameSession.tiles[this.id].changeBackgroundImageOfTile();

    if (gameSession.getFlippedTiles().length === 2) {
      setTimeout(() => {
        handleTwoFlippedTiles();
      }, 500);
    }
  }
}

document
  .getElementById("game-time")
  .addEventListener("click", gameSetUp, false);

module.exports = { gameSession };
