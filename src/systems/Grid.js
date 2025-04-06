// systems/Grid.js

class Grid {
  constructor(step = 50) {
    this.baseStep = step; // The finest grid step in world coordinates

    // --- Configuration ---
    this.majorLineFactor = 10; // Every 10th line is a major line
    this.minPixelSpacing = 8; // Below this screen spacing, lines are not drawn/start fading out completely
    this.fadeStartPixelSpacing = 50; // Above this screen spacing, minor lines are fully opaque

    this.minorLineColor = "rgba(204, 204, 204, 0.8)"; // Lighter/standard lines
    this.majorLineColor = "rgba(150, 150, 150, 1)"; // Darker/emphasized lines
    this.minorLineWidth = 0.5;
    this.majorLineWidth = 0.8;
    // --- End Configuration ---
  }

  /**
   * Calculates the alpha for minor grid lines based on their screen spacing.
   * @param {number} screenSpacing - The calculated spacing between minor lines on the screen.
   * @returns {number} Alpha value between 0 and 1.
   */
  calculateMinorAlpha(screenSpacing) {
    if (screenSpacing <= this.minPixelSpacing) {
      return 0; // Too close, completely transparent
    }
    if (screenSpacing >= this.fadeStartPixelSpacing) {
      return 1; // Far enough apart, fully opaque (uses base alpha from color)
    }
    // Linear interpolation for fade effect
    return (
      (screenSpacing - this.minPixelSpacing) /
      (this.fadeStartPixelSpacing - this.minPixelSpacing)
    );
  }

  draw(ctx, camera, canvas) {
    ctx.save();
    // Apply camera transform - this makes calculations simpler as we work in world coords
    // and let the transform handle screen positioning.
    ctx.translate(camera.x, camera.y);
    ctx.scale(camera.zoom, camera.zoom);

    // Calculate the visible area in world coordinates
    const viewX = -camera.x / camera.zoom;
    const viewY = -camera.y / camera.zoom;
    const viewWidth = canvas.width / camera.zoom;
    const viewHeight = canvas.height / camera.zoom;

    // --- Determine the current grid level to draw ---
    let currentMinorStep = this.baseStep;
    let screenSpacing = currentMinorStep * camera.zoom;

    // If the finest grid lines are too close, increase the step size
    // We keep multiplying by the majorLineFactor until lines are reasonably spaced
    while (screenSpacing < this.minPixelSpacing) {
      currentMinorStep *= this.majorLineFactor;
      screenSpacing = currentMinorStep * camera.zoom;
      // If the *new* minor step is now so large it needs fading, break the loop
      // (This prevents infinite loops in extreme zoom-out scenarios, though unlikely)
      if (screenSpacing >= this.fadeStartPixelSpacing) break;
    }

    const currentMajorStep = currentMinorStep * this.majorLineFactor;

    // --- Calculate Alpha for current minor lines ---
    const baseMinorAlpha = parseFloat(this.minorLineColor.split(",")[3] || "1"); // Get alpha from configured color
    const dynamicMinorAlpha = this.calculateMinorAlpha(screenSpacing);
    const finalMinorAlpha = baseMinorAlpha * dynamicMinorAlpha;

    // Don't draw minor lines if they are completely faded
    const drawMinorLines = finalMinorAlpha > 0.01;

    // --- Calculate starting points for drawing lines (in world coordinates) ---
    // Snap to the grid lines just outside the top-left visible corner
    const startWorldX = Math.floor(viewX / currentMinorStep) * currentMinorStep;
    const startWorldY = Math.floor(viewY / currentMinorStep) * currentMinorStep;

    // --- Draw Vertical Lines ---
    ctx.lineWidth = this.minorLineWidth; // Start with minor line width

    for (let wx = startWorldX; wx < viewX + viewWidth; wx += currentMinorStep) {
      // Use a small tolerance for floating point modulo checks
      const isMajorLine =
        Math.abs(wx % currentMajorStep) < 1e-9 ||
        Math.abs(currentMajorStep - Math.abs(wx % currentMajorStep)) < 1e-9;

      if (isMajorLine) {
        ctx.strokeStyle = this.majorLineColor;
        ctx.lineWidth = this.majorLineWidth;
      } else if (drawMinorLines) {
        // Apply dynamic alpha ONLY to the minor lines
        const [r, g, b] = this.minorLineColor.match(/\d+/g).map(Number);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalMinorAlpha})`;
        ctx.lineWidth = this.minorLineWidth;
      } else {
        // Don't draw faded out minor lines
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(wx, viewY); // Draw across the entire *visible world* height
      ctx.lineTo(wx, viewY + viewHeight);
      ctx.stroke();

      // Reset line width for the next iteration if we changed it for a major line
      if (isMajorLine) {
        ctx.lineWidth = this.minorLineWidth;
      }
    }

    // --- Draw Horizontal Lines ---
    // Reset line width just in case
    ctx.lineWidth = this.minorLineWidth;

    for (
      let wy = startWorldY;
      wy < viewY + viewHeight;
      wy += currentMinorStep
    ) {
      const isMajorLine =
        Math.abs(wy % currentMajorStep) < 1e-9 ||
        Math.abs(currentMajorStep - Math.abs(wy % currentMajorStep)) < 1e-9;

      if (isMajorLine) {
        ctx.strokeStyle = this.majorLineColor;
        ctx.lineWidth = this.majorLineWidth;
      } else if (drawMinorLines) {
        const [r, g, b] = this.minorLineColor.match(/\d+/g).map(Number);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalMinorAlpha})`;
        ctx.lineWidth = this.minorLineWidth;
      } else {
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(viewX, wy); // Draw across the entire *visible world* width
      ctx.lineTo(viewX + viewWidth, wy);
      ctx.stroke();

      // Reset line width
      if (isMajorLine) {
        ctx.lineWidth = this.minorLineWidth;
      }
    }

    ctx.restore(); // Restore the canvas state (removes camera transform)
  }
}

export default Grid;
