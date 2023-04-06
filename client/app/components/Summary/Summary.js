import React from "react";
import styles from "./Summary.module.css";
import LineChart from "@/components/Charts/examples/LineChart3";
import ChartContainer from "../Charts/components/ChartContainer";

export default function Summary({data}) {
  console.log(data)
  return (
      <section className="section container">
        <ChartContainer className={styles.chart}>
          <LineChart data={data}/>
        </ChartContainer>
      </section>
  );
}
