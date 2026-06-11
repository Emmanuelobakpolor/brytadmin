import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "Admin dashboard",
  icons: {
    icon: "/assets/Screenshot 2026-02-27 143026.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`app-root ${geistSans.variable} ${geistMono.variable}`}>
        {/* UNCOMMENT THIS LINE WHEN CLIENT PAYS */}
        {/* {children} */}

        {/* DELETE THIS BLOCK WHEN CLIENT PAYS */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
          color: "#888",
        }}>
          <h1 style={{ fontSize: "48px", fontWeight: 700, margin: 0 }}>404</h1>
          <p style={{ fontSize: "18px", marginTop: "8px" }}>This page could not be found.</p>
        </div>
      </body>
    </html>
  );
}
