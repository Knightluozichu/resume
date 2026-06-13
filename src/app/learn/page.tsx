import type { Metadata } from "next";
import Link from "next/link";

import { getChapterTree } from "@/lib/content";

import { ChapterShell } from "./_components/chapter-shell";

export const metadata: Metadata = {
  title: "教程 — remuse",
  description: "可交互的 Shader / OpenGL 教学章节目录。",
};

/**
 * /learn 列表页（HEL-48 书化）：列出「书 → section → 章」三层目录，
 * 章节链接走三段式新路径 /learn/<book>/<section>/<chapter>。
 * 目录树与侧边栏同源（getChapterTree），开发期含草稿（标注）、生产隐藏。
 */
export default function LearnPage() {
  const books = getChapterTree();

  return (
    <ChapterShell>
      <h1 className="text-2xl font-semibold">欢迎来到教程区</h1>
      <p className="mt-4 text-secondary">
        这里是 remuse 的章节正文区。教程内容改编自
        LearnOpenGL，每个图形概念都会配一块可以亲手拨弄的画布。选择一章开始——更多书籍与章节将随后续里程碑陆续上线。
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {books.map((book) => (
          <section key={book.bookSlug}>
            <h2 className="text-lg font-medium text-primary">
              {book.bookTitle}
            </h2>
            <div className="mt-4 flex flex-col gap-6">
              {book.sections.map((group) => (
                <div key={group.section}>
                  <h3 className="text-xs font-medium text-secondary">
                    {group.section}
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1">
                    {group.chapters.map((chapter) => (
                      <li key={chapter.href}>
                        <Link
                          href={chapter.href}
                          className="flex items-center gap-2 rounded-control px-2 py-1 text-secondary transition-colors duration-(--duration-hover) ease-standard hover:text-accent"
                        >
                          <span className="min-w-0 truncate">
                            {chapter.title}
                          </span>
                          {chapter.draft && (
                            <span className="shrink-0 rounded-control border border-border px-1 text-[10px] leading-4 text-secondary">
                              草稿
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ChapterShell>
  );
}
