// client/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "家計簿アプリ",
  description: "ラベンダーテーマの家計簿アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
  className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen bg-(--color-bg) text-(--color-text)`}
>

        {/* 🟣 左メニュー */}
<aside className="w-64 bg-(--color-surface) shadow-md p-6 flex flex-col">
  <h1 className="text-xl font-bold mb-6 text-(--color-primary)">🧮 家計簿</h1>
  <nav className="flex flex-col gap-3">
    <Link href="/" className="hover:text-(--color-accent)">🏠 ホーム</Link>
    <Link href="/list" className="hover:text-(--color-accent)">📋 入出金一覧</Link>
    <Link
  href="/chart"
  className="block p-2 rounded hover:text-(--color-accent)"
>
  📊 月別グラフ
</Link>
  </nav>
  <div className="mt-auto text-sm text-gray-500">v1.0.0</div>
</aside>

        {/* 🏠 メイン画面 */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
