import React from "react";
import { footerSocialLinks } from "@/constant/moc-data";
import { Icon, IconName } from "@/components/shared/icons";
import Link from "next/link";
import Cards from "./cards";

export default function Footer() {
  return (
    <section className="relative w-full bg-black text-white">
      <div className="max-w-[1240px] mx-auto flex items-center flex-col lg:flex-row justify-between p-4 lg:px-0 lg:items-start gap-4 py-10">
        <Cards
          title="Don’t miss out"
          caption="THE DROP"
          description="Sign up to be notified when we post."
          label="Subscribe"
          variant="newsletter"
        />
        <Cards
          title="Join the Discord"
          caption="Discord"
          description="Join the Discord to get the latest news and updates."
          label="Join"
          variant="discord"
        />
      </div>
      <div className="relative h-full w-full">
        <img
          src="/footer-bg.png"
          alt="footer-bg"
          className="object-cover object-center absolute top-0 left-0 w-full h-full "
        />
        <div className="max-w-[1240px] w-full mx-auto px-6 lg:px-12 flex gap-10 lg:gap-20 flex-col items-start relative py-10 lg:py-16 z-10">
          <div className="flex items-center justify-between gap-4">
            {footerSocialLinks.map((item) => (
              <Link href={item.href} key={item.id}>
                <Icon className="size-6" name={item.icon as IconName} />
              </Link>
            ))}
          </div>
          <div className="uppercase bodys">© 2025 AI Native Development</div>
        </div>
      </div>
    </section>
  );
}
