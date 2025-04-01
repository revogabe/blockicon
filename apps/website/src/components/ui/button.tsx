import { cn } from "@/utils/cn";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { ComponentProps } from "react";

type ButtonPrimitiveProps = ComponentProps<"button">;
type ButtonProps = ButtonPrimitiveProps & {
  asChild?: boolean;
  isLoading?: boolean;
};

export const Button = (props: ButtonProps) => {
  const {
    asChild,
    children,
    disabled,
    ref,
    className,
    isLoading,
    ...buttonProps
  } = props;

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        "flex items-center justify-center gap-1 px-3 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 text-sm font-medium",
        "duration-300 ease-out hover:bg-zinc-800 hover:border-zinc-700",
        "disabled:opacity-50 disabled:pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 ring-orange-500 ring-offset-zinc-950 focus-visible:ring-offset-3",
        className,
      )}
      {...buttonProps}
    >
      <Slottable>{children}</Slottable>
    </Comp>
  );
};
