const G = -0.98
const W = 400
const H = 400

function getPadded(x, y) {
  return [x + 10, y + 10]
}

const balls = []
let focus = undefined

let t = 0

function setup() {
  createCanvas(W, H)
  noStroke()
  
  const ball1 = new Ball(0, 10, new Point(W/2, H/2))
  const ball2 = new Ball(1, 10, new Point(W/2 + 20, H/2 + 20))
  
  ball2.mass = 1.1
  
  balls.push(ball1)
  balls.push(ball2)
  
  angleMode(DEGREES)
}

function draw() {
  background(220)
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].animate(t, balls)
    balls[i].draw(10, H - 10)
  }
  
  t += 1
}

function keyPressed() {
  const keyIdxMap = {
    75: 0,
    83: 1
  }
  if (keyIdxMap[keyCode] !== undefined) {
    const ball = balls[keyIdxMap[keyCode]]
    ball.push(
      new Vector(
        random(5), 
        keyIdxMap[keyCode] === 0 ? 70 : (180 + 70)
      )
    )
  }
}

function mousePressed() {
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i]
    if (ball.isInside(
      new Point(mouseX - 10, H - mouseY - 10)
    )) {
      focus = i
      break
    }
  }
}

function mouseReleased() {
  if (focus !== undefined) {
    const ball = balls[focus]
    const ep = new Point(mouseX - 10, H - mouseY - 10)
    ball.push(
      new Vector(
        ball.position.getDistance(ep) * 0.08, 
        getLineDegree(ball.position, ep)
      )
    )
  }
  
  focus = undefined
}
