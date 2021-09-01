import classNames from "classnames";
import { Dispatch, MouseEventHandler, useCallback } from "react";
import { GridChildComponentProps } from "react-window";
import { GameSettings } from "./App";
import { FLAG, GAME_OVER, UNREVEALED_MINE } from "./constants";
import { get1Dindex, isReveald, isAdjustedMines, isFlag } from "./helpers";
import { setFlag, updateBoard } from "./updateBoard";

export const Cell = ({
  columnIndex,
  rowIndex,
  style,
  UpdateGameStep,
  gameStep,
  boardState,
  gameSettings,
  flagsLeft,
  updateFlagCount,
  updateRevealedCells,
}: GridChildComponentProps & {
  UpdateGameStep: Dispatch<number>;
  gameStep: number;
  boardState: Int8Array;
  gameSettings: GameSettings;
  flagsLeft: number;
  updateFlagCount: Dispatch<number>;
  updateRevealedCells: (value: number) => void;
}) => {
  const gridIndex = get1Dindex(rowIndex, columnIndex, gameSettings);
  const value = boardState[gridIndex];

  const cellClassNames = {
    Cell__Revealed: isReveald(value),
    Cell__Mine:
      (value === UNREVEALED_MINE || value === UNREVEALED_MINE + FLAG) &&
      gameStep === GAME_OVER,
    Cell__Flagged: isFlag(value) && gameStep !== GAME_OVER,
  };

  const clickHendler: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    const gridIndex = get1Dindex(rowIndex, columnIndex, gameSettings);
    const value = boardState[gridIndex];
    if (gameStep === GAME_OVER) return;
    if (value === UNREVEALED_MINE) {
      UpdateGameStep(GAME_OVER);
      return;
    }
    updateBoard(rowIndex, columnIndex, boardState, gameSettings, updateRevealedCells);
    UpdateGameStep(gameStep + 1);
  }, [
    rowIndex,
    columnIndex,
    gameStep,
    updateRevealedCells,
    UpdateGameStep,
    boardState,
    gameSettings,
  ]);

  const ringhtClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (gameStep === GAME_OVER) return;
      const flagDiff = setFlag(
        rowIndex,
        columnIndex,
        boardState,
        gameSettings,
        flagsLeft
      );
      updateFlagCount(flagsLeft - flagDiff);
      UpdateGameStep(gameStep + 1);
    },
    [
      rowIndex,
      columnIndex,
      gameStep,
      flagsLeft,
      updateFlagCount,
      UpdateGameStep,
      boardState,
      gameSettings,
    ]
  );

  return (
    <div
      onClick={clickHendler}
      onContextMenu={ringhtClick}
      className={classNames("Cell", cellClassNames)}
      style={style}
    >
      {isFlag(value) ? "F" : null}
      {isAdjustedMines(value) ? value : null}
    </div>
  );
};
