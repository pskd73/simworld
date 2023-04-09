import * as p5Global from 'p5/global';
import { Graph } from './graph';

const W = 400;
const H = 400;

let graph: Graph|null = null
let run = true

window.setup = () => {
  createCanvas(W, H)
  angleMode(DEGREES)

  graph = new Graph({w: W, h: H, xf: x => x*90%360})
  graph.curves.push({
    f: sin,
    color: [random(255), random(255), random(255)]
  })
};

window.draw = () => {
  if (!run) return
  background(255, 255, 255)

  if (graph) {
    graph.drawAxis()
    graph.drawCurves()
  }
};

window.keyPressed = () => {
  console.log(keyCode)
  if (keyCode === 61) {
    graph!.unit *= 2
  }
  if (keyCode === 173) {
    graph!.unit /= 2
  }
  if (keyCode === 39) {
    graph!.padx += graph!.unit
  }
  if (keyCode === 37) {
    graph!.padx -= graph!.unit
  }
  if (keyCode === 38) {
    graph!.pady += graph!.unit
  }
  if (keyCode === 40) {
    graph!.pady -= graph!.unit
  }
  if (keyCode === 80) {
    run = false
  }
}

window.mouseDragged = () => {
  if (graph) {
    graph.padx += movedX
    graph.pady += -movedY
  }
}