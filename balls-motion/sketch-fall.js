const W = 400
const H = 400

const balls = []

let t = 0

function setup() {
  createCanvas(W, H)
  angleMode(DEGREES)
  frameRate(10)
}

function draw() {
  background(220)
  // for (let i = 0; i < balls.length; i++) {
  //   balls[i].push(new Vector(.098, 270))
  //   balls[i].animate(t, balls)
  //   balls[i].draw(0, H)
  // }

  t += 1
}

function mousePressed() {
  // const ball = new Ball(
  //   balls.length, 
  //   10, 
  //   new Point(mouseX, H - mouseY)
  // )
  // ball.last_t = t
  // balls.push(ball)
}