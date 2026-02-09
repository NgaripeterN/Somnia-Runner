import { useState, useCallback, useEffect, useRef } from 'react';
import GameCanvas from './components/GameCanvas';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import PauseScreen from './components/PauseScreen';
import styles from './App.module.scss';

import dinoSprite from './assets/dino.png';
import cactusSprite from './assets/cactus.png';
import treeSprite from './assets/tree.png';
import flySprite from './assets/fly.png';

type GameState = 'start' | 'playing' | 'paused' | 'gameOver';

export interface GameAssets {
  dino: HTMLImageElement;
  cactus: HTMLImageElement;
  tree: HTMLImageElement;
  fly: HTMLImageElement;
  isLoaded: boolean;
}

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const assets = useRef<GameAssets>({
    dino: new Image(),
    cactus: new Image(),
    tree: new Image(),
    fly: new Image(),
    isLoaded: false,
  });

  useEffect(() => {
    const sources = [
      { img: assets.current.dino, src: dinoSprite },
      { img: assets.current.cactus, src: cactusSprite },
      { img: assets.current.tree, src: treeSprite },
      { img: assets.current.fly, src: flySprite },
    ];

    let loadedCount = 0;
    sources.forEach(({ img, src }) => {
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === sources.length) {
          assets.current.isLoaded = true;
          setAssetsLoaded(true);
        }
      };
    });
  }, []);

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
      {gameState === 'start' && (
        <StartScreen 
          onStart={handleStart} 
          isLoading={!assetsLoaded} 
        />
      )}
      {gameState === 'playing' && (
        <GameCanvas onGameOver={handleGameOver} onPause={handlePause} isPaused={false} assets={assets.current} />
      )}
      {gameState === 'paused' && (
        <>
          <GameCanvas onGameOver={handleGameOver} onPause={handlePause} isPaused={true} assets={assets.current} />
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