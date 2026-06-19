import type { Metadata } from "next";
import Link from "next/link";

import { getLearningPathTree, type LearningPathStage } from "@/lib/content";

import { ChapterShell } from "./_components/chapter-shell";

export const metadata: Metadata = {
  title: "学习路径 — remuse",
  description:
    "按 Android、C/C++、Unity、图形渲染、AI Agent 组织的体系化学习路线。",
};

export default function LearnPage() {
  const paths = getLearningPathTree();

  return (
    <ChapterShell>
      <h1 className="text-2xl font-semibold">学习路径</h1>
      <p className="mt-4 text-secondary">
        先选方向，再按初级、中级、高级推进。每条路径都标出主线书、可选补充和当前缺口，避免在书单里来回猜下一步。
      </p>

      <div className="mt-10 flex flex-col gap-12">
        {paths.map((path) => (
          <section key={path.slug}>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-primary">
                {path.title}
              </h2>
              <p className="text-secondary">{path.description}</p>
            </div>

            <div className="mt-5 flex flex-col gap-4">
              {path.stages.map((stage) => (
                <StageBlock key={stage.level} stage={stage} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </ChapterShell>
  );
}

function StageBlock({ stage }: { stage: LearningPathStage }) {
  return (
    <section className="border-l border-border pl-4">
      <div className="flex flex-wrap items-baseline gap-2">
        <h3 className="text-lg font-semibold text-primary">{stage.label}</h3>
        <p className="text-sm text-secondary">{stage.summary}</p>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {stage.items.map((item) => {
          if (item.kind === "missing") {
            return (
              <div
                key={item.title}
                className="rounded-control border border-warning px-4 py-3"
              >
                <p className="text-sm font-medium text-warning">
                  待补：{item.title}
                </p>
                <p className="mt-1 text-sm text-secondary">{item.note}</p>
              </div>
            );
          }

          return (
            <article
              key={item.book.bookSlug}
              className="rounded-control border border-border px-4 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-medium text-primary">
                    {item.book.bookTitle}
                    {item.optional && (
                      <span className="ml-2 rounded-control border border-border px-1.5 py-0.5 text-xs text-secondary">
                        可选
                      </span>
                    )}
                  </h4>
                  <p className="mt-1 text-sm text-secondary">
                    {item.chapterCount} 章 · {item.note}
                  </p>
                </div>

                {item.firstHref && (
                  <Link
                    href={item.firstHref}
                    className="rounded-control border border-border px-3 py-1 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
                  >
                    开始阅读
                  </Link>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {item.book.sections.slice(0, 5).map((section) => (
                  <span
                    key={section.section}
                    className="rounded-control border border-border px-2 py-1 text-xs text-secondary"
                  >
                    {section.section}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
