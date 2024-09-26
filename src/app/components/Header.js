import { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import ConfirmMessage from "@/app/components/ConfirmMessage";
import Modal from "@/app/components/Modal";
import { AnimatePresence } from "framer-motion";

export default function Header({
  timerControls,
  stopGame,
  refreshGameSettings,
  restartGame,
}) {
  const [isMobile, setIsMobile] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState({
    message: "",
    question: "",
    confirmFunction: "",
    closeFunction: "",
  });

  // * browser default prompt on reload
  // ! not working on iOs
  useEffect(() => {
    function beforeUnload(event) {
      event.preventDefault();
      event.returnValue = ``;
      return ``;
    }

    window.addEventListener(`beforeunload`, beforeUnload);

    return () => window.removeEventListener(`beforeunload`, beforeUnload);
  }, []);

  //* handleConfirmMessage function can be passed to set up the message and trigger it right away
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

  //* both UE controll timer
  useEffect(() => {
    if (showModal) timerControls.pause();
    else timerControls.resume();
  }, [showModal]);

  useEffect(() => {
    if (!isMobile && showConfirmMessage) timerControls.pause();
    else if (!isMobile) timerControls.resume();
  }, [showConfirmMessage]);

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
              onClickFunction={() => {
                setShowModal(true);
              }}
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
          <Modal
            exitAnimation
            clickBackground={() => {
              setShowModal(!showModal);
            }}
          >
            <div className={`flex w-[70vw] flex-col gap-4`}>
              <RestartGameButton />
              <NewGameButton />
              <Button
                className={`text-nowrap bg-colorPreset9 px-5 text-colorPreset3`}
                onClickFunction={() => {
                  setShowModal(!showModal);
                }}
              >
                Resume Game
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
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
