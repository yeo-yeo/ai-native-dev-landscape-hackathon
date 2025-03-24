import * as React from "react";

import { cx } from "cva";
import { TableTooltip } from "./tabel-tooltip";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full max-w-[1240px] overflow-auto border border-[#C9C3B9] rounded-lg">
    <table
      ref={ref}
      className={cx("w-full body-sm caption-bottom", className)}
      {...props}
      style={{ tableLayout: "fixed" }}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cx("[&_tr]:border-b border-b-[#C9C3B9]", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cx("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

// const TableFooter = React.forwardRef<
//   HTMLTableSectionElement,
//   React.HTMLAttributes<HTMLTableSectionElement>
// >(({ className, ...props }, ref) => (
//   <tfoot
//     ref={ref}
//     className={cx(
//       "border-t bg-gray-200 font-medium [&>tr]:last:border-b-0",
//       className
//     )}
//     {...props}
//   />
// ));
// TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cx(
      "border-b border-b-[#C9C3B9] cursor-pointer transition-colors hover:bg-[#E5DDC7] ",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cx("p-4 body-sm ", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cx(
      "p-3 text-left align-middle text-black/50 body-sm",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <TableTooltip text={props.children}>
    <td
      ref={ref}
      className={cx("px-3 py-4 body-sm align-top relative", className)}
      {...props}
    >
      <span className="line-clamp-2">{props.children}</span>
    </td>
  </TableTooltip>
));
TableCell.displayName = "TableCell";

export {
  Table,
  TableHeader,
  TableBody,
  //   TableFooter,
  TableCaption,
  TableHead,
  TableRow,
  TableCell,
};
