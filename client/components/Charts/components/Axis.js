import React from "react";

const Orientation = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4,
};

function translateX(x) {
  return "translate(" + x + ",0)";
}

function translateY(y) {
  return "translate(0," + y + ")";
}

function number(scale) {
  return (d) => +scale(d);
}

function center(scale, offset) {
  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
  if (scale.round()) offset = Math.round(offset);
  return (d) => +scale(d) + offset;
}

export default function Axis({
  orient,
  scale,
  options: parentOptions,
  style: parentStyle,
  children
}) {
  const defaultOptions = {
    tickArguments: [],
    tickValues: null,
    tickFormat: null,
    tickSizeInner: 6,
    tickSizeOuter: 6,
    tickPadding: 3,
    offset:
      typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5,
    k: orient === Orientation.top || orient === Orientation.left ? -1 : 1,
    x: orient === Orientation.left || orient === Orientation.right ? "x" : "y",
    transform:
      orient === Orientation.top || orient === Orientation.bottom
        ? translateX
        : translateY,
  };

  const defaultStyle = {
    fill: "none",
    fontSize: "10",
    fontFamily: "sans-serif",
    textAnchor:
      orient === Orientation.right
        ? "start"
        : orient === Orientation.left
        ? "end"
        : "middle",
  };

  const options = { ...defaultOptions, ...parentOptions };
  const style = { ...defaultStyle, ...parentStyle };
  const values =
      options.tickValues == null
        ? scale.ticks
          ? scale.ticks.apply(scale, options.tickArguments)
          : scale.domain()
        : tickValues,
    format =
      options.tickFormat == null
        ? scale.tickFormat
          ? scale.tickFormat.apply(scale, options.tickArguments)
          : identity
        : tickFormat,
    spacing = Math.max(options.tickSizeInner, 0) + options.tickPadding,
    range = scale.range(),
    range0 = +range[0] + options.offset,
    range1 = +range[range.length - 1] + options.offset,
    position = (scale.bandwidth ? center : number)(
      scale.copy(),
      options.offset
    );

  let ticks = [];
  values.forEach((value, i) => {
    ticks.push({ value: value, format: format(value) });
  });

  function createPath() {
    const { k, tickSizeOuter, offset } = options;
    if (orient === Orientation.left || orient === Orientation.right) {
      if (tickSizeOuter) {
        return (
          "M" +
          k * tickSizeOuter +
          "," +
          range0 +
          "H" +
          offset +
          "V" +
          range1 +
          "H" +
          k * tickSizeOuter
        );
      }

      return "M" + options.offset + "," + range0 + "V" + range1;
    } else {
      if (tickSizeOuter) {
        return (
          "M" +
          range0 +
          "," +
          k * tickSizeOuter +
          "V" +
          offset +
          "H" +
          range1 +
          "V" +
          k * tickSizeOuter
        );
      }

      return "M" + range0 + "," + options.offset + "H" + range1;
    }
  }

  function createTransform(d) {
    const { transform, offset } = options;
    return transform(position(d) + offset);
  }

  function createDY() {
    return orient === Orientation.top
      ? "0em"
      : orient === Orientation.bottom
      ? "0.71em"
      : "0.32em";
  }

  return (
    <g style={style}>
      {/* domain */}
      <path stroke="currentColor" d={createPath()} />

      {/* ticks */}
      {ticks.map((tick) => (
        <g key={tick.value} opacity="1" transform={createTransform(tick.value)}>
          {orient === Orientation.left || orient === Orientation.right ? (
            <>
              <line
                stroke="currentColor"
                x2={options.k * options.tickSizeInner}
              />
              <text fill="currentColor" x={options.k * spacing} dy={createDY()}>
                {tick.format}
              </text>
            </>
          ) : (
            <>
              <line
                stroke="currentColor"
                y2={options.k * options.tickSizeInner}
              />
              <text fill="currentColor" y={options.k * spacing} dy={createDY()}>
                {tick.format}
              </text>
            </>
          )}
        </g>
      ))}
      {children}
    </g>
  );
}
