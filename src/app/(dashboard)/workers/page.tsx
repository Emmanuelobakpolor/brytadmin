import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import styles from "./workers.module.css";

const workers = Array.from({ length: 10 }).map((_, idx) => ({
  id: idx % 5 === 0 ? `WRK-${2000 + idx}` : `ACC-${8000 + idx}`,
  name: ["David Okoro", "Janet Ayo", "Michael Bello"][idx % 3],
  service: ["Plumbing", "Electrical", "Cleaning"][idx % 3],
  rating: (4.2 + (idx % 4) * 0.2).toFixed(1),
  status: idx % 5 === 0 ? "Pending" : "Verified",
}));

export default function WorkersPage() {
  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div>
          <div className={pageStyles.pageTitle}>Workers</div>
          <div className={pageStyles.pageSubtitle}>Workers and pending requests</div>
        </div>

        <div className={styles.headerButtonRow}>
          <Link className={pageStyles.mutedButton} href="/workers/pending">
            Pending Workers
          </Link>
          <Link className={pageStyles.mutedButton} href="/workers/accepted">
            Accepted Workers
          </Link>
          <Link className={pageStyles.primaryButton} href="/workers/new">
            Add New Worker
          </Link>
        </div>
      </header>

      <section className={pageStyles.panel}>
        <div className={pageStyles.tableWrap}>
          <table className={pageStyles.table}>
            <thead>
              <tr>
                <th>Worker ID</th>
                <th>Name</th>
                <th>Service</th>
                <th>Rating</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.name}</td>
                  <td>{worker.service}</td>
                  <td>{worker.rating}</td>
                  <td>
                    <span
                      className={`${pageStyles.statusPill} ${
                        worker.status === "Verified"
                          ? pageStyles.statusPillSuccess
                          : pageStyles.statusPillPending
                      }`}
                    >
                      {worker.status}
                    </span>
                  </td>
                  <td>
                    <Link className={pageStyles.mutedButton} href={`/workers/${worker.id}`}>
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
