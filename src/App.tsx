import { useMemo, useState } from "react";
import "./App.css";
import { GameOptions, startNewGame } from "./utils/gameLoop";
import { GAME_WIDTH_PX } from "./constants";

function useStartGame(canvas: HTMLCanvasElement | null) {
  const gameOptions = useMemo<GameOptions | undefined>(() => {
    const context = canvas?.getContext("2d");

    if (!context) {
      return undefined;
    }

    return {
      context,
      onScoreUpdate: (score) => console.log("score", score),
      onGameOver: () => {},
    };
  }, [canvas]);

  return useMemo(() => {
    if (!gameOptions) {
      return null;
    }

    return () => startNewGame(gameOptions);
  }, [gameOptions]);
}

function App() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const start = useStartGame(canvas);

  return (
    <>
      <button onClick={() => start?.()}>Start</button>
      <canvas
        width={GAME_WIDTH_PX}
        height={GAME_WIDTH_PX}
        id="gameCanvas"
        ref={setCanvas}
      />
    </>
  );
}

export default App;
