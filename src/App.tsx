import "./App.css";
import { ChangeEvent, useState } from "react";
import { GameBoard } from "./GameBoard";
import { initGame } from "./initGame";
import { Status } from "./constants";

export type GameSettings = {
  columnCount: number;
  rowCount: number;
  minesCount: number;
};

function App() {
  const initialGameSettings = {
    columnCount: 10,
    rowCount: 10,
    minesCount: 25,
  };

  const [revealedCells, setRrevealedCells] = useState(0);
  const [boardState, setBoardState] = useState(initGame(initialGameSettings));
  const [gameStep, UpdateGameStep] = useState(1);
  const [inputsState, setInputsState] = useState(initialGameSettings);
  const [gameSettings, setGameSettings] = useState(initialGameSettings);
  const [flagsLeft, updateFlagCount] = useState(gameSettings.minesCount);

  const updateRevealedCells = (n: number) => {
    setRrevealedCells(revealedCells + n);
  };

  const onStartButtonClick = () => {
    setGameSettings(inputsState);
    setBoardState(initGame(inputsState));
    updateFlagCount(inputsState.minesCount);
    UpdateGameStep(1);
    setRrevealedCells(0);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    setInputsState({
      ...inputsState,
      [e.target.name]: isNaN(value) ? 0 : value,
    });
  };

  const getGameStatus = () => {
    if (
      revealedCells ===
      gameSettings.columnCount * gameSettings.rowCount - gameSettings.minesCount
    ) {
      return Status.WIN;
    }
    if (gameStep < 0) return Status.LOSE;
    if (gameStep > 0) return Status.IN_PROGRESS;
    return Status.ERROR;
  };

  return (
    <div className="App">
      <div className="Row">
        {/* Unfortunately there is no validation yet */}
        <div className="Input">
          <span> Rows</span>
          <input
            onChange={handleInputChange}
            name="rowCount"
            value={inputsState.rowCount}
          />
        </div>
        <div className="Input">
          <span> Columns</span>
          <input
            onChange={handleInputChange}
            name="columnCount"
            value={inputsState.columnCount}
          />
        </div>

        <div className="Input">
          <span> Mines</span>
          <input
            onChange={handleInputChange}
            name="minesCount"
            value={inputsState.minesCount}
          />
        </div>
      </div>

      <button onClick={onStartButtonClick} className="Button__Start">
         😊
      </button>
      <div className="Row">
        <span> Status : {getGameStatus()}</span>
        <span> Flags left: {flagsLeft} </span>
      </div>

      <GameBoard
        {...{
          gameSettings,
          boardState,
          gameStep,
          UpdateGameStep,
          flagsLeft,
          updateFlagCount,
          updateRevealedCells,
        }}
      />
    </div>
  );
}

export default App;
