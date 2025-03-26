import React from "react";
import { Button } from "../button";
import { Tool } from "@/type/tools-type";
import Link from "next/link";

import ToolStatus from "../tool-status";
import { PopupCard } from "../popup-card";
import Logo from "../logo";

export default function CatalogCard({
  tool,
  category,
  domain,
}: {
  tool: Tool;
  category: string;
  domain: string;
}) {
  return (
    <div className="outline relative outline-[#C9C3B9] p-6 rounded-lg lg:rounded-none">
      <div className="w-full flex flex-col justify-between ">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex  gap-3">
              <Logo tool={tool} size="large" className="relative z-20" />
              <div className="flex flex-col max-w-[130px] min-h-full justify-between">
                <ToolStatus date={tool.date_added} />
                <p className="body-xxs font-medium pb-0.5 relative z-20">
                  {tool.name}
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="medium"
              className="relative z-20"
              linkIcon
            >
              <Link
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </Link>
            </Button>
          </div>
          <div className="flex items-start justify-start gap-6">
            <div className="flex gap-6 justify-between w-full">
              <div className="flex items-start flex-col gap-2">
                <p className="body-xxs text-[#999999] relative z-20">Domain</p>
                <p className="body-xxs relative z-20">{domain}</p>
              </div>
              <div className="flex items-start flex-col gap-2">
                <p className="body-xxs text-[#999999] relative z-20">
                  Category
                </p>
                <p className="body-xxs relative z-20">{category}</p>
              </div>
              <div className="flex items-start flex-col gap-2">
                <p className="body-xxs text-[#999999] relative z-20">
                  Date added
                </p>
                <p className="body-xxs relative z-20">{tool.date_added}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="body-xxs text-[#999999] relative z-20">Description</p>
            <p className="text-xs font-dm-mono tracking-[1.1px] line-clamp-3 leading-[160%] relative z-20">
              {tool.description.split("\\n\\n").map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph}
                  {index < tool.description.split("\\n\\n").length - 1 && (
                    <br />
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
          {tool.tags && (
            <div className="flex flex-col gap-2">
              <p className="body-xxs text-[#999999] relative z-20">Tags</p>
              <div className="flex gap-4 flex-wrap">
                {tool.tags?.map((tag, index) => (
                  <p key={tag + index} className=" body-xxs">
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p className="body-xxs text-[#999999] relative z-20 max-w-3/4">
              Url
            </p>
            <Link
              className="body-xxs relative z-20"
              href={tool.website_url}
              target="_blank"
            >
              {tool.website_url
                .replace(/^https?:\/\//, "")
                .replace(/^www\./, "")
                .replace(/\/$/, "")}
            </Link>
          </div>
        </div>
        <Link
          href="https://github.com/AI-Native-Dev-Community/ai-native-dev-landscape/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-instrument-sans font-medium  underline self-end relative z-20"
        >
          Suggest Edits
        </Link>
      </div>

      <PopupCard key={tool.name} tool={tool} category={category}>
        <div
          className="absolute inset-0 cursor-pointer z-[1]"
          role="button"
          aria-label={`Open details for ${tool.name}`}
        />
      </PopupCard>
    </div>
  );
}
