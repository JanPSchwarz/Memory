import Modal from "@/app/components/Modal";
import InfoBox from "@/app/components/InfoBox";
import Button from "@/app/components/Button";

export default function Score({
  stopGame,
  refreshGameSettings,
  guessedRightCounter,
  moveCounter,
  timer,
  isSinglePlayer,
  restartGame,
}) {
  const sortedScoreList = Object.entries(guessedRightCounter)
    .map(([key, value]) => ({
      title: key,
      value: value,
    }))
    .toSorted((a, b) => Math.sign(b.value - a.value));

  const singlePlayer = [
    {
      title: "Time Elapsed",
      value: convertTimer(),
    },
    { title: "Moves Taken", value: moveCounter },
  ];

  function convertTimer() {
    if (timer < 60) {
      return timer;
    } else {
      const string =
        `${Math.floor(timer / 60)}:` +
        `${(timer % 60).toString().padStart(2, `0`)}`;
      return string;
    }
  }

  const tie =
    sortedScoreList.filter(({ value }) => value === sortedScoreList[0].value)
      .length > 1;

  const multiplayerHeading = tie
    ? `It's a tie!`
    : `${sortedScoreList[0].title} won!`;

  return (
    <Modal>
      <div
        className={`flex w-[70vw] max-w-[500px] flex-col gap-6 text-center md:gap-10`}
      >
        <div>
          <h1
            className={`text-sizePreset3 text-colorPreset4 md:text-sizePreset8`}
          >
            {isSinglePlayer ? `You did it!` : multiplayerHeading}
          </h1>
          <p className={`my-2 text-nowrap text-sizePreset1 text-colorPreset6`}>
            {isSinglePlayer
              ? `Game over! Here's how you got on...`
              : `Game over! Here are the results...`}
          </p>
        </div>
        <div className={`flex flex-col gap-4`}>
          {isSinglePlayer
            ? singlePlayer.map(({ title, value }) => {
                return (
                  <>
                    <InfoBox
                      className={`flex-row justify-around px-10 md:justify-between`}
                      title={title}
                      value={value}
                    />
                  </>
                );
              })
            : sortedScoreList.map(({ title, value }) => {
                const highestScore = sortedScoreList[0].value;
                const isWinner = value === highestScore;
                return (
                  <>
                    <InfoBox
                      title={title}
                      selected={isWinner && `bg-colorPreset4`}
                      highlight={isWinner}
                      className={`flex-row justify-around`}
                      value={`${value} Pairs`}
                    />
                  </>
                );
              })}
        </div>
        <div className={`flex flex-col gap-4 md:flex-row`}>
          <Button
            onClickFunction={() => restartGame()}
            className={`bg-colorPreset1 px-5 text-colorPreset8 md:text-sizePreset3`}
            hover={`hover:opacity-80`}
          >
            Restart
          </Button>
          <Button
            onClickFunction={() => {
              stopGame();
              refreshGameSettings();
            }}
            className={`text-nowrap bg-colorPreset9 px-5 text-colorPreset3 md:text-sizePreset3`}
            hover={`hover:bg-colorPreset7`}
          >
            Setup New Game
          </Button>
        </div>
      </div>
    </Modal>
  );
}
