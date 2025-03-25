import { Tabs } from "@/constant/moc-data";
import Link from "next/link";
import React from "react";
import { Icon, type IconName } from "./icons";
import { cx } from "cva";

export default function TabSelector({
  pathname,
  variant = "desktop",
}: {
  pathname: string;
  variant?: "mobile" | "desktop";
}) {
  return (
    <div className="rounded-[64px] border border-black flex items-center overflow-hidden">
      {Tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={cx(
            "flex  items-center gap-1 px-4 py-2 nth-[2]:border-x transition-all duration-300 border-black",
            {
              "bg-black text-white": pathname === tab.href,
              "w-full py-3 justify-center": variant === "mobile",
            }
          )}
        >
          <Icon
            name={
              `${tab.icon}${pathname === tab.href ? "White" : "Black"}` as IconName
            }
          />
          <p className="menuItem">{tab.name}</p>
        </Link>
      ))}
    </div>
  );
}
