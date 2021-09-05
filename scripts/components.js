// Borrowed solution from kaboomjs.com
function lifespan(time) {
  let timer = 0;
  return {
    update() {
      timer += dt();
      if (timer >= time) {
        destroy(this);
      }
    },
  };
}

// Borrowed solution from kaboomjs.com
function grow(rate) {
  return {
    update() {
      const n = rate * dt();
      this.scale.x += n;
      this.scale.y += n;
    },
  };
}

export { lifespan, grow };
