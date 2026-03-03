"use client";

import { useState, use } from "react";

import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import Modal from "@/components/admin/Modal";
import styles from "./workerDetails.module.css";

type DeleteStep = "confirm" | "reason" | "success" | null;

const worker = {
  name: "John Olamideh Oboyibo",
  location: "Lagos, Nigeria",
  workerId: "BRYT18194",
  email: "johnolamide@gmail.com",
  phone: "+234 8082428134",
  gender: "Male",
  serviceType: "Electrician",
  workerIdFull: "BRYT123134",
  bankName: "United Bank Of Africa",
  accountName: "John Olamide",
  accountNumber: "2288610028",
  status: "Verified",
  referralPoints: "2,380",
};

const pendingWorker = {
  fullName: "JOHN OLAMIDE",
  email: "gabrielmike@bryt",
  phone: "08189972990",
  address: "47, Harmony Avenue Ketu Alapere Lagos",
  skill: "Electrician",
  experience: "2 year+",
  bankName: "Opay",
  accountNumber: "8189972990",
  accountName: "John Olamide",
};

const transactions = [
  { id: "BRYT 1323-3322", type: "Electrical", date: "Jan 23, 2026", amount: "₦625,000.00", status: "Success" },
  { id: "BRYT 1323-3322", type: "Electrical", date: "Jan 23, 2026", amount: "₦625,000.00", status: "Pending" },
  { id: "BRYT 1323-3322", type: "Electrical", date: "Jan 23, 2026", amount: "₦625,000.00", status: "Success" },
  { id: "BRYT 1323-3322", type: "Electrical", date: "Jan 23, 2026", amount: "₦625,000.00", status: "Failed" },
  { id: "BRYT 1323-3322", type: "Electrical", date: "Jan 23, 2026", amount: "₦625,000.00", status: "Success" },
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

export default function WorkerDetailsPage({
  params,
}: Readonly<{ params: Promise<{ workerId: string }> }>) {
  const resolvedParams = use(params);

  // Determine initial worker status based on workerId (WRK-XXXX are pending, ACC-XXXX are accepted/verified)
  const initialWorkerId = resolvedParams.workerId;
  const [isPending, setIsPending] = useState(initialWorkerId.startsWith("WRK-"));
  const [isAccepted, setIsAccepted] = useState(initialWorkerId.startsWith("ACC-"));
  const [isDeclined, setIsDeclined] = useState(false); // For demo purposes, we'll keep this false
  const [savedDeclineReason, setSavedDeclineReason] = useState(""); // For demo purposes

  // Accept flow
  const [showAcceptConfirm, setShowAcceptConfirm] = useState(false);
  const [showAcceptSuccess, setShowAcceptSuccess] = useState(false);

  // Decline flow
  const [showDeclineInput, setShowDeclineInput] = useState(false);
  const [showDeclineSuccess, setShowDeclineSuccess] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  // Verified worker delete flow
  const [deleteStep, setDeleteStep] = useState<DeleteStep>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [copiedId, setCopiedId] = useState(false);
  const [txSearch, setTxSearch] = useState("");

  const isVerified = !isPending && isAccepted;

  // Accept handlers
  const handleConfirmAccept = () => {
    setShowAcceptConfirm(false);
    setShowAcceptSuccess(true);
    // We'll update the status after the success modal is closed
  };

  // Decline handlers
  const handleSubmitDecline = () => {
    if (!declineReason.trim()) return;
    setSavedDeclineReason(declineReason.trim());
    setShowDeclineInput(false);
    setShowDeclineSuccess(true);
  };

  const handleDeclineSuccessDone = () => {
    setShowDeclineSuccess(false);
    setIsDeclined(true);
    setIsPending(false);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText("KD3940");
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // ── Verified worker view ──────────────────────────────────────────────────
  if (isVerified) {
    return (
      <div className={pageStyles.page}>
        <div className={styles.topBar}>
          <div className={styles.breadcrumb}>
            <Link href="/workers" className={styles.backLink}>←</Link>
            <span className={styles.breadcrumbText}>Worker Details</span>
          </div>
          <span className={styles.activeBadge}>
            <span className={styles.activeDot} />
            Active
          </span>
        </div>

        <div className={styles.workerHeaderSection}>
          <div className={styles.workerInfoBlock}>
            <h1 className={styles.workerName}>{worker.name}</h1>
            <p className={styles.workerMeta}>
              <span>📍</span>
              {worker.location}
              <span className={styles.metaDivider}>•</span>
              Worker ID <span className={styles.workerIdInline}>{worker.workerId}</span>
            </p>
            <div className={styles.headerActions}>
              <button
                className={styles.blockBtn}
                type="button"
                onClick={() => setDeleteStep("confirm")}
              >
                Block Worker
              </button>
              <button className={styles.suspendBtn} type="button">
                Suspend Worker
              </button>
            </div>
          </div>

          <div className={styles.referralCard}>
            <div className={styles.referralLabel}>REFERRAL POINTS</div>
            <div className={styles.referralClaimed}>
              Claimed: <strong>{worker.referralPoints}</strong>
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
              <div className={styles.fieldValue}>{worker.email}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Phone Number</div>
              <div className={styles.fieldValue}>{worker.phone}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Gender</div>
              <div className={styles.fieldValue}>{worker.gender}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Identification</div>
              <div className={styles.fieldValue}>
                <a href="#" className={styles.viewDocLink}>View Document ↗</a>
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Service Type</div>
              <div className={styles.fieldValue}>{worker.serviceType}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Worker ID</div>
              <div className={styles.fieldValue}>{worker.workerIdFull}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Bank Name</div>
              <div className={styles.fieldValue}>{worker.bankName}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Account Name</div>
              <div className={styles.fieldValue}>{worker.accountName}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Account Number</div>
              <div className={styles.fieldValue}>{worker.accountNumber}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Status</div>
              <div className={`${styles.fieldValue} ${styles.verifiedStatus}`}>
                {worker.status}
              </div>
            </div>
          </div>
          <div className={styles.photoPlaceholder} />
        </div>

        <div className={styles.ongoingCard}>
          <div className={styles.ongoingHeader}>
            <span className={styles.ongoingTitle}>Ongoing Work</span>
            <div className={styles.ongoingHeaderRight}>
              <span className={styles.currentLocation}>
                <span>📍</span>
                Current Location: 23, Wales Avenue, Rosebud Lagos
              </span>
              <a href="#" className={styles.userDetailsLink}>User Details ↗</a>
            </div>
          </div>
          <div className={styles.ongoingFields}>
            <div className={styles.ongoingField}>
              <span className={styles.ongoingFieldIcon}>📍</span>
              <span className={styles.ongoingFieldLabel}>Request Location:</span>
              <span className={styles.ongoingFieldValue}>23, Wales Avenue, Rosebud, Lagos</span>
            </div>
            <div className={styles.ongoingField}>
              <span className={styles.ongoingFieldIcon}>💳</span>
              <span className={styles.ongoingFieldLabel}>Payment Method</span>
              <span className={styles.ongoingFieldValue}>UBA</span>
            </div>
            <div className={styles.ongoingField}>
              <span className={styles.ongoingFieldIcon}>🔧</span>
              <span className={styles.ongoingFieldLabel}>Skill Category</span>
              <span className={styles.ongoingFieldValue}>Electrician</span>
            </div>
            <div className={styles.ongoingField}>
              <span className={styles.ongoingFieldIcon}>🪪</span>
              <span className={styles.ongoingFieldLabel}>Worker ID:</span>
              <span className={styles.ongoingFieldValue}>
                KD3940{" "}
                <button className={styles.copyBtn} type="button" onClick={handleCopyId}>
                  {copiedId ? "✓" : "⧉"}
                </button>
              </span>
            </div>
          </div>
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
                      <button className={styles.txActionBtn} type="button">⋮</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {deleteStep === "confirm" && (
          <Modal title="Delete Worker Account?" onClose={() => setDeleteStep(null)}>
            <div className={styles.modalBody}>
              <p className={styles.modalDesc}>
                Deleting this account will revoke Worker access to his/her account
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
          <Modal title="Delete worker account" onClose={() => setDeleteStep(null)}>
            <div className={styles.modalBody}>
              <div className={styles.reasonField}>
                <label className={styles.reasonLabel}>Reasons for deleting account</label>
                <textarea
                  className={styles.reasonTextarea}
                  placeholder="e.g Worker requested for account to be deleted for some specific reasons"
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
                An email has been sent to the worker to review his/her deletion request one more time
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

  // ── Pending / Declined worker view ───────────────────────────────────────
  return (
    <div className={pageStyles.page}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.breadcrumb}>
          <Link href="/workers" className={styles.backLink}>←</Link>
          <span className={styles.breadcrumbText}>Worker Details</span>
        </div>
        {isPending && (
          <span className={styles.pendingBadge}>
            <span className={styles.pendingDot} />
            Pending
          </span>
        )}
        {isDeclined && (
          <span className={styles.declinedBadge}>
            <span className={styles.declinedDot} />
            Declined
          </span>
        )}
      </div>

      {/* Decline reason banner – shown after decline is confirmed */}
      {isDeclined && savedDeclineReason && (
        <div className={styles.declineBanner}>
          <div className={styles.declineBannerIcon}>⚠</div>
          <div>
            <div className={styles.declineBannerTitle}>Reason for declining this worker</div>
            <div className={styles.declineBannerText}>{savedDeclineReason}</div>
          </div>
        </div>
      )}

      {/* Personal Details card */}
      <div className={styles.pendingSection}>
        <div className={styles.pendingSectionTitle}>Personal Details</div>
        <div className={styles.pendingCard}>
          <div className={styles.pendingFieldsGrid}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Full Name:</div>
              <div className={styles.fieldValue}>{pendingWorker.fullName}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Email:</div>
              <div className={styles.fieldValue}>{pendingWorker.email}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Phone Number:</div>
              <div className={styles.fieldValue}>{pendingWorker.phone}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Address:</div>
              <div className={styles.fieldValue}>{pendingWorker.address}</div>
            </div>
          </div>
          <div className={styles.workerPhoto}>
            <div className={styles.workerPhotoInner} />
          </div>
        </div>
      </div>

      {/* Skill & Bank Details card */}
      <div className={styles.pendingSection}>
        <div className={styles.pendingSectionTitle}>Skill & Bank Details</div>
        <div className={styles.pendingCard}>
          <div className={styles.pendingFieldsGrid}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Selected Skill:</div>
              <div className={styles.fieldValue}>{pendingWorker.skill}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Year of Experience:</div>
              <div className={styles.fieldValue}>{pendingWorker.experience}</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Bank Info:</div>
              <div className={styles.fieldValue}>
                <div>Bank Name: {pendingWorker.bankName}</div>
                <div>Account Number: {pendingWorker.accountNumber}</div>
                <div>Account Name: {pendingWorker.accountName}</div>
              </div>
            </div>
          </div>
          <div className={styles.docPreview}>
            <div className={styles.docPreviewInner}>
              <div className={styles.docIcon}>📄</div>
              <div className={styles.docLabel}>Certificate of Incorporation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons – only when pending */}
      {isPending && (
        <div className={styles.pendingActions}>
          <button
            className={styles.declinePendingBtn}
            type="button"
            onClick={() => setShowDeclineInput(true)}
          >
            Decline Vendor
          </button>
          <button
            className={styles.acceptPendingBtn}
            type="button"
            onClick={() => setShowAcceptConfirm(true)}
          >
            Accept Vendor
          </button>
        </div>
      )}

      {/* ── Accept confirm modal ── */}
      {showAcceptConfirm && (
        <Modal title="Accept Worker?" onClose={() => setShowAcceptConfirm(false)}>
          <div className={styles.modalBody}>
            <p className={styles.modalDesc}>
              Accepting this worker simply means you&apos;ve validated his/her credentials
            </p>
            <div className={styles.modalBtns}>
              <button className={styles.cancelBtn} type="button" onClick={() => setShowAcceptConfirm(false)}>
                No, Cancel
              </button>
              <button className={styles.acceptConfirmBtn} type="button" onClick={handleConfirmAccept}>
                Yes, Accept
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Accept success modal ── */}
      {showAcceptSuccess && (
        <Modal title="" onClose={() => {
          setShowAcceptSuccess(false);
          setIsAccepted(true);
          setIsPending(false);
        }}>
          <div className={styles.successBody}>
            <div className={styles.successIconWrap}><CheckIcon /></div>
            <h3 className={styles.successTitle}>Worker accepted</h3>
            <p className={styles.successDesc}>
              Accepted worker status would be changed from pending to active
            </p>
            <button className={styles.successBtn} type="button" onClick={() => {
              setShowAcceptSuccess(false);
              setIsAccepted(true);
              setIsPending(false);
            }}>
              Got it
            </button>
          </div>
        </Modal>
      )}

      {/* ── Decline input modal ── */}
      {showDeclineInput && (
        <Modal title="Decline Worker" onClose={() => setShowDeclineInput(false)}>
          <div className={styles.modalBody}>
            <div className={styles.reasonField}>
              <label className={styles.reasonLabel}>Reasons for declining</label>
              <textarea
                className={styles.reasonTextarea}
                placeholder="e.g credentials do not tally with personal details"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                rows={4}
              />
            </div>
            <button
              className={styles.deleteAccountBtn}
              type="button"
              onClick={handleSubmitDecline}
              disabled={!declineReason.trim()}
            >
              Decline Worker
            </button>
          </div>
        </Modal>
      )}

      {/* ── Decline success modal ── */}
      {showDeclineSuccess && (
        <Modal title="" onClose={handleDeclineSuccessDone}>
          <div className={styles.successBody}>
            <div className={styles.successIconWrap}><CheckIcon /></div>
            <h3 className={styles.successTitle}>Worker declined</h3>
            <p className={styles.successDesc}>
              Reasons for declining worker will be made known to the worker
            </p>
            <button className={styles.successBtn} type="button" onClick={handleDeclineSuccessDone}>
              Got it
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
