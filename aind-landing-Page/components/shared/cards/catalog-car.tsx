import React from "react";
import { Button } from "../button";
import { Tool } from "@/type/tools-type";
import Link from "next/link";

export default function CatalogCard({ tool }: { tool: Tool }) {
  return (
    <div className="outline outline-[#C9C3B9] p-6 rounded-lg lg:rounded-none">
      <div className="w-full h-[427px] flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            {tool.icon_url ? (
              <Link href={tool.website_url} target="_blank">
                <img
                  src={tool.icon_url}
                  alt={tool.name}
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const div = document.createElement("div");
                    div.className = "w-14 h-14 bg-gray-300";
                    target.parentNode?.replaceChild(div, target);
                  }}
                />
              </Link>
            ) : (
              <div className="w-14 h-14 bg-gray-300" />
            )}
            <div className="uppercase text-[10px] w-fit font-dm-mono font-medium leading-[130%] text-[#F4EEE2] bg-[#F45757] py-1 px-2.5 rounded-2xl">
              New
            </div>
          </div>
          <div className="flex items-start justify-start gap-6">
            <div className="flex gap-6 body-xxs">
              {/* todo: Replace this annd mapa round data */}
              <div className="flex items-start flex-col gap-2">
                <p className="body-xxs text-[#999999]">Name</p>
                <p className="body-xxs">{tool.name}</p>
              </div>
              <div className="flex items-start flex-col gap-2">
                <p className="body-xxs text-[#999999]">Data</p>
                <p className="body-xxs">1m USERS</p>
              </div>
              <div className="flex items-start flex-col gap-2">
                <p className="body-xxs text-[#999999]">Funding</p>
                <p className="body-xxs">$143m</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 body-xxs">
            <p className="body-xxs text-[#999999]">Description</p>
            <p className="body-xxs text-clamp-5 leading-[160%]">
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
        <div className="flex gap-4">
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
        </div>
      </div>
    </div>
  );
}
