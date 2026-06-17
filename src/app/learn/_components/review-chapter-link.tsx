import Link from "next/link";

import {
  reviewChapterSlugFor,
  reviewQuestionCountFor,
} from "@/lib/review-scope";

/**
 * 章末「复习本章（N 题）」直达入口（Server Component，按章复习）。
 *
 * 输入是内容侧 slug（bookSlug + 内容文件名 chapterSlug）；内容 slug 与复习 slug 并不相等，
 * 故先用 review-scope 的桥接求出本章对应的「复习 slug」，再据此数题数。
 * 仅当本章确有复习题（count > 0）时才渲染；否则返回 null（不打扰无题章）。
 *
 * 链接到 /review?chapter=<复习slug>，复习页据此预选范围、只从本章抽题。
 * 颜色 / 间距 / 圆角 / 动效全部走 DESIGN token（硬规则 5），与 ChapterPager 视觉协调。
 */
export function ReviewChapterLink({
  bookSlug,
  chapterSlug,
}: {
  bookSlug: string;
  chapterSlug: string;
}) {
  const reviewSlug = reviewChapterSlugFor(bookSlug, chapterSlug);
  if (!reviewSlug) return null;
  const count = reviewQuestionCountFor(reviewSlug);
  if (count <= 0) return null;

  return (
    <div
      // 复习入口属导航 chrome，排除出站内搜索索引（与 ChapterPager 同处理，HEL-42）
      data-pagefind-ignore
      className="mt-8"
    >
      <Link
        href={`/review?chapter=${encodeURIComponent(reviewSlug)}`}
        className="group inline-flex items-center gap-2 rounded-control border border-border px-4 py-2 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
      >
        <span className="transition-colors duration-(--duration-hover) ease-standard group-hover:text-accent">
          复习本章
        </span>
        <span className="font-mono tabular-nums text-xs">（{count} 题）</span>
      </Link>
    </div>
  );
}
