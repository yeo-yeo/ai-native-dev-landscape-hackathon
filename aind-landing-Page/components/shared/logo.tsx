import { Tool } from "@/type/tools-type";
import React from "react";
import { Icon } from "./icons";
import Image from "next/image";
import { cx } from "cva";

export default function Logo({
  tool,
  size = "medium",
  className,
}: {
  tool: Tool;
  size?: "medium" | "large";
  className?: string;
}) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <>
      {tool.icon_url && !imageError ? (
        <img
          src={tool.icon_url}
          alt={tool.name}
          className={cx(" object-contain", className, {
            "w-16 h-16": size === "large",
            "w-12 h-12": size === "medium",
          })}
          onError={() => setImageError(true)}
        />
      ) : tool.oss ? (
        <Icon
          name="placeholder"
          className={cx({
            "size-16": size === "large",
            "size-12": size === "medium",
          })}
        />
      ) : (
        <Image
          src="/placeholder-logo.png"
          alt="placeholder"
          className={cx({
            "size-16": size === "large",
            "size-12": size === "medium",
          })}
          width={48}
          height={48}
        />
      )}
    </>
  );
}
