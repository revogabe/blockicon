"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Command } from "./ui/command";
import { frameworks, packagesManager, installCommand } from "@/mock";
import { motion, Transition } from "motion/react";
import { BlockIcon, type BlockIconProps } from "blockicon";
import { delay } from "motion";
import { Icons } from "./icons";

type Tab = {
  id: string;
  title: string;
  description: string;
  icon: string;
  disabled: boolean;
};

const tabs = [
  {
    id: "icons",
    title: "Icons",
    description:
      "Explore and search through our complete icon library with ease.",
    icon: "/icons/icon.svg",
    disabled: false,
  },
  {
    id: "introduction",
    title: "Introduction",
    description:
      "Learn how to install and use the component effortlessly in your projects.",
    icon: "/icons/file.svg",
    disabled: true,
  },
  {
    id: "self-host",
    title: "Self-Host",
    description:
      "A step-by-step guide to hosting icons on your own AWS S3 for full control.",
    icon: "/icons/self-host.svg",
    disabled: true,
  },
] as const satisfies readonly Tab[];

type TabsID = (typeof tabs)[number]["id"];

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState<TabsID>("icons");

  return (
    <div className="w-full border-b border-zinc-900 mx-auto flex flex-col">
      <div className="relative container mx-auto border-x border-b border-zinc-900 flex items-center justify-between">
        {tabs.map((item, index) => (
          <div
            key={item.id}
            aria-disabled={item.disabled}
            data-active={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
            className="relative flex w-full items-center justify-start px-8 h-28 border-r border-zinc-900 last:border-none gap-4 group select-none bg-zinc-950 data-[active=true]:bg-orange-500 hover:bg-zinc-900/25 ease-out duration-300"
          >
            <div className="absolute bottom-0 left-0 w-full h-64 -z-10 pointer-events-none overflow-hidden opacity-0 group-data-[active=true]:opacity-100 group-hover:opacity-75 duration-1000 ease-out">
              <div
                className="w-[120%] h-[240px] -left-12 blur-2xl top-32 absolute duration-1000 ease-out translate-y-24 group-data-[active=true]:translate-y-0"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom, #ff6900 40%, transparent 75%)",
                }}
              />
            </div>

            <Image src={item.icon} alt={item.title} width={36} height={36} />
            <div className="flex flex-col items-start justify-center">
              <h3 className="text-lg font-semibold group-data-[active=true]:text-white duration-300 ease-out">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-500 group-data-[active=true]:text-white duration-300 ease-out">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Icons />
    </div>
  );
};
