const JUMP_FORCE = 500;

export default function () {
  const obj = add([
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
    {
      health: 30,
      damage: 20,
    },
  ]);

  obj.action(() => {
    if (!obj.grounded()) {
      return;
    }

    obj.jump(JUMP_FORCE);
  });

  obj.play("walk");
}
