import Button from "@/app/components/Button";

export default function SetUpMenu({
  gameSettings,
  changeGameSettings,
  startGame,
}) {
  const gameOptions = {
    theme: ["Numbers", "Icons"],
    players: [1, 2, 3, 4],
    grid: ["4x4", "6x6"],
  };

  const optionSections = [
    { heading: "Select Theme", option: "theme" },
    { heading: "Number of Players", option: "players" },
    { heading: "Grid Size", option: "grid" },
  ];

  const sectionHeading = `text-colorPreset6 text-sizePreset1 md:text-sizePreset3`;
  const sectionContainer = `flex flex-col gap-2 text-colorPreset8 md:gap-4`;
  const buttonContainer = `flex gap-4 text-sizePreset1 md:text-sizePreset4 md:gap-4`;
  const hoverButton = `hover:bg-colorPreset7`;

  return (
    <div
      className={`flex h-dvh flex-col items-center justify-center gap-12 bg-colorPreset4`}
    >
      <p className={`text-sizePreset5 text-colorPreset8 md:text-sizePreset6`}>
        memory
      </p>
      <div
        className={`flex w-[90vw] max-w-[500px] flex-col gap-6 rounded-3xl bg-colorPreset8 p-5 md:max-w-[654px] md:gap-8 md:p-16`}
      >
        {optionSections.map(({ heading, option }, index) => {
          return (
            <div key={index} className={sectionContainer}>
              <p className={sectionHeading}>{heading}</p>
              <div className={buttonContainer}>
                {gameOptions[option].map((optionValue, index) => {
                  return (
                    <Button
                      key={index}
                      selected={
                        optionValue === gameSettings[option] &&
                        `bg-colorPreset3`
                      }
                      hover={hoverButton}
                      onClickFunction={() =>
                        changeGameSettings({
                          ...gameSettings,
                          [option]: optionValue,
                        })
                      }
                    >
                      {optionValue}
                    </Button>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className={sectionContainer}>
          <div className={buttonContainer}>
            <button
              onClick={startGame}
              className={`flex-1 rounded-full bg-colorPreset1 p-2 text-sizePreset2 transition-all hover:opacity-85 md:text-sizePreset5`}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
