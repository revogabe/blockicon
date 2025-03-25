import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const iconVariants = tv({
  base: "size-10",
  variants: {
    shape: {
      square: "block-icon-square",
      circle: "block-icon-circle",
    },
    size: {
      sm: "block-icon-sm",
      md: "block-icon-md",
      lg: "block-icon-lg",
      xl: "block-icon-xl",
    },
  },
  defaultVariants: {
    shape: "circle",
    size: "md",
  },
});

type ImageProps = ComponentProps<"img">;
type IconVariants = VariantProps<typeof iconVariants>;

interface BlockIconProps extends ImageProps, IconVariants {}

export const BlockIcon = (props: BlockIconProps) => {
  const { shape, size, className, ...iconProps } = props;

  return (
    <img
      {...iconProps}
      src="https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"
      alt="Icon"
      className={cn(iconVariants({ shape, size }), className)}
    />
  );
};
