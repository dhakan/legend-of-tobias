const JUMP_FORCE = 700;
const DASH_SPEED = 300;

const SEQUENCE_NONE = 0;
const SEQUENCE_JUMP = 1;
const SEQUENCE_DASH = 2;

class Boss {
  constructor(player, initialHealth) {
    this.player = player;
    this.initialHealth = initialHealth;
    this.obj = add([
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

    this.hpLabel = add([text("BOSS", 20), pos(20, 50), layer("ui"), "boss-ui"]);

    this.obj.action(async () => {
      if (this.obj.sequence === SEQUENCE_NONE) {
        this.obj.sequence = SEQUENCE_JUMP;
        await wait(1);
        this.obj.jump(JUMP_FORCE);
        this.obj.jumping = true;
      } else if (this.obj.sequence === SEQUENCE_DASH) {
        this.obj.move(DASH_SPEED * this.obj.direction, 0);

        // Boss touches the left wall
        if (this.obj.pos.x - this.obj.width / 2 <= 0) {
          camShake(8);
          this.spawnBoulder();
          this.obj.sequence = SEQUENCE_NONE;
          this.obj.direction = 1;
        }

        // Boss touches right wall
        if (this.obj.pos.x + this.obj.width / 2 >= width()) {
          camShake(8);
          this.spawnBoulder();
          this.obj.sequence = SEQUENCE_NONE;
          this.obj.direction = -1;
        }
      }
    });

    this.obj.on("grounded", async () => {
      // Don't handle the case when the boss first lands on the scene
      if (!this.obj.jumping) {
        return;
      }

      // TODO is this check needed?
      if (this.obj.sequence !== SEQUENCE_JUMP) {
        return;
      }

      this.obj.jumping = false;

      camShake(8);
      this.spawnBoulder();
      await wait(1);
      this.obj.sequence = SEQUENCE_DASH;
    });

    this.obj.play("idle");
  }

  spawnBoulder() {
    // const x = rand(20, width() - 20);
    const boulder = add([
      rect(20, 20),
      color(1, 1, 0),
      pos(this.player.pos.x, 20),
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
}

export default Boss;
