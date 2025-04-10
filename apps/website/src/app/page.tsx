"use client";
import { Hero } from "@/components/hero";
import { motion } from "motion/react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen mx-auto">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
          delay: 0.1,
        }}
        className="bg-zinc-950 inset-0 fixed mx-auto z-[9999]"
      />
      <Hero />
    </main>
  );
}
