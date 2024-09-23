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
    }, 1200);

    return () => clearTimeout(timerOut);
  }

  return (
    <>
      <AnimatePresence initial={false} mode="popLayout">
        {isGame ? (
          <motion.div
            key="board"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 12,
              duration: 0.3,
            }}
            exit={{ x: "100%" }}
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
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className={`absolute z-10 h-screen w-screen bg-colorPreset8 opacity-100`}
          >
            <Spinner
              className={`absolute left-[calc(50%-15px)] top-[calc(50%-15px)] h-[30px] w-[30px]`}
            />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 12,
              duration: 0.3,
            }}
            exit={{ x: "-100%" }}
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
