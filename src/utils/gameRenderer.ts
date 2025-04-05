import { GameState } from "./gameState";

const TILE_SCALE_PX = 50;

function drawSquare(context: CanvasRenderingContext2D, coord: number[]) {
  console.log({
    context,
  });
  context.fillRect(coord[0], coord[1], TILE_SCALE_PX, TILE_SCALE_PX);
}

export function renderGameState(
  context: CanvasRenderingContext2D,
  { snake }: GameState
) {
  // Reset the canvas state to default, since we'll be drawing over it
  context.reset();

  context.fillStyle = "#FFF";
  snake.forEach((coord) => drawSquare(context, coord));
}
