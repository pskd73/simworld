import { Force } from "./force"
import { Point, Vector } from "./vector"

export abstract class Shape {
  size: number

  constructor(size: number) {
    this.size = size
  }

  abstract draw(center: Point, w: number, h: number): void
  abstract isInside(center: Point, pnt: Point): void
}

export class Circle extends Shape {
  draw(center: Point, w: number, h: number) {
    circle(center.x, h - center.y, this.size)
  }

  isInside(center: Point, pnt: Point) {
    const distance = center.getDistance(pnt)
    return distance <= (this.size / 2)
  }
}

export class RealObject {
  shape: Shape
  position: Point
  velocity: Vector
  lastT: number
  forces: Record<string, Force>
  mass: number

  constructor(shape: Shape, position: Point, mass?: number) {
    this.shape = shape
    this.position = position
    this.velocity = new Vector(0, 0)
    this.lastT = 0
    this.forces = {}
    this.mass = 1
  }

  isInside(pnt: Point) {
    return this.shape.isInside(this.position, pnt)
  }

  update(dt: number) {
    const newPos = new Vector(
      this.velocity.size * dt, 
      this.velocity.angle
    ).point()

    this.position = new Point(
      this.position.x + newPos.x, 
      this.position.y + newPos.y
    )

    let netForce = new Force(new Vector(0, 0))
    for (const force of Object.values(this.forces)) {
      netForce = new Force(netForce.acceleration.add(force.acceleration))
    }

    this.velocity = this.velocity.add(netForce.acceleration)
  }

  draw(w: number, h: number) {
    this.shape.draw(this.position, w, h)
  }

  acceleration(prevV: Vector, dt: number): Vector {
    const acc = this.velocity.subtract(prevV)
    acc.size = acc.size / dt
    return acc
  }
}