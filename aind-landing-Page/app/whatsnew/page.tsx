"use client";

import { Suspense } from "react";
import { useGlobaleContext } from "@/components/globale/globale-context";
import CatalogCard from "@/components/shared/cards/catalog-car";
import { useSearchParams } from "next/navigation";

const getSinceDate = (searchParams: URLSearchParams) => {
    const rawSinceDate = searchParams.get("since");
    const sinceWeeks = rawSinceDate?.includes("w") ? parseInt(rawSinceDate.split("w")[0]) : null;
    const sinceDays = rawSinceDate?.includes("d") ? parseInt(rawSinceDate.split("d")[0]) : null;
    
    let sinceDate;
    if (sinceWeeks) {
      sinceDate = new Date(Date.now() - sinceWeeks * 7 * 24 * 60 * 60 * 1000);
    } else if (sinceDays) {
      sinceDate = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000);
    } else {
      sinceDate = new Date(Date.now());
    }
    return sinceDate;
};

function WhatsNewContent() {
  const { toolsData } = useGlobaleContext();
  const searchParams = useSearchParams();

  const sinceDate = getSinceDate(searchParams);
  const sinceFormat = searchParams.get("format") || "html";

  // Flatten all tools from all domains and categories
  const allTools = toolsData?.domains.flatMap((domain) =>
    domain.categories.flatMap((category) =>
      category.tools.map((tool) => ({
        ...tool,
        domainName: domain.name,
        categoryName: category.name,
      }))
    )
  ) || [];

  // Sort tools by date_added in descending order
  const latestTools = [...allTools]
    .filter((tool) => {
      if (!sinceDate) return true;
      
      const toolDate = new Date(tool.date_added.split("/").reverse().join("-"));
      const filterDate = new Date(sinceDate);
      return toolDate >= filterDate;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date_added.split("/").reverse().join("-"));
      const dateB = new Date(b.date_added.split("/").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });

    const toolsAddedSinceDate = latestTools.filter(tool => new Date(tool.date_added.split("/").reverse().join("-")) >= sinceDate);

    const maxDescriptionLength = 250;
    if (sinceFormat === "html") {
      return (
        <section className="p-4 lg:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="heading-xl">What&apos;s New</h1>
            {sinceDate && (
              <p className="text-sm text-gray-600">
                Showing {toolsAddedSinceDate.length} tools added since {new Date(sinceDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-px lg:border border-[#C9C3B9] rounded-lg overflow-hidden">
            {latestTools.length > 0 ? (
              latestTools.map((tool) => (
                <CatalogCard
                  key={`${tool.domainName}-${tool.categoryName}-${tool.name}`}
                  tool={tool}
                  category={tool.categoryName}
                  domain={tool.domainName}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                No tools found for the selected date range
              </div>
            )}
          </div>
        </section>
      );
    } else {
      return (
        <div className="text-sm text-gray-600 whitespace-pre-wrap font-mono">
          <div>AI Native Dev Landscape Tools added since {new Date(sinceDate).toLocaleDateString()}: {toolsAddedSinceDate.length}</div>
          <div className="mt-4">
            {latestTools.length > 0 ? (
              latestTools.map((tool) => (
                <div key={tool.name} className="mb-4">
                  <div>- {tool.name} ( <a href={tool.website_url} target="_blank" rel="noopener noreferrer">{tool.website_url}</a> ) :</div>
                  <div className="ml-2">Description: {tool.description.trim().length > maxDescriptionLength ? 
                    tool.description.trim().replace(/\n/g, ' ').substring(0, maxDescriptionLength) + '...' : 
                    tool.description.trim().replace(/\n/g, ' ')}
                  </div>
                  <div className="ml-2">Category: {tool.categoryName} - Domain: {tool.domainName} - Date Added: {tool.date_added}</div>
                </div>
              ))
            ) : (
              "No tools found for the selected date range"
            )}
          </div>
        </div>
      );
    }
}

export default function WhatsNew() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WhatsNewContent />
    </Suspense>
  );
}