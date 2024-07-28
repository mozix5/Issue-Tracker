import DropDown from "@/app/components/DropDown";
import NavLink from "@/app/components/navbar/NavLink";

const options = [
  { id: "ALL", label: "all" },
  { id: "OPEN", label: "open" },
  { id: "CLOSED", label: "closed" },
  { id: "IN_PROGRESS", label: "in progress" },
];
const PageHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <DropDown
        defaultValue="ALL"
        options={options}
        query="status"
        className="w-fit h-10 bg-[#36434d] rounded-2xl focus:ring-0 border-none"
      />
      <NavLink
        href="/issues/new"
        label="New Issue"
        className="btn btn-primary min-h-10 h-10"
      />
    </div>
  );
};

export default PageHeader;
