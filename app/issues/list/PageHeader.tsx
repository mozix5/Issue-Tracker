import DropDown from "@/app/components/DropDown";
import NavLink from "@/app/components/navbar/NavLink";

const options = [
  { id: "all", label: "all" },
  { id: "open", label: "open" },
  { id: "closed", label: "closed" },
  { id: "in progress", label: "in progress" },
];
const PageHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <DropDown defaultValue="all" options={options} className="w-fit h-10"/>
      <NavLink href="/issues/new" label="New Issue" className="btn btn-primary min-h-10 h-10"/>
    </div>
  );
};

export default PageHeader;
