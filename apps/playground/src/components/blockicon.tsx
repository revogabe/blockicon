import { ComponentProps } from "react";
import { ALIASES } from "../aliases";
import { cn } from "../utils/cn";

const BASE_URL = "https://d3v6728skxiwy6.cloudfront.net/blockicon";

type ImageProps = ComponentProps<"img">;
type IconCategory = keyof typeof ALIASES;

type AssetType<TCategory extends IconCategory> = TCategory extends IconCategory
  ? keyof (typeof ALIASES)[TCategory]
  : never;

interface BlockIconProps<TCategory extends IconCategory>
  extends Omit<ImageProps, "src"> {
  asset: AssetType<TCategory>;
  category: TCategory;
  shape?: "circle" | "square";
  size?: "sm" | "md" | "lg" | "xl";
}

export const BlockIcon = <TCategory extends IconCategory>(
  props: BlockIconProps<TCategory>,
) => {
  const {
    asset,
    category,
    shape = "circle",
    size = "md",
    className,
    ...imgProps
  } = props;

  const alias = ALIASES[category][asset];

  return (
    <img
      src={`${BASE_URL}/${category}/${alias}.svg`}
      alt={`${alias} icon`}
      data-shape={shape}
      data-size={size}
      data-category={category}
      className={cn("blockicon", className)}
      {...imgProps}
    />
  );
};
