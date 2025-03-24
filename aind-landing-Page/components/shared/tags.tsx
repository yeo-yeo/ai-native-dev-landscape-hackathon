import { cx } from "cva";

export default function Tags({
  name,
  color,
  active,
  onClick,
}: {
  name: string;
  color?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "flex gap-1 label-sm cursor-pointer hover:bg-black hover:text-white transition-all duration-300 ease-in-out items-center justify-center py-1.75 px-4 rounded-full border border-black",
        {
          "bg-black text-white": active,
          "bg-transparent text-black ": !active,
        }
      )}
    >
      {color && (
        <span
          className="shrink-0 rounded-full size-3"
          style={{ backgroundColor: color ? color : "grey" }}
        />
      )}
      {name}
    </button>
  );
}
