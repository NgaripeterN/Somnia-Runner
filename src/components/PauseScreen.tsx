// src/components/PauseScreen.tsx
import React from 'react';
import styles from './PauseScreen.module.scss';

interface PauseScreenProps {
  onResume: () => void;
}

const PauseScreen: React.FC<PauseScreenProps> = ({ onResume }) => {
  return (
    <div className={styles.pauseScreen}>
      <h2 className={styles.title}>Paused</h2>
      <button onClick={onResume} aria-label="Resume Game">
        Resume
      </button>
    </div>
  );
};

export default PauseScreen;
