"use client";

import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput = ({
  value,
  onChange,
  placeholder
}: SearchInputProps) => {
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    250
  );

  return (
    <Input
      placeholder={placeholder}
      onChange={handleSearch}
      defaultValue={value}
    />
  );
};
