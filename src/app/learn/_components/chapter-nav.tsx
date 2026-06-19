"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { type LearningPathTree } from "@/lib/content";

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

export function ChapterNav({ paths }: { paths: LearningPathTree }) {
  const pathname = usePathname();
  const currentBookSlug = pathname.split("/")[2] ?? null;

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

  return (
    <nav aria-label="学习路径目录" className="flex flex-col gap-3">
      {paths.map((path) => {
        const isCurrentPath = pathContainsBook(path, currentBookSlug);
        const isPathOpen = pathExpanded[path.slug] ?? false;
        const pathPanelId = `path-${path.slug}`;

        return (
          <section key={path.slug}>
            <button
              type="button"
              aria-expanded={isPathOpen}
              aria-controls={pathPanelId}
              onClick={() => togglePath(path.slug)}
              className={`flex w-full items-center gap-2 rounded-control px-2 py-1 text-left text-base font-semibold transition-colors duration-(--duration-hover) ease-standard ${
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
            </button>

            {isPathOpen && (
              <div id={pathPanelId} className="mt-2 flex flex-col gap-3 pl-3">
                {path.stages.map((stage) => {
                  const stageKey = `${path.slug}::${stage.level}`;
                  const isStageOpen = stageExpanded[stageKey] ?? false;
                  const stagePanelId = `stage-${path.slug}-${stage.level}`;

                  return (
                    <div key={stage.level}>
                      <button
                        type="button"
                        aria-expanded={isStageOpen}
                        aria-controls={stagePanelId}
                        onClick={() => toggleStage(stageKey)}
                        className="flex w-full items-center gap-2 rounded-control px-2 py-1 text-left text-sm font-semibold text-primary transition-colors duration-(--duration-hover) ease-standard hover:text-accent"
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
                          className="mt-1 flex flex-col gap-2 pl-3"
                        >
                          {stage.items.map((item) => {
                            if (item.kind === "missing") {
                              return (
                                <p
                                  key={item.title}
                                  className="rounded-control border border-border px-2 py-1 text-xs text-secondary"
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
                            const bookPanelId = `book-${book.bookSlug}`;

                            return (
                              <div key={book.bookSlug}>
                                <button
                                  type="button"
                                  aria-expanded={isBookOpen}
                                  aria-controls={bookPanelId}
                                  onClick={() => toggleBook(book.bookSlug)}
                                  className={`flex w-full items-center gap-2 rounded-control px-2 py-1 text-left text-sm transition-colors duration-(--duration-hover) ease-standard ${
                                    isCurrentBook
                                      ? "bg-bg text-primary"
                                      : "text-secondary hover:text-primary"
                                  }`}
                                >
                                  <span
                                    aria-hidden="true"
                                    className="inline-block shrink-0 text-xs text-secondary transition-transform duration-(--duration-expand) ease-standard"
                                    style={{
                                      transform: isBookOpen
                                        ? "rotate(0deg)"
                                        : "rotate(-90deg)",
                                    }}
                                  >
                                    ▾
                                  </span>
                                  <span className="min-w-0 truncate">
                                    {book.bookTitle}
                                  </span>
                                  {item.optional && (
                                    <span className="shrink-0 rounded-control border border-border px-1 text-[10px] leading-4 text-secondary">
                                      可选
                                    </span>
                                  )}
                                </button>

                                {isBookOpen && (
                                  <div
                                    id={bookPanelId}
                                    className="mt-2 flex flex-col gap-3 pl-4"
                                  >
                                    {book.sections.map((group) => (
                                      <div key={group.section}>
                                        <p className="px-2 text-xs font-medium text-secondary">
                                          {group.section}
                                        </p>
                                        <ul className="mt-1 flex flex-col gap-1">
                                          {group.chapters.map((chapter) => {
                                            const active =
                                              pathname === chapter.href;
                                            return (
                                              <li key={chapter.href}>
                                                <Link
                                                  href={chapter.href}
                                                  aria-current={
                                                    active ? "page" : undefined
                                                  }
                                                  className={`flex items-center gap-2 rounded-control px-2 py-1 text-sm transition-colors duration-(--duration-hover) ease-standard ${
                                                    active
                                                      ? "bg-accent-glow text-accent"
                                                      : "text-secondary hover:text-primary"
                                                  }`}
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
                                            );
                                          })}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
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
