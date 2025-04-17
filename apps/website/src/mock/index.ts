import { Framework } from "@/types";

export const frameworks: Framework[] = [
  { icon: "/frameworks/react.svg", name: "react" },
];

export const packagesManager = ["pnpm", "npm", "yarn", "bun"];

export const installCommand: Record<string, string> = {
  reactpnpm: "pnpm add @blockicon/react",
  reactnpm: "npm install @blockicon/react",
  reactyarn: "yarn add @blockicon/react",
  reactbun: "bun add @blockicon/react",
};
