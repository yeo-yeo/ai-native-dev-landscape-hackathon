"use client";

import GridCard from "@/components/shared/cards/grid-card";
import { useGlobaleContext } from "@/components/globale/globale-context";

export default function Home() {
  const { toolsData } = useGlobaleContext();
  return (
    <section className="lg:border border-[#C9C3B9] rounded-lg p-4 lg:p-0 ">
      {toolsData?.domains.map((item, index) => (
        <GridCard key={index} categories={item.categories} title={"WIP"} />
      ))}
    </section>
  );
}
