"use client";

import { useState } from "react";

import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import styles from "./pending.module.css";

const pendingWorkers = Array.from({ length: 10 }).map((_, idx) => ({
  id: `WRK-${2000 + idx}`,
  name: ["David Okoro", "Janet Ayo", "Michael Bello"][idx % 3],
  service: ["Plumbing", "Electrical", "Cleaning"][idx % 3],
  rating: (4.2 + (idx % 4) * 0.2).toFixed(1),
  status: "Pending",
}));

export default function PendingWorkersPage() {
  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div>
          <div className={pageStyles.pageTitle}>Pending Approval</div>
          <div className={pageStyles.pageSubtitle}>Review and approve worker requests</div>
        </div>

        <div className={styles.headerActions}>
          <Link className={pageStyles.mutedButton} href="/workers">
            Back to Workers
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
              {pendingWorkers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.name}</td>
                  <td>{worker.service}</td>
                  <td>{worker.rating}</td>
                  <td>
                    <span
                      className={`${pageStyles.statusPill} ${pageStyles.statusPillPending}`}
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
