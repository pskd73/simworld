import * as p5Global from 'p5/global';
import {NAME} from "./another";

const W = 400;
const H = 400;

window.setup = () => {
  createCanvas(W, H)
};

window.draw = () => {
  background(220)
  circle(W/2, H/2, 30)
  console.log(NAME)
};