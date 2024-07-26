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
    <div className="flex justify-between">
      <DropDown defaultValue="all" options={options}/>
      <NavLink href="/issues/new" label="New Issue" variant="default" />
    </div>
  );
};

export default PageHeader;
