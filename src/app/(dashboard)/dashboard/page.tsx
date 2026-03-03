import pageStyles from "@/components/admin/AdminPage.module.css";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div>
          <div className={pageStyles.pageTitle}>Dashboard</div>
          <div className={pageStyles.pageSubtitle}>Overview</div>
        </div>
      </header>

      <section className={styles.dashboardGrid}>
        <div className={styles.summaryColumn}>
          <div className={styles.summaryCards}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Total Customers</div>
              <div className={styles.summaryValue}>98,960</div>
              <div className={styles.summaryMeta}>+3% since last week</div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Total Workers</div>
              <div className={styles.summaryValue}>126</div>
              <div className={styles.summaryMeta}>+10 new sign ups</div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Total Payout</div>
              <div className={styles.summaryValue}>₦200,000.00</div>
              <div className={styles.summaryMeta}>Pending payouts</div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>Pending Workers</div>
              <div className={styles.summaryValue}>20</div>
              <div className={styles.summaryMeta}>Awaiting verification</div>
            </div>
          </div>

          <div className={styles.chartPanel}>
            <div className={styles.chartHeader}>
              <div>
                <div className={styles.chartTitle}>Customer Sign-Up Rate</div>
                <div className={styles.chartSub}>This week</div>
              </div>
            </div>

            <div className={styles.chartBody}>
              <div className={styles.donutWrap}>
                <div className={styles.donut} aria-label="56 percent" />
                <div className={styles.donutCenter}>
                  <div className={styles.donutValue}>56</div>
                  <div className={styles.donutLabel}>Signed up</div>
                </div>
              </div>

              <div className={styles.legendList}>
                <div className={styles.legendRow}>
                  <span className={`${styles.legendDot} ${styles.dotBlue}`} />
                  <span>10 Stopped Signup</span>
                </div>
                <div className={styles.legendRow}>
                  <span className={`${styles.legendDot} ${styles.dotOrange}`} />
                  <span>30 Completed Signup</span>
                </div>
                <div className={styles.legendRow}>
                  <span className={`${styles.legendDot} ${styles.dotRed}`} />
                  <span>20 Not Verified Yet</span>
                </div>
              </div>
            </div>

            <button className={styles.reviewButton} type="button">
              Review Customers
            </button>
          </div>
        </div>

        <div className={styles.activityColumn}>
          <div className={styles.activityPanel}>
            <div className={styles.activityHeader}>Recent Activity</div>
            <div className={styles.activityList}>
              {[
                "John Okonide requested a service",
                "Transaction failed",
                "Israel just signed up",
                "Nathan Brooks requested electrical service",
                "John Okonide request withdrawal",
              ].map((item) => (
                <div className={styles.activityItem} key={item}>
                  <div className={styles.activityTitle}>{item}</div>
                  <div className={styles.activityMeta}>Today · 4:33pm</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
