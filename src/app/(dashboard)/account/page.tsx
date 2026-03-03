"use client";

import { useState } from "react";
import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import styles from "./account.module.css";

const admin = {
  fullName:   "Israel Ajala",
  firstName:  "Israel",
  lastName:   "Akinloluwa",
  role:       "Administrator",
  email:      "ajalaisrael2015@gmail.com",
  phone:      "08101533174",
  address:    "38 Ademola Adetokumbo Street",
  city:       "Abuja",
  state:      "FCT",
  postalCode: "900102",
};

type Modal = "edit" | "success" | null;

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

export default function AccountPage() {
  const [modal, setModal] = useState<Modal>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    firstName:  admin.firstName,
    lastName:   admin.lastName,
    email:      admin.email,
    phone:      admin.phone,
    address:    admin.address,
    city:       admin.city,
    state:      admin.state,
    postalCode: admin.postalCode,
  });

  function openEdit() {
    setStep(1);
    setModal("edit");
  }

  function handleSave() {
    setModal("success");
  }

  function handleDone() {
    setModal(null);
  }

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div className={pageStyles.pageTitle}>Admin Profile</div>
      </header>

      <section className={pageStyles.panel}>

        {/* Account Area header */}
        <div className={styles.areaHeader}>
          <div className={styles.areaTitle}>Account Area</div>
          <Link href="/login" className={styles.logoutBtn}>Log Out</Link>
        </div>

        {/* Profile row */}
        <div className={styles.profileRow}>
          <div className={styles.profileLeft}>
            <div className={styles.avatar} />
            <div>
              <div className={styles.name}>{admin.fullName}</div>
              <div className={styles.role}>{admin.role}</div>
            </div>
          </div>
          <div className={styles.profileActions}>
            <button type="button" className={styles.imgBtn}>
              <CameraIcon />
              Replace Image
            </button>
            <button type="button" className={styles.editBtn} onClick={openEdit}>
              Edit Profile
              <PencilIcon />
            </button>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Info sections */}
        <div className={styles.infoGrid}>
          <div className={styles.infoSection}>
            <div className={styles.sectionTitle}>Personal Information</div>
            <div className={styles.fieldsGrid}>
              <div>
                <div className={styles.fieldLabel}>Name</div>
                <div className={styles.fieldValue}>{form.firstName}</div>
              </div>
              <div>
                <div className={styles.fieldLabel}>Last Name</div>
                <div className={styles.fieldValue}>{form.lastName}</div>
              </div>
              <div>
                <div className={styles.fieldLabel}>Email Address</div>
                <div className={styles.fieldValue}>{form.email}</div>
              </div>
              <div>
                <div className={styles.fieldLabel}>Phone Number</div>
                <div className={styles.fieldValue}>{form.phone}</div>
              </div>
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.sectionTitle}>Address</div>
            <div className={styles.fieldsGrid}>
              <div>
                <div className={styles.fieldLabel}>Address</div>
                <div className={styles.fieldValue}>{form.address}</div>
              </div>
              <div>
                <div className={styles.fieldLabel}>City/State</div>
                <div className={styles.fieldValue}>{form.city}, {form.state}</div>
              </div>
              <div>
                <div className={styles.fieldLabel}>Postal Code</div>
                <div className={styles.fieldValue}>{form.postalCode}</div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Edit Profile Modal ─────────────────────── */}
      {modal === "edit" && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>

            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>Edit Profile</div>
              <button type="button" className={styles.closeBtn} onClick={() => setModal(null)}>×</button>
            </div>

            {/* Stepper */}
            <div className={styles.stepper}>
              <div className={styles.stepItem}>
                <div className={`${styles.stepCircle} ${step === 1 ? styles.stepActive : styles.stepDone}`}>
                  {step === 1 ? "1" : <CheckIcon />}
                </div>
                <div>
                  <div className={styles.stepName}>Personal Information</div>
                  <div className={styles.stepSub}>Step 1</div>
                </div>
              </div>
              <div className={`${styles.stepLine} ${step === 2 ? styles.stepLineDone : ""}`} />
              <div className={styles.stepItem}>
                <div className={`${styles.stepCircle} ${step === 2 ? styles.stepActive : styles.stepInactive}`}>
                  2
                </div>
                <div>
                  <div className={styles.stepName}>Address</div>
                  <div className={styles.stepSub}>Step 2</div>
                </div>
              </div>
            </div>

            {/* Step body */}
            <div className={styles.modalBody}>
              {step === 1 ? (
                <>
                  <div className={styles.imgSection}>
                    <div className={styles.imgSectionLabel}>Profile Image</div>
                    <div className={styles.imgActions}>
                      <button type="button" className={styles.changeImgBtn}>Change</button>
                      <button type="button" className={styles.removeImgBtn}>Remove image</button>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>First Name</label>
                    <input className={styles.formInput} value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Last Name</label>
                    <input className={styles.formInput} value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email</label>
                    <input className={styles.formInput} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone Number</label>
                    <input className={styles.formInput} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <button type="button" className={styles.continueBtn} onClick={() => setStep(2)}>
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Address</label>
                    <input className={styles.formInput} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>City</label>
                    <input className={styles.formInput} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>State</label>
                    <input className={styles.formInput} value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Postal Code</label>
                    <input className={styles.formInput} value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
                  </div>
                  <div className={styles.step2Btns}>
                    <button type="button" className={styles.backBtn} onClick={() => setStep(1)}>Back</button>
                    <button type="button" className={styles.saveBtn} onClick={handleSave}>Save Changes</button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ── Success Modal ──────────────────────────── */}
      {modal === "success" && (
        <div className={styles.modalOverlay}>
          <div className={styles.successModal}>
            <div className={styles.successTitle}>Profile updated!</div>
            <div className={styles.successSub}>Your information has been updated successfully</div>
            <button type="button" className={styles.doneBtn} onClick={handleDone}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
