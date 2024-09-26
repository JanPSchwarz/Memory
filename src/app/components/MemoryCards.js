import { useState, useEffect, Suspense, lazy } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import Spinner from "@/app/components/Spinner";

const RandomIcon = lazy(() => import(`@/app/components/RandomIcon`));

export default function MemoryCards({
  gameSettings,
  addMoveCounter,
  addGuessedRightCounter,
  nextPlayer,
  currentPlayer,
  solvedGame,
  timerControls,
  timerID,
  isSinglePlayer,
}) {
  const { theme, players, grid } = gameSettings;
  const [memory, setMemory] = useState(() => generateMemoryPairs());

  // controlls first and second draw of card as per round with
  // index tracking important to trigger button styles animations
  const [firstCard, setFirstCard] = useState({
    firstCardValue: undefined,
    firstCardIndex: undefined,
  });
  const [secondCard, setSecondCard] = useState({
    secondCardValue: undefined,
    secondCardIndex: undefined,
  });

  // guessed pairs go here
  const [guessedRight, setGuessedRight] = useState({
    values: [],
    indices: [],
  });

  // controls flipp animation state
  const [flippedCards, setFlippedCards] = useState(memory.map(() => false));

  // controls game steps
  const [refresh, setRefresh] = useState(false);

  const { firstCardValue, firstCardIndex } = firstCard;
  const { secondCardValue, secondCardIndex } = secondCard;
  const { values: guessedRightValues, indices: guessedRightIndices } =
    guessedRight;

  // when memory is solved
  useEffect(() => {
    const memorySolved = guessedRightIndices.length === memory.length;
    let timeOut;
    if (memorySolved) {
      timeOut = setTimeout(() => {
        solvedGame();
      }, 800);
    }
    return () => clearTimeout(timeOut);
  }, [guessedRightIndices]);

  // after first card draft, single-player: timer start
  useEffect(() => {
    if (firstCardIndex !== undefined) {
      flipCard(firstCardIndex);
      if (isSinglePlayer && !timerID) {
        timerControls.start();
      }
    }
  }, [firstCardIndex]);

  // after second card draft
  useEffect(() => {
    if (secondCardIndex !== undefined) {
      flipCard(secondCardIndex);
      if (isSinglePlayer) addMoveCounter();
    }
  }, [secondCardIndex]);

  useEffect(() => {
    if (secondCardIndex !== undefined) {
      updateGuessedPairs();
    }
  }, [secondCardValue]);

  //  after refresh was triggered (by updateGuessedPairs())
  useEffect(() => {
    let timeOuts;
    if (refresh) {
      const guessedRight = firstCardValue === secondCardValue;
      const delay = guessedRight ? 300 : 800;
      timeOuts = refreshState(delay);
    }
    return () => {
      if (timeOuts) timeOuts.forEach((timeOut) => clearTimeout(timeOut));
    };
  }, [refresh]);

  // only for multiplayer: updates counter after second card draft
  useEffect(() => {
    if (!isSinglePlayer && secondCardValue !== undefined) {
      if (secondCardValue === firstCardValue) {
        addGuessedRightCounter(currentPlayer);
      } else {
        nextPlayer();
      }
    }
  }, [secondCardValue]);

  function flipCard(index) {
    if (!guessedRightIndices.includes(index)) {
      setFlippedCards((prev) =>
        prev.map((flipped, i) => (i === index ? !flipped : flipped)),
      );
    }
  }

  /**
   * flips card back (if not guessedRight)
   * sets card states back to undefined
   */
  function refreshState(delay) {
    let timeOuts = [];
    //how long cards are open after picking
    const timeOut1 = setTimeout(() => {
      flipCard(firstCardIndex);
      flipCard(secondCardIndex);
    }, delay);

    const timeOut2 = setTimeout(() => {
      setRefresh(false);
    }, delay + 200);

    const timeOut3 = setTimeout(() => {
      setFirstCard({
        firstCardValue: undefined,
        firstCardIndex: undefined,
      });
      setSecondCard({
        secondCardValue: undefined,
        secondCardIndex: undefined,
      });
    }, delay);

    timeOuts.push(timeOut1, timeOut2, timeOut3);
    return timeOuts;
  }

  // updates guessedRight state and then starts refresh states implicitly by setting refresh state
  function updateGuessedPairs() {
    if (firstCardValue === secondCardValue) {
      if (!guessedRightValues.includes(firstCardValue)) {
        setGuessedRight((prev) => ({
          values: [...prev.values, firstCardValue],
          indices: [...prev.indices],
        }));
      }

      setGuessedRight((prev) => ({
        values: [...prev.values],
        indices: [...prev.indices, firstCardIndex, secondCardIndex],
      }));
    }
    setRefresh(true);
  }

  // generates an Array with random order
  function generateMemoryPairs() {
    const numbers = [];

    const maxRandomNumber = theme === "Numbers" ? 100 : 1600;
    const memoryPairs = grid === "4x4" ? 8 : 18;

    while (numbers.length < memoryPairs) {
      const randoNumber = Math.floor(Math.random() * maxRandomNumber);
      if (!numbers.includes(randoNumber)) {
        numbers.push(randoNumber);
      }
    }

    const resultArray = [...numbers, ...numbers];

    // Fisher-Yates Shuffle
    for (let i = resultArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
    }

    return resultArray;
  }

  // button click updates card states
  function pickCard(value, index) {
    if (
      guessedRightValues.includes(value) ||
      firstCardIndex === index ||
      secondCardIndex === index ||
      refresh
    )
      return;

    if (!firstCardValue) {
      setFirstCard({
        firstCardValue: value,
        firstCardIndex: index,
      });
    } else if (!secondCardValue) {
      setSecondCard({
        secondCardValue: value,
        secondCardIndex: index,
      });
    }
  }

  return (
    <div className={`flex items-center justify-center`}>
      <div
        className={twMerge(
          `grid max-h-[480px] w-[90vw] max-w-[480px] grid-cols-4 place-items-center gap-4 text-colorPreset5 md:gap-5 lg:gap-7`,
          grid === "6x6" &&
            `max-h-[572px] max-w-[572px] grid-cols-6 gap-2 md:gap-6 lg:gap-4`,
        )}
      >
        <Suspense fallback={<Spinner />}>
          {memory.map((number, index) => {
            return (
              <motion.button
                key={index}
                transition={{
                  duration: 0.4,
                }}
                animate={{
                  rotateY: flippedCards[index] ? 180 : 0,
                  scale: flippedCards[index] ? [1, 1.15, 1] : 1,
                }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                className={`hover:bg-colorPreset7} aspect-square w-full rounded-full bg-colorPreset3`}
                value={number}
                onClick={(event) => {
                  pickCard(event.target.value, index);
                }}
              >
                <span
                  className={twMerge(
                    `flex h-full w-full items-center justify-center rounded-full bg-colorPreset1 text-sizePreset6 [backfaceVisibility:hidden] [transform:rotateY(180deg)] md:text-sizePreset9`,
                    guessedRightIndices.includes(index) &&
                      `bg-colorPreset2 transition delay-700`,
                    grid === "6x6" && `text-sizePreset4 md:text-sizePreset6`,
                    grid === "6x6" && theme === "Icons" && `text-sizePreset5`,
                  )}
                >
                  {theme === "Numbers" ? (
                    number
                  ) : (
                    <RandomIcon number={number} />
                  )}
                </span>
              </motion.button>
            );
          })}
        </Suspense>
      </div>
    </div>
  );
}
