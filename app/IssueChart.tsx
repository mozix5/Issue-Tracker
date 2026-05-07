"use client";

import { useEffect, useState } from "react";
import { IssueCounts } from "./IssueSummary";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const IssueChart = ({ open, closed, inProgress }: IssueCounts) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Suppress the Recharts defaultProps warning until they release a stable fix
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      if (typeof args[0] === 'string' && args[0].includes('Support for defaultProps will be removed from function components')) {
        return;
      }
      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  if (!isMounted) {
    // Return a skeleton/placeholder matching the container's dimensions to avoid layout shift
    return <div className="w-full lg:h-full h-[400px] py-10 rounded-3xl bg-neutral"></div>;
  }

  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <div className=" w-full lg:h-full h-[400px] py-10 rounded-3xl bg-neutral">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} width={100} barCategoryGap={40}>
          <XAxis
            dataKey="label"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: "none" }}
            contentStyle={{
              backgroundColor: "#091319",
              borderRadius: "1rem",
              border: "0",
            }}
            itemStyle={{ color: "chartreuse" }}
          />
          <Bar dataKey="value" style={{ fill: "#58508d" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IssueChart;
