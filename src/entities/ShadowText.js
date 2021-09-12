import k from "../kaboom.js";

const SHADOW_OFFSET = 3;

export default function (value, size) {
  const shadow = k.add([
    k.text(value, size),
    k.pos(k.width() + SHADOW_OFFSET, k.height() / 2 + SHADOW_OFFSET),
    k.color(1, 0, 0),
    k.origin("left"),
  ]);

  const obj = k.add([
    k.text(value, size),
    k.pos(k.width(), k.height() / 2),
    k.origin("left"),
  ]);

  obj.on("destroy", () => {
    k.destroy(shadow);
  });

  obj.action(() => {
    shadow.pos = k.vec2(obj.pos.x + SHADOW_OFFSET, obj.pos.y + SHADOW_OFFSET);
  });

  return obj;
}
