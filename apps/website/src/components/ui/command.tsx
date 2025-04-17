"use client";

import { cn } from "@/utils/cn";
import { ComponentProps } from "react";
import { Button } from "./button";
import * as Ariakit from "@ariakit/react";
import Image from "next/image";
import { toast } from "sonner";
import { Framework } from "@/types";

type DivProps = ComponentProps<"div">;
type CommandProps = DivProps & {
  title?: string;
  frameworks?: Framework[];
  packagesManager?: string[];
  command: string;
  packageManager?: string;
  onSetPackageManager?: (value: string) => void;
  framework?: string;
  onSetFramework?: (value: string) => void;
};

export const Command = (props: CommandProps) => {
  const {
    title,
    frameworks,
    packagesManager,
    framework,
    packageManager,
    onSetPackageManager,
    onSetFramework,
    command,
    ref,
    className,
    ...commandProps
  } = props;

  const frameworkIcon = frameworks?.find(
    (item) => item.name === framework,
  )?.icon;

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(command);
  }

  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-[540px] rounded-lg border border-zinc-800 ring-2 ring-offset-2 ring-offset-zinc-950 ring-zinc-800 flex flex-col overflow-clip",
        className,
      )}
      {...commandProps}
    >
      <div className="flex items-center justify-between h-12 px-2 border-b border-zinc-800 bg-zinc-950">
        <p className="px-2">{title}</p>
        <div className="flex items-center justify-end gap-2">
          {frameworks && (
            <Ariakit.SelectProvider value={framework} setValue={onSetFramework}>
              <Ariakit.Select
                className={cn(
                  "flex items-center justify-center gap-1 px-3 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 text-sm font-medium",
                  "duration-300 ease-out hover:bg-zinc-800 hover:border-zinc-700",
                  "disabled:opacity-50 disabled:pointer-events-none",
                  "focus-visible:outline-none focus-visible:ring-2 ring-orange-500 ring-offset-zinc-950 focus-visible:ring-offset-3",
                  className,
                )}
              >
                {frameworkIcon && (
                  <Image
                    src={frameworkIcon}
                    alt={framework ?? ""}
                    width={16}
                    height={16}
                  />
                )}
                <span>{framework}</span>
              </Ariakit.Select>
              <Ariakit.SelectPopover
                className="border border-zinc-800 bg-zinc-900 rounded-lg p-1 w-max"
                gutter={5}
              >
                {frameworks?.map((item) => (
                  <div
                    key={item.name}
                    className="flex gap-1 items-center justify-start px-2 select-none cursor-default h-7 rounded-md hover:bg-zinc-800 duration-200 ease-out"
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={16}
                      height={16}
                    />
                    <Ariakit.SelectItem value={item.name} />
                  </div>
                ))}
              </Ariakit.SelectPopover>
            </Ariakit.SelectProvider>
          )}

          {packagesManager && (
            <Ariakit.SelectProvider
              value={packageManager}
              setValue={onSetPackageManager}
            >
              <Ariakit.Select
                className={cn(
                  "flex items-center justify-center gap-1 px-3 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-50 text-sm font-medium",
                  "duration-300 ease-out hover:bg-zinc-800 hover:border-zinc-700",
                  "disabled:opacity-50 disabled:pointer-events-none",
                  "focus-visible:outline-none focus-visible:ring-2 ring-orange-500 ring-offset-zinc-950 focus-visible:ring-offset-3",
                  className,
                )}
              >
                {packageManager}
              </Ariakit.Select>
              <Ariakit.SelectPopover
                className="border border-zinc-800 bg-zinc-900 rounded-lg p-1 w-max"
                gutter={5}
              >
                {packagesManager?.map((item) => (
                  <Ariakit.SelectItem
                    key={item}
                    value={item}
                    className="flex items-center justify-start px-2 select-none cursor-default h-7 rounded-md hover:bg-zinc-800 duration-200 ease-out"
                  />
                ))}
              </Ariakit.SelectPopover>
            </Ariakit.SelectProvider>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 p-2 bg-zinc-900">
        <code className="w-full px-2 min-h-9 flex items-center">{command}</code>

        <Button
          onClick={(e) => {
            handleCopyToClipboard();
            toast.custom(() => (
              <div className="px-4 py-2 w-full flex items-center border border-zinc-800 bg-zinc-900 rounded-lg">
                <p className="text-sm text-zinc-300">Copied to clipboard</p>
              </div>
            ));
            e.stopPropagation();
          }}
          className="w-8 h-8 p-0 flex-shrink-0 active:scale-90"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 5V2.6C5 2.44087 5.06321 2.28826 5.17574 2.17574C5.28826 2.06321 5.44087 2 5.6 2H13.4C13.5591 2 13.7117 2.06321 13.8243 2.17574C13.9368 2.28826 14 2.44087 14 2.6V10.4C14 10.5591 13.9368 10.7117 13.8243 10.8243C13.7117 10.9368 13.5591 11 13.4 11H11V13.3958C11 13.7294 10.7306 14 10.3958 14H2.6042C2.52483 14.0001 2.44623 13.9845 2.37289 13.9542C2.29955 13.9238 2.23291 13.8793 2.17679 13.8232C2.12067 13.7671 2.07617 13.7005 2.04583 13.6271C2.0155 13.5538 1.99992 13.4752 2 13.3958L2.0018 5.6042C2.0018 5.2706 2.2712 5 2.606 5H5ZM6.2 5H10.3958C10.7294 5 11 5.2694 11 5.6042V9.8H12.8V3.2H6.2V5ZM3.2018 6.2L3.2 12.8H9.8V6.2H3.2018Z"
              fill="#FAFAFA"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};
