import { cva, type VariantProps } from "cva";
import { forwardRef } from "react";
import { Icon } from "./icons";

const buttonVariants = cva(
  "flex items-center gap-2 font-medium menuItem font-instrument-sans cursor-pointer outline-none border border-black justify-center rounded-full",
  {
    variants: {
      variant: {
        primary: "bg-black text-white",
        secondary: "bg-transparent text-black ",
      },
      fullWidth: {
        true: "w-full",
      },
      size: {
        small: "px-2.25 py-1.25 text-[11px] h-fit",
        medium: "px-4 py-2.75 ",
        large: "px-6 py-3.75  ",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    linkIcon?: boolean;
    arrow?: "black" | "white" | null;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      fullWidth,
      size,
      children,
      arrow = null,
      linkIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, fullWidth, size, className })}
        {...props}
      >
        {children}
        {linkIcon && <Icon name="linkWhite" className="size-4" />}
        {arrow && (
          <Icon
            name={arrow === "black" ? "arrowBlack" : "arrowWhite"}
            className="size-4"
          />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
