import UserDropDown from "./UserDorpDown";

type AssignUserProps = {
  assignedToUserId: string | null;
  issueId: string;
};

const AssignUser = ({ assignedToUserId, issueId }: AssignUserProps) => {
  return (
    <div>
      <UserDropDown assignedToUserId={assignedToUserId} issueId={issueId} />
    </div>
  );
};

export default AssignUser;
