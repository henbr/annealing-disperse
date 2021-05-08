const appElement = document.getElementById("app");
let offsetx = 0;
let offsety = 0;
let clickedRect = undefined;
let newRect = undefined;
let minWidth = 10;
let minHeight = 10;
let rectBorder = 8; // update in style.css if changed
// TODO: move out DOM stuff to a separate file
export function init(onNewRect) {
    appElement.onmousemove = (ev) => {
        if (ev.buttons === 1 && clickedRect) {
            ev.preventDefault();
            const xpos = ev.clientX - offsetx - appElement.offsetLeft;
            const ypos = ev.clientY - offsety - appElement.offsetTop;
            clickedRect.el.style.transform = `translate(${xpos}px, ${ypos}px)`;
            clickedRect.x = xpos;
            clickedRect.y = ypos;
        }
        else if (ev.buttons === 1 && newRect) {
            ev.preventDefault();
            const newWidth = Math.max(minWidth, ev.clientX - newRect.x - appElement.offsetLeft);
            const newHeight = Math.max(minHeight, ev.clientY - newRect.y - appElement.offsetTop);
            newRect.el.style.width = `${newWidth}px`;
            newRect.el.style.height = `${newHeight}px`;
            newRect.width = newWidth;
            newRect.height = newHeight;
        }
    };
    appElement.onmousedown = (ev) => {
        ev.preventDefault();
        if (!clickedRect) {
            newRect = createRect(ev.clientX - appElement.offsetLeft - minWidth, ev.clientY - appElement.offsetTop - minHeight, minWidth, minHeight);
            onNewRect(newRect);
        }
    };
    appElement.onclick = () => {
        clickedRect = undefined;
        newRect = undefined;
    };
    appElement.onmouseup = () => {
        newRect = undefined;
    };
}
export function createRect(x, y, w, h) {
    const el = document.createElement("div");
    el.classList.add("rect");
    appElement.appendChild(el);
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
    el.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 65%)`;
    const rect = {
        x,
        y,
        width: w,
        height: h,
        el: el,
    };
    el.onmousedown = (ev) => {
        ev.preventDefault();
        clickedRect = rect;
        offsetx = ev.offsetX + rectBorder;
        offsety = ev.offsetY + rectBorder;
    };
    return rect;
}
export function updateElementPosition(rect) {
    rect.el.style.transform = `translate(${rect.x}px, ${rect.y}px)`;
}
export function calculateArea(rect) {
    return rect.x * rect.y;
}
export function calculateOverlappingArea(a, b) {
    const ax0 = a.x - rectBorder;
    const ax1 = a.x + a.width + rectBorder;
    const ay0 = a.y - rectBorder;
    const ay1 = a.y + a.height + rectBorder;
    const bx0 = b.x - rectBorder;
    const bx1 = b.x + b.width + rectBorder;
    const by0 = b.y - rectBorder;
    const by1 = b.y + b.height + rectBorder;
    const x0 = Math.max(ax0, bx0);
    const x1 = Math.min(ax1, bx1);
    const y0 = Math.max(ay0, by0);
    const y1 = Math.min(ay1, by1);
    const w = Math.max(x1 - x0, 0);
    const h = Math.max(y1 - y0, 0);
    return w * h;
}
