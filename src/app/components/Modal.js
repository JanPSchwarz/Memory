import { motion } from "framer-motion";

export default function Modal({ children, clickBackground, exitAnimation }) {
  return (
    <>
      <div
        onClick={clickBackground}
        className={`fixed inset-0 z-[1] flex h-screen w-screen items-center justify-center bg-gray-500 bg-opacity-50`}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: exitAnimation && 0 }}
          onClick={(event) => event.stopPropagation()}
          className={`flex rounded-3xl bg-colorPreset5 p-6 md:p-10`}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
