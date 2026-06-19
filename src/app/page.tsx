import Link from "next/link";

import { buildReviewScopeTree } from "@/lib/review-scope";
import { getChapterTree, getLearningPathTree } from "@/lib/content";

export default function Home() {
  const books = getChapterTree();
  const paths = getLearningPathTree();
  const reviewTree = buildReviewScopeTree();
  const reviewByBook = new Map(
    reviewTree.map((book) => [book.bookSlug, book] as const),
  );

  const stats = {
    books: books.length,
    chapters: books.reduce(
      (sum, book) =>
        sum +
        book.sections.reduce(
          (sectionSum, section) => sectionSum + section.chapters.length,
          0,
        ),
      0,
    ),
    questions: reviewTree.reduce((sum, book) => sum + book.count, 0),
  };

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,92,255,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(229,181,103,0.12),_transparent_28%)]"
        />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-secondary">
              Remuse Library
            </p>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold text-primary lg:text-[3.4rem] lg:leading-[1.05]">
              把首页还给内容，而不是把注意力交给一辆车。
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-secondary">
              这里更适合做成程序员的自学图书馆：先选书，再选章节，学完立刻进复习，把教程、题库和错题进度串成一条自然的学习链路。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/learn"
                className="rounded-control border border-accent bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-opacity duration-(--duration-hover) ease-standard hover:opacity-90"
              >
                进入图书馆
              </Link>
              <Link
                href="/review"
                className="rounded-control border border-border bg-bg/70 px-5 py-2.5 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
              >
                去复习书架
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <StatCard label="已上架书籍" value={stats.books} suffix="本" />
            <StatCard label="可读章节" value={stats.chapters} suffix="章" />
            <StatCard label="复习题库" value={stats.questions} suffix="题" />
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-12 px-6 py-12 lg:px-10">
        <div className="grid gap-4 rounded-card border border-border bg-elevated/80 p-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-sm font-medium text-primary">推荐学习流</p>
            <p className="mt-2 text-secondary">
              读章节时用交互内容建立理解，章末直接复习本章；刷完整本后回到错题集做二次强化。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <WorkflowStep
              title="1. 选书开读"
              body="从目录进入一本书，而不是先看一段孤立视觉。"
            />
            <WorkflowStep
              title="2. 章末复习"
              body="每章学完立刻刷本章题，减少看完即忘。"
            />
            <WorkflowStep
              title="3. 错题回炉"
              body="按整本书或指定章节回刷，形成稳定记忆。"
            />
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">学习路径</h2>
              <p className="mt-2 text-secondary">
                先按方向选路线，再进入初级、中级、高级的主线书和补充材料。
              </p>
            </div>
            <Link
              href="/learn"
              className="hidden text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:text-accent md:inline"
            >
              查看路线图 →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {paths.map((path) => {
              const firstBook = path.stages
                .flatMap((stage) => stage.items)
                .find((item) => item.kind === "book");
              const bookCount = path.stages.reduce(
                (sum, stage) =>
                  sum +
                  stage.items.filter((item) => item.kind === "book").length,
                0,
              );
              const missingCount = path.stages.reduce(
                (sum, stage) =>
                  sum +
                  stage.items.filter((item) => item.kind === "missing").length,
                0,
              );

              return (
                <article
                  key={path.slug}
                  className="rounded-card border border-border bg-elevated p-5"
                >
                  <h3 className="text-lg font-medium text-primary">
                    {path.title}
                  </h3>
                  <p className="mt-2 text-sm text-secondary">
                    {path.description}
                  </p>
                  <p className="mt-4 text-xs text-secondary">
                    {bookCount} 本已上架
                    {missingCount > 0 ? ` · ${missingCount} 个待补能力` : ""}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {path.stages.map((stage) => (
                      <span
                        key={stage.level}
                        className="rounded-control border border-border px-2 py-1 text-xs text-secondary"
                      >
                        {stage.label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {firstBook?.kind === "book" && firstBook.firstHref && (
                      <Link
                        href={firstBook.firstHref}
                        className="rounded-control border border-border px-3 py-1 text-sm text-primary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-accent"
                      >
                        从第一本开始
                      </Link>
                    )}
                    <Link
                      href={`/review?path=${encodeURIComponent(path.slug)}`}
                      className="rounded-control border border-border px-3 py-1 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
                    >
                      复习整条路径
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">书架</h2>
              <p className="mt-2 text-secondary">
                每本书都给出“开始阅读”和“整本复习”两个入口，把内容区和题库区真正连起来。
              </p>
            </div>
            <Link
              href="/learn"
              className="hidden text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:text-accent md:inline"
            >
              查看完整目录 →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {books.map((book) => {
              const firstChapter = book.sections[0]?.chapters[0];
              const review = reviewByBook.get(book.bookSlug) ?? null;

              return (
                <article
                  key={book.bookSlug}
                  className="flex min-h-64 flex-col rounded-card border border-border bg-elevated p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-primary">
                        {book.bookTitle}
                      </h3>
                      <p className="mt-2 text-sm text-secondary">
                        {book.sections.length} 个分区 ·{" "}
                        {book.sections.reduce(
                          (sum, section) => sum + section.chapters.length,
                          0,
                        )}{" "}
                        章{review ? ` · ${review.count} 道复习题` : ""}
                      </p>
                    </div>
                    <span className="rounded-control border border-border px-2 py-1 text-xs text-secondary">
                      {book.sections[0]?.section ?? "目录"}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {book.sections.slice(0, 4).map((section) => (
                      <span
                        key={section.section}
                        className="rounded-control border border-border px-2 py-1 text-xs text-secondary"
                      >
                        {section.section}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-1 flex-col justify-end gap-3">
                    {firstChapter && (
                      <Link
                        href={firstChapter.href}
                        className="rounded-control border border-border px-4 py-2 text-sm text-primary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-accent"
                      >
                        从《{firstChapter.title}》开始阅读
                      </Link>
                    )}
                    {review ? (
                      <Link
                        href={`/review?book=${encodeURIComponent(book.bookSlug)}`}
                        className="rounded-control border border-border bg-bg/75 px-4 py-2 text-sm text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
                      >
                        整本复习：{review.chapters.length} 章 / {review.count}{" "}
                        题
                      </Link>
                    ) : (
                      <p className="text-sm text-secondary">
                        这本书的复习题还在整理中，先从正文开始更合适。
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  return (
    <div className="rounded-card border border-border bg-elevated/85 p-5">
      <p className="text-sm text-secondary">{label}</p>
      <p className="mt-3 font-mono text-3xl tabular-nums text-primary">
        {value}
        <span className="ml-1 text-base text-secondary">{suffix}</span>
      </p>
    </div>
  );
}

function WorkflowStep({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-card border border-border bg-bg/70 p-4">
      <p className="text-sm font-medium text-primary">{title}</p>
      <p className="mt-2 text-sm text-secondary">{body}</p>
    </div>
  );
}
