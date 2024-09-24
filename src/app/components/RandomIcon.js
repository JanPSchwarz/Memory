import * as Icons from "react-icons/fa";

export default function RandomIcon({ number }) {
  const randomIconName = Object.keys(Icons)[number];

  const RandomIcon = Icons[randomIconName];

  if (!RandomIcon) return <p>?</p>;

  return <RandomIcon />;
}
