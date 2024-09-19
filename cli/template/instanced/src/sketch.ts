import p5 from 'p5'

export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
    }

    p.draw = () => {
        p.background(0)
        p.fill(255)
        p.ellipse(p.mouseX, p.mouseY, 50, 50)
        p.text(p.frameRate().toFixed(0), 10, 10)
    }
}
