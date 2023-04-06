const blockSize = 10
const boardSize = 40
const pos = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}]
const dir = {x: 1, y: 0}

let clock = 0
let spd = 1
let gameOver = false
let food = newPosition()
let blocksToAdd = 0
let score = 0

function random_(n) {
  return Math.floor(Math.random() * n);
}
    
function newPosition() {
  return {x: random_(boardSize), y: random_(boardSize)}
}

function setup() {
  createCanvas(boardSize * blockSize, boardSize * blockSize);
}

function draw() {
  if (!gameOver && clock % max(1, (10 - spd)) == 0) {
    if (blocksToAdd === 0) {
      for (let i = 1; i < pos.length; i++) {
        pos[i - 1] = {...pos[i]}
      }
    }
    
    if (blocksToAdd > 0) {
      pos.push({...pos[pos.length - 1]})
      blocksToAdd -= 1
    }
    
    const head = pos[pos.length - 1]
    head.x += dir.x
    head.y += dir.y
    
    if (
      head.x < 0 || head.y < 0 || 
      head.x >= boardSize || head.y >= boardSize) {
      gameOver = true
      return
    }
      
    const nBlocks = {}
    for (let i = 0; i < pos.length; i++) {
      const k = `${pos[i].x},${pos[i].y}`
      if (!nBlocks[k]) {
        nBlocks[k] = 0
      }
      nBlocks[k] += 1
    }
      
    if (Object.keys(nBlocks).length !== pos.length) {
      gameOver = true
    }
    
    if (head.x === food.x && head.y === food.y) {
      food = newPosition()
      blocksToAdd += 1
      score += 1
      spd += (score % 5 === 0 ? 1 : 0)
    }
    
    
    clear()
    background(222, 220, 217)    
    noStroke()
    
    fill(252, 157, 3)
    for (let i = 0; i < pos.length; i++) {
      rect(
        pos[i].x * blockSize, 
        pos[i].y * blockSize, 
        blockSize, 
        blockSize
      );
    }
      
    fill(83, 194, 168)
    rect(
      food.x * blockSize, 
      food.y * blockSize, 
      blockSize, 
      blockSize
    );
      
    textSize(10)
    fill(0, 102, 153);
    text(
      `Score ${score}`, 
      3, 
      10
    )
  }
    
  if (gameOver) {
    textSize(32)
    fill(0, 102, 153);
    text(
      'Game over', 
      ((boardSize * blockSize) / 2) - 75, 
      ((boardSize * blockSize) / 2) - 8
    )
  }
  
  clock += 1
}

function keyPressed() {
  if (keyCode === 40) {
    dir.x = 0
    dir.y = 1
  }
  if (keyCode === 37) {
    dir.x = -1
    dir.y = 0
  }
  if (keyCode === 39) {
    dir.x = 1
    dir.y = 0
  }
  if (keyCode === 38) {
    dir.x = 0
    dir.y = -1
  }
}