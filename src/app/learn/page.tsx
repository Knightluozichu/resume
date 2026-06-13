import type { Metadata } from "next";

import { ChapterShell } from "./_components/chapter-shell";

export const metadata: Metadata = {
  title: "教程 — remuse",
  description: "可交互的 Shader / OpenGL 教学章节目录。",
};

export default function LearnPage() {
  return (
    <ChapterShell>
      <h1 className="text-2xl font-semibold">欢迎来到教程区</h1>
      <p className="mt-4 text-secondary">
        这里是 remuse 的章节正文区。教程内容改编自
        LearnOpenGL，每个图形概念都会配一块可以亲手拨弄的画布。从左侧章节树选择一章开始——正式章节将随后续里程碑陆续上线，当前为占位文案。
      </p>
    </ChapterShell>
  );
}
