import * as p5Global from 'p5/global';
import { Graph } from './graph';

const W = window.innerWidth - 50;
const H = window.innerHeight - 50;

let graph: Graph|null = null
let run = true

window.setup = () => {
  createCanvas(W, H)
  angleMode(DEGREES)

  graph = new Graph({w: W, h: H})
  graph.curves.push({
    f: x => 1/x,
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

window.mouseDragged = () => {
  if (graph) {
    graph.padx += movedX
    graph.pady += -movedY
  }
}

window.mouseWheel = (event) => {
  const delta = (event as any).delta
  if (graph) {
    graph.unit += ((delta/abs(delta)) * 10)
    graph.unit = max(1, graph.unit)
  }
}