"use client";

import { useEffect, useState } from "react";
import { IssueCounts } from "./IssueSummary";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";

const PieComponent = Pie as any;

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      {/* Glowing outer halo */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.15}
      />
      {/* Main scaled-up segment */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 3}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={5}
      />
    </g>
  );
};

const IssueChart = ({ open, closed, inProgress }: IssueCounts) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[350px] rounded-3xl bg-base-200 border border-base-content/10 shadow-xl animate-pulse"></div>
    );
  }

  const total = open + inProgress + closed;

  const data = [
    { name: "Open", value: open, color: "#ef4444" },
    { name: "In Progress", value: inProgress, color: "#8b5cf6" },
    { name: "Closed", value: closed, color: "#10b981" },
  ];

  const activeItem = activeIndex !== null ? data[activeIndex] : null;
  const centerValue = activeItem ? activeItem.value : total;
  const centerLabel = activeItem ? activeItem.name : "Total Tickets";

  const centerColorClass = activeItem 
    ? activeItem.name === "Open" 
      ? "text-red-500" 
      : activeItem.name === "Closed" 
      ? "text-emerald-500" 
      : "text-violet-500"
    : "text-base-content";

  return (
    <div className="w-full h-[350px] p-6 rounded-3xl bg-base-200 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-black text-base-content/50 uppercase tracking-widest">
          Issue Distribution
        </span>
        <span className="text-xs font-semibold text-base-content/50">
          Real-time status
        </span>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-8">
        {/* Pie Chart container */}
        <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <PieComponent
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                cornerRadius={5}
                onMouseEnter={(_: any, index: number) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </PieComponent>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(var(--b1))",
                  borderRadius: "1rem",
                  border: "1px solid oklch(var(--bc)/0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Centered Total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-300">
            <span className={`text-3xl font-black leading-none transition-colors duration-200 ${centerColorClass}`}>
              {centerValue}
            </span>
            <span className="text-[9px] font-bold text-base-content/40 uppercase tracking-widest mt-1.5 transition-colors duration-200">
              {centerLabel}
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex flex-col gap-2.5 flex-1 w-full">
          {data.map((item, index) => {
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            const isHovered = activeIndex === index;
            return (
              <div
                key={item.name}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`flex items-center justify-between p-3 rounded-2xl bg-base-100 border transition-all duration-200 cursor-pointer ${
                  isHovered
                    ? item.name === "Open"
                      ? "border-red-500/40 shadow-md scale-[1.01]"
                      : item.name === "Closed"
                      ? "border-emerald-500/40 shadow-md scale-[1.01]"
                      : "border-violet-500/40 shadow-md scale-[1.01]"
                    : "border-base-content/5 shadow-sm hover:border-base-content/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                  <span className="text-xs font-bold text-base-content/80">{item.name}</span>
                </div>
                <div className="flex items-center gap-1.5 font-black text-xs text-base-content">
                  <span>{item.value}</span>
                  <span className="text-[10px] font-bold text-base-content/40">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IssueChart;
