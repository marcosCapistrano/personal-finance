"use client";
import { useState, useEffect } from "react";
import * as d3 from "d3";
import { useQuery } from "react-query";

const getData = async () => {
  return d3.json("/data/my_weather_data.json");
};

const dateParser = d3.timeParse("%Y-%m-%d");
const xAcessor = (d) => dateParser(d.date);
const yAcessor = (d) => d.temperatureMax;

const dimensions = {
  width: 960,
  height: 413,
  margin: {
    top: 15,
    right: 15,
    bottom: 40,
    left: 60,
  },
  boundedWidth: 885,
  boundedHeight: 358,
};

export default function Chart({ transactions }) {
  const [chartRef, setChartRef] = useState(null);
  const { isLoading, isError, error, data } = useQuery("data", getData);

  useEffect(() => {
    if (data && chartRef) {
      console.log(chartRef);
      console.log("tudo pronto");
      const wrapper = d3.select(chartRef);
      const svg = wrapper
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

      const bounds = svg
        .append("g")
        .style(
          "transform",
          `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
        );

      const yScale = d3
        .scaleLinear()
        .domain(d3.extent(data, yAcessor))
        .range([dimensions.boundedHeight, 0]);
      const freezingTempPlacement = yScale(32);
      const freezingTemps = bounds
        .append("rect")
        .attr("x", 0)
        .attr("width", dimensions.boundedWidth)
        .attr("y", freezingTempPlacement)
        .attr("height", dimensions.boundedHeight - freezingTempPlacement)
        .attr("fill", "#e0f3f3");

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, xAcessor))
        .range([0, dimensions.boundedWidth]);

      const lineGenerator = d3
        .line()
        .x((d) => xScale(xAcessor(d)))
        .y((d) => yScale(yAcessor(d)));

      const line = bounds
        .append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "#af9358")
        .attr("stroke-width", 2);

      const yAxisGenerator = d3.axisLeft(yScale);
      const yAxis = bounds.append("g").call(yAxisGenerator);

      const xAxisGenerator = d3.axisBottom().scale(xScale);
      const xAxis = bounds
        .append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`);
    }
  }, [chartRef]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return <div ref={setChartRef} />;
}
