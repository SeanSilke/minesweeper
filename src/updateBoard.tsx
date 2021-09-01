import Queue from "yocto-queue";
import { curry } from "lodash";
import { GameSettings } from "./App";
import {
  get1Dindex,
  getValue,
  isAdjustedMines,
  isFlag,
  isOuToFBound,
} from "./helpers";
import {
  FLAG,
  NEIGHBORS_RELATIVE_COORDINATES,
  REVEALED_BLANK_CELL_NO_ADJACENT_MINES,
  TRAVERSE_DIRECTIONS,
  UNREVEALED_MINE,
} from "./constants";

export function updateBoard(
  rowIndex: number,
  columnIndex: number,
  gameState: Int8Array,
  gameSettings: GameSettings,
  updateRevealedCells: (value: number) => void
) {
  const localGetValue = curry(getValue)(
    curry.placeholder,
    curry.placeholder,
    gameState,
    gameSettings
  );

  console.time("updateBoard");
  const queue: Queue<[number, number]> = new Queue();
  queue.enqueue([rowIndex, columnIndex]);
  let currentNumberOfRevealedCells = 0;

  function doChunk() {
    const startTime = Date.now();
    while (queue.size > 0) {
      let [rowIndex, columnIndex] = queue.dequeue()!;

      if (isOuToFBound(rowIndex, columnIndex, gameSettings)) {
        continue;
      }

      const gridIndex = get1Dindex(rowIndex, columnIndex, gameSettings);
      const value = gameState[gridIndex];

      if (value === UNREVEALED_MINE) continue;
      if (isAdjustedMines(value)) continue;
      // If you click on the flag, or encountered it through traversal nothing will happen
      //   as in https://minesweeperonline.com/
      // This is different from the task but makes more sense
      if (isFlag(value)) continue;
      if (value === REVEALED_BLANK_CELL_NO_ADJACENT_MINES) continue;

      gameState[gridIndex] = REVEALED_BLANK_CELL_NO_ADJACENT_MINES;
      currentNumberOfRevealedCells++;

      let adjacentMines = 0;

      for (let i = 0; i < NEIGHBORS_RELATIVE_COORDINATES.length; i++) {
        const [dCol, dRow] = NEIGHBORS_RELATIVE_COORDINATES[i];
        const neiborRowIndex = rowIndex + dRow;
        const neiborColumnINdex = columnIndex + dCol;

        if (isOuToFBound(neiborRowIndex, neiborColumnINdex, gameSettings)) {
          continue;
        }
        let localValue = localGetValue(neiborRowIndex, neiborColumnINdex);
        if (
          localValue === UNREVEALED_MINE ||
          localValue === UNREVEALED_MINE + FLAG
        ) {
          adjacentMines++;
        }
      }

      if (adjacentMines > 0) {
        gameState[gridIndex] = adjacentMines;
        continue;
      }

      for (let [dCol, dRow] of TRAVERSE_DIRECTIONS) {
        queue.enqueue([rowIndex + dRow, columnIndex + dCol]);
      }

      if (Date.now() - startTime > 16) { // 16 ms for 60fps
        setTimeout(doChunk, 1);
        return;
      }
    }
    console.timeEnd("updateBoard");
    updateRevealedCells(currentNumberOfRevealedCells);
  }

  doChunk();
}

export function setFlag(
  rowIndex: number,
  columnIndex: number,
  gameState: Int8Array,
  gameSettings: GameSettings,
  flagsLeft: number
): number {
  const grid1DIndex = get1Dindex(rowIndex, columnIndex, gameSettings);
  const value = gameState[grid1DIndex];

  if (isAdjustedMines(value)) return 0;
  if (value === REVEALED_BLANK_CELL_NO_ADJACENT_MINES) return 0;

  if (value > 10) {
    gameState[grid1DIndex] -= FLAG;
    return -1;
  } else if (flagsLeft > 0) {
    gameState[grid1DIndex] += FLAG;
    return 1;
  }
  return 0;
}
