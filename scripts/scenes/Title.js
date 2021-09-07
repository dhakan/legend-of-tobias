import k from "../kaboom.js";

import musicPlayer from "../musicPlayer.js";

export default function () {
  k.add([
    k.text("Legend of Tobias", 28),
    k.pos(k.width() / 2, 120),
    k.origin("center"),
  ]);

  k.add([
    k.text("Press SPACE to play", 16),
    k.pos(k.width() / 2, 170),
    k.origin("center"),
  ]);

  musicPlayer.playSong("theme_title");

  k.keyPress("space", () => {
    k.go("game");
  });
}
