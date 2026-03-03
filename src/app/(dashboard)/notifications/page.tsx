import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import styles from "./notifications.module.css";

const notifications = [
  {
    title: "John Okonide requested a service",
    meta: "Today · 4:33pm",
    unread: true,
  },
  { title: "Transaction failed", meta: "Today · 4:10pm", unread: true },
  { title: "Israel just signed up", meta: "Today · 3:58pm", unread: false },
  {
    title: "Nathan Brooks requested electrical service",
    meta: "Today · 2:11pm",
    unread: false,
  },
  {
    title: "John Okonide request withdrawal",
    meta: "Today · 1:23pm",
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <div className={pageStyles.page}>
      <div className={styles.overlay}>
        <div className={styles.notificationsCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>Notifications</div>
            <div className={styles.headerActions}>
              <button className={styles.linkButton} type="button">
                Mark as read
              </button>
              <Link className={styles.closeLink} href="/dashboard">
                ×
              </Link>
            </div>
          </div>

          <div className={styles.list}>
            {notifications.map((note) => (
              <div className={styles.item} key={note.title}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>{note.title}</div>
                  <div className={styles.itemMeta}>{note.meta}</div>
                </div>
                {note.unread ? <span className={styles.unreadDot} /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
