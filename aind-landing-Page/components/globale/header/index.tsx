import React from "react";
import Logo from "./logo";
import { navLinks } from "../../../constant/moc-data";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" items-center justify-between lg:p-0 lg:pt-9 p-4  body-sm max-w-[var(--max-width)] lg:px-12 mx-auto flex">
      <Logo />
      <div className=" items-center justify-end gap-4 hidden lg:flex">
        <ul className="menuItem flex items-center justify-center gap-4">
          {navLinks.map((link) => (
            <li key={link.id} className="hover:underline">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
