class Shape {
  constructor(size) {
    this.size = size
  }

  draw(x, y) {}

  isInside(center, pnt) {}
}

class Circle extends Shape {
  draw(x, y) {
    circle(x, y, this.size)
  }

  isInside(center, pnt) {
    const distance = center.getDistance(pnt)
    return distance <= (this.size / 2)
  }
}

class Square extends Shape {
  draw(x, y) {
    const halfSize = this.size / 2
    square(x - halfSize, y - halfSize, this.size)
  }

  isInside(center, pnt) {
    const halfSize = this.size / 2
    const lb = new Point(center.x - halfSize, center.y + halfSize)
    const rt = new Point(center.x + halfSize, center.y - halfSize)

    return pnt.x >= lb.x && pnt.x <= rt.x && pnt.y >= rt.y && pnt.y <= lb.y
  }
}

class RealObject {
  constructor({shape, pos}) {
    this.shape = shape
    this.pos = pos
  }

  isInside(pnt) {
    return this.shape.isInside(this.pos, pnt)
  }

  draw() {
    this.shape.draw(this.pos.x, this.pos.y)
  }
}