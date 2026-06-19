/**
 * 全站页脚（Server Component）：CC BY-NC 4.0 声明 + 版权
 */
const footerLinkClass =
  "underline transition-colors duration-(--duration-hover) ease-standard hover:text-accent";

export function SiteFooter() {
  return (
    // data-pagefind-ignore：页脚是全站重复 chrome（出处声明），排除出搜索索引（HEL-42）
    <footer data-pagefind-ignore className="border-t border-border px-6 py-8">
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
        <p>内容组织、复习题与交互演示由 remuse 持续整理中</p>
        <p>© 2026 luozichu</p>
      </div>
    </footer>
  );
}
