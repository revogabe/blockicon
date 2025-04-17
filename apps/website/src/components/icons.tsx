"use client";

import { ChangeEvent, forwardRef, useState } from "react";
import { cn } from "@/utils/cn";
import { ALIASES } from "@blockicon/core";
import { Components, VirtuosoGrid } from "react-virtuoso";
import { matchSorter } from "match-sorter";
import * as motion from "motion/react-client";

const sizes = ["sm", "md", "lg", "xl"] as const;
const categories = ["token", "network"] as const;

type Size = (typeof sizes)[number];
type Category = (typeof categories)[number];

const uniqueNetworks = Array.from(new Set(Object.values(ALIASES.network)));
const uniqueTokens = Array.from(new Set(Object.values(ALIASES.token)));

export const Icons = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("token");
  const [selectedSize, setSelectedSize] = useState<Size>("xl");

  const [filteredBySearch, setFilteredBySearch] = useState<string[]>(
    selectedCategory === "token" ? uniqueTokens : uniqueNetworks,
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const dataToFilter =
      selectedCategory === "token" ? uniqueTokens : uniqueNetworks;

    const matches = matchSorter(dataToFilter, value);
    setFilteredBySearch(matches);
    setSearch(value);
  };

  const handleCategoryClick = (category: Category) => {
    const dataToFilter = category === "token" ? uniqueTokens : uniqueNetworks;
    const matches = matchSorter(dataToFilter, search);
    setSelectedCategory(category);
    setFilteredBySearch(matches);
  };

  return (
    <div className="relative container mx-auto border-x border-zinc-900 w-full pb-20">
      <div className="flex w-full items-center justify-between border-b border-zinc-900">
        <input
          type="text"
          placeholder="Search..."
          className="h-16 w-full px-6 outline-none focus:bg-zinc-900/50 border-r border-zinc-900 flex-1"
          onChange={handleSearchChange}
        />
        <div className="flex border-r border-zinc-900">
          {categories.map((category) => (
            <button
              key={category}
              className={cn(
                "relative text-lg text-zinc-500 h-16 w-[127px] hover:bg-zinc-900/50 duration-300 ease-out outline-none focus:bg-zinc-900/50 border-b border-transparent focus:border-zinc-800 capitalize",
                selectedCategory === "token" && "text-white",
              )}
              onClick={() => handleCategoryClick(category)}
            >
              {category}s
              {selectedCategory === category && (
                <motion.div
                  layoutId="category-underline"
                  id="category-underline"
                  className="absolute h-px bottom-0 inset-x-0 bg-white"
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex">
          {sizes.map((size) => (
            <button
              key={size}
              className={cn(
                "relative text-lg text-zinc-500 h-16 w-16 hover:bg-zinc-900/50 duration-300 ease-out outline-none focus:bg-zinc-900/50 border-b border-transparent focus:border-zinc-800",
                selectedSize === size && "text-white",
              )}
              onClick={() => setSelectedSize(size)}
            >
              {size}
              {selectedSize === size && (
                <motion.div
                  layoutId="size-underline"
                  id="size-underline"
                  className="absolute h-px bottom-0 inset-x-0 bg-white"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <VirtuosoGrid
        style={{ height: 500 }}
        data={filteredBySearch}
        components={{ List }}
        itemContent={(_index, icon) => (
          <IconItem
            key={icon}
            icon={icon}
            iconType="network"
            size={selectedSize}
          />
        )}
      />
    </div>
  );
};

type IconItemProps = {
  icon: string;
  iconType: string;
  size: Size;
};

const IconItem = ({ icon, iconType, size, ...props }: IconItemProps) => {
  return (
    <div
      {...props}
      className="flex flex-col items-center px-4 py-2 border border-zinc-900 justify-center gap-4 w-full"
    >
      <img
        src={`https://d3v6728skxiwy6.cloudfront.net/blockicon/${iconType}/${icon}.svg`}
        alt={icon}
        className={cn("rounded-full", {
          "size-6": size === "sm",
          "size-8": size === "md",
          "size-10": size === "lg",
          "size-14": size === "xl",
        })}
      />
      <span className={cn("text-lg text-white")}>
        {icon
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
    </div>
  );
};

const List: Components["List"] = forwardRef((props, ref) => {
  const { children, ...divProps } = props;
  return (
    <div {...divProps} ref={ref} className="grid grid-cols-4">
      {children}
    </div>
  );
});

List.displayName = "List";
