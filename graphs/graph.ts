type LineFunction = (x: number) => number

const defaultLineFunction: LineFunction = x => x

export class Graph {
  w: number
  h: number
  xf: LineFunction
  yf: LineFunction
  padx: number
  pady: number
  unit: number
  curves: {f: LineFunction, color: number[]}[]

  constructor(args: {
    w: number, 
    h: number, 
    xf?: LineFunction,
    yf?: LineFunction,
    unit?: number
  }) {
    this.w = args.w
    this.h = args.h
    this.xf = args.xf || defaultLineFunction
    this.yf = args.yf || defaultLineFunction
    this.padx = 0
    this.pady = 0
    this.unit = args.unit || 40
    this.curves = []
  }

  private ry(y: number) {
    return this.h - y
  }
  
  private xc(x: number) {
    return this.w/2+this.padx+x
  }
  
  private yc(y: number) {
    return this.ry(this.h/2+this.pady+y)
  }

  private leftEnd() {
    return -this.w/2-this.padx
  }

  private rightEnd() {
    return this.w/2-this.padx
  }

  drawAxis() {
    const color = [12, 66, 242]
    stroke(color)
    fill(color)
  
    line(
      0, this.ry(this.h/2 + this.pady), 
      this.w, this.ry(this.h/2 + this.pady)
    )
    line(
      this.w/2 + this.padx, this.ry(this.h),
      this.w/2 + this.padx, this.ry(0)
    )

    const unitsY = floor(this.h/this.unit)
    let gridPadY = (this.h - (unitsY*this.unit))/2
    gridPadY = unitsY%2 === 0 ? gridPadY : gridPadY-this.unit/2

    const unitsX = floor(this.w/this.unit)
    let gridPadX = (this.w - (unitsX*this.unit))/2
    gridPadX = unitsX%2 === 0 ? gridPadX : gridPadX-this.unit/2
    
    textSize(8)
    for (let px = 0; px < this.w; px++) {
      if ((px-this.padx) % this.unit === 0) {
        push()
        const paddedPx = px+gridPadX
        stroke(212, 212, 212)
        line(
          paddedPx, 0, 
          paddedPx, this.h
        )
        pop()

        text(
          round(this.xf((paddedPx-this.w/2-this.padx)/this.unit), 2), 
          paddedPx, this.yc(-10)
        )
      }
    }
  
    for (let py = 0; py < this.h; py++) {
      if ((py+this.pady) % this.unit === 0) {
        push()
        const paddedPy = py+gridPadY
        stroke(212, 212, 212)
        line(
          0, paddedPy, 
          this.w, paddedPy
        )
        pop()

        text(
          round(this.yf(-(paddedPy-this.h/2+this.pady)/this.unit), 2), 
          this.xc(5), paddedPy
        )
      }
    }
  }

  drawCurves() {
    for (let i = 0; i < this.curves.length; i++) {
      const curve = this.curves[i]

      push()
      fill(curve.color)
      stroke(curve.color)
      strokeWeight(2)
    
      let lx = null, ly = null
      for (let x = this.leftEnd(); x < this.rightEnd(); x++) {
        const y = curve.f(this.xf(x/this.unit))*this.unit
        if (lx && ly) {
          line(
            this.xc(lx), this.yc(ly), 
            this.xc(x), this.yc(y)
          )
        }
        lx = x, ly = y
      }
      pop()
    }
  }
}