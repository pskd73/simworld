import { collide } from "./collision";
import { RealObject } from "./realObj";
import { Vector } from "./vector";

export class World {
  objects: RealObject[]
  t: number

  constructor() {
    this.objects = []
    this.t = 0
  }

  update(t: number) {
    for (let i = 0; i < this.objects.length; i++) {
      const ball = this.objects[i]
      // for (let j = 0; j < this.objects.length; j++) {
        
      //   const b = this.objects[j]
      //   if (a.position.getDistance(b.position) <= a.shape.size + b.shape.size) {
          
      //   }
      // }

      if (ball.position.y <= ball.shape.size) {
        // ball.forces = {}
        ball.velocity = new Vector(0, 0)
        ball.position.y = ball.shape.size/2
      }
    }



    this.t = t
  }
}