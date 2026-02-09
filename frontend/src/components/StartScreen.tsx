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
        <span style={{ color: 'var(--primary-accent)' }}>Somnia</span>{' '}
        <span style={{ color: 'var(--secondary-accent)' }}>Runner</span>
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
