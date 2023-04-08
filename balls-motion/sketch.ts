import * as p5Global from 'p5/global'
import { Point, Vector } from '../physics/vector'
import { Circle, RealObject } from '../physics/realObj'
import { Force } from '../physics/force'
import { World } from '../physics/world'

const W = 400
const H = 400
const MPP = 10

const world = new World()
const ball = new RealObject(new Circle(10), new Point(0, 0))

let t = 0

window.setup = function() {
  createCanvas(W, H)
  angleMode(DEGREES)
  Vector.test()

  ball.position = new Point(0, 100)
  ball.forces['gravity'] = new Force(new Vector(9.8 * MPP, 270))
  ball.velocity = new Vector(1000 * 6.2, 85)
  world.objects.push(ball)
}

window.draw = function() {
  background(220)

  const prevVel = ball.velocity.copy()

  ball.update(1/1000)
  world.update(t)
  ball.draw(W, H)

  text(`v = ${round(ball.velocity.size, 1)} p/s`, 5, H-20)
  text(`a = ${round(ball.acceleration(prevVel, 1).size, 2)} p/s2`, 5, H-5)
  text(`(${round(ball.position.x, 2)}, ${round(ball.position.y, 2)})`, 5, H-35)

  t += 1
}