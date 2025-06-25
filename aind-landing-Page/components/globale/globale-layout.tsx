"use client";

import type React from "react";

import { Icon } from "@/components/shared/icons";
import Tags from "@/components/shared/tags";
import initialToolsData from "@/public/tools-data.json";
import type { ToolsData } from "@/type/tools-type";
import { cx } from "cva";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Search from "../shared/search";
import { getConsistentColor } from "@/util/get-consistent-color";
import { GlobaleContext, type GlobaleContextType } from "./globale-context";
import MobileDrawer from "../shared/mobile-drawer";
import TabSelector from "../shared/tab-selector";
import { Button } from "../shared/button";
import Chatathon from "../shared/chatathon";


export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [contentHeight, setContentHeight] = useState("100%");
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ToolsData>(
    initialToolsData as unknown as ToolsData
  );
  const [activeTags, setActiveTags] = useState(["all"]);
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAllTags, setShowAllTags] = useState(true);

  // Client-side only code
  useEffect(() => {
    setIsMounted(true);

    // Get search param from URL on initial load
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const search = urlParams.get("search") || "";
      setSearchTerm(search);
    }
  }, []);

  // Handle search term changes
  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm && isMounted) {
        try {
          const response = await fetch("/tools-data.json");
          const newData = await response.json();
          setData(newData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [searchTerm, isMounted]);

  useEffect(() => {
    if (tagsContainerRef.current) {
      setContentHeight(tagsContainerRef.current.scrollHeight + "px");
    }
  }, []);
  // Update search handler to be passed to Search component
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const uniqueTags = data?.domains
    .flatMap((domain) => domain.categories)
    .flatMap((category) => category.tools)
    .flatMap((tool) => tool.tags || [])
    .filter((tag, index, self) => self.indexOf(tag) === index)
    .map((name) => ({
      id: name,
      name: name,
      color: getConsistentColor(name),
    }));

  const tagsWithAll = [
    {
      id: "all",
      name: "Show all",
      color: undefined,
    },
    ...(uniqueTags || []),
  ];

  const handleTagClick = (tagId: string) => {
    if (tagId === "all") {
      setActiveTags(["all"]);
      return;
    }

    setActiveTags((prev) => {
      const withoutAll = prev.filter((tag) => tag !== "all");

      if (withoutAll.includes(tagId)) {
        const newTags = withoutAll.filter((tag) => tag !== tagId);
        return newTags.length === 0 ? ["all"] : newTags;
      } else {
        return [...withoutAll, tagId];
      }
    });
  };
  const filteredData = searchTerm
    ? {
        ...data,
        domains:
          data?.domains
            .map((domain) => ({
              ...domain,
              categories: domain.categories
                .map((category) => ({
                  ...category,
                  tools: category.tools.filter(
                    (tool) =>
                      tool.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      tool.description
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      tool.tags?.some((tag) =>
                        tag.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                  ),
                }))
                .filter((category) => category.tools.length > 0),
            }))
            .filter((domain) => domain.categories.length > 0) || [],
      }
    : data;

  const contextValue: GlobaleContextType = {
    activeTags,
    toolsData: filteredData,
  };

  const numberActiveTags = activeTags.length;
  const numberTools = data?.domains.flatMap((domain) =>
    domain.categories.flatMap((category) => category.tools)
  ).length;

  const lastUpdated = (() => {
    const allTools = initialToolsData.domains
      .flatMap((domain) => domain.categories)
      .flatMap((category) => category.tools);

    const latestDate = allTools
      .map((tool) => {
        const [day, month, year] = tool.date_added.split("/").map(Number);
        return new Date(year, month - 1, day); // Correct date parsing
      })
      .reduce(
        (latest, current) =>
          current.getTime() > latest.getTime() ? current : latest,
        new Date(0)
      );

    return {
      weekday: latestDate.toLocaleDateString("en-US", { weekday: "long" }),
      date: `${latestDate.getDate()} ${latestDate.toLocaleDateString("en-US", {
        month: "long",
      })}`,
    };
  })();
  return (
    <div className="max-w-[var(--max-width)] lg:px-12 min-h-[calc(100vh-355px)] mx-auto flex flex-col gap-4 lg:gap-12 my-6 lg:my-12">
      <section className="flex flex-col lg:flex-row justify-between w-full  px-4 mb-4 lg:mb-0 lg:px-0 gap-10 lg:gap-0 lg:items-start">
        <div className="flex flex-col gap-4 lg:gap-6 ">
          <h1 className="heading">Landscape</h1>
          <p className="body-sm lg:body">
            Your Guide to the AI Development Ecosystem
          </p>
        </div>
    
        <div className="flex gap-12 items-start justify-between lg:justify-end ">
          <div className="body-sm">
            <div className="text-[#999999]">Stats</div>
            <div>{numberTools} tools</div>
            <Button
              className="flex gap-1 items-center mt-2 hover:bg-black/30"
              variant="secondary"
              size="small"
            >
              <Icon name="plusBlack" />
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/AI-Native-Dev-Community/ai-native-dev-landscape/blob/main/CONTRIBUTING.md"
              >
                Submit
              </Link>
            </Button>
          </div>
          <div className="body-sm">
            <div className="text-[#999999]">Last updated</div>
            <div className="ml-2">
              {lastUpdated.weekday}
              <br />
              {lastUpdated.date}
            </div>
          </div>
        </div>
      </section>
      <Chatathon />
      <section className="hidden lg:flex justify-between w-full items-start gap-12">
        <div className="w-full">
          <div
            ref={tagsContainerRef}
            className={cx(
              "flex gap-1 flex-wrap items-center justify-start  transition-all duration-500 ease-in-out relative overflow-hidden"
            )}
            style={{ height: showAllTags ? contentHeight : 73 }}
          >
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="p-2 bg-black rounded-full relative cursor-pointer text-white h-[34px] w-[34px] flex items-center justify-center"
            >
              <span
                className={cx(
                  "w-0.5 h-3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out",
                  {
                    "rotate-90": showAllTags,
                  }
                )}
              />
              <span className="w-3 h-0.5 bg-white rounded-full" />
            </button>
            {[...tagsWithAll]
              .sort((a, b) =>
                a.id === "all"
                  ? -1
                  : b.id === "all"
                    ? 1
                    : a.name.localeCompare(b.name)
              )
              .map((tag) => (
                <Tags
                  key={tag.id}
                  name={tag.name}
                  color={tag.color}
                  active={activeTags.includes(tag.id.toString())}
                  onClick={() => handleTagClick(tag.id.toString())}
                />
              ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-col justify-between gap-2 items-center">
          <TabSelector pathname={pathname} />
          <Search onSearch={handleSearch} initialValue={searchTerm} />
        </div>
      </section>
      <section className="lg:hidden relative px-4 flex items-center justify-between">
        <MobileDrawer
          numberActiveTags={numberActiveTags}
          className={cx("transition-all duration-300", {
            "opacity-0 pointer-events-none": isSearchOpen,
          })}
          pathname={pathname}
        >
          {tagsWithAll.map((tag) => (
            <Tags
              key={tag.id}
              name={tag.name}
              color={tag.color}
              active={activeTags.includes(tag.id.toString())}
              onClick={() => handleTagClick(tag.id.toString())}
            />
          ))}
        </MobileDrawer>
        <Search
          onSearch={handleSearch}
          initialValue={searchTerm}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
      </section>
      <GlobaleContext.Provider value={contextValue}>
        {children}
      </GlobaleContext.Provider>
    </div>
  );
}
