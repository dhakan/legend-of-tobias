import k from "./kaboom.js";

import Title from "./scenes/Title.js";
import LevelOneIntro from "./scenes/LevelOneIntro.js";
import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";

const assets = [
  // Sounds
  k.loadSound("ey1", "/assets/sounds/ey1.mp3"),
  k.loadSound("ey2", "/assets/sounds/ey2.mp3"),
  k.loadSound("ey3", "/assets/sounds/ey3.mp3"),
  k.loadSound("kom-igen-da", "/assets/sounds/kom-igen-da.mp3"),
  k.loadSound("track", "/assets/sounds/track.mp3"),
  k.loadSound("hurt", "/assets/sounds/hurt.mp3"),
  k.loadSound("damage", "/assets/sounds/damage.mp3"),
  k.loadSound("death", "/assets/sounds/death.mp3"),
  k.loadSound("collected", "/assets/sounds/collected.mp3"),

  // Songs
  k.loadSound("theme_title", "/assets/songs/theme_title.mp3"),
  k.loadSound("theme_level_1", "/assets/songs/theme_level_1.mp3"),
  k.loadSound("theme_level_2", "/assets/songs/theme_level_2.mp3"),

  // Images
  k.loadSprite("level_1", "/assets/imgs/level_1.jpeg"),
  k.loadSprite("level_2", "/assets/imgs/level_2.jpg"),
  k.loadSprite("balck", "/assets/imgs/balck.png"),
  k.loadSprite("eybro", "/assets/imgs/eybro.png"),
  k.loadSprite("boss", "/assets/imgs/boss.png", {
    sliceX: 10,
    sliceY: 4,
    anims: {
      idle: {
        from: 0,
        to: 7,
      },
    },
  }),
  k.loadSprite("tobias", "/assets/imgs/tobias.png", {
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
  }),

  k.loadSprite("tiles", "/assets/imgs/tiles.png", {
    sliceX: 14,
    sliceY: 7,
  }),

  k.loadSprite("goomba", "/assets/imgs/goomba.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
      walk: {
        from: 0,
        to: 1,
      },
    },
  }),
];

k.layers(["game", "ui"], "game");

// Scenes
k.scene("title", Title);
k.scene("game", Game);
k.scene("gameover", GameOver);
k.scene("level_1_intro", LevelOneIntro);

await Promise.all(assets);

k.go("title");
