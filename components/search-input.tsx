"use client";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Input } from "./ui/input";

type SearchInputProps = {
  placeholder: string;
};

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("searh");
    }

    replace(`${pathname}?${params.toString()}` as Route, { scroll: false });
  };

  return <Input placeholder={placeholder} onChange={handleSearch} />;
};
