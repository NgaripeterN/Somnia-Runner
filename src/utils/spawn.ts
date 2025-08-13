// src/utils/spawn.ts


export type ObstacleType = 'cactus' | 'tree' | 'fly';

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: ObstacleType;
}

const obstacleTypes: { [key in ObstacleType]: { width: number; height: number } } = {
  cactus: { width: 30, height: 60 },
  tree: { width: 45, height: 65 },
  fly: { width: 50, height: 30 },
};

const BASE_SPAWN_RATE = 120; // frames
const MIN_SPAWN_RATE = 50; // frames
const SPAWN_RATE_SCALING = 0.999;

let spawnTimer = BASE_SPAWN_RATE;
let currentSpawnRate = BASE_SPAWN_RATE;

/**
 * Updates the spawn logic and returns a new obstacle if one should be spawned.
 * @param canvasWidth - The width of the canvas.
 * @returns A new obstacle or null.
 */
export function updateSpawner(
  canvasWidth: number,
  score: number
): Obstacle | null {
  spawnTimer--;

  if (spawnTimer <= 0) {
    // Reset timer
    currentSpawnRate *= SPAWN_RATE_SCALING;
    if (currentSpawnRate < MIN_SPAWN_RATE) {
      currentSpawnRate = MIN_SPAWN_RATE;
    }
    spawnTimer = currentSpawnRate + Math.random() * 60 - 30; // Add some randomness

    // Create a new random obstacle
    const scoreInCycle = score % 400;
    const availableObstacles: ObstacleType[] = ['cactus', 'tree'];
    if (scoreInCycle >= 300) {
      availableObstacles.push('fly');
    }

    const type = availableObstacles[Math.floor(Math.random() * availableObstacles.length)];
    const { width, height } = obstacleTypes[type];

    let y = GROUND_LEVEL - height;
    if (type === 'fly') {
      y = Math.random() > 0.5 ? GROUND_LEVEL - height - 20 : GROUND_LEVEL - height - 60;
    }

    return {
      x: canvasWidth,
      y,
      width,
      height,
      type,
    };
  }

  return null;
}

export function resetSpawner() {
    spawnTimer = BASE_SPAWN_RATE;
    currentSpawnRate = BASE_SPAWN_RATE;
}

// Re-exporting from physics for convenience in GameCanvas
export const GROUND_LEVEL = 200;
