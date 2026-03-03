"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import pageStyles from "@/components/admin/AdminPage.module.css";
import Modal from "@/components/admin/Modal";
import styles from "./newWorker.module.css";

type NewWorkerDialog = "confirm" | "success" | null;
type FormStep = 1 | 2 | 3;

export default function NewWorkerPage() {
  const router = useRouter();
  const [dialog, setDialog] = useState<NewWorkerDialog>(null);
  const [currentStep, setCurrentStep] = useState<FormStep>(1);

  const totalSteps = 3;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };

  const handleSubmit = () => {
    setDialog("confirm");
  };

  const handleConfirm = () => {
    setDialog("success");
  };

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div>
          <div className={pageStyles.pageTitle}>Add New Worker</div>
          <div className={pageStyles.pageSubtitle}>Create a worker profile</div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
        <div className={styles.stepIndicators}>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`${styles.stepIndicator} ${
                currentStep >= step ? styles.active : ""
              }`}
            >
              <div className={styles.stepCircle}>
                {currentStep > step ? (
                  <div className={styles.completedIcon}>✓</div>
                ) : (
                  step
                )}
              </div>
              <div className={styles.stepLabel}>
                {step === 1 ? "Basic Info" : step === 2 ? "Skills" : "Documents"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className={styles.formPanel}>
        {currentStep === 1 && (
          <div className={styles.stepContent}>
            <div className={styles.stepTitle}>Basic Information</div>
            <div className={styles.stepSubtitle}>
              Enter the worker's personal details to create their profile
            </div>
            <form className={styles.workerForm}>
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Full Name</span>
                  <input className={styles.textInput} placeholder="John Doe" />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Email</span>
                  <input className={styles.textInput} placeholder="worker@bryt.com" />
                </label>

                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Phone</span>
                  <input className={styles.textInput} placeholder="+234..." />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Service Category</span>
                  <select className={styles.selectInput}>
                    <option>Electrical</option>
                    <option>Plumbing</option>
                    <option>Cleaning</option>
                  </select>
                </label>

                <label className={styles.fieldWide}>
                  <span className={styles.fieldLabel}>Address</span>
                  <input className={styles.textInput} placeholder="Street, city" />
                </label>

                <label className={styles.fieldWide}>
                  <span className={styles.fieldLabel}>Bio</span>
                  <textarea className={styles.textArea} rows={4} />
                </label>
              </div>

              <div className={styles.formFooter}>
                <Link className={pageStyles.mutedButton} href="/workers">
                  Cancel
                </Link>
                <button
                  className={pageStyles.primaryButton}
                  type="button"
                  onClick={handleNextStep}
                >
                  Next Step
                </button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 2 && (
          <div className={styles.stepContent}>
            <div className={styles.stepTitle}>Skills & Experience</div>
            <div className={styles.stepSubtitle}>
              Enter the worker's skills and experience information
            </div>
            <form className={styles.workerForm}>
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Years of Experience</span>
                  <select className={styles.selectInput}>
                    <option>0-1 years</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Expertise Level</span>
                  <select className={styles.selectInput}>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                </label>

                <label className={styles.fieldWide}>
                  <span className={styles.fieldLabel}>Special Skills</span>
                  <textarea className={styles.textArea} rows={4} placeholder="e.g., Electrical wiring, plumbing installations" />
                </label>

                <label className={styles.fieldWide}>
                  <span className={styles.fieldLabel}>Certifications</span>
                  <textarea className={styles.textArea} rows={3} placeholder="e.g., NABTEB, City & Guilds" />
                </label>
              </div>

              <div className={styles.formFooter}>
                <button
                  className={pageStyles.mutedButton}
                  type="button"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
                <button
                  className={pageStyles.primaryButton}
                  type="button"
                  onClick={handleNextStep}
                >
                  Next Step
                </button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 3 && (
          <div className={styles.stepContent}>
            <div className={styles.stepTitle}>Documents</div>
            <div className={styles.stepSubtitle}>
              Upload necessary documents for verification
            </div>
            <form className={styles.workerForm}>
              <div className={styles.formGrid}>
                <label className={styles.fieldWide}>
                  <span className={styles.fieldLabel}>Government ID</span>
                  <div className={styles.fileUpload}>
                    <div className={styles.uploadIcon}>📄</div>
                    <div className={styles.uploadText}>Upload ID card or passport</div>
                    <input type="file" className={styles.fileInput} accept="image/*" />
                  </div>
                </label>

                <label className={styles.fieldWide}>
                  <span className={styles.fieldLabel}>Proof of Address</span>
                  <div className={styles.fileUpload}>
                    <div className={styles.uploadIcon}>📄</div>
                    <div className={styles.uploadText}>Upload utility bill or bank statement</div>
                    <input type="file" className={styles.fileInput} accept="image/*" />
                  </div>
                </label>

                <label className={styles.fieldWide}>
                  <span className={styles.fieldLabel}>Profile Picture</span>
                  <div className={styles.fileUpload}>
                    <div className={styles.uploadIcon}>📷</div>
                    <div className={styles.uploadText}>Upload worker's photo</div>
                    <input type="file" className={styles.fileInput} accept="image/*" />
                  </div>
                </label>
              </div>

              <div className={styles.formFooter}>
                <button
                  className={pageStyles.mutedButton}
                  type="button"
                  onClick={handlePrevStep}
                >
                  Back
                </button>
                <button
                  className={pageStyles.primaryButton}
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </section>

      {dialog === "confirm" ? (
        <Modal title="Add worker" onClose={() => setDialog(null)}>
          <p className={styles.modalCopy}>
            Are you sure you want to add this worker to the platform?
          </p>
          <div className={styles.modalFooter}>
            <button
              className={pageStyles.mutedButton}
              type="button"
              onClick={() => setDialog(null)}
            >
              Cancel
            </button>
            <button
              className={styles.confirmButton}
              type="button"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </Modal>
      ) : null}

      {dialog === "success" ? (
        <Modal title="Success" onClose={() => router.push("/workers")}>
          <div className={styles.successBody}>
            <div className={styles.successMark} aria-hidden="true">
              ✓
            </div>
            <div className={styles.successTitle}>Worker added successfully</div>
            <div className={styles.successCopy}>
              The worker profile has been created and is now available in the workers
              list.
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button
              className={styles.confirmButton}
              type="button"
              onClick={() => router.push("/workers")}
            >
              Done
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
