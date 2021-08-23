const HEALTH_FRAME = 67;

export default function () {
  const x = rand(0, width());
  add([
    sprite("eybro"),
    pos(x, height() - 20),
    scale(0.03),
    origin("bot"),
    "health",
    {
      value: 10,
    },
  ]);
}
