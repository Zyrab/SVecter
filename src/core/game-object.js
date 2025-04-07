let idCounter = 0;

function generateId() {
  return `obj-${idCounter++}`;
}

class GameObject {
  constructor(x, y, width, height, color = "blue", name = "GameObject") {
    this.id = generateId();
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = 0;
    this.rx = 0;
    this.ry = 0;
    this.rz = 0;
    this.sx = 1;
    this.sy = 1;
    this.sz = 1;
    this.width = width;
    this.height = height;
    this.color = color;
    this.selected = false;
    this.visible = true; // visibility flag
    this.locked = false; // lock flag
    this.eventListeners = {}; // event listeners storage
  }

  draw(ctx) {
    if (!this.visible) return;

    ctx.save();

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    ctx.translate(centerX, centerY);

    // Simulate 3D-like perspective using cosine scale
    const cosX = Math.cos(this.rx);
    const cosY = Math.cos(this.ry);
    ctx.scale(this.sx * cosY, this.sy * cosX); // fake Y-rotation scales X, X-rotation scales Y

    // Z-axis rotation (real 2D rotation)
    ctx.rotate(this.rz);

    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

    if (this.selected) {
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    }

    ctx.restore();
  }

  containsPoint(px, py) {
    if (!this.visible) return false;
    return (
      px >= this.x &&
      px <= this.x + this.width &&
      py >= this.y &&
      py <= this.y + this.height
    );
  }

  move(dx, dy) {
    if (!this.locked) {
      this.x += dx;
      this.y += dy;
    }
  }
}

export default GameObject;
