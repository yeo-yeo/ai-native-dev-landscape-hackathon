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
            <TableHead className="w-[100px] lg:w-[7%]">Founded</TableHead>
            <TableHead className="w-[250px] lg:w-[30%]">Description</TableHead>
            <TableHead className="w-[150px] lg:w-[16%]">Title</TableHead>
            <TableHead className="w-[100px] lg:w-[13%]">Category</TableHead>
            <TableHead className="w-[150px] lg:w-[10%]">Link</TableHead>
            <TableHead className="w-[75px] lg:w-[6%]"></TableHead>
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
                  <TableCell className="sticky left-0 z-20 bg-background lg:bg-transparent">
                    {tool.name}
                  </TableCell>
                  <TableCell>2022</TableCell>
                  <TableCell>{tool.description}</TableCell>
                  <TableCell>name</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <Link
                      href={tool.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tool.website_url
                        .replace(/^https?:\/\//, "")
                        .replace(/^www\./, "")}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="uppercase text-xs w-fit font-dm-mono font-medium leading-[130%] text-[#F4EEE2] bg-[#F45757] py-1 px-2.5 rounded-2xl">
                      New
                    </div>
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
