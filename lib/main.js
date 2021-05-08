import { disperseRects } from "./disperse.js";
import { init, updateElementPosition } from "./rect.js";
const rects = [];
init((rect) => rects.push(rect));
document.getElementById("disperse-button").onclick = () => {
    disperseRects(rects);
    for (const rect of rects) {
        updateElementPosition(rect);
    }
};
