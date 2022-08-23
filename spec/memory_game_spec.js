const { Tile, Game } = require("../src/memory_game");

const gameObj = new Game();
gameObj.setUpTiles(gameObj.boardSize);
const tileObj = new Tile(1, "meta.png", "", "aliceblue", "unflipped");

describe("Tile class's changeBackgroundColor", function () {
  it("should change backgroundColor property", function () {
    expect(tileObj.backgroundColor).toBe("aliceblue");
    tileObj.changeBackgroundColorOfTile("green");
    expect(tileObj.backgroundColor).toBe("green");
  });
});

describe("Tile class's changeStateOfTile", function () {
  it("should change state property", function () {
    expect(tileObj.state).toBe("unflipped");
    tileObj.changeStateOfTile("flipped");
    expect(tileObj.state).toBe("flipped");
  });
});

describe("Tile class's changeBackgroundImage", function () {
  it("should change backgroundImage property", function () {
    expect(tileObj.backgroundImage).toBe("");
    tileObj.changeBackgroundImageOfTile();
    expect(tileObj.backgroundImage).toBe(tileObj.possibleBackgroundImage);
  });
});

describe("Game class's setUpTiles", function () {
  it("should change the size of property boardSize", function () {
    gameObj.setUpTiles(16);
    expect(gameObj.boardSize).toEqual(16);
  });
  it("should push 16 Tile objects to the property array tiles", function () {
    gameObj.setUpTiles(16);
    expect(gameObj.tiles.length).toEqual(16);
    for (const tile of gameObj.tiles) {
      expect(tile.constructor.name).toEqual("Tile");
      expect(Object.getOwnPropertyNames(tile)).toEqual([
        "position",
        "possibleBackgroundImage",
        "backgroundImage",
        "backgroundColor",
        "state",
      ]);
    }
  });
});

describe("Game class's getFlippedTiles", function () {
  afterAll(function () {
    gameObj.tiles[0].changeStateOfTile("unflipped");
  });
  it("should an array of Tile object", function () {
    expect(gameObj.getFlippedTiles()).toEqual([]);
    gameObj.tiles[0].changeStateOfTile("flipped");
    expect(gameObj.getFlippedTiles()).toEqual([gameObj.tiles[0]]);
  });
});

describe("Game class's twoTilesAreMatched", function () {
  afterAll(function () {
    for (const tile of gameObj.tiles) {
      if (tile.possibleBackgroundImage === "hulk.png") {
        tile.changeStateOfTile("unflipped");
        tile.changeBackgroundColorOfTile("aliceblue");
      }
    }
  });

  it("should an return a boolean true or false", function () {
    expect(gameObj.twoTilesAreMatched()).toBe(false);
    for (const tile of gameObj.tiles) {
      if (tile.possibleBackgroundImage === "hulk.png") {
        tile.changeStateOfTile("flipped");
        tile.changeBackgroundColorOfTile("green");
      }
    }
    expect(gameObj.twoTilesAreMatched()).toBe(true);
  });
});

describe("Game class's allTilesAreMatched", function () {
  afterAll(function () {
    for (const tile of gameObj.tiles) {
      tile.changeStateOfTile("unflipped");
      tile.changeBackgroundColorOfTile("aliceblue");
    }
  });
  it("should return a boolean true or false", function () {
    expect(gameObj.allTilesAreMatched()).toBe(false);
    for (const tile of gameObj.tiles) {
      tile.changeStateOfTile("matched");
      tile.changeBackgroundColorOfTile("green");
    }
    expect(gameObj.allTilesAreMatched()).toBe(true);
  });
});
