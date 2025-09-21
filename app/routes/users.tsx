import { DataTable } from "~/components/data-table";
import { userColumns, type User } from "~/features/users/user-table-columns";
import { turso } from "~/services/turso";
import type { Route } from "./+types/users";

export async function loader() {
  const response = await turso.execute("SELECT * FROM USERS");

  const users: User[] = response.rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    password_hash: row.password_hash,
    created_at: row.created_at,
    updated_at: row.updated_at,
    is_active: row.is_active,
    last_login: row.last_login,
  }));

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
