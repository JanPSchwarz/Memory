import Memory from "../../../public/svg/memory.svg";
import { motion } from "framer-motion";

export default function AnimatedIcon() {
  const { d: path, stroke, strokeWidth } = Memory().props.children.props;

  const { width, height } = Memory().props;

  return (
    <motion.div
      initial={{ opacity: 0.5, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`absolute z-10 h-dvh w-screen bg-colorPreset5`}
    >
      <motion.svg
        xmlns={`http://www.w3.org/2000/svg`}
        width={width}
        height={height}
        className={`absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] scale-75 md:scale-150`}
      >
        <motion.path
          d={path}
          fill={`none`}
          stroke={stroke}
          strokeWidth={strokeWidth}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            type: "spring",
            mass: 2,
            stiffness: 30,
            damping: 120,
          }}
        />
      </motion.svg>
    </motion.div>
  );
}
