import React, { useState, useEffect } from "react";

export default function ChartWithDimensions({ parentRef, margin = {top:0, right:0, bottom: 0, left: 0}, children }) {
  const [dimensions, setDimensions] = useState({
    width: parentRef ? parentRef.clientWidth : 0,
    height: parentRef ? parentRef.clientHeight : 0,
  });

  useEffect(() => {
    if (parentRef) {
      setDimensions({
        width: parentRef.clientWidth,
        height: parentRef.clientHeight,
      });
    }
  }, [parentRef]);

  if (!parentRef) return "ref null";

  const bounds = {
    margin: {...margin},
    width: dimensions.width - (margin.left + margin.right),
    height: dimensions.height - (margin.top + margin.bottom),
  };

  return (
    <svg width={dimensions.width} height={dimensions.height} style={{position: "relative"}}>
      <g
        style={{transform: `translate(${margin.left}px, ${margin.top}px)`}}
      >
        {React.cloneElement(children, {bounds})}
      </g>
    </svg>
  );
}
