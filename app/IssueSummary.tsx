import IssueStatusBadge, { StatusProps } from "./components/IssueStatusBadge";
import { Status } from "@/lib/types";

export type IssueCounts = {
  open: number;
  closed: number;
  inProgress: number;
};

export type StatusCard = {
  status: Status;
  count: number;
};

const IssueSummary = ({ open, closed, inProgress }: IssueCounts) => {
  const statsData: StatusCard[] = [
    {
      status: Status.OPEN,
      count: open,
    },
    {
      status: Status.CLOSED,
      count: closed,
    },
    {
      status: Status.IN_PROGRESS,
      count: inProgress,
    },
  ];
  return (
    <div className="gap-2 flex md:flex-nowrap flex-wrap">
      {statsData.map((card: StatusCard) => {
        return (
          <div key={card.status} className="btn h-fit py-4 font-medium text-base flex-col items-start rounded-3xl btn-neutral shadow-xl flex-grow">
            <div className="flex items-center space-x-2">
              <IssueStatusBadge status={card.status} />
              <span className="text-sm font-semibold hidden md:block">Issues</span>
            </div>
            <div className=" text-[oklch(var(--p))] text-6xl font-bold h-fit">
              {card.count}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IssueSummary;
