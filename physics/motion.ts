import { Point } from "./vector";

export function getVelocity(prev: Point, cur: Point, dt: number) {
  return cur.getDistance(prev) / dt
}
