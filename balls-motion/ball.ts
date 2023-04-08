import { Point, Vector } from "../physics/vector"

export class Ball {
  id: number
  radius: number
  color: number[]
  position: Point
  velocity: Vector
  last_t: number
  frictionRate: number
  mass: number

  constructor(id: number, radius: number, position: Point) {
    this.id = id
    this.radius = radius
    this.color = [random(255), random(255), random(255)]
    this.position = position
    
    this.velocity = new Vector(0, 0)
    this.last_t = 0
    this.frictionRate = 0.95
    this.mass = 1

    // this.gravities = []
  }
  
  isInside(pnt: Point) {
    return this.radius >= this.position.getDistance(pnt)
  }
  
  animate(t: number, balls: Ball[], w: number, h: number) {
    if (this.velocity.size > 0) {
      // move position
      const dt = t - this.last_t
      const newPos = new Vector(
        this.velocity.size * dt, 
        this.velocity.angle
      ).point()

      this.position = new Point(
        min(max(0, this.position.x + newPos.x), w-this.radius*2), 
        min(max(0, this.position.y + newPos.y), h-this.radius*2)
      )
      
      // push other balls
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i]
        if (ball.id === this.id) {
          continue
        }
        const dist = ball.position.getDistance(this.position)
        if (dist <= ball.radius + this.radius) {
          ball.push(new Vector(this.velocity.size, this.velocity.angle))
          this.push(new Vector(ball.velocity.size*0.7, this.velocity.angle + 180))
        }
      }

      // boundaries
      if (this.position.x === 0) {
        this.push(
          new Vector(1.7 * this.velocity.size, 0)
        )
      } else if (this.position.x === w-this.radius*2) {
        this.push(
          new Vector(1.7 * this.velocity.size, 180)
        )
      } else if (this.position.y === 0) {
        this.push(
          new Vector(1.7 * this.velocity.size, 90)
        )
      } else if (this.position.y === h-this.radius*2) {
        this.push(
          new Vector(1.7 * this.velocity.size, 270)
        )
      }

      // apply other forces
      let mult = this.frictionRate / this.mass
      this.velocity.multiply(mult)
    }
    
    this.last_t = t
  }
  
  push(a: Vector) {
    this.velocity.add(a)
  }
  
  draw(x: number, y: number) {
    fill(this.color[0], this.color[1], this.color[2])
    circle(
      x + this.position.x, 
      y - this.position.y, 
      this.radius * 2
    )
  }
}
