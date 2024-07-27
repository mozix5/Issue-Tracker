import IssueStatusBadge, { StatusProps } from "./components/IssueStatusBadge";

type Props = {
  open: number;
  closed: number;
  inProgress: number;
};

type Card = {
  status: StatusProps["status"]
  count: number;
};

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const cardData:Card[] = [
    {
      status: "OPEN",
      count: open,
    },
    {
      status: "CLOSED",
      count: closed,
    },
    {
      status: "IN_PROGRESS",
      count: inProgress,
    },
  ];
  return (
    <div className="space-x-2 flex flex-nowrap">
      {cardData.map((card:Card) => {
        return (
          <div className="btn h-fit py-4 font-medium text-base flex-col items-start rounded-3xl btn-neutral shadow-xl">
            <div className="flex items-center space-x-2">
              <IssueStatusBadge status={card.status} />
              <span className="text-sm font-semibold">Issues</span>
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
