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
  markerH: number = 10
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
    this.unit = args.unit || 20
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
    const color = [136, 138, 137]
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
    textSize(8)
  
    for (let i = 0; i < this.w; i += this.unit) {
      line(
        i, this.yc(this.markerH/2), 
        i, this.yc(-this.markerH/2)
      )
      text(
        round(this.xf((i-this.w/2-this.padx)/this.unit), 2), 
        i, this.yc(-this.markerH)
      )
    }
  
    for (let i = 0; i < this.h; i += this.unit) {
      line(
        this.xc(-this.markerH/2), i, 
        this.xc(this.markerH/2), i
      )
      text(
        round(this.yf(-(i-this.h/2+this.pady)/this.unit), 2), 
        this.xc(this.markerH/2), i
      )
    }
  }

  drawCurves() {
    for (let i = 0; i < this.curves.length; i++) {
      const curve = this.curves[i]

      fill(curve.color)
      stroke(curve.color)
    
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
    }
  }
}