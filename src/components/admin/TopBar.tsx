"use client";

import Link from "next/link";

import { Icon } from "./icons";
import styles from "./TopBar.module.css";

type TopBarProps = {
  onOpenMenu?: () => void;
};

export default function TopBar({ onOpenMenu }: TopBarProps) {
  return (
    <header className={styles.topBar}>
      <button
        type="button"
        className={styles.mobileMenuButton}
        aria-label="Open navigation"
        onClick={onOpenMenu}
      >
        <Icon name="menu" />
      </button>

      <div className={styles.searchWrap}>
        <Icon name="search" className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search for a vendor"
          aria-label="Search"
        />
      </div>

      <div className={styles.topBarRight}>
        <Link
          className={styles.iconButton}
          href="/notifications"
          aria-label="Notifications"
        >
          <Icon name="bell" />
        </Link>

        <div className={styles.userChip}>
          <div className={styles.userAvatar} />
          <div className={styles.userMeta}>
            <div className={styles.userName}>Eric Kayser</div>
            <div className={styles.userRole}>Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
