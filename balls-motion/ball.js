class Ball {
  constructor(id, radius, position) {
    this.id = id
    this.radius = radius
    this.color = [random(255), random(255), random(255)]
    this.position = position
    
    this.velocity = new Vector(0, 0)
    this.last_t = 0
    this.frictionRate = 0.95
    this.mass = 1
  }
  
  isInside(pnt) {
    return this.radius >= this.position.getDistance(pnt)
  }
  
  animate(t, balls) {
    if (this.velocity.size > 0) {
      // move position
      const dt = t - this.last_t
      const newPos = new Vector(
        this.velocity.size * dt, 
        this.velocity.angle
      ).point()

      this.position = new Point(
        this.position.x + newPos.x, 
        this.position.y + newPos.y
      )
      
      
      // push other balls
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i]
        if (ball.id === this.id) {
          continue
        }
        const dist = ball.position.getDistance(this.position)
        if (dist <= ball.radius + this.radius) {
          ball.push(this.velocity.copy())
        }
      }

      // apply other forces
      let mult = this.frictionRate / this.mass
      this.velocity.multiply(mult)
    }
    
    this.last_t = t
  }
  
  push(a) {
    this.velocity.add(a)
  }
  
  draw(x, y) {
    fill(...this.color)
    circle(
      x + this.position.x, 
      y - this.position.y, 
      this.radius * 2
    )
  }
}
