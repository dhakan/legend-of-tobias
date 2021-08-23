import musicPlayer from "../musicPlayer.js";

export default function (score) {
  add([text("Game Over", 16), pos(width() / 2, 120), origin("center")]);

  add([text(score, 48), pos(width() / 2, 180), origin("center")]);

  musicPlayer.stopSong();

  keyPress("space", () => {
    go("game");
  });

  //   Fix this
  keyPress("m", () => {
    musicPlayer.toggleMute();
  });
}
