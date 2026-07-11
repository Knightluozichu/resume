"use client";

import { usePathname } from "next/navigation";
import { useId, useState } from "react";

import { type LearningPathTree } from "@/lib/content";

import { BookNavItem } from "./book-nav-item";

function pathContainsBook(
  path: LearningPathTree[number],
  bookSlug: string | null,
) {
  if (!bookSlug) return false;
  return path.stages.some((stage) =>
    stage.items.some(
      (item) => item.kind === "book" && item.book.bookSlug === bookSlug,
    ),
  );
}

function stageContainsBook(
  stage: LearningPathTree[number]["stages"][number],
  bookSlug: string | null,
) {
  if (!bookSlug) return false;
  return stage.items.some(
    (item) => item.kind === "book" && item.book.bookSlug === bookSlug,
  );
}

function pathBookCount(path: LearningPathTree[number]) {
  return path.stages.reduce(
    (total, stage) =>
      total + stage.items.filter((item) => item.kind === "book").length,
    0,
  );
}

export function ChapterNav({ paths }: { paths: LearningPathTree }) {
  const pathname = usePathname();
  const currentBookSlug = pathname.split("/")[2] ?? null;
  const instanceId = useId().replace(/:/g, "");

  const [pathExpanded, setPathExpanded] = useState<Record<string, boolean>>(
    () => {
      const init: Record<string, boolean> = {};
      paths.forEach((path, index) => {
        init[path.slug] =
          pathContainsBook(path, currentBookSlug) ||
          (!currentBookSlug && index === 0);
      });
      return init;
    },
  );

  const [stageExpanded, setStageExpanded] = useState<Record<string, boolean>>(
    () => {
      const init: Record<string, boolean> = {};
      paths.forEach((path, pathIndex) => {
        path.stages.forEach((stage, stageIndex) => {
          init[`${path.slug}::${stage.level}`] =
            stageContainsBook(stage, currentBookSlug) ||
            (!currentBookSlug && pathIndex === 0 && stageIndex === 0);
        });
      });
      return init;
    },
  );

  const [bookExpanded, setBookExpanded] = useState<Record<string, boolean>>(
    () => {
      const init: Record<string, boolean> = {};
      paths.forEach((path) => {
        path.stages.forEach((stage) => {
          stage.items.forEach((item) => {
            if (item.kind !== "book") return;
            init[item.book.bookSlug] = item.book.bookSlug === currentBookSlug;
          });
        });
      });
      return init;
    },
  );

  const togglePath = (slug: string) =>
    setPathExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));
  const toggleStage = (key: string) =>
    setStageExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleBook = (slug: string) =>
    setBookExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));

  // 目录层级字号：路径 > 阶段 > 书 > 篇章 > 章节。篇章必须比章节更强，
  // 否则“C++基础”会被误读成章节注释。
  const pathButtonClass =
    "flex w-full items-center gap-2 rounded-control px-2 py-1.5 text-left text-lg font-semibold leading-7 transition-colors duration-(--duration-hover) ease-standard";
  const stageButtonClass =
    "flex w-full items-center gap-2 rounded-control px-2 py-1.5 text-left text-base font-semibold leading-6 text-primary transition-colors duration-(--duration-hover) ease-standard hover:text-accent";
  return (
    <nav aria-label="学习路径目录" className="flex flex-col gap-2.5">
      {paths.map((path) => {
        const isCurrentPath = pathContainsBook(path, currentBookSlug);
        const isPathOpen = pathExpanded[path.slug] ?? false;
        const pathPanelId = `path-${instanceId}-${path.slug}`;

        return (
          <section key={path.slug}>
            <button
              type="button"
              aria-expanded={isPathOpen}
              aria-controls={pathPanelId}
              onClick={() => togglePath(path.slug)}
              className={`${pathButtonClass} ${
                isCurrentPath ? "text-accent" : "text-primary hover:text-accent"
              }`}
              >
                <span
                aria-hidden="true"
                className="inline-block shrink-0 text-xs text-secondary transition-transform duration-(--duration-expand) ease-standard"
                style={{
                  transform: isPathOpen ? "rotate(0deg)" : "rotate(-90deg)",
                }}
                >
                  ▾
                </span>
                <span className="min-w-0 truncate">{path.title}</span>
                <span className="ml-auto shrink-0 font-mono text-xs font-normal tabular-nums text-secondary">
                  {pathBookCount(path)} 本
                </span>
              </button>

            {isPathOpen && (
              <div id={pathPanelId} className="mt-2 flex flex-col gap-2.5 pl-4">
                {path.stages.map((stage) => {
                  const stageKey = `${path.slug}::${stage.level}`;
                  const isStageOpen = stageExpanded[stageKey] ?? false;
                  const stagePanelId = `stage-${instanceId}-${path.slug}-${stage.level}`;

                  return (
                    <div key={stage.level}>
                      <button
                        type="button"
                        aria-expanded={isStageOpen}
                        aria-controls={stagePanelId}
                        onClick={() => toggleStage(stageKey)}
                        className={stageButtonClass}
                      >
                        <span
                          aria-hidden="true"
                          className="inline-block shrink-0 text-xs text-secondary transition-transform duration-(--duration-expand) ease-standard"
                          style={{
                            transform: isStageOpen
                              ? "rotate(0deg)"
                              : "rotate(-90deg)",
                          }}
                        >
                          ▾
                        </span>
                        <span>{stage.label}</span>
                      </button>

                      {isStageOpen && (
                        <div
                          id={stagePanelId}
                          className="mt-1 flex flex-col gap-2 pl-4"
                        >
                          {stage.items.map((item) => {
                            if (item.kind === "missing") {
                              return (
                                <p
                                  key={item.title}
                                  className="rounded-control border border-border px-2 py-1 text-[13px] leading-5 text-secondary"
                                >
                                  待补：{item.title}
                                </p>
                              );
                            }

                            const book = item.book;
                            const isCurrentBook =
                              book.bookSlug === currentBookSlug;
                            const isBookOpen =
                              bookExpanded[book.bookSlug] ?? false;
                            const bookPanelId = `book-${instanceId}-${book.bookSlug}`;

                            return (
                              <BookNavItem
                                key={book.bookSlug}
                                book={book}
                                expanded={isBookOpen}
                                isCurrentBook={isCurrentBook}
                                onToggle={() => toggleBook(book.bookSlug)}
                                panelId={bookPanelId}
                                pathname={pathname}
                                optional={item.optional}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </nav>
  );
}
