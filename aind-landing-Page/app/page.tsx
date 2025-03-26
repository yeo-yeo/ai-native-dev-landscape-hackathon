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
          // Check if any tools in any category match the active tags
          const hasMatchingTools = item.categories.some((category) => {
            const filteredTools = activeTags.includes("all")
              ? category.tools
              : category.tools.filter((tool) =>
                  tool.tags?.some((tag) => activeTags.includes(tag))
                );
            return filteredTools.length > 0;
          });

          // Return null if no matching tools or empty categories
          if (item.categories.length === 0 || !hasMatchingTools) return null;

          return (
            <GridCard
              key={item.name}
              categories={item.categories}
              title={item.name}
              description={item.description}
              item={toolsData?.domains}
            />
          );
        })}
    </section>
  );
}
