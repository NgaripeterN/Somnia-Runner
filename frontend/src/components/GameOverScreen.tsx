// src/components/GameOverScreen.tsx
import React from 'react';
import styles from './GameOverScreen.module.scss';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, highScore, onRestart }) => {
  return (
    <div className={styles.gameOverScreen}>
      <h2 className={styles.title}>Game Over</h2>
      <div className={styles.scores}>
        <p>Score: {score}</p>
        <p>Best: {highScore}</p>
      </div>
      <button onClick={onRestart} aria-label="Restart Game">
        Restart
      </button>
    </div>
  );
};

export default GameOverScreen;
