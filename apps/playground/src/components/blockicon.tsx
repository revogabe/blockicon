import { ComponentProps } from "react";
import { cn } from "../utils/cn";

const BASE_URL =
  "https://blockicon-bucket.s3.us-west-1.amazonaws.com/blockicon/pre-alpha";

type ImageProps = ComponentProps<"img">;
type IconTheme = "original" | "dark" | "light";

interface BlockIconProps extends Omit<ImageProps, "src"> {
  asset: string | number;
  theme?: IconTheme;
  shape?: "circle" | "square";
  size?: "sm" | "md" | "lg" | "xl";
}

export const BlockIcon = (props: BlockIconProps) => {
  const {
    asset,
    theme = "original",
    shape = "circle",
    size = "md",
    className,
    ...imgProps
  } = props;

  return (
    <img
      src={`${BASE_URL}/${theme}/${asset}.svg`}
      alt={`${asset} icon`}
      data-shape={shape}
      data-size={size}
      data-theme={theme}
      className={cn("blockicon", className)}
      {...imgProps}
    />
  );
};
