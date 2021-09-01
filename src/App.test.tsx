import { curry } from "lodash";
import { UNREVEALED_EMPTY_CELL, UNREVEALED_MINE } from "./constants";
import { get1Dindex, getValue, isFlag, setValue } from "./helpers";
import { initGame } from "./initGame";
import { setFlag, updateBoard } from "./updateBoard";

test("Set flag", () => {
  const rowIndex = 2;
  const columnIndex = 3;
  const flagsLeft = 1;
  const gameSettings = { columnCount: 5, rowCount: 5, minesCount: 1 };

  const game = initGame(gameSettings);

  setFlag(rowIndex, columnIndex, game, gameSettings, flagsLeft);
  expect(isFlag(game[get1Dindex(rowIndex, columnIndex, gameSettings)]));
});

describe("updateBoard", () => {
  const gameSettings = { columnCount: 4, rowCount: 3, minesCount: 2 };
  const rowIndex = 1;
  const columnIndex = 2;
  const seedArray = new Array(
    gameSettings.columnCount * gameSettings.rowCount
  ).fill(UNREVEALED_EMPTY_CELL);
  const gameState = new Int8Array(seedArray);
  const _ = curry.placeholder;
  const localSetValue = curry(setValue)(_, _, _, gameState, gameSettings);
  const localGetValue = curry(getValue)(_, _, gameState, gameSettings);

  localSetValue(UNREVEALED_MINE, rowIndex, columnIndex + 1);
  localSetValue(UNREVEALED_MINE, rowIndex, columnIndex - 1);

  test("set Correct number of cell adjacent mines", () => {
    updateBoard(rowIndex, columnIndex, gameState, gameSettings, jest.fn());
    expect(localGetValue(rowIndex, columnIndex)).toEqual(2);
  });

  test("flag on mine is also considered", () => {
    localSetValue(UNREVEALED_EMPTY_CELL, rowIndex, columnIndex);
    setFlag(rowIndex, columnIndex - 1, gameState, gameSettings, 1);

    updateBoard(rowIndex, columnIndex, gameState, gameSettings, jest.fn());
    expect(localGetValue(rowIndex, columnIndex)).toEqual(2);
  });
});
