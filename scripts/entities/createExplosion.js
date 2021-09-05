import { lifespan, grow } from "../components.js";

// Borrowed solution from kaboomjs.com
export default function (p, n, rad, size) {
  for (let i = 0; i < n; i++) {
    wait(rand(n * 0.1), () => {
      for (let i = 0; i < 2; i++) {
        add([
          pos(p.add(rand(vec2(-rad), vec2(rad)))),
          rect(1, 1),
          scale(1 * size, 1 * size),
          lifespan(0.2),
          grow(rand(48, 72) * size),
          origin("center"),
        ]);
      }
    });
  }
}
