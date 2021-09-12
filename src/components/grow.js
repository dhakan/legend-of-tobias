import k from "../kaboom.js";

// Borrowed solution from kaboomjs.com
export default function (rate) {
  return {
    update() {
      const n = rate * k.dt();
      this.scale.x += n;
      this.scale.y += n;
    },
  };
}
