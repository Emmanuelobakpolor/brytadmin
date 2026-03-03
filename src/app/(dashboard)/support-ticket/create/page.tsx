"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import styles from "./createTicket.module.css";

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

export default function CreateTicketPage() {
  const router = useRouter();
  const [disputeType, setDisputeType] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit() {
    if (!disputeType || !description.trim()) return;
    router.push("/support-ticket");
  }

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div className={pageStyles.pageTitle}>Support Ticket</div>
      </header>

      <section className={pageStyles.panel}>

        {/* Sub-header */}
        <div className={styles.subHeader}>
          <Link href="/support-ticket" className={styles.backLink}>
            <ArrowLeft />
            Support Ticket
          </Link>
          <span className={styles.pendingBadge}>Pending</span>
        </div>

        {/* Form */}
        <div className={styles.formWrap}>
          <div className={styles.formTitle}>Create Ticket</div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Dispute Type<span className={styles.required}>*</span>
            </label>
            <select
              className={styles.formSelect}
              value={disputeType}
              onChange={(e) => setDisputeType(e.target.value)}
            >
              <option value="" disabled>Select Department</option>
              <option value="Lost Items">Lost Items</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Service Quality">Service Quality</option>
              <option value="Worker Conduct">Worker Conduct</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Description<span className={styles.required}>*</span>
            </label>
            <textarea
              className={styles.formTextarea}
              placeholder="Describe your dispute..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.attachLabel}>Attach File (Optional)</div>
            <div className={styles.attachBox}>
              <UploadIcon />
              Click to upload an image
            </div>
          </div>

          <button type="button" className={styles.submitBtn} onClick={handleSubmit}>
            Create Ticket
          </button>
        </div>

      </section>
    </div>
  );
}
