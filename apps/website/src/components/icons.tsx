"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Command } from "./ui/command";
import { frameworks, packagesManager, installCommand } from "@/mock";
import { useVirtualizer } from "@tanstack/react-virtual";
import { motion, Transition, delay } from "motion/react";
import { cn } from "@/utils/cn";
import { ALIASES } from "core";
import { BlockIcon, type BlockIconProps } from "blockicon";

export const Icons = () => {
  const uniqueNetworks = useMemo(
    () => Array.from(new Set(Object.values(ALIASES.network))),
    [],
  );
  const uniqueTokens = useMemo(
    () => Array.from(new Set(Object.values(ALIASES.token))),
    [],
  );

  const [search, setSearch] = useState("");
  const [filteredBySearch, setFilteredBySearch] = useState<string[]>([]);

  const parentRef = useRef(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);
  const [iconType, setIconType] = useState<"token" | "network">("token");
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("xl");

  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
  });

  const [underlineSizeStyle, setUnderlineSizeStyle] = useState({
    width: 0,
    left: 0,
  });

  const rowVirtualizer = useVirtualizer({
    count: filteredBySearch.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
  });

  useEffect(() => {
    const dataToFilter = iconType === "token" ? uniqueTokens : uniqueNetworks;

    const filtered = dataToFilter.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredBySearch(filtered);
  }, [search, iconType, uniqueNetworks, uniqueTokens]);

  useEffect(() => {
    if (!sizeRef.current) return;

    const buttons = sizeRef.current.querySelectorAll("button");
    const activeIndex =
      size === "sm" ? 0 : size === "md" ? 1 : size === "lg" ? 2 : 3;
    const activeButton = buttons[activeIndex];

    if (activeButton) {
      const rect = activeButton.getBoundingClientRect();
      const containerRect = sizeRef.current.getBoundingClientRect();

      setUnderlineSizeStyle({
        width: rect.width,
        left: rect.left - containerRect.left,
      });
    }
  }, [size]);

  useEffect(() => {
    if (!categoryRef.current) return;

    const buttons = categoryRef.current.querySelectorAll("button");
    const activeIndex = iconType === "token" ? 0 : 1;
    const activeButton = buttons[activeIndex];

    if (activeButton) {
      const rect = activeButton.getBoundingClientRect();
      const containerRect = categoryRef.current.getBoundingClientRect();

      setUnderlineStyle({
        width: rect.width,
        left: rect.left - containerRect.left,
      });
    }
  }, [iconType]);

  return (
    <div className="relative container mx-auto border-x border-zinc-900 flex flex-col items-center justify-between w-full pb-20">
      <div className="flex w-full items-center justify-between border-b border-zinc-900">
        <input
          type="text"
          placeholder="Search..."
          className="h-16 w-full px-6 outline-none focus:bg-zinc-900/50 border-r border-zinc-900 flex-1"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          ref={categoryRef}
          className="relative flex border-r border-zinc-900"
        >
          <div
            className="h-px absolute bg-white bottom-0 transition-all duration-300 ease-out"
            style={{ ...underlineStyle }}
          />

          <button
            className={cn(
              "text-lg text-zinc-500 h-16 w-[127px] hover:bg-zinc-900/50 duration-300 ease-out outline-none focus:bg-zinc-900/50 border-b border-transparent focus:border-zinc-800",
              iconType === "token" && "text-white",
            )}
            onClick={() => setIconType("token")}
          >
            Tokens
          </button>
          <button
            className={cn(
              "text-lg text-zinc-500 h-16 w-[127px] hover:bg-zinc-900/50 duration-300 ease-out outline-none focus:bg-zinc-900/50 border-b border-transparent focus:border-zinc-800",
              iconType === "network" && "text-white",
            )}
            onClick={() => setIconType("network")}
          >
            Networks
          </button>
        </div>
        <div ref={sizeRef} className="relative flex">
          <div
            className="h-px absolute bg-white bottom-0 transition-all duration-300 ease-out"
            style={{ ...underlineSizeStyle }}
          />

          <button
            className={cn(
              "text-lg text-zinc-500 h-16 w-16 hover:bg-zinc-900/50 duration-300 ease-out outline-none focus:bg-zinc-900/50 border-b border-transparent focus:border-zinc-800",
              size === "sm" && "text-white",
            )}
            onClick={() => setSize("sm")}
          >
            sm
          </button>
          <button
            className={cn(
              "text-lg text-zinc-500 h-16 w-16 hover:bg-zinc-900/50 duration-300 ease-out outline-none focus:bg-zinc-900/50 border-b border-transparent focus:border-zinc-800",
              size === "md" && "text-white",
            )}
            onClick={() => setSize("md")}
          >
            md
          </button>
          <button
            className={cn(
              "text-lg text-zinc-500 h-16 w-16 hover:bg-zinc-900/50 duration-300 ease-out outline-none focus:bg-zinc-900/50 border-b border-transparent focus:border-zinc-800",
              size === "lg" && "text-white",
            )}
            onClick={() => setSize("lg")}
          >
            lg
          </button>
          <button
            className={cn(
              "text-lg text-zinc-500 h-16 w-16 hover:bg-zinc-900/50 duration-300 ease-out outline-none focus:bg-zinc-900/50 border-b border-transparent focus:border-zinc-800",
              size === "xl" && "text-white",
            )}
            onClick={() => setSize("xl")}
          >
            xl
          </button>
        </div>
      </div>
      <div
        ref={parentRef}
        className="h-[800px] overflow-auto w-full flex flex-wrap"
      >
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const icon = filteredBySearch[virtualRow.index];
            return (
              <IconItem
                key={icon}
                icon={icon}
                iconType={iconType}
                size={size}
                virtualRow={virtualRow}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

type IconItemProps = {
  icon: string;
  iconType: string;
  size: "sm" | "md" | "lg" | "xl";
  virtualRow: { start: number };
};

const IconItem = ({ icon, iconType, size, virtualRow }: IconItemProps) => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div
      key={icon}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 400,
        transform: `translateY(${virtualRow.start}px)`,
      }}
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
        onError={() => setIsVisible(false)}
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
