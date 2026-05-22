"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

type DropDownProps = {
  options: { id: string; label: string }[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  query: string;
};
const DropDown = ({
  options,
  placeholder,
  defaultValue,
  className,
  query,
}: DropDownProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(query) || defaultValue;

  const handleQueryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "unassigned" || value === "ALL") {
      params.delete(query);
    } else {
      params.set(query, value);
    }
    router.push("?" + params.toString());
  };
  return (
    <Select defaultValue={currentValue} onValueChange={handleQueryChange}>
      <SelectTrigger className={`capitalize ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            value={option.id}
            key={option.label}
            className="capitalize"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropDown;
