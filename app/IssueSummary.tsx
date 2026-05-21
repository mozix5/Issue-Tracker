import { GoIssueOpened, GoIssueClosed } from "react-icons/go";
import { RiProgress5Line } from "react-icons/ri";
import { Status } from "@/lib/types";

export type IssueCounts = {
  open: number;
  closed: number;
  inProgress: number;
};

export type StatusCard = {
  status: Status;
  count: number;
  label: string;
  colorClass: string;
  bgGradClass: string;
  icon: React.ReactNode;
};

const IssueSummary = ({ open, closed, inProgress }: IssueCounts) => {
  const statsData: StatusCard[] = [
    {
      status: Status.OPEN,
      count: open,
      label: "Open Issues",
      colorClass: "text-red-500",
      bgGradClass: "from-red-500/10 to-red-500/2",
      icon: <GoIssueOpened className="text-2xl text-red-500" />,
    },
    {
      status: Status.IN_PROGRESS,
      count: inProgress,
      label: "In Progress",
      colorClass: "text-violet-500",
      bgGradClass: "from-violet-500/10 to-violet-500/2",
      icon: (
        <RiProgress5Line className="text-2xl text-violet-500 animate-spin-slow" />
      ),
    },
    {
      status: Status.CLOSED,
      count: closed,
      label: "Closed Issues",
      colorClass: "text-emerald-500",
      bgGradClass: "from-emerald-500/10 to-emerald-500/2",
      icon: <GoIssueClosed className="text-2xl text-emerald-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {statsData.map((card: StatusCard) => {
        return (
          <div
            key={card.status}
            className={`relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br ${card.bgGradClass} bg-base-200 shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between min-h-[140px]`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-base-content/75 uppercase tracking-wider">
                {card.label}
              </span>
              <div className="p-2 rounded-2xl bg-base-100">
                {card.icon}
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span
                className={`text-5xl font-black tracking-tight ${card.colorClass}`}
              >
                {card.count}
              </span>
              <span className="text-xs font-bold text-base-content/50 uppercase">
                active
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IssueSummary;
