import musicPlayer from "../musicPlayer.js";

export default function () {
  add([text("Legend of Tobias", 28), pos(width() / 2, 120), origin("center")]);
  add([
    text("Press SPACE to play", 16),
    pos(width() / 2, 170),
    origin("center"),
  ]);
  
  musicPlayer.playSong("theme_title");

  keyPress("space", () => {
    go("game");
  });

  //   Fix this
  keyPress("m", () => {
    musicPlayer.toggleMute();
  });
}
