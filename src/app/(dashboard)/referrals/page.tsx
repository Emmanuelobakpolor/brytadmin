"use client";

import { useState } from "react";

import pageStyles from "@/components/admin/AdminPage.module.css";
import Modal from "@/components/admin/Modal";
import styles from "./referrals.module.css";

const referrals = [
  {
    id: 1,
    referrer: "John Olamide",
    type: "Worker",
    referee: "Grace Jacob",
    code: "BRYT-2334",
    amount: "₦26,500,000",
    status: "Confirmed",
  },
  {
    id: 2,
    referrer: "John Olamide",
    type: "User",
    referee: "Micheal Peter",
    code: "BRYT-2334",
    amount: "₦26,500,000",
    status: "Pending",
  },
  {
    id: 3,
    referrer: "John Olamide",
    type: "Worker",
    referee: "Olamide John",
    code: "BRYT-2334",
    amount: "₦26,500,000",
    status: "Expired",
  },
  {
    id: 4,
    referrer: "John Olamide",
    type: "User",
    referee: "Grace Jacob",
    code: "BRYT-2334",
    amount: "₦26,500,000",
    status: "Pending",
  },
  {
    id: 5,
    referrer: "John Olamide",
    type: "User",
    referee: "Jacob Plus",
    code: "BRYT-2334",
    amount: "₦26,500,000",
    status: "Confirmed",
  },
];

export default function ReferralsPage() {
  const [selectedReferral, setSelectedReferral] = useState<typeof referrals[0] | null>(null);
  const [action, setAction] = useState<"credit" | "expire" | null>(null);

  const handleCredit = (referral: typeof referrals[0]) => {
    setSelectedReferral(referral);
    setAction("credit");
  };

  const handleExpire = (referral: typeof referrals[0]) => {
    setSelectedReferral(referral);
    setAction("expire");
  };

  const handleCloseModal = () => {
    setAction(null);
    setSelectedReferral(null);
  };

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div>
          <div className={pageStyles.pageTitle}>Referrals</div>
          <div className={pageStyles.pageSubtitle}>Referral codes and rewards</div>
        </div>
      </header>



      <section className={pageStyles.panel}>
        <div className={pageStyles.tableWrap}>
          <table className={pageStyles.table}>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" className={styles.checkbox} />
                </th>
                <th>Referrer</th>
                <th>Type</th>
                <th>Referee</th>
                <th>Code</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((ref) => (
                <tr key={ref.id}>
                  <td>
                    <input type="checkbox" className={styles.checkbox} />
                  </td>
                  <td className={styles.referrerCell}>
                    <div className={styles.referrerAvatar} />
                    <span>{ref.referrer}</span>
                  </td>
                  <td>{ref.type}</td>
                  <td>{ref.referee}</td>
                  <td>{ref.code}</td>
                  <td>{ref.amount}</td>
                  <td>
                    <span
                      className={`${pageStyles.statusPill} ${
                        ref.status === "Confirmed"
                          ? pageStyles.statusPillSuccess
                          : ref.status === "Pending"
                          ? pageStyles.statusPillPending
                          : pageStyles.statusPillDanger
                      }`}
                    >
                      {ref.status}
                    </span>
                  </td>
                  <td>
                    {ref.status === "Pending" && (
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.creditBtn}
                          type="button"
                          onClick={() => handleCredit(ref)}
                          title="Credit Reward"
                        >
                          ✔️
                        </button>
                        <button
                          className={styles.expireBtn}
                          type="button"
                          onClick={() => handleExpire(ref)}
                          title="Expire"
                        >
                          ❌
                        </button>
                      </div>
                    )}
                    {ref.status !== "Pending" && (
                      <span className={styles.noAction}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Credit reward modal */}
      {action === "credit" && selectedReferral && (
        <Modal
          title="Credit Referral Reward?"
          onClose={handleCloseModal}
        >
          <div className={styles.modalBody}>
            <p className={styles.modalDesc}>
              Are you sure you want to credit ₦1,500 to {selectedReferral.referrer} for referring {selectedReferral.referee}?
            </p>
            <div className={styles.modalBtns}>
              <button
                className={styles.cancelBtn}
                type="button"
                onClick={handleCloseModal}
              >
                No, Cancel
              </button>
              <button
                className={styles.creditModalBtn}
                type="button"
                onClick={handleCloseModal}
              >
                Yes, Credit Reward
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Expire referral modal */}
      {action === "expire" && selectedReferral && (
        <Modal
          title="Expire Referral?"
          onClose={handleCloseModal}
        >
          <div className={styles.modalBody}>
            <p className={styles.modalDesc}>
              Are you sure you want to mark this referral from {selectedReferral.referrer} as expired?
            </p>
            <div className={styles.modalBtns}>
              <button
                className={styles.cancelBtn}
                type="button"
                onClick={handleCloseModal}
              >
                No, Cancel
              </button>
              <button
                className={styles.expireModalBtn}
                type="button"
                onClick={handleCloseModal}
              >
                Yes, Expire
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
