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

interface BlockIconProps extends ImageProps, IconVariants {
  // category: "chains" | "tokens" | "memes";
  asset: string;
  theme?: "original" | "dark" | "light";
}

export const BlockIcon = (props: BlockIconProps) => {
  const {
    asset,
    theme = "original",
    shape,
    size,
    className,
    ...iconProps
  } = props;

  return (
    <img
      {...iconProps}
      src={`${BASE_URL}/${theme}/${asset}.svg`}
      alt={`${asset} icon`}
      className={cn(iconVariants({ shape, size }), className)}
    />
  );
};
