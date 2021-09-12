import k from "../kaboom.js";

import musicPlayer from "../musicPlayer.js";

export default function () {
  k.add([
    k.text("GAME OVER", 20),
    k.pos(k.width() / 2, k.height() / 2),
    k.origin("center"),
  ]);

  musicPlayer.stopSong();

  k.keyPress("space", () => {
    k.go("game");
  });
}
