"use client";

import SetUpMenu from "@/app/components/SetUpMenu";
import GameBoard from "@/app/components/GameBoard";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "../../public/svg/spinner.svg";

export default function Home() {
  const [gameSettings, setGameSettings] = useState({
    theme: "Numbers",
    players: 1,
    grid: "4x4",
  });

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

    const timerOut = setTimeout(() => {
      setIsGame(true);
      setRestartGame(false);
    }, 1500);

    return () => clearTimeout(timerOut);
  }

  return (
    <>
      <AnimatePresence initial={false} mode="popLayout">
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
          <motion.div
            initial={{ opacity: 0.5, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -20 }}
            className={`relative z-10 h-dvh w-screen bg-colorPreset5`}
          >
            <Spinner
              className={`absolute left-[calc(50%-30px)] top-[calc(50%-30px)] h-[60px] w-[60px]`}
            />
          </motion.div>
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
