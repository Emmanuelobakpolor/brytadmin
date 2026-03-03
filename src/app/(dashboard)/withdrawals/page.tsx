import Link from "next/link";
import pageStyles from "@/components/admin/AdminPage.module.css";

const withdrawals = Array.from({ length: 10 }).map((_, idx) => ({
  id: `WDR-${5000 + idx}`,
  worker: ["David Okoro", "Janet Ayo", "Michael Bello"][idx % 3],
  amount: `₦${(15000 + idx * 1200).toLocaleString()}.00`,
  status: idx % 4 === 0 ? "Pending" : "Paid",
  date: "Feb 6, 2026",
}));

export default function WithdrawalsPage() {
  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div>
          <div className={pageStyles.pageTitle}>Withdrawals</div>
          <div className={pageStyles.pageSubtitle}>Worker payout requests</div>
        </div>
      </header>

      <section className={pageStyles.panel}>
        <div className={pageStyles.tableWrap}>
          <table className={pageStyles.table}>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Worker</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((wd) => (
                <tr key={wd.id}>
                  <td>{wd.id}</td>
                  <td>{wd.worker}</td>
                  <td>{wd.amount}</td>
                  <td>
                    <span
                      className={`${pageStyles.statusPill} ${
                        wd.status === "Paid"
                          ? pageStyles.statusPillSuccess
                          : pageStyles.statusPillPending
                      }`}
                    >
                      {wd.status}
                    </span>
                  </td>
                  <td>{wd.date}</td>
                  <td>
                    <Link href={`/withdrawals/${wd.id}`} className={pageStyles.mutedButton}>
                      👁️
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
