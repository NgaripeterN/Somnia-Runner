// src/components/GameCanvas.tsx
import React, { useRef, useEffect, useCallback } from 'react';
import styles from './GameCanvas.module.scss';
import { useAnimationFrame } from '../hooks/useAnimationFrame';
import { useJump } from '../hooks/useKeyboard';
import { DinoState, updateDino, GROUND_LEVEL } from '../utils/physics';
import { Obstacle, updateSpawner, resetSpawner } from '../utils/spawn';
import { checkCollision, Rect } from '../utils/collision';
import { GameAssets } from '../App';

const DINO_WIDTH = 60;
const DINO_HEIGHT = 68;
const GAME_ASPECT_RATIO = 750 / 250;
const RUN_FRAME_COUNT = 2;
const JUMP_FRAME = 2;
const ANIMATION_SPEED = 100; // ms per frame
const NORMAL_SPEED = 5;

// Colors matching the new CSS theme
const GROUND_COLOR = '#1a1a2e';
const TEXT_COLOR = '#ffffff';

const SPEED_INCREASE_FACTOR = 0.5;

interface GameCanvasProps {
  onGameOver: (score: number) => void;
  onPause: () => void;
  isPaused: boolean;
  assets: GameAssets;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ onGameOver, onPause, isPaused, assets }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jumpPressed = useJump();

  // Game state refs
  const dinoState = useRef<DinoState>({ y: GROUND_LEVEL, vy: 0, isJumping: false });
  const obstacles = useRef<Obstacle[]>([]);
  const score = useRef(0);
  const gameSpeed = useRef(NORMAL_SPEED);
  const dinoFrame = useRef(0);
  const frameTime = useRef(0);

  const resetGame = useCallback(() => {
    dinoState.current = { y: GROUND_LEVEL, vy: 0, isJumping: false };
    obstacles.current = [];
    score.current = 0;
    gameSpeed.current = NORMAL_SPEED;
    dinoFrame.current = 0;
    frameTime.current = 0;
    resetSpawner();
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const gameLoop = useCallback((deltaTime: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const normalizedDeltaTime = deltaTime / 16.67;

    dinoState.current = updateDino(dinoState.current, jumpPressed);

    // Update animation frame
    if (dinoState.current.isJumping) {
      dinoFrame.current = JUMP_FRAME;
    } else {
      frameTime.current += deltaTime;
      if (frameTime.current > ANIMATION_SPEED) {
        dinoFrame.current = (dinoFrame.current + 1) % RUN_FRAME_COUNT;
        frameTime.current = 0;
      }
    }

    obstacles.current = obstacles.current
      .map(o => ({ ...o, x: o.x - gameSpeed.current * normalizedDeltaTime }))
      .filter(o => o.x > -o.width);

    const displayedScore = Math.floor(score.current / 10);
    const newObstacle = updateSpawner(canvas.width, displayedScore);
    if (newObstacle) {
      obstacles.current.push(newObstacle);
    }

    score.current += 1;
    
    gameSpeed.current = NORMAL_SPEED + Math.floor(displayedScore / 100) * SPEED_INCREASE_FACTOR;

    const dinoRect: Rect = { x: 50 + 15, y: dinoState.current.y - DINO_HEIGHT + 10, width: DINO_WIDTH - 30, height: DINO_HEIGHT - 20 };
    for (const obstacle of obstacles.current) {
      const obstacleRect = {
        x: obstacle.x + obstacle.width * 0.2,
        y: obstacle.y,
        width: obstacle.width * 0.6,
        height: obstacle.height,
      };
      if (checkCollision(dinoRect, obstacleRect)) {
        onGameOver(displayedScore);
        return;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = GROUND_COLOR;
    ctx.fillRect(0, GROUND_LEVEL, canvas.width, 2);

    // Draw Dino
    const frameWidth = assets.dino.width / 2;
    const frameHeight = assets.dino.height / 2;
    const frameX = (dinoFrame.current % 2) * frameWidth;
    const frameY = Math.floor(dinoFrame.current / 2) * frameHeight;

    if (assets.dino.complete) {
        ctx.drawImage(
          assets.dino,
          frameX, frameY, frameWidth, frameHeight,
          50, dinoState.current.y - DINO_HEIGHT, DINO_WIDTH, DINO_HEIGHT
        );
    }

    // Draw Obstacles
    obstacles.current.forEach(o => {
      const img = assets[o.type as keyof GameAssets] as HTMLImageElement;
      if (img && img.complete) {
        ctx.drawImage(img, o.x, o.y, o.width, o.height);
      }
    });

    ctx.fillStyle = TEXT_COLOR;
    ctx.font = '20px "Press Start 2P"';
    ctx.textAlign = 'left';
    ctx.fillText(displayedScore.toString().padStart(5, '0'), 10, 30);

  }, [jumpPressed, onGameOver, assets]);

  useAnimationFrame(gameLoop, isPaused);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (parent) {
        const width = parent.clientWidth;
        const height = width / GAME_ASPECT_RATIO;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        ctx?.scale(dpr, dpr);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'p') {
        onPause();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onPause]);

  return <canvas ref={canvasRef} className={styles.gameCanvas} />;
};

export default GameCanvas;