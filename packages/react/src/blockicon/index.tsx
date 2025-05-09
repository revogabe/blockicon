import "../styles/index.css";
import { ALIASES } from "@blockicon/core";
import { BlockIconProps } from "../types";

const BASE_URL = "https://s3.blockicon.dev/blockicon";

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
      data-category={category}
      data-shape={shape}
      data-size={size}
      className={`blockicon ${className}`}
      {...imgProps}
    />
  );
};

export { BlockIcon };
