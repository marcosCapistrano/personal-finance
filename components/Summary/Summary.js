"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Chart from "@/components/Charts/LineChart";
import ChartWithDimensions from "@/components/Charts/ChartWithDimensions.js";
import Chart2 from "@/components/Charts/LineChart2";
import styles from "./Summary.module.css";

const transactions = [
  {
    id: 1,
    date: new Date(),
    description: "fatura nubank",
    value: 123.5,
  },
  {
    id: 2,
    date: new Date("2023/03/20"),
    description: "fatura nubank",
    value: 10.5,
  },
];

const queryClient = new QueryClient();

export default function Summary() {
  const [chartContainerRef, setChartContainerRef] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <section className="section">
        <span className="section-title">Resumo</span>
        <div className={styles.chart} ref={setChartContainerRef}>
          <ChartWithDimensions
            parentRef={chartContainerRef}
            margin={{
              top: 15,
              right: 15,
              bottom: 40,
              left: 60,
            }}
          >
            <Chart2 />
          </ChartWithDimensions>
        </div>
        <Chart transactions={transactions} />
      </section>
    </QueryClientProvider>
  );
}
