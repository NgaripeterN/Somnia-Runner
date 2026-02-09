// src/utils/collision.ts

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Simple Axis-Aligned Bounding Box (AABB) collision detection.
 * @param rect1 - The first rectangle.
 * @param rect2 - The second rectangle.
 * @returns True if the rectangles are colliding, false otherwise.
 */
export function checkCollision(rect1: Rect, rect2: Rect): boolean {
  return (
    rect1.x <= rect2.x + rect2.width &&
    rect1.x + rect1.width >= rect2.x &&
    rect1.y <= rect2.y + rect2.height &&
    rect1.y + rect1.height >= rect2.y
  );
}
