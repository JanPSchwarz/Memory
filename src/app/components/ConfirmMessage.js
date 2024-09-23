import { useEffect, useRef } from "react";
import Button from "@/app/components/Button";
import { motion } from "framer-motion";

export default function ConfirmMessage({
  question,
  message,
  confirmFunction,
  closeFunction,
}) {
  const dialogRef = useRef();

  useEffect(() => {
    if (dialogRef.current) dialogRef.current.showModal();
  }, []);

  return (
    <motion.dialog
      ref={dialogRef}
      className={`flex min-h-[300px] flex-col items-center justify-center gap-6 text-pretty rounded-2xl p-8 text-center text-sizePreset2 text-colorPreset4`}
      initial={{ y: 20, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    >
      <p>{question}</p>
      <p>{message}</p>
      <div className={`flex w-full max-w-[400px] gap-4`}>
        <Button
          onClickFunction={() => {
            confirmFunction();
            closeFunction();
          }}
          hover={`hover:opacity-70`}
          className={``}
        >
          Confirm
        </Button>
        <Button
          onClickFunction={() => {
            closeFunction();
          }}
          className={`bg-colorPreset1`}
          hover={`hover:opacity-70`}
        >
          Cancel
        </Button>
      </div>
    </motion.dialog>
  );
}
