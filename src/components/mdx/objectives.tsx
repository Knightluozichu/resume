/**
 * <Objectives>：学习目标列表（chapter-spec §一）。
 *
 * Server Component（纯展示，无交互）。children 为 MDX 编译出的 markdown 列表节点
 * （<ul><li>…）。容器走 DESIGN 卡片气质（--bg-elevated + 1px border + 12px 圆角），
 * 左上「学习目标」标题 + 靶心图标用 accent 小面积强调，呼应「带验收标准开始读」。
 *
 * 颜色/间距/圆角全部走 DESIGN token（硬规则 5）：
 *  - 卡片：bg-elevated / border-border / rounded-card
 *  - 标题图标：text-accent（小面积）
 *  - 内边距：p-6=24 / 间距 4 倍数
 */
export function Objectives({ children }: { children: React.ReactNode }) {
  return (
    <section
      aria-label="学习目标"
      className="mdx-objectives my-6 rounded-card border border-border bg-elevated p-6"
    >
      <div className="mb-3 flex items-center gap-2">
        {/* 靶心图标：accent 小面积强调 */}
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className="h-4 w-4 text-accent"
        >
          <circle cx="8" cy="8" r="6" />
          <circle cx="8" cy="8" r="2.5" />
        </svg>
        <h2 className="text-base font-semibold text-primary">学习目标</h2>
      </div>
      {/* children 为 markdown 列表；样式继承 .prose，故这里只负责容器 */}
      {children}
    </section>
  );
}
