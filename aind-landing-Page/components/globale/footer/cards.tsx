"use client";

import { subscribeToNewsletter } from "@/app/action/newsletter";
import { Button } from "@/components/shared/button";
import { cx } from "cva";
import Link from "next/link";
import { useActionState, useRef } from "react";

export default function Cards({
  title,
  caption,
  description,
  label,
  variant,
}: {
  title: string;
  caption: string;
  description: string;
  label: string;
  variant: "discord" | "newsletter";
}) {
  const [state, action] = useActionState<
    {
      success: boolean;
      message: string;
    } | null,
    FormData
  >((_, formData) => subscribeToNewsletter(formData), null);
  const formRef = useRef<HTMLFormElement>(null);

  if (state?.success && formRef.current) {
    formRef.current.reset();
  }
  return (
    <div
      className={cx(
        "flex flex-col items-start gap-10 lg:gap-16 justify-between relative flex-1 py-6 lg:py-12 w-full lg:w-auto px-5 lg:px-10 rounded-[5px]",
        {
          "text-white": variant === "discord",
          "text-black min-h-[309.41px] ": variant === "newsletter",
        }
      )}
      style={{
        backgroundColor: variant === "discord" ? "#5865F2" : "#ED9079",
      }}
    >
      <img
        src="/footer-card-bg.png"
        alt="footer-card"
        className="object-cover object-center absolute top-0 left-0 w-full h-full"
      />
      {variant === "discord" && (
        <img
          src="/discord-logo.png"
          alt="discord-logo"
          className="absolute bottom-10 right-10 z-20 w-39 hidden lg:block"
        />
      )}
      <div className="flex flex-col items-start gap-4 justify-start z-20">
        <p className="uppercase body-sm lg:body-lg">{caption}</p>
        <h3 className="text-[32px] lg:text-[44px] leading-[25.2px] lg:leading-[39.6px] tracking-[-0.56px] lg:tracking-[-0.88px]">
          {title}
        </h3>
        <p className="body-sm lg:body">{description}</p>
      </div>
      {variant === "newsletter" ? (
        state?.success ? (
          <div className=" leading-[140%] font-dm-mono lg:max-w-2/3 text-xl">
            You&apos;re on the list! Thanks for signing up to our newsletter.
          </div>
        ) : (
          <form
            id="newsletter-subscribe"
            action={action}
            ref={formRef}
            className="flex flex-col relative lg:flex-row items-center justify-start w-full lg:w-auto gap-4 z-20"
          >
            <input
              type="email"
              name="email"
              required
              className="px-4 body-lg h-14 outline-none border border-black w-full lg:w-[270px] placeholder:text-black"
              placeholder="Your email address"
            />
            {state && !state.success && (
              <div className="lg:absolute top-[115%] left-0 text-sm text-red-600">
                {state.message}
              </div>
            )}
            <Button
              variant="primary"
              size="large"
              arrow="white"
              className="w-full lg:w-auto"
              type="submit"
            >
              {label}
            </Button>
          </form>
        )
      ) : (
        <Button
          variant="primary"
          size="large"
          arrow="white"
          className="w-full lg:w-auto z-20"
        >
          <Link href={"https://ainativedev.co/fyf"}>{label}</Link>
        </Button>
      )}
    </div>
  );
}
