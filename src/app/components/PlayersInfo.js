import InfoBox from "@/app/components/InfoBox";

export default function PlayersInfo({
  moveCounter,
  guessedRightCounter,
  timer,
  isSinglePlayer,
  currentPlayer,
}) {
  const singlePlayer = [
    {
      title: "Time",
      value: convertTimer(),
    },
    { title: "Moves", value: moveCounter },
  ];

  const multiPlayer = Object.entries(guessedRightCounter).map(
    ([key, value]) => ({ title: key, value: value }),
  );

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

  const topArrow = `after:absolute after:left-[calc(50%-15px)] after:top-[-15px] after:content-[""] after:[border-bottom:15px_solid_rgb(var(--color-preset1))] after:[border-left:15px_solid_transparent] after:[border-right:15px_solid_transparent]`;

  return (
    <div
      className={`my-10 flex w-[90vw] max-w-[1200px] justify-center self-center`}
    >
      <div
        className={`flex w-[90%] items-center justify-center gap-4 text-center`}
      >
        {isSinglePlayer
          ? singlePlayer.map((singlePlayer, index) => {
              return (
                <InfoBox
                  key={index}
                  title={singlePlayer.title}
                  value={singlePlayer.value}
                />
              );
            })
          : multiPlayer.map(({ title, value }, index) => {
              const moreThanTwoPlayers = multiPlayer.length > 2;
              const shortTitle = `P` + `${index + 1}`;
              return (
                <InfoBox
                  selected={
                    title === currentPlayer && `bg-colorPreset1 ${topArrow}`
                  }
                  title={moreThanTwoPlayers ? shortTitle : title}
                  value={value}
                />
              );
            })}
      </div>{" "}
    </div>
  );
}
