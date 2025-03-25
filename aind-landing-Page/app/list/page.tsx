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
          {toolsData?.domains.map((domain) =>
            domain.categories.map((category) => {
              const filteredTools = activeTags.includes("all")
                ? category.tools
                : category.tools.filter((tool) =>
                    tool.tags?.some((tag) => activeTags.includes(tag))
                  );
              return filteredTools.map((tool) => (
                <TableRow key={tool.name}>
                  <TableCell className="sticky lg:relative left-0 z-20 bg-background lg:bg-transparent">
                    {tool.name}
                  </TableCell>
                  <TableCell className="">{tool.description}</TableCell>
                  <TableCell>domain</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
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
            })
          )}
        </TableBody>
      </Table>
    </section>
  );
}
