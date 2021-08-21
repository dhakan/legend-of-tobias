const PLATFORM_HEIGHT = 20;

export default function () {
  add([
    rect(width(), PLATFORM_HEIGHT),
    pos(0, height() - PLATFORM_HEIGHT),
    solid(),
    color(1, 1, 0),
    "platform",
  ]);
}
