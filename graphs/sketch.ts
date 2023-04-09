import * as p5Global from 'p5/global';

const W = 400;
const H = 400;

let unit = 20
let padx = 0
let pady = 0
const markerH = 10

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

  for (let i = 1; i < W/2/unit; i++) {
    const x = xc(i*unit)
    const ys = yc(markerH/2)
    const ye = yc(-markerH/2)
    line(x, ys, x, ye)
    text(xf(i), x, yc(-markerH))

    const nx = xc(-i*unit)
    line(nx, ys, nx, ye)
    text(xf(-i), nx,yc(-markerH))
  }

  for (let i = 1; i < H/2/unit; i++) {
    const y = yc(i*unit)
    const xs = xc(-markerH/2)
    const xe = xc(markerH/2)
    line(xs, y, xe, y)
    text(yf(i), xc(markerH/2), y)

    const ny = yc(-i*unit)
    line(xs, ny, xe, ny)
    text(yf(-i), xc(markerH/2), ny)
  }
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

  colors['sin'] = [random(255), random(255), random(255)]
  colors['cos'] = [random(255), random(255), random(255)]
  colors['tan'] = [random(255), random(255), random(255)]
};

window.draw = () => {
  background(220)
  const xf = (x: number) => x * 90
  drawAxis(xf, y => y)

  drawCurve(sin, xf, colors['sin'])
  // drawCurve(cos, xf, colors['cos'])
  // drawCurve(tan, xf, colors['tan'])
};

window.keyPressed = () => {
  console.log(keyCode)
  if (keyCode === 61) {
    unit *= 2
  }
  if (keyCode === 173) {
    unit /= 2
  }
  if (keyCode === 39) {
    padx += unit
  }
  if (keyCode === 37) {
    padx -= unit
  }
  if (keyCode === 38) {
    pady += unit
  }
  if (keyCode === 40) {
    pady -= unit
  }
}