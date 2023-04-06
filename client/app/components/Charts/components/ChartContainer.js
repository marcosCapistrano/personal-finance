"use client";
import React, { useRef, useState, useEffect } from "react";

export default function ChartContainer({ className, children }) {
  const [containerRef, setContainerRef] = useState(null);
  const [container, setContainer] = useState(null);

  useEffect(() => {
    if (containerRef) {
      setContainer({
        width: containerRef.clientWidth,
        height: containerRef.clientHeight,
      });

      console.log(containerRef)
    } else {
        console.log("container null")
    }
  }, [containerRef]);

  return (
    <div className={className} ref={setContainerRef}>
      {React.cloneElement(children, { container })}
    </div>
  );
}
