import prisma from "prisma/prisma";
import { DataTable } from "~/components/data-table";
import { userColumns } from "~/features/users/user-table-columns";
import type { Route } from "./+types/users";

export async function loader() {
  const users = await prisma.user.findMany();
  return {
    users,
  };
}

export default function ({ loaderData }: Route.ComponentProps) {
  const users = loaderData?.users || [];

  return (
    <div className="p-6">
      <DataTable data={users} columns={userColumns} />
    </div>
  );
}
