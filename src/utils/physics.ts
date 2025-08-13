// src/utils/physics.ts

export interface DinoState {
  y: number;
  vy: number; // velocity y
  isJumping: boolean;
}

export const JUMP_FORCE = -10;
export const GRAVITY = 0.5;
export const GROUND_LEVEL = 200; // Assuming canvas height of 250, ground is at y=200

export function updateDino(dino: DinoState, isJumpingInput: boolean): DinoState {
  let { y, vy, isJumping } = dino;

  // Apply gravity
  vy += GRAVITY;
  y += vy;

  // Check for ground collision
  if (y > GROUND_LEVEL) {
    y = GROUND_LEVEL;
    vy = 0;
    isJumping = false;
  }

  // Handle jump input
  if (isJumpingInput && !isJumping) {
    vy = JUMP_FORCE;
    isJumping = true;
  }

  return { y, vy, isJumping };
}
