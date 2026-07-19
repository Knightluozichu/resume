/** 全站页脚（Server Component）：具体来源与许可证由章级 Attribution 声明。 */
export function SiteFooter() {
  return (
    // data-pagefind-ignore：页脚是全站重复 chrome（出处声明），排除出搜索索引（HEL-42）
    <footer data-pagefind-ignore className="border-t border-border px-6 py-8">
      <div className="flex flex-col gap-2 text-xs text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>
          章节来源、改写范围与许可证以各页“来源与改写范围”声明为准
        </p>
        <p>内容组织、复习题与交互演示由 remuse 持续整理中</p>
        <p>© 2026 luozichu</p>
      </div>
    </footer>
  );
}
