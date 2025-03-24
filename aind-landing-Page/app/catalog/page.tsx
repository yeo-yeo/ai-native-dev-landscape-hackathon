"use client";
import CatalogCard from "@/components/shared/cards/catalog-car";
import { useGlobaleContext } from "@/components/globale/globale-context";

export default function Catalog() {
  const { toolsData, activeTags } = useGlobaleContext();

  return (
    <>
      {toolsData?.domains && toolsData?.domains.length > 0 ? (
        <div className="grid grid-cols-1 gap-4  p-4 lg:p-0 lg:grid-cols-3 lg:gap-px lg:border border-[#C9C3B9] rounded-lg overflow-hidden">
          {toolsData?.domains.map((domain) =>
            domain.categories.map((category) => {
              const filteredTools = activeTags.includes("all")
                ? category.tools
                : category.tools.filter((tool) =>
                    tool.tags?.some((tag) => activeTags.includes(tag))
                  );

              return filteredTools.map((tool) => (
                <CatalogCard key={tool.name} tool={tool} />
              ));
            })
          )}
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
