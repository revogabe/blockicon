import Image from "next/image";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="container border-x border-zinc-900 mx-auto h-16 flex items-center px-4">
      <div className="flex w-full items-center justify-between">
        <Image
          src="/blockicon.svg"
          alt="BlockIcon Logo"
          width={132}
          height={32}
        />

        <nav className="flex items-center justify-center gap-6">
          <a
            className="text-zinc-400 hover:text-zinc-50 duration-200 ease-out text-sm font-medium"
            href="#introduction"
          >
            Introduction
          </a>
          <a
            className="text-zinc-400 hover:text-zinc-50 duration-200 ease-out text-sm font-medium"
            href="#icons"
          >
            Icon
          </a>
          <a
            className="text-zinc-400 hover:text-zinc-50 duration-200 ease-out text-sm font-medium"
            href="#self-host"
          >
            Self-Host
          </a>
          <a
            className="text-zinc-400 hover:text-zinc-50 duration-200 ease-out text-sm font-medium"
            href="#sponsors"
          >
            Sponsors
          </a>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Button asChild>
            <a
              target="_blank"
              href="https://github.com/revogabe/blockicon"
              className="cursor-default"
            >
              <Image
                src="/brands/github.svg"
                alt="Github"
                width={20}
                height={20}
              />
              <span>Github</span>
            </a>
          </Button>
          <Button asChild>
            <a
              target="_blank"
              href="https://www.npmjs.com/package/@blockicon/react"
              className="cursor-default"
            >
              <Image src="/brands/npm.svg" alt="Npm" width={20} height={20} />
              <span>Npm</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
