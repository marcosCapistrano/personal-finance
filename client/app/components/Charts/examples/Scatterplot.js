"use client";
import { useState, useEffect } from "react";
import styles from './Scatterplot.module.css'
import * as d3 from "d3";
import { useQuery } from "react-query";
import Axis from "../components/Axis";
import Circle from "../components/Circle";
import Text from "../components/Text";

const getData = async () => {
  return d3.json("/data/my_weather_data.json");
};

const xAccessor = (d) => d.dewPoint;
const yAccessor = (d) => d.humidity;

export default function Scatterplot({ bounds }) {
  const { isLoading, isError, error, data } = useQuery("data", getData);
  const [tooltip, setTooltip] = useState("oiii");

  if (!bounds || !data) return "loading";

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([bounds.height, 0])
    .nice();

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, bounds.width])
    .nice();

  const colorAccessor = (d) => d.cloudCover;
  const colorScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.cloudCover))
    .range(["skyblue", "darkslategrey"]);

  return (
    <>
      {data.map((d) => (
        <Circle
          key={d.date}
          className={styles.circle}
          cx={xScale(xAccessor(d))}
          cy={yScale(yAccessor(d))}
          r={5}
          style={{ fill: colorScale(colorAccessor(d)) }}
        />
      ))}
      <Axis orient={4} scale={yScale} options={{ tickArguments: [4] }}>
        <Text
          x={-bounds.height / 2}
          y={-bounds.margin.left + 10}
          style={{
            style: {
              fill: "black",
              fontSize: "1.4em",
              transform: "rotate(-90deg)",
              textAnchor: "middle",
            },
          }}
        >
          Humidity
        </Text>
      </Axis>
      <Axis
        orient={3}
        scale={xScale.nice()}
        style={{ transform: `translateY(${bounds.height}px)` }}
      >
        <Text
          x={bounds.width / 2}
          y={bounds.margin.bottom - 10}
          style={{ fill: "black", fontSize: "1.4em" }}
        >
          Dew point (&deg;F)
        </Text>
      </Axis>
    </>
  );
}
