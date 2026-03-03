"use client";

import { use } from "react";
import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import styles from "./transactionDetails.module.css";

const transaction = {
  id: "BRYT 1323-4455",
  customer: "John Okonide",
  worker: "David Okoro",
  amount: "₦450,000.00",
  status: "Success",
  date: "Jan 25, 2026",
  paymentMethod: "UBA",
  serviceType: "Plumbing",
  location: "23, Wales Avenue, Rosebud Lagos",
};

export default function TransactionDetailsPage({
  params,
}: Readonly<{ params: Promise<{ transactionId: string }> }>) {
  const resolvedParams = use(params);

  const statusClass =
    transaction.status === "Success"
      ? styles.statusSuccess
      : transaction.status === "Failed"
      ? styles.statusFailed
      : styles.statusPending;

  return (
    <div className={pageStyles.page}>
      <div className={styles.overlay}>
        <div className={styles.card}>

          {/* Header */}
          <div className={styles.cardHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.cardTitle}>Transaction Details</div>
              <span className={styles.idBadge}>{resolvedParams.transactionId}</span>
            </div>
            <Link className={styles.closeBtn} href="/transactions">×</Link>
          </div>

          {/* Hero: amount + status */}
          <div className={styles.hero}>
            <div className={styles.amountGroup}>
              <div className={styles.amountLabel}>Amount</div>
              <div className={styles.amountValue}>{transaction.amount}</div>
            </div>
            <span className={`${styles.statusBadge} ${statusClass}`}>
              {transaction.status}
            </span>
          </div>

          {/* Details */}
          <div className={styles.cardBody}>
            <div className={styles.sectionLabel}>Transaction Info</div>
            <div className={styles.detailGrid}>

              <div className={styles.detailRow}>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Customer</div>
                  <div className={styles.detailValue}>{transaction.customer}</div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Worker</div>
                  <div className={styles.detailValue}>{transaction.worker}</div>
                </div>
              </div>

              <div className={styles.detailRow}>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Date</div>
                  <div className={styles.detailValue}>{transaction.date}</div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Payment Method</div>
                  <div className={styles.detailValue}>{transaction.paymentMethod}</div>
                </div>
              </div>

              <div className={styles.detailRow}>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Service Type</div>
                  <div className={styles.detailValue}>{transaction.serviceType}</div>
                </div>
                <div className={styles.detailItemFull}>
                  <div className={styles.detailLabel}>Location</div>
                  <div className={styles.detailValue}>{transaction.location}</div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className={styles.cardFooter}>
            <Link className={pageStyles.mutedButton} href="/transactions">
              Back to Transactions
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
