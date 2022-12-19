import React from "react";

type Props = {
  color: string;
};

export default function Circle({ color }: Props) {
  return (
    <svg height="10" width="10">
      <circle cx="5" cy="5" r="4" fill={color} />
    </svg>
  );
}
