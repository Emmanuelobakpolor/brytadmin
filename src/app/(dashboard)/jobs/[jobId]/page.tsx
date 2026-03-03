"use client";

import { use, useState } from "react";
import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import styles from "./jobDetails.module.css";

type JobStatus = "Open" | "In Progress" | "Completed" | "Canceled";

const STATUS_PILL_CLASS: Record<JobStatus, string> = {
  "Open":        styles.statusPill,
  "In Progress": `${styles.statusPill} ${styles.statusPillInProgress}`,
  "Completed":   `${styles.statusPill} ${styles.statusPillCompleted}`,
  "Canceled":    `${styles.statusPill} ${styles.statusPillCanceled}`,
};

// Mock job — in production this would be fetched by ID
const job = {
  title:    "Electrical Wiring Installation",
  category: "Electrical",
  client:   "Mr. Okafor",
  amount:   "₦25,000.00",
  location: "Lekki",
  date:     "2026-02-09",
  status:   "Open" as JobStatus,
};

export default function JobDetailsPage({
  params,
}: Readonly<{ params: Promise<{ jobId: string }> }>) {
  use(params); // resolve params (jobId available if needed)
  const [status, setStatus] = useState<JobStatus>(job.status);

  function handleCancel() {
    setStatus("Canceled");
  }

  return (
    <div className={pageStyles.page}>
      <div className={styles.overlay}>
        <div className={styles.card}>

          {/* Header: job title + close */}
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>{job.title}</div>
            <Link className={styles.closeBtn} href="/jobs">×</Link>
          </div>

          {/* Detail rows */}
          <div className={styles.cardBody}>
            <div className={styles.sectionLabel}>Job Details</div>
            <div className={styles.detailList}>
              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Category</div>
                <div className={styles.detailValue}>{job.category}</div>
              </div>
              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Client</div>
                <div className={styles.detailValue}>{job.client}</div>
              </div>
              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Amount</div>
                <div className={styles.detailValue}>{job.amount}</div>
              </div>
              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Location</div>
                <div className={styles.detailValue}>{job.location}</div>
              </div>
              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Date</div>
                <div className={styles.detailValue}>{job.date}</div>
              </div>
              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Status</div>
                <div className={styles.detailValue}>
                  <span className={STATUS_PILL_CLASS[status]}>{status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.cardFooter}>
            {status !== "Canceled" ? (
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleCancel}
              >
                Cancel Job
              </button>
            ) : (
              <Link className={pageStyles.mutedButton} href="/jobs" style={{ width: "100%", justifyContent: "center" }}>
                Back to Jobs
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
