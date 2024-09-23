import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  onClickFunction,
  hover,
  selected,
  className,
}) {
  return (
    <button
      className={twMerge(
        "flex flex-1 items-center justify-center rounded-full bg-colorPreset2 p-2 transition-all duration-75 active:scale-90",
        !selected && hover,
        selected,
        className,
      )}
      onClick={onClickFunction}
    >
      {children}
    </button>
  );
}
