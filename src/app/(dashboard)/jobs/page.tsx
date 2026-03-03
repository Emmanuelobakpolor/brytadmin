"use client";

import { useState } from "react";
import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import styles from "./jobs.module.css";

type JobStatus = "In Progress" | "Completed" | "Canceled" | "Open";

const CATEGORY_STYLES: Record<string, { bg: string; color: string }> = {
  Plumber:    { bg: "#4bb3ff", color: "#fff" },
  Electrical: { bg: "#06b6d4", color: "#fff" },
  Cleaning:   { bg: "#8b5cf6", color: "#fff" },
  Carpentry:  { bg: "#f59e0b", color: "#fff" },
};

const STATUS_CLASS: Record<JobStatus, string> = {
  "In Progress": styles.statusInProgress,
  "Completed":   styles.statusCompleted,
  "Canceled":    styles.statusCanceled,
  "Open":        styles.statusOpen,
};

const jobs = [
  { id: "JOB-3000", title: "Kitchen Plumbing Repair",        category: "Plumber",    client: "Mrs. Adebayo",  worker: "Amina Ibrahim",  amount: "₦126,500.00", status: "In Progress" as JobStatus, date: "2026-02-09", location: "Lekki" },
  { id: "JOB-3001", title: "Electrical Wiring Installation", category: "Electrical", client: "Mr. Okafor",    worker: "Amina Ibrahim",  amount: "₦25,000.00",  status: "Completed"   as JobStatus, date: "2026-02-09", location: "Victoria Island" },
  { id: "JOB-3002", title: "Deep House Cleaning",            category: "Cleaning",   client: "Nathan Brooks", worker: "David Okoro",    amount: "₦18,000.00",  status: "Open"        as JobStatus, date: "2026-02-10", location: "Ikeja" },
  { id: "JOB-3003", title: "Blocked Sink Plumbing",          category: "Plumber",    client: "Israel James",  worker: "Janet Ayo",      amount: "₦12,000.00",  status: "Canceled"    as JobStatus, date: "2026-02-11", location: "Surulere" },
  { id: "JOB-3004", title: "Ceiling Fan Installation",       category: "Electrical", client: "Mrs. Adebayo",  worker: "Michael Bello",  amount: "₦8,500.00",   status: "Completed"   as JobStatus, date: "2026-02-12", location: "Lekki" },
  { id: "JOB-3005", title: "Furniture Assembly",             category: "Carpentry",  client: "John Okonide",  worker: "David Okoro",    amount: "₦35,000.00",  status: "In Progress" as JobStatus, date: "2026-02-13", location: "Ajah" },
];

const TABS = ["All", "Open", "Completed", "Canceled"] as const;
type Tab = typeof TABS[number];

function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");

  const filtered = jobs.filter((job) => {
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Open" && (job.status === "Open" || job.status === "In Progress")) ||
      job.status === activeTab;
    const q = search.toLowerCase();
    const matchesSearch =
      q === "" ||
      job.category.toLowerCase().includes(q) ||
      job.title.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  function tabCount(tab: Tab) {
    if (tab === "All") return jobs.length;
    if (tab === "Open")
      return jobs.filter((j) => j.status === "Open" || j.status === "In Progress").length;
    return jobs.filter((j) => j.status === tab).length;
  }

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div>
          <div className={pageStyles.pageTitle}>Jobs</div>
          <div className={pageStyles.pageSubtitle}>Service jobs overview</div>
        </div>
      </header>

      <section className={pageStyles.panel}>

        {/* Tab bar + search */}
        <div className={styles.tabBar}>
          <div className={styles.tabs}>
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                <span className={styles.tabCount}>({tabCount(tab)})</span>
              </button>
            ))}
          </div>

          <div className={styles.searchWrap}>
            <svg
              className={styles.searchIcon}
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M13 13l3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search by category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className={pageStyles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>TITLE</th>
                <th>WORK CATEGORY</th>
                <th>CLIENT</th>
                <th>WORKER</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => {
                const cat = CATEGORY_STYLES[job.category] ?? { bg: "#6b7280", color: "#fff" };
                return (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>
                      <span
                        className={styles.categoryPill}
                        style={{ background: cat.bg, color: cat.color }}
                      >
                        {job.category}
                      </span>
                    </td>
                    <td>{job.client}</td>
                    <td>{job.worker}</td>
                    <td>{job.amount}</td>
                    <td>
                      <span className={`${styles.statusDot} ${STATUS_CLASS[job.status]}`}>
                        {job.status}
                      </span>
                    </td>
                    <td>
                      <Link href={`/jobs/${job.id}`} className={styles.eyeBtn}>
                        <EyeIcon />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing <strong>1</strong> to <strong>{filtered.length}</strong> of{" "}
            <strong>200</strong> results
          </div>
          <div className={styles.paginationPages}>
            <button type="button" className={styles.pageBtn}>‹</button>
            <button type="button" className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button type="button" className={styles.pageBtn}>2</button>
            <button type="button" className={styles.pageBtn}>3</button>
            <button type="button" className={styles.pageBtn}>4</button>
            <button type="button" className={styles.pageBtn}>›</button>
          </div>
        </div>

      </section>
    </div>
  );
}
