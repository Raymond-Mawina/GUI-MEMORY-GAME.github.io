class Tile {
  constructor(
    position,
    possibleBackgroundImage,
    backgroundImage,
    backgroundColor,
    state
  ) {
    this.position = position;
    this.possibleBackgroundImage = possibleBackgroundImage;
    this.backgroundImage = backgroundImage;
    this.backgroundColor = backgroundColor;
    this.state = state;
  }

  changeStateOfTile(state) {
    this.state = state;
  }

  changeBackgroundImageOfTile() {
    this.backgroundImage = this.possibleBackgroundImage;
  }

  changeBackgroundColorOfTile(backgroundColor) {
    this.backgroundColor = backgroundColor;
  }
}

class Game {
  constructor(boardSize = 16) {
    this.boardSize = boardSize;
    this.tiles = [];
    this.imageNames = [
      "antman.png",
      "batman.png",
      "capamerica.png",
      "hulk.png",
      "ironman.png",
      "lantern.png",
      "loki.png",
      "msmarvel.png",
    ];
    this.seconds = 0;
  }

  setUpTiles(size) {
    this.boardSize = size;
    this.tiles = [];
    const newer = [];
    while (newer.length !== this.boardSize) {
      const random = Math.floor(Math.random() * (this.boardSize / 2));
      if (newer.filter((data) => data === this.imageNames[random]).length < 2) {
        newer.push(this.imageNames[random]);
      }
    }
    for (let i = 0; i < newer.length; i++) {
      this.tiles.push(new Tile(i, newer[i], "", "aliceblue", "unflipped"));
    }
  }

  allTilesAreMatched() {
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].state !== "matched") return false;
    }
    return true;
  }

  twoTilesAreMatched() {
    const flippedTiles = this.tiles.filter((tile) => tile.state === "flipped");
    if (
      flippedTiles.length === 2 &&
      flippedTiles[0].backgroundImage === flippedTiles[1].backgroundImage
    ) {
      return true;
    }
    return false;
  }

  getFlippedTiles() {
    return this.tiles.filter((tile) => tile.state === "flipped");
  }
}

module.exports = { Tile, Game };
