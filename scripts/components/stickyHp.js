import k from "../kaboom.js";

export default function () {
  // How far up from the sprite the healthbar will be visible
  const yOffset = 5;

  const ui = k.add([
    k.rect(0, 5),
    k.pos(0, 0),
    k.color(1, 0, 0),
    k.layer("ui"),
  ]);

  return {
    require: ["hp", "scale"],
    update() {
      const percentage = this.getHealth() / this.getInitialHealth();
      ui.width = percentage * this._getWidth();
      ui.pos.x = this.pos.x - (this.width / 2) * this.scale.x;
      ui.pos.y = this.pos.y - this.height * this.scale.y - yOffset;
    },
    _getWidth() {
      return this.width * this.scale.x;
    },
  };
}
