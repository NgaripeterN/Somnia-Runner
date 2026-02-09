// src/hooks/useKeyboard.ts
import { useState, useEffect, useCallback } from 'react';

export function useKeyboard(targetKeys: string[]): Record<string, boolean> {
  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>(
    targetKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {})
  );

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (targetKeys.includes(key) && !keysPressed[key]) {
        setKeysPressed((prev) => ({ ...prev, [key]: true }));
      }
    },
    [targetKeys, keysPressed]
  );

  const handleKeyUp = useCallback(
    ({ key }: KeyboardEvent) => {
      if (targetKeys.includes(key)) {
        setKeysPressed((prev) => ({ ...prev, [key]: false }));
      }
    },
    [targetKeys]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return keysPressed;
}

// A more specific hook for the jump action
export function useJump(): boolean {
    const keys = useKeyboard([' ', 'Spacebar', 'ArrowUp']);
    const [isJumping, setIsJumping] = useState(false);

    const handleTouchStart = useCallback(() => {
        setIsJumping(true);
    }, []);

    const handleTouchEnd = useCallback(() => {
        setIsJumping(false);
    }, []);

    useEffect(() => {
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleTouchStart, handleTouchEnd]);

    return isJumping || keys[' '] || keys['Spacebar'] || keys['ArrowUp'];
}
