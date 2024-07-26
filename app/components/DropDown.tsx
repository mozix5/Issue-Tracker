import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DropDownProps = {
  options: { id: string; label: string }[];
  placeholder: string;
};
const DropDown = ({ options, placeholder }: DropDownProps) => {
  return (
    <Select>
      <SelectTrigger className="w-fit capitalize">
        <SelectValue placeholder={placeholder} />
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
