import k from "../kaboom.js";

const PLATFORM_HEIGHT = 20;

export default function () {
  k.add([
    k.rect(k.width(), PLATFORM_HEIGHT),
    k.pos(0, k.height() - PLATFORM_HEIGHT),
    k.solid(),
    k.color(1, 1, 0),
    "platform",
  ]);
}
