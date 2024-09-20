function setup() {
    createCanvas(windowWidth, windowHeight)
}

function draw() {
    background(0)
    fill(255)
    ellipse(mouseX, mouseY, 50, 50)
    text(frameRate().toFixed(0), 10, 10)
}
