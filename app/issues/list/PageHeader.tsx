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
        className="w-fit h-10 bg-base-200 border border-base-content/10 rounded-2xl focus:ring-0 text-base-content text-xs font-bold px-4 hover:bg-base-300 transition-colors cursor-pointer"
      />
      <NavLink
        href="/issues/new"
        label="New Issue"
        className="btn btn-primary text-primary-content text-xs font-black uppercase tracking-widest min-h-10 h-10 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all px-5 flex items-center justify-center"
      />
    </div>
  );
};

export default PageHeader;
