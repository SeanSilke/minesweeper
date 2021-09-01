export const UNREVEALED_MINE = -1;
export const UNREVEALED_EMPTY_CELL = 0;
export const REVEALED_BLANK_CELL_NO_ADJACENT_MINES = 10;
export const FLAG = 101;

export const GAME_OVER = -1;

export const NEIGHBORS_RELATIVE_COORDINATES = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

// This is slightly better than go in all 8 directions
export const TRAVERSE_DIRECTIONS = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

export const Status = {
  IN_PROGRESS: "IN_PROGRESS",
  WIN: "WIN",
  LOSE: "LOSE",
  ERROR: 'Unexpected game state'
};
