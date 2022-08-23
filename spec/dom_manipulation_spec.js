const jsdom = require("jsdom");
const fs = require("fs");
const index = fs.readFileSync("index.html", "utf8");
const { JSDOM } = jsdom;
const { document } = new JSDOM(index).window;
global.document = document;

const { helper_variable } = require("./spec_helper_variables");
helper_variable.rows.value = 4;
helper_variable.cols.value = 4;

let { gameSession } = require("../src/dom_manipulation");

describe("gameSetUp", function () {
  it("should change the add 16 tiles to the canvas", function () {
    helper_variable.gameTime.click();
    expect(helper_variable.tiles.length).toEqual(16);
  });

  it("should hide the chooseSize form and update the gameSession properties", function () {
    helper_variable.gameTime.click();
    expect(gameSession.tiles.length).toEqual(16);
    expect(helper_variable.newGame.style.display).toEqual("block");
    expect(helper_variable.chooseSize.style.display).toEqual("none");
  });

  it("should change the canvas display to grid and change columns and rows to 4", function () {
    helper_variable.gameTime.click();
    expect(helper_variable.canvas.style.display).toEqual("grid");
    expect(helper_variable.canvas.style.gridTemplateColumns).toEqual(
      "repeat(4, 52px)"
    );
    expect(helper_variable.canvas.style.gridTemplateColumns).toEqual(
      "repeat(4, 52px)"
    );
  });
});

describe("revealTileImage", function () {
  beforeEach(function () {
    helper_variable.gameTime.click();
    jasmine.clock().install();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it("should remain flipped and display images on two tiles, which match were clicked one after another", function () {
    const positionsToClick = [];
    const matchingTiles = gameSession.tiles.filter(
      (tile) => tile.possibleBackgroundImage === "batman.png"
    );

    for (let i = 0; i < 2; i++) {
      positionsToClick.push(matchingTiles[i].position);
      helper_variable.tiles[positionsToClick[i]].click();
    }

    jasmine.clock().tick(501);

    expect(
      helper_variable.tiles[positionsToClick[0]].style.backgroundImage
    ).toBe(helper_variable.tiles[positionsToClick[1]].style.backgroundImage);

    for (let i = 0; i < 2; i++) {
      expect(
        helper_variable.tiles[positionsToClick[i]].style.backgroundColor
      ).toBe("green");
    }
  });

  it("should revert back to aliceblue background and have no image displayed on tiles, which do not match are clicked one after another", function () {
    const positionsToClick = [];
    positionsToClick.push(
      gameSession.tiles.filter(
        (tile) => tile.possibleBackgroundImage === "hulk.png"
      )[0].position
    );
    positionsToClick.push(
      gameSession.tiles.filter(
        (tile) => tile.possibleBackgroundImage === "ironman.png"
      )[0].position
    );

    for (let i = 0; i < 2; i++) {
      helper_variable.tiles[positionsToClick[i]].click();
    }

    jasmine.clock().tick(501);
    for (let i = 0; i < 2; i++) {
      expect(
        helper_variable.tiles[positionsToClick[i]].style.backgroundImage
      ).toBe("");
      expect(
        helper_variable.tiles[positionsToClick[i]].style.backgroundColor
      ).toBe("aliceblue");
    }
  });
});
