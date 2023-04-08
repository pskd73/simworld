import { Vector } from "./vector";

export class Force {
  acceleration: Vector

  constructor(acceleration: Vector) {
    this.acceleration = acceleration
  }
}