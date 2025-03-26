"use client";

import { useGlobaleContext } from "@/components/globale/globale-context";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/table";
import ToolStatus from "@/components/shared/tool-status";
import Link from "next/link";

export default function LandscapeList() {
  const { toolsData, activeTags } = useGlobaleContext();

  return (
    <section className=" p-4 lg:px-0">
      <Table>
        {toolsData?.domains.length === 0 && (
          <TableCaption>No tools found</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] sticky left-0 z-20 lg:relative  lg:w-[13%] bg-background lg:bg-transparent">
              Name
            </TableHead>
            <TableHead className="w-[250px] lg:w-[30%]">Description</TableHead>
            <TableHead className="w-[100px] lg:w-[7%]">Domain</TableHead>
            <TableHead className="w-[150px] lg:w-[10%]">Category</TableHead>
            <TableHead className="w-[150px] lg:w-[10%]">Url</TableHead>
            <TableHead className="w-[75px] lg:w-[5%]"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(() => {
            const allTools =
              toolsData?.domains.flatMap((domain) =>
                domain.categories.flatMap((category) =>
                  category.tools.map((tool) => ({
                    ...tool,
                    domainName: domain.name,
                    categoryName: category.name,
                  }))
                )
              ) || [];

            const filteredTools = activeTags.includes("all")
              ? allTools
              : allTools.filter((tool) =>
                  tool.tags?.some((tag) => activeTags.includes(tag))
                );

            const sortedTools = [...filteredTools].sort((a, b) =>
              a.popular === b.popular ? 0 : a.popular ? -1 : 1
            );

            return sortedTools.map((tool) => (
              <TableRow
                key={`${tool.domainName}-${tool.categoryName}-${tool.name}`}
              >
                <TableCell
                  className="sticky lg:relative left-0 z-20 bg-background lg:bg-transparent"
                  showTooltip={true}
                >
                  {tool.name}
                </TableCell>
                <TableCell showTooltip={true}>{tool.description}</TableCell>
                <TableCell>{tool.domainName}</TableCell>
                <TableCell>{tool.categoryName}</TableCell>
                <TableCell showTooltip={true}>
                  <Link
                    href={tool.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tool.website_url
                      .replace(/^https?:\/\//, "")
                      .replace(/^www\./, "")
                      .replace(/\/$/, "")}
                  </Link>
                </TableCell>
                <TableCell className="">
                  <ToolStatus date={tool.date_added} />
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </section>
  );
}
