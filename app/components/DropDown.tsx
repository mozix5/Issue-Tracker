import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DropDownProps = {
  options: { id: string; label: string }[];
  defaultValue: string;
  placeholder?: string;
};
const DropDown = ({ options, placeholder,defaultValue }: DropDownProps) => {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-fit capitalize">
        <SelectValue  />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.id} key={option.id} className="capitalize">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropDown;
