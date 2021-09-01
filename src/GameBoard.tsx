import { FixedSizeGrid as Grid } from "react-window";
import { Cell } from "./Cell";
import { Dispatch } from "react";
import { GameSettings } from "./App";

export const GameBoard = ({
  gameSettings,
  boardState,
  gameStep,
  UpdateGameStep,
  flagsLeft,
  updateFlagCount,
  updateRevealedCells,
}: {
  gameSettings: GameSettings;
  boardState: Int8Array;
  gameStep: number;
  UpdateGameStep: Dispatch<number>;
  flagsLeft: number;
  updateFlagCount: Dispatch<number>;
  updateRevealedCells: (value: number) => void;
}) => {
  return (
    <Grid
      columnCount={gameSettings.columnCount}
      rowCount={gameSettings.rowCount}
      columnWidth={40}
      rowHeight={40}
      height={40 * 10}
      width={40 * 10}
      overscanCount={10}
    >
      {(props) =>
        Cell({
          ...props,
          UpdateGameStep,
          gameStep,
          boardState: boardState as Int8Array,
          gameSettings: gameSettings,
          flagsLeft,
          updateFlagCount,
          updateRevealedCells,
        })
      }
    </Grid>
  );
};
