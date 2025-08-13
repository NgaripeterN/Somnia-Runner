// src/__tests__/physics.test.ts
import { updateDino, DinoState, JUMP_FORCE, GRAVITY, GROUND_LEVEL } from '../utils/physics';

describe('physics utility', () => {
  let dino: DinoState;

  beforeEach(() => {
    dino = { y: GROUND_LEVEL, vy: 0, isJumping: false };
  });

  it('should not jump if already jumping', () => {
    dino.isJumping = true;
    dino.vy = -5;
    const newState = updateDino(dino, true);
    expect(newState.vy).not.toBe(JUMP_FORCE);
    expect(newState.isJumping).toBe(true);
  });

  it('should apply jump force when jump is initiated', () => {
    const newState = updateDino(dino, true);
    expect(newState.vy).toBe(JUMP_FORCE);
    expect(newState.isJumping).toBe(true);
  });

  it('should apply gravity over time', () => {
    let state = updateDino(dino, true); // Jump
    expect(state.vy).toBe(JUMP_FORCE);

    state = updateDino(state, false); // Continue frame
    expect(state.vy).toBe(JUMP_FORCE + GRAVITY);
  });

  it('should not fall through the ground', () => {
    dino.y = GROUND_LEVEL + 20; // Simulate being below ground
    dino.vy = 10;
    const newState = updateDino(dino, false);
    expect(newState.y).toBe(GROUND_LEVEL);
    expect(newState.vy).toBe(0);
    expect(newState.isJumping).toBe(false);
  });

  it('should reset jump state upon landing', () => {
    // Jump
    let state = updateDino(dino, true);
    
    // Simulate enough frames for the dino to land
    for (let i = 0; i < 50; i++) {
        state = updateDino(state, false);
    }
    
    expect(state.y).toBe(GROUND_LEVEL);
    expect(state.isJumping).toBe(false);
  });
});
