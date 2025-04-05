import { produce } from "immer";
import { Direction, OnGameOver, OnScoreUpdate } from "./gameLoop";

export interface GameState {
  snake: number[][];
}

export function initGameState() {
  return {
    snake: [[0, 0]],
  };
}

function getNewHead(currentHead: number[], direction: Direction) {
  const [x, y] = currentHead;

  switch (direction) {
    case "left":
      return [x - 1, y];
    case "right":
      return [x + 1, y];
    case "up":
      return [x, y - 1];
    case "down":
      return [x, y + 1];
  }
}

interface UpdateGameStateCallbacks {
  onScoreUpdate: OnScoreUpdate;
  onGameOver: OnGameOver;
}

export function updateGameState(
  currentState: GameState,
  direction: Direction,
  { onScoreUpdate, onGameOver }: UpdateGameStateCallbacks
) {
  return produce(currentState, (draft) => {
    const { snake } = draft;

    const currentHead = snake[snake.length - 1];
    const newHead = getNewHead(currentHead, direction);

    draft.snake = [newHead];

    // Pop tail and insert new head depending on direction
    // If head is out of bounds, onGameOver
    // If head collides with another part of the snake, onGameOver
  });
}
