// systems/Grid.js

class Grid {
  constructor(step = 50) {
    this.step = step;
  }

  draw(ctx, camera, canvas) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 0.5;

    const scaledStep = this.step * camera.zoom;
    const startX = -((camera.x % scaledStep) + scaledStep);
    const startY = -((camera.y % scaledStep) + scaledStep);

    for (let x = startX; x < canvas.width; x += scaledStep) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = startY; y < canvas.height; y += scaledStep) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    ctx.restore();
  }
}

export default Grid;
