"use client";

import { useState } from "react";

import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import Modal from "@/components/admin/Modal";
import styles from "./accepted.module.css";

const acceptedWorkers = Array.from({ length: 8 }).map((_, idx) => ({
  id: `ACC-${8000 + idx}`,
  name: ["David Okoro", "Janet Ayo", "Michael Bello"][idx % 3],
  service: ["Plumbing", "Electrical", "Cleaning"][idx % 3],
  accepted: "Feb 6, 2026",
  email: `worker${idx}@example.com`,
  phone: `+234 80${12345678 + idx}`,
  gender: idx % 2 === 0 ? "Male" : "Female",
  location: "Lagos, Nigeria",
  idDocument: "Government ID",
  bankName: ["United Bank Of Africa", "Guaranty Trust Bank", "First Bank of Nigeria"][idx % 3],
  accountNumber: `22886110${28 + idx}`,
}));

export default function AcceptedWorkersPage() {
  const [selectedWorker, setSelectedWorker] = useState<typeof acceptedWorkers[0] | null>(null);
  const [action, setAction] = useState<"view" | null>(null);

  const handleViewDetails = (worker: typeof acceptedWorkers[0]) => {
    setSelectedWorker(worker);
    setAction("view");
  };

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div>
          <div className={pageStyles.pageTitle}>Accepted Workers</div>
          <div className={pageStyles.pageSubtitle}>View accepted worker requests</div>
        </div>

        <div className={styles.headerActions}>
          <Link className={pageStyles.mutedButton} href="/workers">
            Back to Workers
          </Link>
        </div>
      </header>

      <section className={pageStyles.panel}>
        <div className={styles.workersGrid}>
          {acceptedWorkers.map((worker) => (
            <div key={worker.id} className={styles.workerCard}>
              <div className={styles.cardHeader}>
                <div className={styles.workerInfo}>
                  <div className={styles.workerName}>{worker.name}</div>
                  <div className={styles.workerService}>{worker.service}</div>
                </div>
                <div className={styles.workerId}>{worker.id}</div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Email</div>
                    <div className={styles.infoValue}>{worker.email}</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Phone</div>
                    <div className={styles.infoValue}>{worker.phone}</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Gender</div>
                    <div className={styles.infoValue}>{worker.gender}</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Location</div>
                    <div className={styles.infoValue}>{worker.location}</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Bank</div>
                    <div className={styles.infoValue}>{worker.bankName}</div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Account Number</div>
                    <div className={styles.infoValue}>{worker.accountNumber}</div>
                  </div>
                </div>

                <div className={styles.documentSection}>
                  <div className={styles.sectionTitle}>Verification Document</div>
                  <div className={styles.documentPreview}>
                    <div className={styles.documentIcon}>📄</div>
                    <div className={styles.documentText}>{worker.idDocument} Verification</div>
                    <div className={styles.documentDate}>Approved: {worker.accepted}</div>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={styles.viewButton}
                    type="button"
                    onClick={() => handleViewDetails(worker)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {action && selectedWorker ? (
        <Modal
          title="Worker Details"
          onClose={() => setAction(null)}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalInfoGrid}>
              <div className={styles.modalInfoItem}>
                <div className={styles.modalInfoLabel}>Name</div>
                <div className={styles.modalInfoValue}>{selectedWorker.name}</div>
              </div>
              <div className={styles.modalInfoItem}>
                <div className={styles.modalInfoLabel}>Service</div>
                <div className={styles.modalInfoValue}>{selectedWorker.service}</div>
              </div>
              <div className={styles.modalInfoItem}>
                <div className={styles.modalInfoLabel}>Email</div>
                <div className={styles.modalInfoValue}>{selectedWorker.email}</div>
              </div>
              <div className={styles.modalInfoItem}>
                <div className={styles.modalInfoLabel}>Phone</div>
                <div className={styles.modalInfoValue}>{selectedWorker.phone}</div>
              </div>
              <div className={styles.modalInfoItem}>
                <div className={styles.modalInfoLabel}>Location</div>
                <div className={styles.modalInfoValue}>{selectedWorker.location}</div>
              </div>
              <div className={styles.modalInfoItem}>
                <div className={styles.modalInfoLabel}>Bank</div>
                <div className={styles.modalInfoValue}>{selectedWorker.bankName}</div>
              </div>
              <div className={styles.modalInfoItem}>
                <div className={styles.modalInfoLabel}>Account Number</div>
                <div className={styles.modalInfoValue}>{selectedWorker.accountNumber}</div>
              </div>
              <div className={styles.modalInfoItem}>
                <div className={styles.modalInfoLabel}>Accepted Date</div>
                <div className={styles.modalInfoValue}>{selectedWorker.accepted}</div>
              </div>
            </div>

            <div className={styles.documentPreviewModal}>
              <div className={styles.documentIconLarge}>📄</div>
              <div className={styles.documentTitle}>{selectedWorker.idDocument}</div>
              <div className={styles.documentDetails}>
                <div>Document Type: Government ID</div>
                <div>Approval Date: {selectedWorker.accepted}</div>
                <div>Status: Verified</div>
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              className={pageStyles.mutedButton}
              type="button"
              onClick={() => setAction(null)}
            >
              Close
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

