import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";

const users = Array.from({ length: 10 }).map((_, idx) => ({
  id: `USR-${1000 + idx}`,
  name: ["John Okonide", "Israel James", "Nathan Brooks"][idx % 3],
  email: `user${idx + 1}@example.com`,
  status: idx % 4 === 0 ? "Pending" : "Active",
  joined: "Feb 6, 2026",
}));

export default function UsersPage() {
  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div>
          <div className={pageStyles.pageTitle}>Users</div>
          <div className={pageStyles.pageSubtitle}>All registered users</div>
        </div>
      </header>

      <section className={pageStyles.panel}>
        <div className={pageStyles.tableWrap}>
          <table className={pageStyles.table}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joined</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`${pageStyles.statusPill} ${
                        user.status === "Active"
                          ? pageStyles.statusPillSuccess
                          : pageStyles.statusPillPending
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joined}</td>
                  <td>
                    <Link className={pageStyles.mutedButton} href={`/users/${user.id}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
