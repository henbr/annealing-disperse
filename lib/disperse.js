import * as Rect from "./rect.js";
export function disperseRects(rects) {
    const iterations = 1000;
    const t0 = 1;
    let prevEnergy = calculateEnergy(rects, rects);
    let currentRects = rects;
    for (let n = 0; n < iterations; n++) {
        // TODO: reuse array
        // TODO: only store positions
        const newRects = randomizeRects(currentRects, rects, 1);
        const energy = calculateEnergy(newRects, rects);
        const delta = energy - prevEnergy;
        if (delta < 0) {
            currentRects = newRects;
            prevEnergy = energy;
        }
        else {
            const t = t0 - (t0 / iterations) * n;
            if (Math.random() < Math.exp(-delta / t)) {
                currentRects = newRects;
                prevEnergy = energy;
            }
        }
    }
    rects.forEach((s, i) => {
        s.x = currentRects[i].x;
        s.y = currentRects[i].y;
    });
}
function randomizeRects(rects, originalRects, t) {
    return rects.map((rect, i) => {
        const r = Math.random();
        if (r < 0.1) {
            return randomizeRectOffset(rect, t);
        }
        else if (r < 0.1) {
            return randomizeRectRotation(rect, originalRects[i], t);
        }
        else {
            return rect;
        }
    });
}
function randomizeRectOffset(rect, t) {
    const amount = t * 2.0;
    return {
        ...rect,
        x: rect.x + rect.width * amount * (Math.random() - 0.5),
        y: rect.y + rect.height * amount * (Math.random() - 0.5),
    };
}
function randomizeRectRotation(rect, originalRect, t) {
    const amount = t * Math.PI;
    const x0 = originalRect.x;
    const y0 = originalRect.y;
    const dx = rect.x - x0;
    const dy = rect.y - y0;
    const a = amount * (Math.random() - 0.5);
    const s = Math.sin(a);
    const c = Math.cos(a);
    const dxNew = dx * c - dy * s;
    const dyNew = dx * s + dy * c;
    const x = x0 + dxNew;
    const y = y0 + dyNew;
    return {
        ...rect,
        x,
        y,
    };
}
export function calculateEnergy(newRects, rects) {
    // TODO: adjust weighting
    // TODO: calculateOverlappingArea optimize
    return calculateOverlappingArea(newRects) + 2 * calculateDistanceFromOrigin(newRects, rects);
}
export function calculateDistanceFromOrigin(newRects, rects) {
    if (rects.length !== newRects.length) {
        console.log("rects.length !== newRects.length");
        return 0;
    }
    let dist = 0;
    for (let i = 0; i < rects.length; i++) {
        const s = rects[i];
        const n = newRects[i];
        const dx = s.x - n.x;
        const dy = s.y - n.y;
        dist += Math.sqrt(dx * dx + dy * dy);
    }
    return dist;
}
export function calculateOverlappingArea(rects) {
    let area = 0;
    for (let i = 0; i < rects.length - 1; i++) {
        for (let j = i + 1; j < rects.length; j++) {
            area += Rect.calculateOverlappingArea(rects[i], rects[j]);
        }
    }
    return area;
}
