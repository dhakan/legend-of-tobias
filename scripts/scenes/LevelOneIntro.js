import k from "../kaboom.js";

import musicPlayer from "../musicPlayer.js";

export default function () {
  k.add([
    k.text("Level 1 - Bruket", 20),
    k.pos(k.width() / 2, k.height() / 2),
    k.origin("center"),
  ]);

  k.wait(2, () => {
    k.go("game");
  });

  k.keyPress("space", () => {
    k.go("game");
  });
}
