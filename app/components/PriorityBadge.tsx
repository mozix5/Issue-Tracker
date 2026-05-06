import { Priority } from "@/lib/types";
import { ArrowDown, ArrowRight, ArrowUp, AlertTriangle } from "lucide-react";

export type PriorityProps = {
  priority: Priority;
  size?: "xs" | "sm" | "md" | "lg";
};

const priorityVariants = {
  LOW: {
    className: "bg-gray-500",
    icon: <ArrowDown size={14} />,
    label: "Low",
  },
  MEDIUM: {
    className: "bg-blue-500",
    icon: <ArrowRight size={14} />,
    label: "Medium",
  },
  HIGH: {
    className: "bg-orange-500",
    icon: <ArrowUp size={14} />,
    label: "High",
  },
  URGENT: {
    className: "bg-red-600 animate-pulse",
    icon: <AlertTriangle size={14} />,
    label: "Urgent",
  },
};

const PriorityBadge = ({ priority, size = "xs" }: PriorityProps) => {
  const variant = priorityVariants[priority] || priorityVariants.MEDIUM;
  const { className, icon, label } = variant;
  
  return (
    <div
      className={`text-white flex space-x-1 items-center px-3 py-[6px] rounded-3xl w-fit h-fit text-${size} ${className}`}
    >
      {icon}
      <span className="font-medium uppercase tracking-wider text-[10px]">{label}</span>
    </div>
  );
};

export default PriorityBadge;
