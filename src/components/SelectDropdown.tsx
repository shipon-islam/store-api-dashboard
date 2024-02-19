/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { RxCaretSort } from "react-icons/rx";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type onChangeType = {
  onChange: (value: string) => void;
  categories: any;
};
export default function SelectDropdown({ onChange, categories }: onChangeType) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categories.find((category: any) => category.slug === value)?.name
            : "Select Category..."}
          <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search ..." className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {categories.map((category: any, id: number) => (
              <CommandItem
                key={id}
                value={category.slug}
                onSelect={(currentValue: string) => {
                  setValue(currentValue === value ? "" : currentValue);
                  onChange(currentValue);
                  setOpen(false);
                }}
              >
                {category.name}
                <IoMdCheckmark
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === category.slug ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
