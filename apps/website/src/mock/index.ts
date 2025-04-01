import { Framework } from "@/types";

export const frameworks: Framework[] = [
  { icon: "/frameworks/react.svg", name: "react" },
];

export const packagesManager = ["pnpm", "npm", "yarn", "bun"];

export const installCommand: Record<string, string> = {
  reactpnpm: "pnpm add blockicon",
  reactnpm: "npm install blockicon",
  reactyarn: "yarn add blockicon",
  reactbun: "bun add blockicon",
};
