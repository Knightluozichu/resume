/**
 * 全站页脚（Server Component）：CC BY-NC 4.0 声明 + 版权
 */
const footerLinkClass =
  "underline transition-colors duration-(--duration-hover) ease-standard hover:text-accent";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="flex flex-col gap-2 text-xs text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>
          教程内容改编自{" "}
          <a
            href="https://learnopengl.com"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            LearnOpenGL
          </a>
          （
          <a
            href="https://learnopengl-cn.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClass}
          >
            中文译本
          </a>
          ），遵循 CC BY-NC 4.0
        </p>
        <p>© 2026 luozichu</p>
      </div>
    </footer>
  );
}
