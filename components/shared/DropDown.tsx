"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type DropDownProps = {
  options: { id: string; label: string }[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  query: string;
  disabled?: boolean;
};
const DropDown = ({
  options,
  placeholder,
  defaultValue,
  className,
  query,
  disabled,
}: DropDownProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const currentValue = searchParams.get(query) || defaultValue;

  const handleQueryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "unassigned" || value === "ALL") {
      params.delete(query);
    } else {
      params.set(query, value);
    }
    if (query !== "page") {
      params.delete("page");
    }
    startTransition(() => {
      router.push("?" + params.toString());
    });
  };
  return (
    <Select value={currentValue} onValueChange={handleQueryChange} disabled={disabled || isPending}>
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
