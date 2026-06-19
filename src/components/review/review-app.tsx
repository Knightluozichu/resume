"use client";

/**
 * <ReviewApp>：复习页客户端入口（'use client'）。
 *
 * 这是「dynamic 边界」——本文件极轻，只用 next/dynamic(ssr:false) 懒加载真正含
 * 引擎 + 题库数据的 <ReviewEngineApp>。题库（Phase B 要扩到 500）+ Leitner 引擎
 * 被切成独立 chunk，不进 /review 首屏关键路径（与全站 WebGL / 重数据同一懒加载纪律）。
 *
 * 为什么这层必须是 client：next/dynamic 的 `ssr: false` 只能在 Client Component 里用
 * （Server Component 中禁用）；/review 的 page.tsx 是 Server Component，故由本组件承接。
 *
 * 范围复习：server 的 page.tsx 算好范围树（scopeTree）+ 初始章（initialChapter，来自
 * ?chapter=）作为纯 JSON props 经此透传给引擎，本层不感知其语义、只搬运。
 *
 * loading 占位 = 同气质骨架卡（卡片容器 + 文案），chunk 就绪后无缝接管。
 */

import dynamic from "next/dynamic";

import type { ReviewScopeTree } from "./engine";

function LoadingCard() {
  return (
    <div className="rounded-card border border-border bg-elevated p-6">
      <p className="text-sm text-secondary">复习卡片加载中…</p>
    </div>
  );
}

const ReviewEngineApp = dynamic(() => import("./review-engine-app"), {
  ssr: false,
  loading: () => <LoadingCard />,
});

export function ReviewApp({
  scopeTree,
  initialBook,
  initialChapter,
}: {
  scopeTree: ReviewScopeTree;
  initialBook: string | null;
  initialChapter: string | null;
}) {
  return (
    <ReviewEngineApp
      scopeTree={scopeTree}
      initialBook={initialBook}
      initialChapter={initialChapter}
    />
  );
}
