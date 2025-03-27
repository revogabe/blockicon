import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const BASE_URL =
  "https://blockicon-bucket.s3.us-west-1.amazonaws.com/blockicon/pre-alpha";

const iconVariants = tv({
  base: "flex items-center justify-center flex-shrink-0 object-contain overflow-clip",
  variants: {
    shape: {
      square: "rounded-md",
      circle: "rounded-full",
    },
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
      xl: "size-10",
    },
  },
  defaultVariants: {
    shape: "circle",
    size: "md",
  },
});

type ImageProps = ComponentProps<"img">;
type IconVariants = VariantProps<typeof iconVariants>;
type IconTheme = "original" | "dark" | "light";

interface BlockIconProps extends Omit<ImageProps, "src">, IconVariants {
  asset: string | number;
  theme?: IconTheme;
}

export const BlockIcon = (props: BlockIconProps) => {
  const {
    asset,
    theme = "original",
    shape,
    size,
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
      className={cn(iconVariants({ shape, size }), className)}
      {...imgProps}
    />
  );
};
