import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export function TableTooltip({
  children,
  text,
}: {
  children: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          {text && (
            <TooltipPrimitive.Content
              sideOffset={8}
              align="start"
              className="select-none bg-[#E5DDC7] border label border-black/30 max-w-[400px] p-3 rounded-lg text-black shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] "
            >
              {text}
            </TooltipPrimitive.Content>
          )}
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
