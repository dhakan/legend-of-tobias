import k from "../kaboom.js";

const SPIKE_FRAME = 70;

export default function () {
  k.add([
    k.sprite("tiles", {
      frame: SPIKE_FRAME,
    }),
    k.pos(k.width() - 30, k.height() - 20 * 2),
    k.body(),
    k.solid(),
    k.scale(0.5),
    "hazard",
    "moving",
    { damage: 20 },
  ]);
}
