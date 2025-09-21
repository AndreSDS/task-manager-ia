import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password_hash: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  is_active: z.number(),
  last_login: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => (row.original.is_active ? "Yes" : "No"),
  }
];
