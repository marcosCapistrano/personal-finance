import React from "react";

export default function Circle({ cx, cy, r, className, style }) {

  return (
    <circle
      cx={0}
      cy={0}
      r={r}
      className={className}
      onAnimationStart={() => console.log("anim start")}
      onAnimationEnd={(e) => console.log("anim end")}
      {...springs}
      style={springs}
    ></circle>
  );
}
