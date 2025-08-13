// src/__tests__/spawn.test.ts
import { updateSpawner, resetSpawner, Obstacle } from '../utils/spawn';

describe('spawn utility', () => {
  beforeEach(() => {
    resetSpawner();
  });

  it('should not spawn an obstacle before the timer runs out', () => {
    let newObstacle: Obstacle | null = null;
    for (let i = 0; i < 100; i++) {
      newObstacle = updateSpawner(600);
      if (newObstacle) break;
    }
    expect(newObstacle).toBeNull();
  });

  it('should eventually spawn an obstacle', () => {
    let newObstacle: Obstacle | null = null;
    // Loop for more than the base spawn rate to guarantee a spawn
    for (let i = 0; i < 200; i++) {
      newObstacle = updateSpawner(600);
      if (newObstacle) break;
    }
    expect(newObstacle).not.toBeNull();
    if (newObstacle) {
      expect(newObstacle.x).toBe(600); // Should spawn at the edge of the canvas
    }
  });

  it('should reset the spawner timer', () => {
    // Run the spawner, then reset
    updateSpawner(600);
    resetSpawner();
    
    // It should now take the full base time again to spawn
    let newObstacle: Obstacle | null = null;
    for (let i = 0; i < 119; i++) {
        newObstacle = updateSpawner(600);
        if (newObstacle) break;
    }
    expect(newObstacle).toBeNull();
  });
});
