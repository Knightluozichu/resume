import type { Metadata } from "next";

import { ReviewApp } from "@/components/review/review-app";

/**
 * /review 复习页（Server Component，复习系统 Phase A）。
 *
 * 渲染客户端 <ReviewApp />——它内部用 next/dynamic(ssr:false) 懒加载引擎 + 题库，
 * 数据 code-split 不进首屏（硬规则 2/6 同款懒加载纪律）。
 *
 * data-pagefind-ignore：复习是 app 而非内容，不进站内搜索索引（与 header/footer 同处理，HEL-42）。
 *
 * 布局：root layout 用 flex-col 把页脚推到底，本页 <main> 取 flex-1 占满中间。
 */

export const metadata: Metadata = {
  title: "复习 — remuse",
  description:
    "卡片问答 + 智能间隔复习：把入门 7 章的概念、术语、练习刷成肌肉记忆。",
};

export default function ReviewPage() {
  return (
    <main data-pagefind-ignore className="min-w-0 flex-1 px-4 py-12 lg:px-8">
      <div className="mx-auto w-full max-w-[72ch]">
        <h1 className="text-2xl font-semibold">复习</h1>
        <p className="mt-2 text-secondary">
          翻卡片自测，答对的题间隔变长、答错的进错题集优先重来——把入门 7
          章刷成肌肉记忆。进度只存在你这台设备的浏览器里。
        </p>
        <div className="mt-8">
          <ReviewApp />
        </div>
      </div>
    </main>
  );
}
