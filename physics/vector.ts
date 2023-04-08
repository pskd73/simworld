import {assert, assertEq} from '../util';

export function fullDeg(deg: number, x: number) {
  let ref = x < 0 ? 180 : 360
  return (ref + deg) % 360
}

export function getLineDegree(s: Point, e: Point) {
  const x = e.x - s.x
  const y = e.y - s.y
  return fullDeg(atan(y/x), x)
}

export class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  
  length() {
    return sqrt(sq(this.x) + sq(this.y))
  }
  
  angle() {
    return fullDeg(atan(this.y / this.x), this.x)
  }
  
  rotateBy(deg: number) {
    const length = this.length()
    const angle = this.angle()
    this.x = cos(angle + deg) * length
    this.y = sin(angle + deg) * length
  }
  
  getDistance(pnt: Point) {
    return sqrt(sq(this.y - pnt.y) + sq(this.x - pnt.x))
  }

  copy() {
    return new Point(this.x, this.y)
  }
  
  draw(x: number, y: number) {
    point(x + this.x, y - this.y)
  }
}

export class Vector {
  size: number
  angle: number

  constructor(size: number, angle: number) {
    if (size < 0) {
      throw Error(`Size of a vector cannot be negative! Provided ${size}`)
    }
    this.size = size
    this.angle = angle
  }
  
  magnitude() {
    return this.size
  }
  
  xy() {
    const y = this.size * sin(this.angle)
    const x = this.size * cos(this.angle)
    return [x, y]
  }
  
  point() {
    const [x, y] = this.xy()
    return new Point(x, y)
  }
  
  add(v: number|Vector): Vector {
    const newV = this.copy()
    if (typeof v === 'number') {
      newV.size += v
    } else {
      const [vx, vy] = v.xy()
      const [tx, ty] = this.xy()
      const X = vx + tx
      const Y = vy + ty
      newV.size = sqrt(sq(X) + sq(Y))
      newV.angle = fullDeg(atan(Y/X), X)
    }
    return newV
  }
  
  multiply(v: number): Vector {
    const newV = this.copy()
    newV.size *= v
    return newV
  }

  subtract(v: number|Vector): Vector {
    let newV = this.copy()
    if (typeof v === 'number') {
      newV.size -= v
    } else {
      const vc = v.copy()
      vc.angle += 180
      newV = this.add(vc)
    }
    return newV
  }
  
  copy() {
    return new Vector(this.size, this.angle)
  }
  
  draw(x: number, y: number) {
    const [tx, ty] = this.xy()
    stroke(57, 66, 64)

    // base line
    line(x, y, x + tx, y - ty)
    
    // tip triangle
    const tp1 = new Point(this.size, 0)
    const tp2 = new Point(this.size - 5, 4)
    const tp3 = new Point(this.size - 5, -4)
    tp1.rotateBy(this.angle)
    tp2.rotateBy(this.angle)
    tp3.rotateBy(this.angle)
    triangle(
      x + tp1.x, y - tp1.y,
      x + tp2.x, y - tp2.y,
      x + tp3.x, y - tp3.y
    )
    
    // x and y
    stroke(255, 96, 43)
    line(x, y, x, y - ty)
    line(x, y, x + tx, y)

    // coord info
    text(`(${round(tx, 2)}, ${round(ty, 2)}, ${round(this.angle, 2)})`, x + tx, y - ty)
  }

  static test() {
    let v: Vector|undefined = undefined

    v = new Vector(200, 60).add(new Vector(120, 270 + 45))
    assertEq(round(v.angle, 2), 25.55)

    v = new Vector(200, 45).add(new Vector(200, 45))
    assertEq(round(v.angle, 2), 45)
    assertEq(round(v.size, 2), 400)

    v = new Vector(200, 45).add(new Vector(200, 180 + 45))
    assertEq(round(v.size, 2), 0)
  }
}
