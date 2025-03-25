"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "radix-ui";
import { cx } from "cva";
import { Icon } from "./icons";
import ToolStatus from "./tool-status";
import { Tool } from "@/type/tools-type";
import Link from "next/link";
import { Button } from "./button";

export function PopupCard({
  children,
  tool,
  category,
}: {
  children: React.ReactNode;
  tool: Tool;
  category: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="cursor-pointer hover:bg-black/3">
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/30 transition-opacity duration-300" />
        <Dialog.Content
          className={cx(
            "fixed left-1/2 top-1/2 z-[100] px-6 py-6 w-[calc(100vw-32px)] max-h-[75vh] lg:w-[75vw] flex flex-col justify-between -translate-x-1/2 max-w-[550px] -translate-y-1/2 overflow-y-auto rounded-[20px] bg-background border border-black/50"
          )}
        >
          <VisuallyHidden.Root>
            <Dialog.Title>Tool information</Dialog.Title>
          </VisuallyHidden.Root>
          <Dialog.Close className="absolute right-2 top-2 cursor-pointer">
            <Icon className="size-6" name="closeBlack" />
          </Dialog.Close>
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
                  <ToolStatus date={tool.date_added} />
                  <p className="body-xxs text-sm font-medium pb-0.5">
                    {tool.name}
                  </p>
                </div>
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
              <p className="text-xs font-dm-mono tracking-[1.1px] leading-[160%]">
                {tool.description}
              </p>
            </div>
            {tool.tags && (
              <div className="flex flex-col gap-4">
                <p className="body-xxs text-[#999999]">Tags</p>
                <div className="flex gap-6 flex-wrap">
                  {tool.tags?.map((tag, index) => (
                    <p key={tag + index} className=" body-xxs">
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-10">
            <Button variant="primary" size="large" className="w-fit" linkIcon>
              <Link
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="large"
              arrow="black"
              className="w-fit"
            >
              <Link
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Update
              </Link>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
