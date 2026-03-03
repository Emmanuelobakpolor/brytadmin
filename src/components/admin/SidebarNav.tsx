"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "./icons";
import styles from "./SidebarNav.module.css";

type SidebarNavProps = {
  onNavigate?: () => void;
};

export default function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className={styles.sidebarNav}>
      <div className={styles.brandRow}>
        <Image
          src="/assets/35249ccb00c633771376e87b441582f9ba6cde24-removebg-preview.png"
          alt="Bryt logo"
          width={90}
          height={36}
          className={styles.brandLogo}
          priority
        />
      </div>

      <div className={styles.navSection}>
        <Link
          className={`${styles.navItem} ${
            isActive("/dashboard") ? styles.navItemActive : ""
          }`}
          href="/dashboard"
          onClick={onNavigate}
        >
          <Icon name="dashboard" />
          <span>Dashboard</span>
        </Link>

        <details className={styles.navGroup} open>
          <summary
            className={`${styles.navGroupSummary} ${
              isActive("/users") || isActive("/workers")
                ? styles.navGroupActive
                : ""
            }`}
          >
            <span className={styles.navGroupLabel}>
              <Icon name="users" />
              <span>All Users</span>
            </span>
            <Icon name="chevron" className={styles.groupChevron} />
          </summary>

          <div className={styles.navGroupItems}>
            <Link
              className={`${styles.subNavItem} ${
                isActive("/users") ? styles.subNavItemActive : ""
              }`}
              href="/users"
              onClick={onNavigate}
            >
              <Icon name="user" />
              <span>Users</span>
            </Link>

            <Link
              className={`${styles.subNavItem} ${
                isActive("/workers") ? styles.subNavItemActive : ""
              }`}
              href="/workers"
              onClick={onNavigate}
            >
              <Icon name="user" />
              <span>Workers</span>
            </Link>
          </div>
        </details>

        <Link
          className={`${styles.navItem} ${
            isActive("/transactions") ? styles.navItemActive : ""
          }`}
          href="/transactions"
          onClick={onNavigate}
        >
          <Icon name="transactions" />
          <span>Transactions</span>
        </Link>

        <Link
          className={`${styles.navItem} ${
            isActive("/withdrawals") ? styles.navItemActive : ""
          }`}
          href="/withdrawals"
          onClick={onNavigate}
        >
          <Icon name="withdrawals" />
          <span>Withdrawals</span>
        </Link>

        <Link
          className={`${styles.navItem} ${
            isActive("/jobs") ? styles.navItemActive : ""
          }`}
          href="/jobs"
          onClick={onNavigate}
        >
          <Icon name="jobs" />
          <span>Jobs</span>
        </Link>

        <Link
          className={`${styles.navItem} ${
            isActive("/referrals") ? styles.navItemActive : ""
          }`}
          href="/referrals"
          onClick={onNavigate}
        >
          <Icon name="referrals" />
          <span>Referrals</span>
        </Link>

        <Link
          className={`${styles.navItem} ${
            isActive("/account") ? styles.navItemActive : ""
          }`}
          href="/account"
          onClick={onNavigate}
        >
          <Icon name="account" />
          <span>Account</span>
        </Link>

        <Link
          className={`${styles.navItem} ${
            isActive("/support-ticket") ? styles.navItemActive : ""
          }`}
          href="/support-ticket"
          onClick={onNavigate}
        >
          <Icon name="ticket" />
          <span>Support Ticket</span>
          <span className={styles.navBadge}>3</span>
        </Link>
      </div>

      <div className={styles.bottomSection}>
        <Link className={styles.logoutLink} href="/login" onClick={onNavigate}>
          <Icon name="logout" />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
