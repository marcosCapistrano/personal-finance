"use client";
import { useState, useEffect } from "react";
import * as d3 from "d3";
import { useQuery } from "react-query";

const getData = async () => {
  return d3.json("/data/my_weather_data.json");
};

const dateParser = d3.timeParse("%Y-%m-%d");
const xAcessor = (d) => d.dewPoint;
const yAcessor = (d) => d.humidity;
const colorAcessor = d => d.cloudCover;

const dimensions = {
  width: 413,
  height: 413,
  margin: {
    top: 10,
    right: 10,
    bottom: 50,
    left: 50,
  },
  boundedWidth: 413 - 60,
  boundedHeight: 413 - 60,
};

export default function Chart({ transactions }) {
  const [chartRef, setChartRef] = useState(null);
  const { isLoading, isError, error, data } = useQuery("data", getData);

  useEffect(() => {
    if (data && chartRef) {
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

      const xScale = d3
        .scaleLinear()
        .domain(d3.extent(data, xAcessor))
        .range([0, dimensions.boundedWidth])
        .nice();
      const yScale = d3
        .scaleLinear()
        .domain(d3.extent(data, yAcessor))
        .range([dimensions.boundedHeight, 0])
        .nice();
      const colorScale = d3.scaleLinear().domain(d3.extent(data, colorAcessor))
      .range(["skyblue", "darkslategrey"])

      const yAxisGenerator = d3.axisLeft().scale(yScale);
      const yAxis = bounds.append("g").call(yAxisGenerator);
      const yAxisLabel = yAxis.append("text")
      .attr("x", -dimensions.boundedHeight/2)
      .attr("y", -dimensions.margin.left + 10)
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .text("Relative humidity")
      .style("transform", "rotate(-90deg)")
      .style("text-anchor", "middle")

      const xAxisGenerator = d3.axisBottom().scale(xScale);
      const xAxis = bounds
        .append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`);
      const xAxisLabel = xAxis.append("text")
      .attr("x", dimensions.boundedWidth/2)
      .attr("y", dimensions.margin.bottom - 10)
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .html("Dew point (&deg;F)")


      const dots = bounds
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(xAcessor(d)))
        .attr("cy", d => yScale(yAcessor(d)))
        .attr("r", 5)
        .attr("fill", d => colorScale(colorAcessor(d)))
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
