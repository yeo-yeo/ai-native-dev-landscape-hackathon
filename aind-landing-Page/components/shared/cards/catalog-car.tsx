import React from "react";
import { Button } from "../button";
import { Tool } from "@/type/tools-type";
import Link from "next/link";
import { Icon } from "../icons";

export default function CatalogCard({
  tool,
  category,
}: {
  tool: Tool;
  category: string;
}) {
  return (
    <div className="outline outline-[#C9C3B9] p-6 rounded-lg lg:rounded-none">
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex  gap-3 ">
              {tool.icon_url ? (
                <Link href={tool.website_url} target="_blank">
                  <img
                    src={tool.icon_url}
                    alt={tool.name}
                    className="w-16 h-16 object-contain"
                  />
                </Link>
              ) : (
                <Icon name="placeholder" className="size-16" />
              )}
              <div className="flex flex-col max-w-[130px] min-h-full justify-between">
                <div className="uppercase text-[10px] w-fit font-dm-mono font-medium leading-[130%] text-[#F4EEE2] bg-[#F45757] py-1 px-2.5 rounded-2xl">
                  New
                </div>
                <p className="body-xxs font-medium pb-0.5">{tool.name}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <Button variant="primary" size="small" className="" linkIcon>
                <Link
                  href={tool.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </Link>
              </Button>
              <Button variant="secondary" size="small" arrow="black">
                <Link
                  href={tool.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Update
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-start justify-start gap-6">
            <div className="flex gap-6 justify-between w-full">
              <div className="flex items-start flex-col gap-2">
                <p className="body-xxs text-[#999999]">Domaine</p>
                <p className="body-xxs">domain</p>
              </div>
              <div className="flex items-start flex-col gap-2">
                <p className="body-xxs text-[#999999]">Category</p>
                <p className="body-xxs">{category}</p>
              </div>
              <div className="flex items-start flex-col gap-2">
                <p className="body-xxs text-[#999999]">Date added</p>
                <p className="body-xxs">{tool.date_added}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="body-xxs text-[#999999]">Description</p>
            <p className="text-xs font-dm-mono tracking-[1.1px] line-clamp-3 leading-[160%]">
              {tool.description}
            </p>
          </div>
          {tool.tags && (
            <div className="flex flex-col gap-2">
              <p className="body-xxs text-[#999999]">Tags</p>
              <div className="flex gap-4 flex-wrap">
                {tool.tags?.map((tag, index) => (
                  <p key={tag + index} className=" body-xxs">
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* <div className="flex gap-4">
          <Button variant="primary" className="w-fit mt-6" linkIcon>
            <Link
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View website
            </Link>
          </Button>
          <Button variant="secondary" className="w-fit mt-6" arrow="black">
            <Link
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Update
            </Link>
          </Button>
        </div> */}
      </div>
    </div>
  );
}
