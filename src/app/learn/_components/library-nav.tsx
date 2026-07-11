"use client";

import { useId, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import type { LearningPathTree } from "@/lib/content";

import { BookNavItem } from "./book-nav-item";
import { ChapterNav } from "./chapter-nav";

type NavMode = "books" | "paths";

export function LibraryNav({
  paths,
}: {
  paths: LearningPathTree;
}) {
  const pathname = usePathname();
  const currentBookSlug = pathname.split("/")[2] ?? null;
  const instanceId = useId().replace(/:/g, "");
  const [mode, setMode] = useState<NavMode>("paths");
  const [query, setQuery] = useState("");
  const [bookExpanded, setBookExpanded] = useState<Record<string, boolean>>({});

  const books = useMemo(
    () =>
      paths.flatMap((path) =>
        path.stages.flatMap((stage) =>
          stage.items.flatMap((item) =>
            item.kind === "book" ? [item.book] : [],
          ),
        ),
      ),
    [paths],
  );

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return books;

    return books.filter(
      (book) =>
        book.bookTitle.toLocaleLowerCase().includes(normalizedQuery) ||
        book.bookSlug.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [books, query]);

  const booksPanelId = `library-books-${instanceId}`;
  const pathsPanelId = `library-paths-${instanceId}`;

  return (
    <div className="flex flex-col gap-4">
      <div
        role="tablist"
        aria-label="目录视图"
        className="grid grid-cols-2 gap-1 rounded-control border border-border bg-bg/60 p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "books"}
          aria-controls={booksPanelId}
          onClick={() => setMode("books")}
          className={`rounded-control px-2 py-1.5 text-sm transition-colors duration-(--duration-hover) ease-standard ${
            mode === "books"
              ? "bg-elevated font-medium text-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          全部图书
          <span className="ml-1 font-mono text-xs tabular-nums">
            {books.length}
          </span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "paths"}
          aria-controls={pathsPanelId}
          onClick={() => setMode("paths")}
          className={`rounded-control px-2 py-1.5 text-sm transition-colors duration-(--duration-hover) ease-standard ${
            mode === "paths"
              ? "bg-elevated font-medium text-primary"
              : "text-secondary hover:text-primary"
          }`}
        >
          学习路径
          <span className="ml-1 font-mono text-xs tabular-nums">
            {paths.length}
          </span>
        </button>
      </div>

      {mode === "books" ? (
        <div id={booksPanelId} role="tabpanel">
          <label htmlFor={`book-search-${instanceId}`} className="sr-only">
            搜索图书
          </label>
          <input
            id={`book-search-${instanceId}`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`搜索 ${books.length} 本图书`}
            className="w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary outline-none transition-colors duration-(--duration-hover) ease-standard placeholder:text-secondary focus:border-accent"
          />
          <p
            aria-live="polite"
            className="px-2 pb-2 pt-3 text-xs text-secondary"
          >
            显示 {filteredBooks.length} / {books.length} 本
          </p>

          {filteredBooks.length > 0 ? (
            <nav
              aria-label="全部图书目录"
              className="flex flex-col gap-1"
            >
              {filteredBooks.map((book) => {
                const expanded =
                  bookExpanded[book.bookSlug] ??
                  book.bookSlug === currentBookSlug;

                return (
                  <BookNavItem
                    key={book.bookSlug}
                    book={book}
                    expanded={expanded}
                    isCurrentBook={book.bookSlug === currentBookSlug}
                    onToggle={() =>
                      setBookExpanded((previous) => ({
                        ...previous,
                        [book.bookSlug]: !expanded,
                      }))
                    }
                    panelId={`catalog-book-${instanceId}-${book.bookSlug}`}
                    pathname={pathname}
                  />
                );
              })}
            </nav>
          ) : (
            <p className="rounded-control border border-border px-3 py-4 text-sm text-secondary">
              没有匹配的图书
            </p>
          )}
        </div>
      ) : (
        <div id={pathsPanelId} role="tabpanel">
          <ChapterNav paths={paths} />
        </div>
      )}
    </div>
  );
}
