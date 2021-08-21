import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";

// Sounds
loadSound("ey1", "/assets/sounds/ey1.mp3");
loadSound("ey2", "/assets/sounds/ey2.mp3");
loadSound("ey3", "/assets/sounds/ey3.mp3");
loadSound("kom-igen-da", "/assets/sounds/kom-igen-da.mp3");
loadSound("track", "/assets/sounds/track.mp3");
loadSound("hurt", "/assets/sounds/hurt.mp3");
loadSound("damage", "/assets/sounds/damage.mp3");

// Images
loadSprite("bg", "/assets/imgs/background.jpeg");
loadSprite("balck", "/assets/imgs/balck.png");
loadSprite("tobias", "/assets/imgs/tobias3.png", {
  sliceX: 3,
  sliceY: 2,
  anims: {
    idle: {
      from: 0,
      to: 1,
    },
    run: {
      from: 3,
      to: 5,
    },
    jump: {
      from: 2,
      to: 2,
    },
  },
});

loadSprite("tiles", "/assets/imgs/tiles.png", {
  sliceX: 14,
  sliceY: 7,
});

loadSprite("goomba", "/assets/imgs/goomba.png", {
  sliceX: 2,
  sliceY: 1,
  anims: {
    walk: {
      from: 0,
      to: 1,
    }
  },
});

layers(["game", "ui"], "game");

// Scenes
scene("game", Game);
scene("gameover", GameOver);
