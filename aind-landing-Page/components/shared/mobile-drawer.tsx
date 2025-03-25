"use client";

import { VisuallyHidden } from "radix-ui";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Icon, type IconName } from "./icons";
import { Button } from "./button";
import { cx } from "cva";
import TabSelector from "./tab-selector";
import { Tabs } from "@/constant/moc-data";

export default function MobileDrawer({
  children,
  numberActiveTags,
  className,
  pathname,
}: {
  children: React.ReactNode;
  numberActiveTags: number;
  className?: string;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const tab = Tabs.find((tab) => tab.href === pathname);
  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger asChild>
        <Button
          variant="primary"
          size="large"
          className={cx(
            "flex items-center gap-4 font-instrument-sans",
            className
          )}
        >
          <p>
            {numberActiveTags === 1
              ? "Show all"
              : `${numberActiveTags} filters`}
          </p>{" "}
          /{" "}
          <div className="flex items-center gap-2">
            <Icon name={`${tab?.icon}White` as IconName} className="size-4" />
            <p>{tab?.name}</p>
          </div>
          <Icon name="chevronBWhite" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 w-full bg-black/80 transition-opacity duration-500" />
        <Dialog.Content className="data-[state=closed]:animate-mobile-slideout gap-6 data-[state=open]:animate-mobile-slidein fixed bottom-0 left-0 z-50 flex max-h-[75dvh] w-screen flex-col overflow-hidden rounded-t-2xl bg-background p-6">
          <VisuallyHidden.Root>
            <Dialog.Title>Tags selector</Dialog.Title>
          </VisuallyHidden.Root>
          <Dialog.Close asChild>
            <Icon
              className="absolute right-4 top-4 cursor-pointer size-6"
              name="closeBlack"
            />
          </Dialog.Close>
          <p className="body text-black/50">View</p>
          <TabSelector pathname={pathname} variant="mobile" />
          <p className="body text-black/50">Categories</p>
          <div className="overflow-y-scroll flex gap-2 flex-wrap ">
            {children}
          </div>
          <Button
            variant="primary"
            size="large"
            fullWidth
            arrow="white"
            onClick={() => setOpen(false)}
          >
            Show Result
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
