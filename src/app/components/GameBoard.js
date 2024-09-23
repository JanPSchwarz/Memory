import Header from "@/app/components/Header";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ConfirmMessage from "@/app/components/ConfirmMessage";
import MemoryCards from "@/app/components/MemoryCards";
import PlayersInfo from "@/app/components/PlayersInfo";
import Score from "@/app/components/Score";

export default function GameBoard({
  stopGame,
  refreshGameSettings,
  gameSettings,
  restartGame,
}) {
  // general
  const [isSinglePlayer] = useState(gameSettings.players === 1);
  const [gameIsSolved, setGameIsSolved] = useState(false);

  function solvedGame() {
    setGameIsSolved(true);
  }

  useEffect(() => {
    if (gameIsSolved) {
      if (isSinglePlayer) {
        stopTimer(timerID);
      }
    }
  }, [gameIsSolved]);

  // single-player
  const [moveCounter, setMoveCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerID, setTimerID] = useState();

  const addMoveCounter = useCallback(() => {
    setMoveCounter((prev) => prev + 1);
  }, []);

  function startTimer() {
    const timerInterval = setInterval(() => {
      if (timer < 3600) setTimer((prev) => prev + 1);
    }, 1000);
    setTimerID(timerInterval);
  }

  const stopTimer = useCallback((id) => {
    if (timerID) {
      clearInterval(id);
      setTimerID();
    }
  });
  //

  //mulit-player
  const [guessedRightCounter, setGuessedRightCounter] = useState(() => {
    const players = {};
    for (let i = 0; i < gameSettings.players; i++) {
      players[`Player ${i + 1}`] = 0;
    }

    return players;
  });

  const [currentPlayer, setCurrentPlayer] = useState("Player 1");

  const nextPlayer = useCallback(() => {
    const player = Object.keys(guessedRightCounter);
    const currentIndex = player.indexOf(currentPlayer);
    const timeout = setTimeout(() => {
      setCurrentPlayer(player[(currentIndex + 1) % player.length]);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [currentPlayer, guessedRightCounter]);

  const addGuessedRightCounter = useCallback((player) => {
    const timeOut = setTimeout(() => {
      setGuessedRightCounter((prev) => ({
        ...prev,
        [player]: prev[player] + 1,
      }));
    }, 800);
    return () => clearTimeout(timeOut);
  }, []);

  //

  // global dialog useState to controll confirm messages throughout the games
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState({
    message: "",
    question: "",
    confirmFunction: "",
    closeFunction: "",
  });

  // handleConfirmMessage function can be passed to set up the message and trigger it right away
  function handleConfirmMessage(
    confirmFunction,
    question,
    message,
    cancelFunction,
  ) {
    setShowConfirmMessage(!showConfirmMessage);
    setConfirmMessage({
      confirmFunction,
      message,
      question,
      cancelFunction,
    });
  }
  //
  return (
    <>
      <div
        className={`flex h-screen w-screen flex-col justify-between bg-colorPreset5`}
      >
        <Header
          refreshGameSettings={refreshGameSettings}
          stopGame={stopGame}
          handleConfirmMessage={handleConfirmMessage}
          restartGame={restartGame}
        />
        <MemoryCards
          solvedGame={solvedGame}
          isSinglePlayer={isSinglePlayer}
          timerID={timerID}
          startTimer={startTimer}
          addGuessedRightCounter={addGuessedRightCounter}
          currentPlayer={currentPlayer}
          nextPlayer={nextPlayer}
          addMoveCounter={addMoveCounter}
          gameSettings={gameSettings}
        />
        <PlayersInfo
          currentPlayer={currentPlayer}
          isSinglePlayer={isSinglePlayer}
          timer={timer}
          gameSettings={gameSettings}
          moveCounter={moveCounter}
          guessedRightCounter={guessedRightCounter}
        />
        {gameIsSolved && (
          <Score
            refreshGameSettings={refreshGameSettings}
            gameIsSolved={gameIsSolved}
            stopGame={stopGame}
            timer={timer}
            moveCounter={moveCounter}
            isSinglePlayer={isSinglePlayer}
            guessedRightCounter={guessedRightCounter}
            restartGame={restartGame}
          />
        )}
      </div>
      <AnimatePresence>
        {showConfirmMessage && (
          <ConfirmMessage
            question={confirmMessage.question}
            message={confirmMessage.message}
            confirmFunction={confirmMessage.confirmFunction}
            closeFunction={handleConfirmMessage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
