import * as p5Global from 'p5/global';
import { Graph } from './graph';

const W = 1200;
const H = 800;

let unit = 20
let padx = 0
let pady = 0
const markerH = 10
let graph: Graph|null = null
let run = true
let dunit = 0

type LineFunction = (x: number) => number

const x2: LineFunction = (x) => {
  return x*x
}

function ry(y: number) {
  return H - y
}

function xc(x: number) {
  return W/2-padx+x
}

function yc(y: number) {
  return ry(H/2-pady+y)
}

function drawAxis(xf: LineFunction, yf: LineFunction) {
  const color = [136, 138, 137]
  stroke(color)
  fill(color)

  line(xc(-W/2+padx), yc(0), xc(W/2+padx), yc(0))
  line(xc(0), yc(H/2+pady), xc(0), yc(-H/2+pady))
  textSize(8)

  for (let i = 0; i < W; i += unit) {
    line(i, yc(markerH/2), i, yc(-markerH/2))
    text(xf((i-W/2+padx)/unit), i, yc(-markerH))

    // const neti = -W/2/unit+padx
    // const x = xc(neti*unit)
    // const ys = yc(markerH/2)
    // const ye = yc(-markerH/2)
    // line(x, ys, x, ye)
    // text(xf(i), x, yc(-markerH))
  }

  for (let i = 0; i < H; i += unit) {
    line(xc(-markerH/2), i, xc(markerH/2), i)
  }

  // for (let i = 1; i < W/2/unit; i++) {
  //   const x = xc(i*unit)
  //   const ys = yc(markerH/2)
  //   const ye = yc(-markerH/2)
  //   line(x, ys, x, ye)
  //   text(xf(i), x, yc(-markerH))

  //   const nx = xc(-i*unit)
  //   line(nx, ys, nx, ye)
  //   text(xf(-i), nx,yc(-markerH))
  // }

  // for (let i = 1; i < H/2/unit; i++) {
  //   const y = yc(i*unit)
  //   const xs = xc(-markerH/2)
  //   const xe = xc(markerH/2)
  //   line(xs, y, xe, y)
  //   text(yf(i), xc(markerH/2), y)

  //   const ny = yc(-i*unit)
  //   line(xs, ny, xe, ny)
  //   text(yf(-i), xc(markerH/2), ny)
  // }
}

function drawCurve(f: LineFunction, xf: LineFunction, color: number[]) {
  fill(color)
  stroke(color)

  let lx = xc(0), ly = yc(0)
  let nlx = xc(0), nly = yc(0)
  for (let i = 0; i < W/2; i++) {
    const x = xc(i)
    const y = yc(f(xf(i/unit))*unit)

    line(lx, ly, x, y)
    lx = x
    ly = y

    const nx = xc(-i)
    const ny = yc(f(xf(-i/unit))*unit)
    line(nlx, nly, nx, ny)
    nlx = nx
    nly = ny
  }
}

const colors: Record<string, number[]> = {}

window.setup = () => {
  createCanvas(W, H)
  angleMode(DEGREES)

  graph = new Graph({w: W, h: H, xf: x => x*90 % 360})
  graph.curves.push({
    f: sin,
    color: [random(255), random(255), random(255)]
  })
  graph.curves.push({
    f: cos,
    color: [random(255), random(255), random(255)]
  })
};

window.draw = () => {
  if (!run) return
  background(220)

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