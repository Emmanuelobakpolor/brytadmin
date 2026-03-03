"use client";

import { useState, use } from "react";

import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import Modal from "@/components/admin/Modal";
import styles from "./userDetails.module.css";

type DeleteStep = "confirm" | "reason" | "success" | null;

const user = {
  name: "John Okonide",
  location: "Lagos, Nigeria",
  userId: "USR-1001",
  email: "john.okonide@example.com",
  phone: "+234 8012345678",
  gender: "Male",
  status: "Active",
  referralPoints: "1,250",
};

const transactions = [
  { id: "BRYT 1323-4455", type: "Plumbing", date: "Jan 25, 2026", amount: "₦450,000.00", status: "Success" },
  { id: "BRYT 1323-4456", type: "Cleaning", date: "Jan 24, 2026", amount: "₦150,000.00", status: "Pending" },
  { id: "BRYT 1323-4457", type: "Electrical", date: "Jan 23, 2026", amount: "₦625,000.00", status: "Success" },
  { id: "BRYT 1323-4458", type: "Plumbing", date: "Jan 22, 2026", amount: "₦380,000.00", status: "Failed" },
  { id: "BRYT 1323-4459", type: "Cleaning", date: "Jan 21, 2026", amount: "₦120,000.00", status: "Success" },
];

function CheckIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <path
        d="M10 19.5L16 25.5L28 13"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function UserDetailsPage({
  params,
}: Readonly<{ params: Promise<{ userId: string }> }>) {
  const resolvedParams = use(params);

  // Delete flow
  const [deleteStep, setDeleteStep] = useState<DeleteStep>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [copiedId, setCopiedId] = useState(false);
  const [txSearch, setTxSearch] = useState("");

  const handleCopyId = () => {
    navigator.clipboard.writeText("USR-1001");
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className={pageStyles.page}>
      <div className={styles.topBar}>
        <div className={styles.breadcrumb}>
          <Link href="/users" className={styles.backLink}>←</Link>
          <span className={styles.breadcrumbText}>User Details</span>
        </div>
        <span className={styles.activeBadge}>
          <span className={styles.activeDot} />
          Active
        </span>
      </div>

      <div className={styles.userHeaderSection}>
        <div className={styles.userInfoBlock}>
          <h1 className={styles.userName}>{user.name}</h1>
          <p className={styles.userMeta}>
            <span>📍</span>
            {user.location}
            <span className={styles.metaDivider}>•</span>
            User ID <span className={styles.userIdInline}>{user.userId}</span>
          </p>
          <div className={styles.headerActions}>
            <button
              className={styles.blockBtn}
              type="button"
              onClick={() => setDeleteStep("confirm")}
            >
              Disable Account
            </button>
            <button className={styles.suspendBtn} type="button">
              Suspend User
            </button>
          </div>
        </div>

        <div className={styles.referralCard}>
          <div className={styles.referralLabel}>REFERRAL POINTS</div>
          <div className={styles.referralClaimed}>
            Claimed: <strong>{user.referralPoints}</strong>
          </div>
          <button className={styles.referralHistory} type="button">
            History →
          </button>
        </div>
      </div>

      <div className={styles.detailsCard}>
        <div className={styles.fieldsGrid}>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Email Address</div>
            <div className={styles.fieldValue}>{user.email}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Phone Number</div>
            <div className={styles.fieldValue}>{user.phone}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Gender</div>
            <div className={styles.fieldValue}>{user.gender}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Status</div>
            <div className={`${styles.fieldValue} ${styles.activeStatus}`}>
              {user.status}
            </div>
          </div>
        </div>
        <div className={styles.photoPlaceholder} />
      </div>

      <div className={styles.transactionsCard}>
        <div className={styles.transactionsHeader}>
          <span className={styles.transactionsTitle}>All Transactions</span>
          <div className={styles.transactionsControls}>
            <input
              className={styles.txSearch}
              type="text"
              placeholder="Search by Transaction ID"
              value={txSearch}
              onChange={(e) => setTxSearch(e.target.value)}
            />
            <select className={styles.txSelect}>
              <option>Sort by Types</option>
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Cleaning</option>
            </select>
            <select className={styles.txSelect}>
              <option>Status</option>
              <option>Success</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>
        <div className={pageStyles.tableWrap}>
          <table className={pageStyles.table}>
            <thead>
              <tr>
                <th>TRANSACTION ID</th>
                <th>WORK TYPE</th>
                <th>DATE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i}>
                  <td>{tx.id}</td>
                  <td>{tx.type}</td>
                  <td>{tx.date}</td>
                  <td>{tx.amount}</td>
                  <td>
                    <span
                      className={`${pageStyles.statusPill} ${
                        tx.status === "Success"
                          ? pageStyles.statusPillSuccess
                          : tx.status === "Pending"
                          ? pageStyles.statusPillPending
                          : pageStyles.statusPillDanger
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td>
                    <Link href={`/transactions/${tx.id}`} className={styles.txActionBtn}>
                      👁️
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteStep === "confirm" && (
        <Modal title="Delete User Account?" onClose={() => setDeleteStep(null)}>
          <div className={styles.modalBody}>
            <p className={styles.modalDesc}>
              Deleting this account will revoke user access to his/her account
            </p>
            <div className={styles.modalBtns}>
              <button className={styles.cancelBtn} type="button" onClick={() => setDeleteStep(null)}>
                No, Cancel
              </button>
              <button className={styles.deleteBtn} type="button" onClick={() => setDeleteStep("reason")}>
                Yes, Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {deleteStep === "reason" && (
        <Modal title="Delete user account" onClose={() => setDeleteStep(null)}>
          <div className={styles.modalBody}>
            <div className={styles.reasonField}>
              <label className={styles.reasonLabel}>Reasons for deleting account</label>
              <textarea
                className={styles.reasonTextarea}
                placeholder="e.g User requested for account to be deleted for some specific reasons"
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                rows={4}
              />
            </div>
            <button
              className={styles.deleteAccountBtn}
              type="button"
              onClick={() => setDeleteStep("success")}
            >
              Delete Account
            </button>
          </div>
        </Modal>
      )}

      {deleteStep === "success" && (
        <Modal title="" onClose={() => setDeleteStep(null)}>
          <div className={styles.successBody}>
            <div className={styles.successIconWrap}><CheckIcon /></div>
            <h3 className={styles.successTitle}>Account deleted</h3>
            <p className={styles.successDesc}>
              An email has been sent to the user to review his/her deletion request one more time
            </p>
            <button className={styles.successBtn} type="button" onClick={() => setDeleteStep(null)}>
              Get it
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
