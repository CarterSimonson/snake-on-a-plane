export interface GameState {
  snake: number[][];
}

export function initGameState() {
  return {
    snake: [[0, 0]],
  };
}
