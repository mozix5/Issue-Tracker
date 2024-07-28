import UserDropDown from "./UserDorpDown";

type AssignUserProps = {
  assignedToUserId: string | null;
  issueId: string;
};

const AssignUser = ({ assignedToUserId, issueId }: AssignUserProps) => {
  return (
    <div className="w-48">
      <UserDropDown assignedToUserId={assignedToUserId} issueId={issueId} />
    </div>
  );
};

export default AssignUser;
