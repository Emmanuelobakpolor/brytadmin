"use client";

import { useState } from "react";

import SidebarNav from "./SidebarNav";
import TopBar from "./TopBar";
import styles from "./AdminLayout.module.css";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.adminShell}>
      <aside
        className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <SidebarNav onNavigate={() => setIsSidebarOpen(false)} />
      </aside>

      <div className={styles.mainArea}>
        <TopBar onOpenMenu={() => setIsSidebarOpen(true)} />
        <main className={styles.pageContent}>{children}</main>
      </div>

      {isSidebarOpen ? (
        <button
          type="button"
          className={styles.mobileBackdrop}
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}
    </div>
  );
}
