"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Icon } from "./icons";
import { cx } from "cva";

interface SearchProps {
  onSearch: (value: string) => void;
  initialValue?: string;
  isSearchOpen?: boolean;
  setIsSearchOpen?: (value: boolean) => void;
}

export default function Search({
  onSearch,
  initialValue = "",
  isSearchOpen,
  setIsSearchOpen,
}: SearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const search = urlParams.get("search") || "";
      setSearchQuery(search);
    }
  }, []);

  useEffect(() => {
    if (initialValue !== searchQuery) {
      setSearchQuery(initialValue);
    }
  }, [initialValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    onSearch(value);

    if (isMounted && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  return (
    <>
      <div className="relative border border-black w-full rounded-full overflow-hidden px-4 hidden lg:block">
        <Icon
          name="searchBlack"
          className="size-4 absolute left-4 top-1/2 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full py-2 label-sm  outline-none pl-6"
        />
      </div>
      <div className=" w-12 h-12 lg:hidden">
        {!isSearchOpen && (
          <button
            className="h-full w-12 bg-black rounded-full z-30 relative flex items-center justify-center"
            onClick={() => setIsSearchOpen?.(true)}
          >
            <Icon name="searchWhite" className="shrink-0" />
          </button>
        )}
        <div
          className={cx(
            "absolute right-4 top-0 w-12 h-full transition-all p-0 rounded-full bg-black duration-300 flex items-center justify-start",
            {
              "w-[calc(100vw-32px)] px-4 py-3": isSearchOpen,
            }
          )}
        >
          <Icon
            name="searchWhite"
            className="size-4 absolute left-4 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className={cx(
              "text-white  pl-6 outline-none border-none w-full transition-all duration-300",
              {
                "opacity-0": !isSearchOpen,
              }
            )}
          />
          <button
            className={cx("transition-all duration-300", {
              "opacity-0": !isSearchOpen,
            })}
            onClick={() => {
              setSearchQuery("");

              onSearch("");

              if (typeof window !== "undefined") {
                const params = new URLSearchParams(window.location.search);
                params.delete("search");
                const newUrl = `${window.location.pathname}?${params.toString()}`;
                window.history.pushState({ path: newUrl }, "", newUrl);
              }

              setIsSearchOpen?.(false);
            }}
          >
            <Icon name="closeWhite" />
          </button>
        </div>
      </div>
    </>
  );
}
