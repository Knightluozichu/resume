import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "remuse — Shader 教学",
  description: "现代化 Shader 教学网站：每个图形概念都配一块可交互的画布。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      // 内联深色底：CSS 包加载完成前的首帧防白闪（FOUC）。此处只能用字面值
      // 而非 var(--bg)——token 定义在尚未加载的 CSS 包里；值等同 DESIGN --bg #0A0A0F。
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* min-h-dvh + flex-col：页面主体（各路由根元素 flex-1）把页脚推到视口底部 */}
      <body className="flex min-h-dvh flex-col bg-bg font-sans text-primary antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
