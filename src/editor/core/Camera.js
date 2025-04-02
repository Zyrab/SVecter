class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.zoom = 1;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
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
    if (this.isDragging) {
      this.x += mouseX - this.lastMouseX;
      this.y += mouseY - this.lastMouseY;
      this.lastMouseX = mouseX;
      this.lastMouseY = mouseY;
    }
  }

  stopDrag() {
    this.isDragging = false;
  }

  zoomAt(mouseX, mouseY, delta) {
    let zoomFactor = delta > 0 ? 1.1 : 0.9;
    this.zoom *= zoomFactor;

    // Keep zoom within reasonable bounds
    this.zoom = Math.max(0.1, Math.min(3, this.zoom));
  }
}

export default Camera;
