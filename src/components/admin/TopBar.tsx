"use client";

import Image from "next/image";
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
          <Image
              src="/assets/Screenshot 2026-02-27 143026.png"
              alt="User avatar"
              width={32}
              height={32}
              className={styles.userAvatar}
              priority
            />
          <div className={styles.userMeta}>
            <div className={styles.userName}>Eric Kayser</div>
            <div className={styles.userRole}>Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
