import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "remuse — 程序员自学图书馆",
  description:
    "把教程、章节复习和错题回炉放进同一套学习流里的程序员自学图书馆。",
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
        {/* Cloudflare Web Analytics beacon（站点级，所有页面）。
            afterInteractive：页面可交互后再加载，不阻塞首屏关键路径，仍能捕获 Core Web Vitals。
            data-cf-beacon token 是公开值——设计上即嵌在客户端 HTML 供 CF 识别站点，非密钥，
            按 CF 官方文档直接写在标签里即可；同既有 giscus 公开 id 的处理方式，
            不放 local.env、不走 NEXT_PUBLIC 环境变量。 */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon='{"token": "966c908fa4274d8a83e46e26a0791d6b"}'
        />
      </body>
    </html>
  );
}
