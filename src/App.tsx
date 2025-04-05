import { useMemo, useState } from "react";
import "./App.css";
import { GameOptions, initGameLoop } from "./utils/gameLoop";

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

    return initGameLoop(gameOptions);
  }, [gameOptions]);
}

function App() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const start = useStartGame(canvas);

  return (
    <>
      <button onClick={() => start?.()}>Start</button>
      <canvas width={500} height={500} id="gameCanvas" ref={setCanvas} />
    </>
  );
}

export default App;
