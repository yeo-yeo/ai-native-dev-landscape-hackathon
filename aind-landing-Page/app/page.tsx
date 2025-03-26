"use client";

import GridCard from "@/components/shared/cards/grid-card";
import { useGlobaleContext } from "@/components/globale/globale-context";

export default function Home() {
  const { toolsData, activeTags } = useGlobaleContext();
  return (
    <section className="lg:border border-[#C9C3B9] rounded-lg p-4 lg:p-0 ">
      {toolsData?.domains
        .sort((a, b) => a.level - b.level)
        .map((item) => {
          const hasMatchingTools = item.categories.some((category) => {
            const filteredTools = activeTags.includes("all")
              ? category.tools
              : category.tools.filter((tool) =>
                  tool.tags?.some((tag) => activeTags.includes(tag))
                );
            return filteredTools.length > 0;
          });

          if (item.categories.length === 0 || !hasMatchingTools) return null;

          return (
            <GridCard
              key={item.name}
              categories={item.categories}
              title={item.name}
              description={item.description}
            />
          );
        })}
    </section>
  );
}
