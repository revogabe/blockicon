"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Command } from "./ui/command";
import { frameworks, packagesManager, installCommand } from "@/mock";
import { motion, Transition } from "motion/react";

const transition: Transition = {
  duration: 60,
  repeat: Infinity,
  ease: "linear",
};

export const Hero = () => {
  const [framework, setFramework] = useState("react");
  const [packageManager, setPackageManager] = useState("pnpm");
  const [command, setCommand] = useState("");

  useEffect(() => {
    setCommand(installCommand[`${framework}${packageManager}`]);
  }, [framework, packageManager]);

  return (
    <div className="w-full border-b border-zinc-900 mx-auto">
      <div className="relative container mx-auto min-h-[720px] border-x border-zinc-900 flex items-center justify-center">
        <Image
          src="/stars.svg"
          alt="Stars"
          layout="fill"
          objectFit="contain"
          className="animate-pulse absolute inset-0"
        />

        <div className="absolute inset-0 top-[60px]">
          <svg
            width="1534"
            height="448"
            viewBox="0 0 1534 448"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
          >
            <motion.path
              d="M0 0.8484L198.484 109.318C206.342 113.612 211.116 121.148 211.116 129.256V423.496C211.116 437.029 223.649 448 239.11 448H1294.89C1310.35 448 1322.88 437.029 1322.88 423.496V129.256C1322.88 121.148 1327.66 113.612 1335.52 109.318L1534 0.8484L1533.39 0L1334.91 108.47C1326.72 112.946 1321.74 120.803 1321.74 129.256V423.496C1321.74 436.477 1309.72 447 1294.89 447H239.11C224.28 447 212.258 436.477 212.258 423.496V129.256C212.258 120.803 207.281 112.946 199.09 108.47L0.605116 0L0 0.8484Z"
              fill="#27272A"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={transition}
            />
          </svg>

          <motion.div
            style={iconPath}
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ ...transition }}
          />

          <motion.div
            style={iconPath}
            initial={{ offsetDistance: "20%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ ...transition }}
          />

          <motion.div
            style={iconPath}
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ ...transition }}
          />

          <motion.div
            style={iconPath}
            initial={{ offsetDistance: "20%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ ...transition }}
          />
        </div>

        <div className="flex flex-col gap-12 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Button className="group rounded-full gap-2">
              <span>🎉</span>
              <p>Release v1.0</p>
            </Button>
            <h1 className="text-6xl font-semibold text-center leading-tight">
              Seamless Icon Integration <br />
              for the Future of Web3
            </h1>
            <p className="text-lg text-zinc-400 text-center leading-normal">
              A powerful and scalable icon library designed for <br />
              blockchain networks and assets.
            </p>
          </div>
          <Command
            title="terminal"
            frameworks={frameworks}
            packagesManager={packagesManager}
            framework={framework}
            onSetFramework={setFramework}
            packageManager={packageManager}
            onSetPackageManager={setPackageManager}
            command={command}
            className="z-50"
          />
        </div>
      </div>
    </div>
  );
};

const iconPath: React.CSSProperties = {
  width: 50,
  height: 50,
  backgroundColor: "#4ff0b7",
  borderRadius: 9999,
  position: "absolute",
  top: 0,
  left: 0,
  offsetPath: `path("M0 0.8484L198.484 109.318C206.342 113.612 211.116 121.148 211.116 129.256V423.496C211.116 437.029 223.649 448 239.11 448H1294.89C1310.35 448 1322.88 437.029 1322.88 423.496V129.256C1322.88 121.148 1327.66 113.612 1335.52 109.318L1534 0.8484L1533.39 0L1334.91 108.47C1326.72 112.946 1321.74 120.803 1321.74 129.256V423.496C1321.74 436.477 1309.72 447 1294.89 447H239.11C224.28 447 212.258 436.477 212.258 423.496V129.256C212.258 120.803 207.281 112.946 199.09 108.47L0.605116 0L0 0.8484Z")`,
};
