"use client";
import React, { useState } from "react";
import Logo from "./logo";
import { navLinks } from "../../../constant/moc-data";
import Link from "next/link";
import { cx } from "cva";
import { VisuallyHidden } from "radix-ui";
import * as Dialog from "@radix-ui/react-dialog";
import { RemoveScroll } from "react-remove-scroll";

export default function Header() {
  const [openHamburger, setOpenHamburger] = useState(false);
  return (
    <header className=" items-center justify-between lg:p-0 lg:pt-9 p-4  body-sm max-w-[var(--max-width)] lg:px-12 mx-auto flex">
      <Logo />
      <div className="items-center justify-end gap-4 hidden lg:flex">
        <ul className="menuItem flex items-center justify-center gap-4">
          {navLinks.map((link) => (
            <li key={link.id} className="hover:underline">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <Dialog.Root onOpenChange={setOpenHamburger} open={openHamburger}>
        <Dialog.Trigger aria-label="Menu">
          <div
            className="h-7 w-7 lg:hidden relative p-2"
            onClick={() => setOpenHamburger(!openHamburger)}
          >
            <span
              className={cx(
                "w-5 h-0.5 bg-black transition-all duration-300 absolute top-2 left-1/2 -translate-x-1/2",
                openHamburger ? "rotate-45 translate-y-1.25" : ""
              )}
            />
            <span
              className={cx(
                "w-5 h-0.5 bg-black transition-all duration-300 absolute bottom-2 left-1/2 -translate-x-1/2",
                openHamburger ? "-rotate-45 -translate-y-1.25" : ""
              )}
            />
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <RemoveScroll>
            <Dialog.Content
              className="absolute top-[77px] left-0 w-full h-[calc(100dvh-77px)] bg-background  z-[600] border-b border-[#C9C3B9] flex p-6 pt-12 overflow-hidden transition-all duration-500
              data-[state=open]:animate-header-slidein data-[state=closed]:animate-header-slideout"
            >
              <VisuallyHidden.Root>
                <Dialog.Title>Menu</Dialog.Title>
              </VisuallyHidden.Root>
              <ul className=" flex flex-col items-start justify-start gap-4 w-full">
                {navLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.id}
                    className="pb-4 border-b border-[#C9C3B9] text-3xl w-full font-instrument-serif font-normal leading-[150%] tracking-[0.6px]"
                    onClick={() => setOpenHamburger(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </ul>
            </Dialog.Content>
          </RemoveScroll>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
