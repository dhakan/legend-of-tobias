const SPIKE_FRAME = 70;

export default function () {
  add([
    sprite("tiles", {
      frame: SPIKE_FRAME,
    }),
    pos(width() - 30, height() - 20 * 2),
    body(),
    solid(),
    scale(0.5),
    "spike",
    "moving",
  ]);
}
