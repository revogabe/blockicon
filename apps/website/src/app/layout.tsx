import { Header } from "@/components/header";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlockIcon – Open-source Crypto Icons for Web3",
  description:
    "BlockIcon is a free, open-source icon library for crypto projects. Easily integrate up-to-date icons for networks and tokens into your dApp, wallet, exchange or blockchain platform.",
  keywords: [
    "crypto icons",
    "web3 icons",
    "blockchain icons",
    "cryptocurrency icon library",
    "token icons",
    "network icons",
    "react crypto icons",
    "blockchain UI",
    "open-source crypto icons",
    "BlockIcon",
  ],
  authors: [
    { name: "revogabe", url: "https://github.com/revogabe" },
    { name: "joaom00", url: "https://github.com/joaom00" },
  ],
  creator: "BlockIcon",
  openGraph: {
    title: "BlockIcon – Open-source Crypto Icons for Web3",
    description:
      "Lightweight and customizable crypto icon library for developers. Includes networks, tokens, and shape options. Built for React and Web3 apps.",
    url: "https://blockicon.dev",
    siteName: "BlockIcon",
    type: "website",
  },
  twitter: {
    title: "BlockIcon – Open-source Crypto Icons for Web3",
    description:
      "Integrate beautiful crypto icons in seconds. Open-source, updated regularly, and perfect for any blockchain interface.",
    creator: "@revogabe",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter} w-full min-h-screen mx-auto relative`}>
        <Image
          src="/lights.png"
          alt="Lights"
          width={1280}
          height={1280}
          objectFit="contain"
          className="fixed right-0 top-0 z-50 pointer-events-none"
        />
        <Toaster position="bottom-right" />
        <div className="flex w-full border-b border-zinc-900">
          <Header />
        </div>
        {children}
      </body>
    </html>
  );
}
