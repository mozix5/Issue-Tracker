import { GoIssueOpened } from "react-icons/go";
import { GoIssueClosed } from "react-icons/go";
import { RiProgress5Line } from "react-icons/ri";

export type StatusProps = {
  status: "OPEN" | "CLOSED" | "IN_PROGRESS";
  size?:"xs"|"sm"|"md"|"lg"
};

const buttonVariants = {
  OPEN: {
    className: "bg-destructive",
    icon: <GoIssueOpened/>,
    label: "open",
  },
  CLOSED: {
    className: "bg-[#4BB543]",
    icon: <GoIssueClosed/>,
    label: "closed",
  },
  IN_PROGRESS: {
    className: "bg-violet-500",
    icon: <RiProgress5Line/>,
    label: "in progress",
  },
};

const IssueStatusBadge = ({ status ,size}: StatusProps) => {
  const { className, icon, label } = buttonVariants[status];
  return (
    <div
      className={`text-white flex space-x-1 items-center px-4 py-[6px] rounded-3xl w-fit h-fit text-${size} ${className}`}
    >
      {icon}
      <span className="font-medium capitalize whitespace-nowrap">{label}</span>
    </div>
  );
};

export default IssueStatusBadge;
