// src/components/StartScreen.tsx
import React from 'react';
import styles from './StartScreen.module.scss';

interface StartScreenProps {
  onStart: () => void;
  isLoading: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, isLoading }) => {
  return (
    <div className={styles.startScreen}>
      <h1 className={styles.title}>
        <span style={{ color: 'var(--primary-accent, #0096FF)' }}>Somnia</span>{' '}
        <span style={{ color: 'var(--secondary-accent, #FF004D)' }}>Runner</span>
      </h1>
      <p className={styles.instructions}>
        Press Space or Arrow Up to Jump
      </p>
      <button onClick={onStart} aria-label="Start Game" disabled={isLoading}>
        {isLoading ? 'Loading Assets...' : 'Start'}
      </button>
    </div>
  );
};

export default StartScreen;