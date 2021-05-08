import { disperseRects, calculateOverlappingArea } from "./disperse.js";
import { init, Rect, updateElementPosition } from "./rect.js";

const rectangles: Array<Rect> = [];

init((rect: Rect) => rectangles.push(rect));

document.getElementById("disperse-button")!.onclick = () => {
  disperseRects(rectangles);
  for (const rect of rectangles) {
    updateElementPosition(rect);
  }
};
