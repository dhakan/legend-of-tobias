const KEY_FRAME = 50;

export default function () {
  add([
    sprite("tiles", {
      frame: KEY_FRAME,
    }),
    pos(width() / 2 + 100, height() / 2),
    body(),
    scale(0.2),
    "key",
  ]);
}
