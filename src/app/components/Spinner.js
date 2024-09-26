import SpinnerSVG from "../../../public/svg/spinner.svg";

export default function Spinner() {
  return (
    <div
      className={`absolute left-1/2 right-1/2 flex flex-col items-center justify-center gap-8`}
    >
      <SpinnerSVG />
      <p className={`text-center text-zinc-800`}>Loading Icons...</p>
    </div>
  );
}
