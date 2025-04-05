import { produce } from "immer";
import { Direction, OnGameOver, OnScoreUpdate } from "./gameLoop";
import { GAME_WIDTH_TILES } from "../constants";

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

function getIsOutOfBounds(coords: number[]) {
  const [x, y] = coords;

  if (x < 0 || x > GAME_WIDTH_TILES) {
    return true;
  }

  if (y < 0 || y > GAME_WIDTH_TILES) {
    return true;
  }

  return false;
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

    // If head is out of bounds, end the game
    const isOutOfBounds = getIsOutOfBounds(newHead);
    if (isOutOfBounds) {
      onGameOver();
      return;
    }

    draft.snake = [newHead];
    // Pop tail and insert new head depending on direction
    // If head collides with another part of the snake, onGameOver
  });
}
