import { renderGameState } from "./gameRenderer";
import { initGameState, updateGameState } from "./gameState";

const LOOP_INTERVAL_MS = 50;

export type OnScoreUpdate = (score: number) => void;
export type OnGameOver = () => void;

export interface GameOptions {
  context: CanvasRenderingContext2D;
  onScoreUpdate: OnScoreUpdate;
  onGameOver: OnGameOver;
}

export type Direction = "left" | "right" | "up" | "down";

export function startNewGame({
  context,
  onScoreUpdate,
  onGameOver,
}: GameOptions) {
  let currentState = initGameState();
  let intervalId: number | undefined;
  let direction: Direction = "right";

  function onKeydown(event: KeyboardEvent) {
    const keyName = event.key;

    switch (keyName) {
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
    }
  }

  const stop = () => {
    clearInterval(intervalId);
    document.removeEventListener("keydown", onKeydown);
  };

  const start = () => {
    const update = () => {
      currentState = updateGameState(currentState, direction, {
        onScoreUpdate,
        onGameOver: () => {
          stop();
          onGameOver();
        },
      });
      renderGameState(context, currentState);
    };

    update();
    intervalId = setInterval(update, LOOP_INTERVAL_MS);
    document.addEventListener("keydown", onKeydown);
  };

  start();
}
