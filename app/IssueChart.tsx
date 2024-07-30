"use client";

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
