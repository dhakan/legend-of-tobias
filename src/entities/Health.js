import k from "../kaboom.js";

export default function () {
  const x = k.rand(0, k.width());
  k.add([
    k.sprite("eybro"),
    k.pos(x, k.height() - 20),
    k.scale(0.03),
    k.origin("bot"),
    "health",
    {
      value: 10,
    },
  ]);
}
