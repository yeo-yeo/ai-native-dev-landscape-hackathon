"use client";
import CatalogCard from "@/components/shared/cards/catalog-car";
import { useGlobaleContext } from "@/components/globale/globale-context";

export default function Catalog() {
  const { toolsData, activeTags } = useGlobaleContext();

  return (
    <>
      {toolsData?.domains && toolsData?.domains.length > 0 ? (
        <div className="grid grid-cols-1 gap-4  p-4 lg:p-0 lg:grid-cols-3 lg:gap-px lg:border border-[#C9C3B9] rounded-lg overflow-hidden">
          {(() => {
            // Flatten all tools from all domains and categories
            const allTools = toolsData.domains.flatMap((domain) =>
              domain.categories.flatMap((category) =>
                category.tools.map((tool) => ({
                  ...tool,
                  domainName: domain.name,
                  categoryName: category.name,
                }))
              )
            );

            // Filter and sort all tools together
            const filteredTools = activeTags.includes("all")
              ? allTools
              : allTools.filter((tool) =>
                  tool.tags?.some((tag) => activeTags.includes(tag))
                );

            const sortedTools = [...filteredTools].sort((a, b) =>
              a.popular === b.popular ? 0 : a.popular ? -1 : 1
            );

            return sortedTools.map((tool) => (
              <CatalogCard
                key={`${tool.domainName}-${tool.categoryName}-${tool.name}`}
                tool={tool}
                category={tool.categoryName}
                domain={tool.domainName}
              />
            ));
          })()}
        </div>
      ) : (
        toolsData?.domains.length === 0 && (
          <div className="flex items-center justify-center heading-xl">
            No tools found
          </div>
        )
      )}
    </>
  );
}
