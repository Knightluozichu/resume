import Link from "next/link";

import type { NavBook } from "@/lib/content";

const bookButtonBaseClass =
  "flex w-full items-center gap-2 rounded-control px-2 py-1.5 text-left text-[15px] font-medium leading-6 transition-colors duration-(--duration-hover) ease-standard";
const sectionLabelClass =
  "px-2 pt-1 text-sm font-semibold leading-5 text-primary/85";
const chapterLinkBaseClass =
  "flex items-center gap-2 rounded-control px-2 py-1 text-[13px] leading-5 transition-colors duration-(--duration-hover) ease-standard";

export function BookNavItem({
  book,
  expanded,
  isCurrentBook,
  onToggle,
  panelId,
  pathname,
  optional = false,
}: {
  book: NavBook;
  expanded: boolean;
  isCurrentBook: boolean;
  onToggle: () => void;
  panelId: string;
  pathname: string;
  optional?: boolean;
}) {
  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className={`${bookButtonBaseClass} ${
          isCurrentBook
            ? "bg-bg text-primary"
            : "text-secondary hover:text-primary"
        }`}
      >
        <span
          aria-hidden="true"
          className="inline-block shrink-0 text-xs text-secondary transition-transform duration-(--duration-expand) ease-standard"
          style={{
            transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
          }}
        >
          ▾
        </span>
        <span className="min-w-0 truncate">{book.bookTitle}</span>
        {optional && (
          <span className="shrink-0 rounded-control border border-border px-1 text-[10px] leading-4 text-secondary">
            可选
          </span>
        )}
      </button>

      {expanded && (
        <div id={panelId} className="mt-2 flex flex-col gap-3 pl-5">
          {book.sections.map((group) => (
            <div key={group.section}>
              <p className={sectionLabelClass}>{group.section}</p>
              <ul className="mt-1 flex flex-col gap-1">
                {group.chapters.map((chapter) => {
                  const active = pathname === chapter.href;

                  return (
                    <li key={chapter.href}>
                      <Link
                        href={chapter.href}
                        aria-current={active ? "page" : undefined}
                        className={`${chapterLinkBaseClass} ${
                          active
                            ? "bg-accent-glow font-medium text-accent"
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
}
