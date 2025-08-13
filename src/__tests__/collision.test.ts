// src/__tests__/collision.test.ts
import { checkCollision, Rect } from '../utils/collision';

describe('collision utility', () => {
  const rect1: Rect = { x: 10, y: 10, width: 20, height: 20 };

  it('should return true for overlapping rectangles', () => {
    const rect2: Rect = { x: 15, y: 15, width: 20, height: 20 };
    expect(checkCollision(rect1, rect2)).toBe(true);
  });

  it('should return true for touching rectangles', () => {
    const rect2: Rect = { x: 30, y: 10, width: 10, height: 10 };
    expect(checkCollision(rect1, rect2)).toBe(true);
  });

  it('should return false for non-overlapping rectangles', () => {
    const rect2: Rect = { x: 40, y: 40, width: 10, height: 10 };
    expect(checkCollision(rect1, rect2)).toBe(false);
  });

  it('should return false when one rectangle is completely inside another', () => {
    const rect2: Rect = { x: 12, y: 12, width: 5, height: 5 };
    expect(checkCollision(rect1, rect2)).toBe(true);
  });
  
  it('should return false for rectangles that are far apart', () => {
    const rect2: Rect = { x: 100, y: 100, width: 20, height: 20 };
    expect(checkCollision(rect1, rect2)).toBe(false);
  });
});
