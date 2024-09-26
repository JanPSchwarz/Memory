"use client";

import SetUpMenu from "@/app/components/SetUpMenu";
import GameBoard from "@/app/components/GameBoard";
import AnimatedIcon from "@/app/components/AnimatedIcon";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [gameSettings, setGameSettings] = useState({
    theme: "Numbers",
    players: 1,
    grid: "4x4",
  });

  const [startAnimation, setStartAnimation] = useState(true);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setStartAnimation(false);
    }, 1600);

    return () => clearTimeout(timeOut);
  }, []);

  const [isGame, setIsGame] = useState(false);

  const [restartGame, setRestartGame] = useState(false);

  function refreshGameSettings() {
    setGameSettings({
      theme: "Numbers",
      players: 1,
      grid: "4x4",
    });
  }

  function changeGameSettings(props) {
    setGameSettings(props);
  }

  function stopGame() {
    setIsGame(false);
  }

  function startGame() {
    setIsGame(true);
  }

  function restart() {
    setRestartGame(true);
    setIsGame(false);

    const timeOut = setTimeout(() => {
      setIsGame(true);
      setRestartGame(false);
    }, 1500);

    return () => clearTimeout(timeOut);
  }

  return (
    <>
      {startAnimation && <AnimatedIcon />}
      <AnimatePresence mode="popLayout">
        {isGame ? (
          <motion.div
            key="board"
            initial={{ opacity: 0.5, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GameBoard
              restartGame={restart}
              gameSettings={gameSettings}
              refreshGameSettings={refreshGameSettings}
              stopGame={stopGame}
            />
          </motion.div>
        ) : restartGame ? (
          <AnimatedIcon />
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0.5, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SetUpMenu
              gameSettings={gameSettings}
              changeGameSettings={changeGameSettings}
              startGame={startGame}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
