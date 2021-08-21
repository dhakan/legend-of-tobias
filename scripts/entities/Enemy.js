export default function () {
  const enemy = add([
    sprite("goomba", {
      animSpeed: 0.3,
    }),
    pos(width() - 30, height() - 20 * 2),
    body(),
    solid(),
    origin("bot"),
    scale(0.2),
    "enemy",
    "moving",
    "jumping",
    {
      health: 30,
    },
  ]);

  enemy.play("walk");
}
