"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import styles from "./support.module.css";

type TicketStatus = "Pending" | "Closed" | "Online";

const STATUS_CLASS: Record<TicketStatus, string> = {
  Pending: styles.statusPending,
  Closed:  styles.statusClosed,
  Online:  styles.statusOnline,
};

const tickets = Array.from({ length: 12 }).map((_, i) => ({
  id:          `BRYT-2024${i + 1}`,
  type:        i === 11 ? "KD3455" : "Lost Items",
  createdDate: "2026-02-09",
  updatedDate: "2026-02-09",
  status:      (i % 3 === 1 ? "Closed" : i === 11 ? "Online" : "Pending") as TicketStatus,
}));

const TABS = ["All Dispute Ticket", "Pending", "Closed"] as const;
type Tab = typeof TABS[number];

function KebabMenu({ ticketId }: { ticketId: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={styles.kebabWrap} ref={ref}>
      <button
        type="button"
        className={styles.kebabBtn}
        onClick={() => setOpen((v) => !v)}
        aria-label="Actions"
      >
        ⋮
      </button>
      {open && (
        <div className={styles.dropdown}>
          <Link
            href={`/support-ticket/${ticketId}`}
            className={styles.dropdownItem}
            onClick={() => setOpen(false)}
          >
            View Dispute
          </Link>
          <button
            type="button"
            className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
            onClick={() => setOpen(false)}
          >
            Close Dispute
          </button>
        </div>
      )}
    </div>
  );
}

export default function SupportTicketPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All Dispute Ticket");
  const [search, setSearch] = useState("");

  const filtered = tickets.filter((t) => {
    const matchesTab =
      activeTab === "All Dispute Ticket" || t.status === activeTab;
    const q = search.toLowerCase();
    const matchesSearch =
      q === "" || t.id.toLowerCase().includes(q) || t.type.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div>
          <div className={pageStyles.pageTitle}>Support Ticket</div>
          <div className={pageStyles.pageSubtitle}>Dispute management</div>
        </div>
      </header>

      <section className={pageStyles.panel}>

        {/* Controls: tabs + tools */}
        <div className={styles.controls}>
          <div className={styles.tabs}>
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.tools}>
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.6" />
                <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search by dispute type or id"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select className={styles.statusSelect} defaultValue="">
              <option value="" disabled>Status</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </select>

            <Link href="/support-ticket/create" className={styles.createBtn}>
              Create Ticket +
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className={pageStyles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th><input type="checkbox" className={styles.checkbox} /></th>
                <th>TICKET ID</th>
                <th>DISPUTE TYPE</th>
                <th>CREATED DATE</th>
                <th>UPDATED DATE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ticket) => (
                <tr key={ticket.id + ticket.type}>
                  <td><input type="checkbox" className={styles.checkbox} /></td>
                  <td>{ticket.id}</td>
                  <td>{ticket.type}</td>
                  <td>{ticket.createdDate}</td>
                  <td>{ticket.updatedDate}</td>
                  <td>
                    <span className={`${styles.statusDot} ${STATUS_CLASS[ticket.status]}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td>
                    <KebabMenu ticketId={ticket.id} />
                  </td>
                </tr>
              ))}
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
