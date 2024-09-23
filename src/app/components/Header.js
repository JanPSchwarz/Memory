import { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import { AnimatePresence } from "framer-motion";

export default function Header({
  handleConfirmMessage,
  stopGame,
  refreshGameSettings,
  restartGame,
}) {
  const [isMobile, setIsMobile] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    function isMobile() {
      if (window.innerWidth >= 768) setIsMobile(false);
      else setIsMobile(true);
    }

    isMobile();

    window.addEventListener("resize", isMobile);

    return () => {
      window.removeEventListener("resize", isMobile);
    };
  }, []);

  function toggleModal() {
    setShowModal(!showModal);
  }

  const NewGameButton = () => {
    return (
      <Button
        onClickFunction={() =>
          handleConfirmMessage(
            () => {
              stopGame(), refreshGameSettings();
            },
            `Do you want to start a new game?`,
            `Your progress will be lost.`,
          )
        }
        className={`text-nowrap bg-colorPreset9 px-5 text-colorPreset3`}
        hover={`hover:bg-colorPreset7`}
      >
        New Game
      </Button>
    );
  };

  const RestartGameButton = () => {
    return (
      <Button
        onClickFunction={() =>
          handleConfirmMessage(
            restartGame,
            `Do you want to restart the Game?`,
            `Your progress will be lost.`,
          )
        }
        className={`bg-colorPreset1 px-5 text-colorPreset8`}
        hover={`hover:opacity-80`}
      >
        Restart
      </Button>
    );
  };

  return (
    <>
      <header
        className={`mx-5 flex h-[80px] w-[90vw] max-w-[1200px] items-center justify-between self-center md:h-[120px]`}
      >
        <h1 className={`text-[24px] md:text-[40px]`}>memory</h1>
        <div
          className={`flex items-center justify-center gap-8 text-sizePreset1 md:text-sizePreset3`}
        >
          {isMobile ? (
            <Button
              onClickFunction={() => setShowModal(true)}
              className={`bg-colorPreset1 px-5 text-colorPreset8`}
            >
              Menu
            </Button>
          ) : (
            <>
              <RestartGameButton />
              <NewGameButton />
            </>
          )}
        </div>
      </header>

      <AnimatePresence>
        {showModal && (
          <Modal exitAnimation clickBackground={() => toggleModal()}>
            <div className={`flex w-[70vw] flex-col gap-4`}>
              <RestartGameButton />
              <NewGameButton />
              <Button
                className={`text-nowrap bg-colorPreset9 px-5 text-colorPreset3`}
                onClickFunction={toggleModal}
              >
                Resume Game
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
