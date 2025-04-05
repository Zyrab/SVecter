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
    this.eventListeners = {}; // event listeners storage
  }

  draw(ctx) {
    if (!this.visible) return; // Skip drawing if not visible

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw selection outline if selected
    if (this.selected) {
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  // Event listener registration
  on(event, callback) {
    if (!this.eventListeners[event]) this.eventListeners[event] = [];
    this.eventListeners[event].push(callback);
  }

  // Event emitting
  emit(event, data) {
    // If data is not an object, wrap it or pass the object separately
    const eventData =
      typeof data === "object" && data !== null && !Array.isArray(data)
        ? { ...data, object: this }
        : { value: data, object: this };
    (this.eventListeners[event] || []).forEach((cb) => cb(eventData));
  }

  // Emit object reference with select/deselect
  select() {
    if (!this.selected) {
      // Prevent emitting if already selected
      this.selected = true;
      this.emit("select", this); // Emit the object itself
    }
  }

  deselect() {
    if (this.selected) {
      // Prevent emitting if already deselected
      this.selected = false;
      this.emit("deselect", this); // Emit the object itself
    }
  }

  toggleVisibility() {
    this.visible = !this.visible;
    // Emit state and object
    this.emit("visibility-change", {
      visible: this.visible /* object: this - added by emit */,
    });
  }

  toggleLock() {
    this.locked = !this.locked;
    // Emit state and object
    this.emit("lock-change", {
      locked: this.locked /* object: this - added by emit */,
    });
  }

  setName(newName) {
    // Example if name can change
    if (newName !== this.name) {
      this.name = newName;
      this.emit("name-change", {
        name: this.name /* object: this - added by emit */,
      });
    }
  }

  destroy() {
    // Example cleanup
    this.emit("destroy", this);
    // Clean up listeners on this object? Depends on your Emitter.
    this.eventListeners = {};
  }

  // Check if point (px, py) is within the object's bounds
  containsPoint(px, py) {
    // Don't allow selection/interaction if not visible, but allow if locked (maybe just prevent move)
    if (!this.visible) return false;

    return (
      px >= this.x &&
      px <= this.x + this.width &&
      py >= this.y &&
      py <= this.y + this.height
    );
  }

  // Move the object if not locked
  move(dx, dy) {
    if (!this.locked) {
      this.x += dx;
      this.y += dy;
      // Emit new position and object
      this.emit("move", {
        x: this.x,
        y: this.y /* object: this - added by emit */,
      });
    }
  }
}

export default GameObject;
