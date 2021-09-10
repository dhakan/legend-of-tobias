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

  let destroyListener = null;

  return {
    require: ["hp", "scale"],
    update() {
      const percentage = this.getHealth() / this.getInitialHealth();
      ui.width = percentage * this._getWidth();
      ui.pos.x = this.pos.x - (this.width / 2) * this.scale.x;
      ui.pos.y = this.pos.y - this.height * this.scale.y - yOffset;
      ui.hidden = this.hidden;

      // TODO Possible to do this when initialising instead of here? Check the docs
      if (destroyListener) {
        return;
      }

      destroyListener = this.on("destroy", () => {
        k.destroy(ui);
      });
    },
    _getWidth() {
      return this.width * this.scale.x;
    },
  };
}
