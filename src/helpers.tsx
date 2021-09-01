import { GameSettings } from "./App";
import { REVEALED_BLANK_CELL_NO_ADJACENT_MINES } from "./constants";

export function isReveald(value: number) {
  return (
    value === REVEALED_BLANK_CELL_NO_ADJACENT_MINES || isAdjustedMines(value)
  );
}

export function isOuToFBound(
  rowIndex: number,
  columnIndex: number,
  gameSettings: GameSettings
) {
  return (
    rowIndex < 0 ||
    rowIndex >= gameSettings.rowCount ||
    columnIndex < 0 ||
    columnIndex >= gameSettings.columnCount
  );
}

export function isAdjustedMines(value: number) {
  return value > 0 && value < 9;
}

export function isFlag(value: number) {
  return value >= 100;
}

export function get1Dindex(
  rowIndex: number,
  columnIndex: number,
  gameSettings: GameSettings
) {
  return gameSettings.columnCount * rowIndex + columnIndex;
}

export function getValue(
  rowIndex: number,
  columnIndex: number,
  gameState: Int8Array,
  gameSettings: GameSettings
) {
  const grid1DIndex = get1Dindex(rowIndex, columnIndex, gameSettings);
  return gameState[grid1DIndex];
}

export function setValue(
  value: number,
  rowIndex: number,
  columnIndex: number,
  gameState: Int8Array,
  gameSettings: GameSettings
) {
  const grid1DIndex = get1Dindex(rowIndex, columnIndex, gameSettings);
  gameState[grid1DIndex] = value;
}
