import Link from "next/link";
import pageStyles from "@/components/admin/AdminPage.module.css";

const transactions = Array.from({ length: 12 }).map((_, idx) => ({
  id: `TRX-${9000 + idx}`,
  customer: ["John Okonide", "Israel James", "Nathan Brooks"][idx % 3],
  worker: ["David Okoro", "Janet Ayo", "Michael Bello"][idx % 3],
  amount: `₦${(2500 + idx * 180).toLocaleString()}.00`,
  status: idx % 6 === 0 ? "Failed" : "Success",
  date: "Feb 6, 2026",
}));

export default function TransactionsPage() {
  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.pageHeader}>
        <div>
          <div className={pageStyles.pageTitle}>Transactions</div>
          <div className={pageStyles.pageSubtitle}>Payments and activity logs</div>
        </div>
      </header>

      <section className={pageStyles.panel}>
        <div className={pageStyles.tableWrap}>
          <table className={pageStyles.table}>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Worker</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
               {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{tx.customer}</td>
                  <td>{tx.worker}</td>
                  <td>{tx.amount}</td>
                  <td>
                    <span
                      className={`${pageStyles.statusPill} ${
                        tx.status === "Success"
                          ? pageStyles.statusPillSuccess
                          : pageStyles.statusPillDanger
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td>{tx.date}</td>
                  <td>
                    <Link href={`/transactions/${tx.id}`} className={pageStyles.mutedButton}>
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
