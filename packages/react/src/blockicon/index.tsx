// import "./styles.css";
import { ALIASES } from "core";
import { ComponentProps } from "react";

const BASE_URL = "https://d3v6728skxiwy6.cloudfront.net/blockicon";

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

const BlockIcon = (props: BlockIconProps) => {
  let _props = {} as Omit<BlockIconProps, "chain" | "asset">;

  const alias = (() => {
    if (props.category === "network") {
      const { chain, ...restProps } = props;
      _props = restProps;
      return ALIASES[props.category][chain];
    }
    if (props.category === "token") {
      const { asset, ...restProps } = props;
      _props = restProps;
      return ALIASES[props.category][asset];
    }

    throw new Error("Provide a valid category");
  })();

  const {
    category = "token",
    shape = "circle",
    size = "md",
    className,
    ...imgProps
  } = _props;

  return (
    <img
      src={`${BASE_URL}/${category}/${alias}.svg`}
      alt={`${alias} icon`}
      data-shape={shape}
      data-size={size}
      data-category={category}
      className={`blockicon ${className}`}
      {...imgProps}
    />
  );
};

export { BlockIcon, type BlockIconProps };
