import k from "../kaboom.js";

import musicPlayer from "../musicPlayer.js";

export default function () {
  k.add([
    k.text("Legend of Tobias", 28),
    k.pos(k.width() / 2, 100),
    k.origin("center"),
  ]);

  k.add([
    k.text("LEFT and RIGHT to move", 12),
    k.pos(k.width() / 2, 150),
    k.origin("center"),
  ]);

  k.add([
    k.text("SPACE to jump", 12),
    k.pos(k.width() / 2, 170),
    k.origin("center"),
  ]);

  k.add([
    k.text("F to shoot", 12),
    k.pos(k.width() / 2, 190),
    k.origin("center"),
  ]);

  k.add([
    k.text("Press SPACE to play", 16),
    k.pos(k.width() / 2, 230),
    k.origin("center"),
    k.color(255, 255, 0),
  ]);

  musicPlayer.playSong("theme_title");

  k.keyPress("space", () => {
    k.go("level_1_intro");
  });
}
