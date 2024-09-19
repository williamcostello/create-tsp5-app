function setup() {
    createCanvas(windowWidth, windowHeight)
}

function draw() {
    background(0)
    fill(255)
    ellipse(mouseX, mouseY, 50, 50)
    text(frameRate().toFixed(0), 10, 10)
}

// These must be exported so vite does not tree-shake them away
export { setup, draw }
