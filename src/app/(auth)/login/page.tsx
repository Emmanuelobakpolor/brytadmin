import Link from "next/link";

import styles from "./login.module.css";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <section className={styles.brandPanel}>
        <div className={styles.brandPanelInner}>
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
          <h1 className={styles.brandTitle}>Admin Portal</h1>
          <p className={styles.brandDescription}>
            Manage users, workers, jobs, transactions, withdrawals, referrals, and
            notifications.
          </p>
        </div>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Login as an Admin</h2>
          </div>

          <form className={styles.form}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Email</span>
              <input
                className={styles.textInput}
                type="email"
                name="email"
                placeholder="example@company.com"
                autoComplete="email"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Password</span>
              <input
                className={styles.textInput}
                type="password"
                name="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </label>

            <div className={styles.formActions}>
              <label className={styles.rememberRow}>
                <input className={styles.checkbox} type="checkbox" />
                <span>Remember me</span>
              </label>

              <Link className={styles.forgotLink} href="#">
                Forgot password?
              </Link>
            </div>

            <Link className={styles.loginButton} href="/dashboard">
              Login
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}
