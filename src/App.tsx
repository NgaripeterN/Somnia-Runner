import { useState, useCallback } from 'react';
import GameCanvas from './components/GameCanvas';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import PauseScreen from './components/PauseScreen';
import styles from './App.module.scss';

type GameState = 'start' | 'playing' | 'paused' | 'gameOver';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('highScore') || '0', 10);
  });

  const handleStart = useCallback(() => {
    setScore(0);
    setGameState('playing');
  }, []);

  const handleGameOver = useCallback((finalScore: number) => {
    setScore(finalScore);
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('highScore', finalScore.toString());
    }
    setGameState('gameOver');
  }, [highScore]);

  const handlePause = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  }, [gameState]);

  const handleRestart = useCallback(() => {
    setScore(0);
    setGameState('playing');
  }, []);

  return (
    <div className={styles.appContainer}>
      {gameState === 'start' && <StartScreen onStart={handleStart} />}
      {gameState === 'playing' && (
        <GameCanvas onGameOver={handleGameOver} onPause={handlePause} isPaused={false} />
      )}
      {gameState === 'paused' && (
        <>
          <GameCanvas onGameOver={handleGameOver} onPause={handlePause} isPaused={true} />
          <PauseScreen onResume={handlePause} />
        </>
      )}
      {gameState === 'gameOver' && (
        <GameOverScreen score={score} highScore={highScore} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;