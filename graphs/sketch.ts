import * as p5Global from 'p5/global';

const W = 400;
const H = 400;

const unit = 10
const markerH = 10

type LineFunction = (x: number) => number

const x2: LineFunction = (x) => {
  return x*x
}

function ry(y: number) {
  return H - y
}

function xc(x: number) {
  return W/2+x
}

function yc(y: number) {
  return ry(H/2+y)
}

function drawAxis() {
  const color = [136, 138, 137]
  stroke(color)
  fill(color)
  line(0, H/2, W, H/2)
  line(W/2, 0, W/2, H)

  for (let i = 1; i < W/2/unit; i++) {
    const x = xc(i*unit)
    const ys = yc(markerH/2)
    const ye = yc(-markerH/2)
    line(x, ys, x, ye)
    text(i, x, yc(-markerH))

    const nx = xc(-i*unit)
    line(nx, ys, nx, ye)
    text(-i, nx,yc(-markerH))
  }

  for (let i = 1; i < H/2/unit; i++) {
    const y = yc(i*unit)
    const xs = xc(-markerH/2)
    const xe = xc(markerH/2)
    line(xs, y, xe, y)
    text(i, xc(markerH/2), y)

    const ny = yc(-i*unit)
    line(xs, ny, xe, ny)
    text(-i, xc(markerH/2), ny)
  }
}

function drawCurve(f: LineFunction, color: number[]) {
  fill(color)
  stroke(color)

  let lx = xc(0), ly = yc(0)
  let nlx = xc(0), nly = yc(0)
  for (let i = 0; i < W/2/unit; i++) {
    const x = xc(i*unit)
    const y = yc(f(i)*unit)
    line(lx, ly, x, y)
    lx = x
    ly = y

    const nx = xc(-i*unit)
    const ny = yc(f(-i)*unit)
    line(nlx, nly, nx, ny)
    nlx = nx
    nly = ny
  }
}

const colors: Record<string, number[]> = {}

window.setup = () => {
  createCanvas(W, H)

  colors['sin'] = [random(255), random(255), random(255)]
  colors['cos'] = [random(255), random(255), random(255)]
};

window.draw = () => {
  background(220)
  drawAxis()

  drawCurve(sin, colors['sin'])
  drawCurve(log, colors['cos'])
  // drawCurve(tan, colors['cos'])
};