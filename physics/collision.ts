import { Force } from "./force";
import { RealObject } from "./realObj";
import { Vector } from "./vector";

export interface CollisionResult {
  force: Force
}

export function collide(obj1: RealObject, obj2?: RealObject): CollisionResult {
  return {
    force: new Force(new Vector(0, 0))
  }
}