import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "社員スキル検索・マッチングシステム",
  description: "社員のスキルを可視化し、プロジェクトやポジションに最適な人材を検索できるWebアプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
