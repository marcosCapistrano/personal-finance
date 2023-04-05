"use client";
import { useState, useEffect } from "react";
import * as d3 from "d3";
import { useQuery } from "react-query";
import Axis from "../components/Axis";
import Line from '../components/Line'

const getData = async () => {
  return d3.json("/data/my_weather_data.json");
};

const dateParser = d3.timeParse("%Y-%m-%d");
const xAccessor = (d) => dateParser(d.date);
const yAccessor = (d) => d.temperatureMax;

export default function Chart({ bounds }) {
  const { isLoading, isError, error, data } = useQuery("data", getData);

  if (!bounds || !data) return "loading";

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([bounds.height, 0]);

  console.log(d3.extent(data, yAccessor));
  console.log(yScale.ticks.apply(yScale));

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, bounds.width]);

  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));

  return (
    <>
      <Line func={() => lineGenerator(data)} style={{fill: "none", stroke: "#af9358", strokeWidth: 2}}/>
      <Axis orient={4} scale={yScale} />
      <Axis
        orient={3}
        scale={xScale.nice()}
        style={{ transform: `translateY(${bounds.height}px)` }}
      />
    </>
  );
}
