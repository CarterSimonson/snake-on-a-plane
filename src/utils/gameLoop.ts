import { renderGameState } from "./gameRenderer";
import { GameState, initGameState } from "./gameState";

const LOOP_INTERVAL_MS = 500;

export type OnScoreUpdate = (score: number) => void;
export type OnGameOver = () => void;

export interface GameOptions {
  context: CanvasRenderingContext2D;
  onScoreUpdate: OnScoreUpdate;
  onGameOver: OnGameOver;
}

function updateGameLoop(state: GameState, { context }: GameOptions) {
  renderGameState(context, state);
}

export function initGameLoop(options: GameOptions) {
  const state = initGameState();
  let intervalId: number | undefined;

  const stop = () => {
    clearInterval(intervalId);
  };

  const start = () => {
    const update = () =>
      updateGameLoop(state, {
        ...options,
        onGameOver: (...args) => {
          stop();
          options.onGameOver(...args);
        },
      });

    update();
    intervalId = setInterval(update, LOOP_INTERVAL_MS);
  };

  return start;
}
