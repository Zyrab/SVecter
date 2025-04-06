class Engine {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.scene = new Scene();
    this.camera = new Camera();
    this.running = false;
  }

  start() {
    this.running = true;
    this._loop(performance.now());
  }

  stop() {
    this.running = false;
  }

  _loop = (time) => {
    if (!this.running) return;
    const dt = time - (this.lastTime || time);
    this.lastTime = time;

    this.update(dt);
    this.render();

    requestAnimationFrame(this._loop);
  };

  update(dt) {
    this.scene.update(dt);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.scene.render(this.ctx, this.camera);
  }
}
