class Scene {
  constructor() {
    this.objects = [];
    this.eventListeners = {};
  }

  // Pub/Sub
  on(event, callback) {
    if (!this.eventListeners[event]) this.eventListeners[event] = [];
    this.eventListeners[event].push(callback);
  }

  emit(event, data) {
    (this.eventListeners[event] || []).forEach((cb) => cb(data));
  }

  addObject(obj) {
    this.objects.push(obj);
    this.emit("objectListUpdated", this.getObjectList());
  }

  removeObject(obj) {
    this.objects = this.objects.filter((o) => o !== obj);
    this.emit("objectListUpdated", this.getObjectList());
  }

  draw(ctx) {
    this.objects.forEach((obj) => obj.draw(ctx));
  }

  getObjectAt(x, y) {
    return this.objects.find((obj) => obj.containsPoint(x, y));
  }

  getObjectList() {
    return this.objects;
  }
}

export default Scene;
