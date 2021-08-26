const JUMP_FORCE = 700;
const DASH_SPEED = 300;

const SEQUENCE_NONE = 0;
const SEQUENCE_JUMP = 1;
const SEQUENCE_DASH = 2;

export default function () {
  const initialHealth = 300;
  const boss = add([
    sprite("boss", {
      animSpeed: 0.1,
    }),
    pos(width() - 60, height() - 20 * 2),
    body(),
    solid(),
    origin("bot"),
    scale(0.6),
    "enemy",
    "boss",
    {
      health: initialHealth,
      jumping: false,
      sequence: SEQUENCE_NONE,
      direction: -1,
      healthbar: add([
        rect(initialHealth, 20),
        pos(20 + 90, 50),
        color(1, 0, 0),
        layer("ui"),
        "boss-ui"
      ])
    },
  ]);

  const hpLabel = add([text("BOSS", 20), pos(20, 50), layer("ui"), "boss-ui"]);

  function spawnBoulder() {
    const x = rand(20, width() - 20);
    const obj = add([
      rect(20, 20),
      color(1, 1, 0),
      pos(x, 20),
      body(),
      origin("bot"),
      "enemy",
    ]);

    obj.action(() => {
      if (!obj.grounded()) {
        return;
      }
      destroy(obj);
    });
  }

  boss.action(async () => {
    if (boss.sequence === SEQUENCE_NONE) {
      boss.sequence = SEQUENCE_JUMP;
      await wait(1);
      boss.jump(JUMP_FORCE);
      boss.jumping = true;
    } else if (boss.sequence === SEQUENCE_DASH) {
      boss.move(DASH_SPEED * boss.direction, 0);

      // Boss touches the left wall
      if (boss.pos.x - boss.width / 2 <= 0) {
        camShake(8);
        spawnBoulder();
        boss.sequence = SEQUENCE_NONE;
        boss.direction = 1;
      }

      // Boss touches right wall
      if (boss.pos.x + boss.width / 2 >= width()) {
        camShake(8);
        spawnBoulder();
        boss.sequence = SEQUENCE_NONE;
        boss.direction = -1;
      }
    }
  });

  boss.on("grounded", async () => {
    // Don't handle the case when the boss first lands on the scene
    if (!boss.jumping) {
      return;
    }

    // TODO is this check needed?
    if (boss.sequence !== SEQUENCE_JUMP) {
      return;
    }

    boss.jumping = false;

    camShake(8);
    spawnBoulder();
    await wait(1);
    boss.sequence = SEQUENCE_DASH;
  });

  boss.play("idle");
}
