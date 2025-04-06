class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.zoom = 1;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.minX = -5000;
    this.maxX = 5000;
    this.minY = -5000;
    this.maxY = 5000;
  }

  applyTransform(ctx) {
    ctx.setTransform(this.zoom, 0, 0, this.zoom, this.x, this.y);
  }

  startDrag(mouseX, mouseY) {
    this.isDragging = true;
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;
  }

  drag(mouseX, mouseY) {
    if (!this.isDragging) return;

    // Calculate the new position
    let newX = this.x + (mouseX - this.lastMouseX);
    let newY = this.y + (mouseY - this.lastMouseY);

    // Ensure it's within bounds
    if (newX / this.zoom >= this.minX && newX / this.zoom <= this.maxX) {
      this.x = newX;
    }

    if (newY / this.zoom >= this.minY && newY / this.zoom <= this.maxY) {
      this.y = newY;
    }

    // Update last mouse position
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;
  }

  stopDrag() {
    this.isDragging = false;
  }

  zoomAt(wx, wy, sx, sy, delta) {
    let zoomFactor = delta > 0 ? 0.9 : 1.1;
    this.zoom *= zoomFactor;
    this.zoom = Math.max(0.2, Math.min(3, this.zoom));

    this.x = sx - wx * this.zoom;
    this.y = sy - wy * this.zoom;
  }
}

export default Camera;
