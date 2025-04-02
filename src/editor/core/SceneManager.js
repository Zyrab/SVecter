import GameObject from "../objects/GameObjects.js";
class SceneManager {
  constructor() {
    this.objects = [];
  }

  addObject(obj) {
    this.objects.push(obj);
  }

  draw(ctx) {
    this.objects.forEach((obj) => obj.draw(ctx));
  }

  getObjectAt(x, y) {
    return this.objects.find((obj) => obj.containsPoint(x, y));
  }
}

export default SceneManager;
