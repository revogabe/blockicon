import { Hero } from "@/components/hero";
import { Tabs } from "@/components/tabs";

export default async function Home() {
  return (
    <main className="flex flex-col justify-start min-h-screen mx-auto">
      <Hero />
      <Tabs />
    </main>
  );
}
