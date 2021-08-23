import musicPlayer from "./musicPlayer.js";

import Title from "./scenes/Title.js";
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
loadSound("death", "/assets/sounds/death.mp3");
loadSound("collected", "/assets/sounds/collected.mp3");

// Songs
loadSound("theme_title", "/assets/songs/theme_title.mp3");
loadSound("theme_level_1", "/assets/songs/theme_level_1.mp3");
loadSound("theme_level_2", "/assets/songs/theme_level_2.mp3");

// Images
loadSprite("level_1", "/assets/imgs/level_1.jpeg");
loadSprite("level_2", "/assets/imgs/level_2.jpg");
loadSprite("balck", "/assets/imgs/balck.png");
loadSprite("eybro", "/assets/imgs/eybro.png");
loadSprite("boss", "/assets/imgs/boss.png", {
  sliceX: 10,
  sliceY: 4,
  anims: {
    idle: {
      from: 0,
      to: 7,
    },
  },
});
loadSprite("tobias", "/assets/imgs/tobias.png", {
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
    },
  },
});

layers(["game", "ui"], "game");

// Scenes
scene("title", Title);
scene("game", Game);
scene("gameover", GameOver);

// Why doesn't this work for all scenes?
// Answer: Because all keypresses are bound to a scene
keyPress("m", () => {
  musicPlayer.toggleMute();
});
