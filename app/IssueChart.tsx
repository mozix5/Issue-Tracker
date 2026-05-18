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
  CartesianGrid,
  Cell,
} from "recharts";

const IssueChart = ({ open, closed, inProgress }: IssueCounts) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Suppress the Recharts defaultProps warning until they release a stable fix
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes(
          "Support for defaultProps will be removed from function components",
        )
      ) {
        return;
      }
      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[350px] rounded-3xl bg-base-200 border border-base-content/10 shadow-xl animate-pulse"></div>
    );
  }

  const data = [
    { label: "Open", value: open, fillGrad: "url(#openGrad)" },
    { label: "In Progress", value: inProgress, fillGrad: "url(#progressGrad)" },
    { label: "Closed", value: closed, fillGrad: "url(#closedGrad)" },
  ];

  return (
    <div className="w-full h-[350px] p-6 rounded-3xl bg-base-200 border border-base-content/10 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-base-content/75 uppercase tracking-wider">
          Distribution Overview
        </span>
        <span className="text-xs font-semibold text-base-content/50">
          Real-time stats
        </span>
      </div>
      <div className="flex-1 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={48}>
            <defs>
              <linearGradient id="openGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(var(--p))" stopOpacity={0.8} />
                <stop offset="100%" stopColor="oklch(var(--p))" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="closedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="oklch(var(--bc)/0.05)"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "oklch(var(--bc)/0.6)", fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "oklch(var(--bc)/0.6)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.03)" }}
              contentStyle={{
                backgroundColor: "oklch(var(--b1))",
                borderRadius: "1rem",
                border: "1px solid oklch(var(--bc)/0.1)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
              itemStyle={{ fontWeight: "bold" }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fillGrad} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IssueChart;
