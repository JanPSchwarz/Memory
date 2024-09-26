import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import MemoryCards from "@/app/components/MemoryCards";
import PlayersInfo from "@/app/components/PlayersInfo";
import Score from "@/app/components/Score";

export default function GameBoard({
  stopGame,
  refreshGameSettings,
  gameSettings,
  restartGame,
}) {
  // * general
  const [isSinglePlayer] = useState(gameSettings.players === 1);
  const [gameIsSolved, setGameIsSolved] = useState(false);

  function solvedGame() {
    setGameIsSolved(true);
  }

  useEffect(() => {
    if (gameIsSolved) {
      if (isSinglePlayer) {
        timerControls.stop();
      }
    }
  }, [gameIsSolved]);

  // * single-player
  const [moveCounter, setMoveCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerID, setTimerID] = useState();
  const [timerPaused, setTimerPaused] = useState(false);

  function addMoveCounter() {
    setMoveCounter((prev) => prev + 1);
  }

  function intervallControls() {
    function start() {
      if (!timerID) {
        const id = setInterval(() => {
          if (timer < 3600) setTimer((prevTime) => prevTime + 1);
        }, 1000);
        setTimerID(id);
      }
    }
    function stop() {
      if (timerID) {
        clearInterval(timerID);
        setTimerID();
      }
    }
    function pause() {
      if (timerID) {
        clearInterval(timerID);
        setTimerPaused(true);
      }
    }
    function resume() {
      if (timerPaused) {
        setTimerPaused(false);
        const id = setInterval(() => {
          setTimer((prev) => prev + 1);
        }, 1000);
        setTimerID(id);
      }
    }

    return { start, stop, pause, resume };
  }

  const timerControls = new intervallControls();
  //

  // * mulit-player
  const [guessedRightCounter, setGuessedRightCounter] = useState(() => {
    const players = {};
    for (let i = 0; i < gameSettings.players; i++) {
      players[`Player ${i + 1}`] = 0;
    }

    return players;
  });

  const [currentPlayer, setCurrentPlayer] = useState("Player 1");

  function nextPlayer() {
    const player = Object.keys(guessedRightCounter);
    const currentIndex = player.indexOf(currentPlayer);
    const timeout = setTimeout(() => {
      setCurrentPlayer(player[(currentIndex + 1) % player.length]);
    }, 1000);
    return () => clearTimeout(timeout);
  }

  function addGuessedRightCounter(player) {
    const timeOut = setTimeout(() => {
      setGuessedRightCounter((prev) => ({
        ...prev,
        [player]: prev[player] + 1,
      }));
    }, 800);
    return () => clearTimeout(timeOut);
  }

  return (
    <>
      <div
        className={`flex h-dvh w-screen flex-col justify-between bg-colorPreset5`}
      >
        <Header
          timerControls={timerControls}
          refreshGameSettings={refreshGameSettings}
          stopGame={stopGame}
          restartGame={restartGame}
        />
        <MemoryCards
          solvedGame={solvedGame}
          isSinglePlayer={isSinglePlayer}
          timerID={timerID}
          timerControls={timerControls}
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
    </>
  );
}
