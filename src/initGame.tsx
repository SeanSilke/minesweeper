import { UNREVEALED_EMPTY_CELL, UNREVEALED_MINE } from "./constants";
import { GameSettings } from "./App";

export function initGame({ columnCount, rowCount, minesCount }: GameSettings) {
  console.time("init Array");

  const buffer = new ArrayBuffer(columnCount * rowCount);

  const gameState: Int8Array = new Int8Array(buffer).fill(
    UNREVEALED_EMPTY_CELL
  );
  console.timeEnd("init Array");

  for (let i = 0; i < minesCount; i++) {
    gameState[i] = UNREVEALED_MINE;
  }

  // Fisher–Yates shuffle. Time complexity O(n)
  // Blocking for now. Need to implement progress indication
  //  and block game board while non block shuffle. 
  //   can use same approach "doChunk" as in updateBoard
  function shuffle(array: Int8Array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  console.time("shuffle");
  shuffle(gameState);
  console.timeEnd("shuffle");
  return gameState;
}
