import k from "../kaboom.js";

import musicPlayer from "../musicPlayer.js";

export default function (score) {
  k.add([k.text("Game Over", 16), k.pos(k.width() / 2, 120), k.origin("center")]);

  k.add([k.text(score, 48), k.pos(k.width() / 2, 180), k.origin("center")]);

  musicPlayer.stopSong();

  k.keyPress("space", () => {
    k.go("game");
  });
}
