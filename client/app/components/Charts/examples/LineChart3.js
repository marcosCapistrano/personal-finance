"use client";
import { useState, useEffect } from "react";
import * as d3 from "d3";
import { useQuery } from "react-query";
import Axis from "../components/Axis";
import Line from "../components/Line";
import ChartContainer from "../components/ChartContainer";

const dateParser = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");
const xAccessor = (d) => dateParser(d.date);
const yAccessor = (d) => d.value;
const colorAccessor = (d) => d.value;

export default function Chart({ container, data }) {
  if (!container || !data) return "null";

  const margin = {
    top: 30,
    right: 50,
    bottom: 30,
    left: 50,
  };

  const bounds = {
    width: container.width - (margin.left + margin.right),
    height: container.height - (margin.top + margin.bottom),
  };

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([bounds.height, 0]).nice();
    
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, bounds.width]);

  const colorScale = d3.scaleLinear().domain(d3.extent(data, colorAccessor)).range(['red', 'green'])

  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)))
    .curve(d3.curveStepAfter)

  console.log(lineGenerator(data));

  return (
    <svg width={container.width} height={container.height}>
      <g
        style={{
          transform: `translate(${margin.left}px, ${margin.top}px)`,
        }}
      >
        <Line
          func={() => lineGenerator(data)}
          style={{ fill: "none", stroke: "#af9358", strokeWidth: 2 }}
        />
        <Axis orient={4} scale={yScale} />
        <Axis
          orient={3}
          scale={xScale.nice()}
          style={{ transform: `translateY(${bounds.height}px)` }}
        />
      </g>
    </svg>
  );
}
