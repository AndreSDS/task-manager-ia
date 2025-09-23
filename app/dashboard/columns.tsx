import { type ColumnDef } from "@tanstack/react-table";

export type DashboardItem = {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
};

export const dashboardColumns: ColumnDef<DashboardItem>[] = [
  {
    accessorKey: "header",
    header: "Header",
    cell: ({ row }) => <div className="capitalize">{row.getValue("header")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "target",
    header: "Target",
    cell: ({ row }) => <div>{row.getValue("target")}</div>,
  },
  {
    accessorKey: "limit",
    header: "Limit",
    cell: ({ row }) => <div>{row.getValue("limit")}</div>,
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => <div className="capitalize">{row.getValue("reviewer")}</div>,
  },
];
