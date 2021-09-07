import k from "../kaboom.js";

import { hp } from "../components.js";

const JUMP_FORCE = 700;
const DASH_SPEED = 300;

const SEQUENCE_NONE = 0;
const SEQUENCE_JUMP = 1;
const SEQUENCE_DASH = 2;

const INITIAL_HEALTH = 300;

export default function (player, initialHealth) {
  function spawnBoulder() {
    const boulder = k.add([
      k.rect(20, 20),
      k.color(1, 1, 0),
      k.pos(player.pos.x, 20),
      k.body(),
      k.origin("bot"),
      "hazard",
    ]);

    boulder.action(() => {
      if (!boulder.grounded()) {
        return;
      }
      k.destroy(boulder);
    });
  }

  function handleCrashIntoWall() {
    k.camShake(8);
    spawnBoulder();
    obj.sequence = SEQUENCE_NONE;
    obj.direction = obj.direction === 1 ? -1 : 1;
  }

  const obj = k.add([
    k.sprite("boss", {
      animSpeed: 0.1,
    }),
    k.pos(k.width() - 60, k.height() - 20 * 2),
    k.body(),
    k.solid(),
    k.origin("bot"),
    k.scale(0.6),
    hp(INITIAL_HEALTH),
    "enemy",
    "boss",
    {
      jumping: false,
      sequence: SEQUENCE_NONE,
      direction: -1,
    },
  ]);

  const hpLabel = k.add([
    k.text("BOSS", 20),
    k.pos(20, 50),
    k.layer("ui"),
    "boss-ui",
  ]);

  obj.action(async () => {
    if (obj.sequence === SEQUENCE_NONE) {
      obj.sequence = SEQUENCE_JUMP;
      await k.wait(1);
      obj.jump(JUMP_FORCE);
      obj.jumping = true;
    } else if (obj.sequence === SEQUENCE_DASH) {
      obj.move(DASH_SPEED * obj.direction, 0);

      // obj touches the left wall
      if (obj.pos.x - obj.width / 2 <= 0) {
        handleCrashIntoWall();
      }

      // obj touches right wall
      if (obj.pos.x + obj.width / 2 >= k.width()) {
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

    k.camShake(8);
    spawnBoulder();
    await k.wait(1);
    obj.sequence = SEQUENCE_DASH;
  });

  obj.play("idle");

  return {
    initialHealth,
    hpLabel,
  };
}
