import Link from "next/link";

/**
 * 全站顶部导航（Server Component）
 * 吸顶 + 底部 1px border 分隔；ghost 风格：默认安静，hover 120ms 档亮起
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg">
      <nav
        aria-label="全站导航"
        className="flex h-12 items-center justify-between px-6"
      >
        <Link
          href="/"
          className="text-base font-semibold transition-colors duration-(--duration-hover) ease-standard hover:text-accent"
        >
          re<span className="text-accent">muse</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/learn"
            className="rounded-control px-2 py-1 text-secondary transition-colors duration-(--duration-hover) ease-standard hover:text-primary"
          >
            教程
          </Link>
          <a
            href="https://github.com/Knightluozichu/resume"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub 仓库"
            className="rounded-control p-1 text-secondary transition-colors duration-(--duration-hover) ease-standard hover:text-primary"
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}
