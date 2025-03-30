import * as react_jsx_runtime from 'react/jsx-runtime';
import { ComponentProps } from 'react';

declare const ALIASES: {
    readonly network: {
        readonly bitcoin: "bitcoin";
        readonly btc: "bitcoin";
        readonly ethereum: "ethereum";
        readonly eth: "ethereum";
        readonly solana: "solana";
        readonly sol: "solana";
        readonly 1: "ethereum";
        readonly 42161: "arbitrum";
        readonly 8453: "base";
    };
    readonly token: {
        readonly usdc: "usdc";
    };
};

type ImageProps = Omit<ComponentProps<"img">, "src">;
type Aliases = typeof ALIASES;
type Networks = keyof Aliases["network"];
type Tokens = keyof Aliases["token"];
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
declare const BlockIcon: (props: BlockIconProps) => react_jsx_runtime.JSX.Element;

export { BlockIcon };
