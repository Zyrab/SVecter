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
    this.width = width;
    this.height = height;
    this.color = color;
    this.selected = false;
    this.visible = true; // visibility flag
    this.locked = false; // lock flag
  }

  draw(ctx) {
    if (!this.visible) return;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.selected) {
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  move(dx, dy) {
    if (!this.locked) {
      this.x += dx;
      this.y += dy;
    }
  }

  containsPoint(px, py) {
    if (!this.visible || this.locked) return false;

    return (
      px >= this.x &&
      px <= this.x + this.width &&
      py >= this.y &&
      py <= this.y + this.height
    );
  }
}

export default GameObject;
