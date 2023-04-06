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
  
  draw(x: number, y: number) {
    point(x + this.x, y - this.y)
  }
}

export class Vector {
  size: number
  angle: number

  constructor(size: number, angle: number) {
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
  
  add(v: number|Vector) {
    if (typeof v === "number") {
      this.size += v
    } else {
      const [vx, vy] = v.xy()
      const [tx, ty] = this.xy()
      const X = vx + tx
      const Y = vy + ty
      this.size = sqrt(sq(X) + sq(Y))
      this.angle = fullDeg(atan(Y/X), X)
    }
  }
  
  multiply(v: number|Vector) {
    if (typeof v === "number") {
      this.size *= v
    } else {
      const [vx, vy] = v.xy()
      const [tx, ty] = this.xy()
      const X = vx * tx
      const Y = vy * ty
      this.size = sqrt(sq(X) + sq(Y))
      this.angle = fullDeg(atan(Y/X), X)
    }
  }
  
  copy() {
    return new Vector(this.size, this.angle)
  }
  
  draw(x: number, y: number) {
    const [tx, ty] = this.xy()
    stroke(57, 66, 64)
    line(x, y, x + tx, y - ty)
    
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
    
    stroke(255, 96, 43)
    line(x, y, x, y - ty)
    line(x, y, x + tx, y)
  }
}
