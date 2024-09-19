import p5 from 'p5'
import { sketch } from './sketch'

const containerId = 'p5-container'
const container = document.getElementById(containerId)

if (!container) {
    throw Error(
        `p5 container not found. Ensure there is an element with the id ${containerId} in the DOM.`
    )
}

const p5Instance = new p5(sketch, container)
