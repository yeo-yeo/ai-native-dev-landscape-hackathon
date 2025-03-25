import { cx } from "cva";

export default function ToolStatus({ date }: { date: string }) {
  const status =
    new Date(date) > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      ? "New"
      : "Updated";

  return (
    <div
      className={cx(
        "uppercase text-[10px] w-fit font-dm-mono font-medium leading-[130%] text-[#F4EEE2] py-1 px-2.5 rounded-2xl",
        {
          "bg-[#F45757]": status === "New",
          "bg-[#1C9524]": status === "Updated",
        }
      )}
    >
      {status}
    </div>
  );
}
