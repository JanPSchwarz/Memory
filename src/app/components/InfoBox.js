import { twMerge, twJoin } from "tailwind-merge";
import Icon from "@mdi/react";
import { mdiPartyPopper } from "@mdi/js";

export default function InfoBox({
  title,
  value,
  selected,
  className,
  highlight,
}) {
  return (
    <div
      className={twMerge(
        `relative flex flex-1 flex-col items-center rounded-md bg-colorPreset9 py-2 text-colorPreset3 transition duration-200 ease-in-out md:flex-row md:justify-around`,
        selected,
        className,
      )}
    >
      <p
        className={twMerge(
          `relative text-sizePreset6 text-colorPreset6 md:text-sizePreset3`,
          highlight && `text-colorPreset8`,
        )}
      >
        {title}
        {highlight && (
          <Icon
            className={`absolute right-[-35px] inline text-colorPreset1`}
            path={mdiPartyPopper}
            size={1}
          />
        )}
      </p>
      <p
        className={twJoin(
          `text-sizePreset4 md:text-sizePreset6`,
          highlight && `text-white`,
        )}
      >
        {value}
      </p>
    </div>
  );
}
