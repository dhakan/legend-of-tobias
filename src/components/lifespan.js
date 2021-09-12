import k from "../kaboom.js";

// Borrowed solution from kaboomjs.com
export default function (time) {
  let timer = 0;
  return {
    update() {
      timer += k.dt();
      if (timer >= time) {
        k.destroy(this);
      }
    },
  };
}
