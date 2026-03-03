"use client";

import { use, useState } from "react";
import Link from "next/link";

import pageStyles from "@/components/admin/AdminPage.module.css";
import styles from "./ticketDetail.module.css";

const ticket = {
  id:          "#1",
  title:       "Missing Item",
  description: "I can't find my item after the last service request...",
  status:      "PENDING",
};

const initialMessages = [
  {
    id: 1,
    from: "admin" as const,
    text: "Hello welcome to BRYT support! kindly let us know what we can help you with.",
    time: "12:35",
  },
  {
    id: 2,
    from: "user" as const,
    text: "My items are missing from last artisan",
    time: "12:36",
  },
];

function UploadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export default function TicketDetailPage({
  params,
}: Readonly<{ params: Promise<{ ticketId: string }> }>) {
  use(params);
  const [messages, setMessages] = useState(initialMessages);
  const [reply, setReply] = useState("");

  function handleSend() {
    if (!reply.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: "admin", text: reply.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setReply("");
  }

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div className={pageStyles.pageTitle}>Support Ticket</div>
      </header>

      <section className={pageStyles.panel}>

        {/* Sub-header */}
        <div className={styles.subHeader}>
          <Link href="/support-ticket" className={styles.backLink}>
            <ArrowLeft />
            Support Ticket
          </Link>
          <span className={styles.pendingBadge}>Pending</span>
        </div>

        {/* Ticket info card */}
        <div className={styles.ticketCard}>
          <div className={styles.ticketLeft}>
            <div className={styles.ticketTitle}>{ticket.title}</div>
            <div className={styles.ticketMeta}>Ticket ID: {ticket.id}</div>
            <div className={styles.ticketMeta}>Description: {ticket.description}</div>
          </div>
          <div className={styles.ticketRight}>
            <span className={styles.ticketStatusLabel}>Ticket Status:</span>
            <span className={styles.ticketStatusPill}>{ticket.status}</span>
          </div>
        </div>

        {/* Chat messages */}
        <div className={styles.chatArea}>
          {messages.map((msg) =>
            msg.from === "admin" ? (
              <div key={msg.id} className={styles.msgAdmin}>
                <div className={styles.bubbleAdmin}>
                  <div className={styles.bubbleText}>{msg.text}</div>
                  <div className={styles.bubbleTime}>{msg.time} ✓✓</div>
                </div>
              </div>
            ) : (
              <div key={msg.id} className={styles.msgUser}>
                <div className={styles.bubbleUser}>
                  <div className={styles.bubbleText}>{msg.text}</div>
                  <div className={styles.bubbleTime}>{msg.time}</div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Reply form */}
        <div className={styles.replyForm}>
          <div>
            <div className={styles.replyLabel}>Type message</div>
            <textarea
              className={styles.replyTextarea}
              placeholder="type your response here"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </div>

          <div>
            <div className={styles.attachLabel}>Attach File (Optional)</div>
            <div className={styles.attachBox}>
              <UploadIcon />
              Click to upload an image
            </div>
          </div>

          <div className={styles.replyActions}>
            <button type="button" className={styles.settledBtn}>
              Dispute Settled
            </button>
            <button type="button" className={styles.sendBtn} onClick={handleSend}>
              Send Response
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}
