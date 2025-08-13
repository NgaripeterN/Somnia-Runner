// src/components/StartScreen.tsx
import React from 'react';
import styles from './StartScreen.module.scss';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className={styles.startScreen}>
      <h1 className={styles.title}>
        <span style={{ color: '#0096FF' }}>Somnia</span>{' '}
        <span style={{ color: '#FF004D' }}>Runner</span>
      </h1>
      <p className={styles.instructions}>
        Press Space or Arrow Up to Jump
      </p>
      <button onClick={onStart} aria-label="Start Game">
        Start
      </button>
    </div>
  );
};

export default StartScreen;
