"use client";

import { useState, use } from "react";
import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import styles from "./withdrawalDetails.module.css";

const withdrawal = {
  id: "WDR-5001",
  worker: "David Okoro",
  amount: "₦15,000.00",
  initialStatus: "Pending" as "Pending" | "Paid" | "Rejected",
  requested: "Feb 6, 2026",
  bankName: "United Bank of Africa",
  accountNumber: "2288610028",
  accountName: "David Okoro",
};

export default function WithdrawalDetailsPage({
  params,
}: Readonly<{ params: Promise<{ withdrawalId: string }> }>) {
  const resolvedParams = use(params);
  const [status, setStatus] = useState<"Pending" | "Paid" | "Rejected">(
    withdrawal.initialStatus
  );

  const statusClass =
    status === "Paid"
      ? styles.statusPaid
      : status === "Rejected"
      ? styles.statusRejected
      : styles.statusPending;

  return (
    <div className={pageStyles.page}>
      <div className={styles.overlay}>
        <div className={styles.card}>

          {/* Header */}
          <div className={styles.cardHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.cardTitle}>Withdrawal Details</div>
              <span className={styles.idBadge}>{resolvedParams.withdrawalId}</span>
            </div>
            <Link className={styles.closeBtn} href="/withdrawals">×</Link>
          </div>

          {/* Hero: amount + status */}
          <div className={styles.hero}>
            <div className={styles.amountGroup}>
              <div className={styles.amountLabel}>Requested Amount</div>
              <div className={styles.amountValue}>{withdrawal.amount}</div>
              <div className={styles.amountMeta}>Requested {withdrawal.requested}</div>
            </div>
            <span className={`${styles.statusBadge} ${statusClass}`}>
              {status}
            </span>
          </div>

          {/* Body */}
          <div className={styles.cardBody}>

            {/* Worker */}
            <div>
              <div className={styles.sectionLabel}>Worker</div>
              <div className={styles.workerRow}>
                <div className={styles.workerAvatar}>
                  {withdrawal.worker.charAt(0)}
                </div>
                <div>
                  <div className={styles.workerName}>{withdrawal.worker}</div>
                  <div className={styles.workerSub}>Registered Worker</div>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div>
              <div className={styles.sectionLabel}>Bank Details</div>
              <div className={styles.bankCard}>
                <div className={styles.bankRow}>
                  <div className={styles.detailItem}>
                    <div className={styles.detailLabel}>Bank Name</div>
                    <div className={styles.detailValue}>{withdrawal.bankName}</div>
                  </div>
                  <div className={styles.detailItem}>
                    <div className={styles.detailLabel}>Account Number</div>
                    <div className={`${styles.detailValue} ${styles.mono}`}>
                      {withdrawal.accountNumber}
                    </div>
                  </div>
                </div>
                <div className={styles.bankRow}>
                  <div className={`${styles.detailItem} ${styles.detailItemFull}`}>
                    <div className={styles.detailLabel}>Account Name</div>
                    <div className={styles.detailValue}>{withdrawal.accountName}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className={styles.cardFooter}>
            {status === "Pending" ? (
              <>
                <button
                  className={styles.rejectBtn}
                  onClick={() => setStatus("Rejected")}
                  type="button"
                >
                  Reject
                </button>
                <button
                  className={styles.approveBtn}
                  onClick={() => setStatus("Paid")}
                  type="button"
                >
                  Approve Payment
                </button>
              </>
            ) : (
              <Link className={pageStyles.mutedButton} href="/withdrawals">
                Back to Withdrawals
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
