const JUMP_FORCE = 700;
const DASH_SPEED = 300;

const SEQUENCE_NONE = 0;
const SEQUENCE_JUMP = 1;
const SEQUENCE_DASH = 2;

export default function (player, initialHealth) {
  function spawnBoulder() {
    const boulder = add([
      rect(20, 20),
      color(1, 1, 0),
      pos(player.pos.x, 20),
      body(),
      origin("bot"),
      "enemy",
    ]);

    boulder.action(() => {
      if (!boulder.grounded()) {
        return;
      }
      destroy(boulder);
    });
  }

  function handleCrashIntoWall() {
    camShake(8);
    spawnBoulder();
    obj.sequence = SEQUENCE_NONE;
    obj.direction = obj.direction === 1 ? -1 : 1;
  }

  const obj = add([
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
        "boss-ui",
      ]),
    },
  ]);

  const hpLabel = add([text("BOSS", 20), pos(20, 50), layer("ui"), "boss-ui"]);

  obj.action(async () => {
    if (obj.sequence === SEQUENCE_NONE) {
      obj.sequence = SEQUENCE_JUMP;
      await wait(1);
      obj.jump(JUMP_FORCE);
      obj.jumping = true;
    } else if (obj.sequence === SEQUENCE_DASH) {
      obj.move(DASH_SPEED * obj.direction, 0);

      // obj touches the left wall
      if (obj.pos.x - obj.width / 2 <= 0) {
        handleCrashIntoWall();
      }

      // obj touches right wall
      if (obj.pos.x + obj.width / 2 >= width()) {
        handleCrashIntoWall();
      }
    }
  });

  obj.on("grounded", async () => {
    // Don't handle the case when the obj first lands on the scene
    if (!obj.jumping) {
      return;
    }

    // TODO is check needed?
    if (obj.sequence !== SEQUENCE_JUMP) {
      return;
    }

    obj.jumping = false;

    camShake(8);
    spawnBoulder();
    await wait(1);
    obj.sequence = SEQUENCE_DASH;
  });

  obj.play("idle");

  return {
    initialHealth,
    hpLabel,
  };
}
