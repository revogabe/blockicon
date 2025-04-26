import { ALIASES } from "@blockicon/core";
import { ComponentProps } from "react";

type ImageProps = Omit<ComponentProps<"img">, "src">;

type Networks = keyof (typeof ALIASES)["network"];
type Tokens = keyof (typeof ALIASES)["token"];

type AssetProps = {
  category?: "token";
  asset: Tokens;
};

type NetworkProps = {
  category?: "network";
  chain: Networks;
};

type BlockIconProps = ImageProps & {
  shape?: "circle" | "square";
  size?: "sm" | "md" | "lg" | "xl";
} & (AssetProps | NetworkProps);

/* ------ Exports ------ */

export type { BlockIconProps, Networks, Tokens };
