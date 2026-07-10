/**
 * <Callout type="tip|warn|trap|info|warning|insight|success|danger">：提示 / 警告 / 误区框。
 *
 * Server Component（纯展示）。DESIGN 语义色「仅小面积」约束：
 * 语义色只用在左边框（2px）与图标上，背景统一 --bg-elevated（不做大面积语义色块）。
 *  - tip     → 绿 --success
 *  - warn    → 黄 --warning
 *  - trap    → 红 --danger
 *  - info    → 蓝 --accent
 *  - insight → 蓝 --accent
 *  - warning → 黄 --warning (alias for warn)
 *  - success → 绿 --success (alias for tip)
 *  - danger  → 红 --danger  (alias for trap)
 *
 * 颜色/间距/圆角全部走 DESIGN token（硬规则 5）。
 */
type CalloutType = "tip" | "warn" | "trap" | "info" | "warning" | "insight" | "success" | "danger";

const CONFIG: Record<
  CalloutType,
  { label: string; colorClass: string; icon: React.ReactNode }
> = {
  tip: {
    label: "提示",
    colorClass: "text-success",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" />
        <path d="M8 5.25v.5M8 7.5v3.25" strokeLinecap="round" />
      </>
    ),
  },
  warn: {
    label: "警告",
    colorClass: "text-warning",
    icon: (
      <>
        <path d="M8 1.75 1.5 13.5h13L8 1.75Z" strokeLinejoin="round" />
        <path d="M8 6.5v3M8 11.25v.25" strokeLinecap="round" />
      </>
    ),
  },
  trap: {
    label: "误区",
    colorClass: "text-danger",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" />
        <path d="M5.5 5.5 10.5 10.5M10.5 5.5 5.5 10.5" strokeLinecap="round" />
      </>
    ),
  },
  info: {
    label: "说明",
    colorClass: "text-accent",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" />
        <path d="M8 7.5v3.25M8 5.25v.25" strokeLinecap="round" />
      </>
    ),
  },
  insight: {
    label: "洞察",
    colorClass: "text-accent",
    icon: (
      <>
        <path d="M8 1.75a4.5 4.5 0 0 0-2.5 8.25v1.5h5v-1.5A4.5 4.5 0 0 0 8 1.75Z" strokeLinejoin="round" />
        <path d="M6.5 13.25h3" strokeLinecap="round" />
      </>
    ),
  },
  warning: {
    label: "警告",
    colorClass: "text-warning",
    icon: (
      <>
        <path d="M8 1.75 1.5 13.5h13L8 1.75Z" strokeLinejoin="round" />
        <path d="M8 6.5v3M8 11.25v.25" strokeLinecap="round" />
      </>
    ),
  },
  success: {
    label: "提示",
    colorClass: "text-success",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" />
        <path d="M5.5 8.5 7 10l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  danger: {
    label: "误区",
    colorClass: "text-danger",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" />
        <path d="M5.5 5.5 10.5 10.5M10.5 5.5 5.5 10.5" strokeLinecap="round" />
      </>
    ),
  },
};

export function Callout({
  type = "tip",
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const { label, colorClass, icon } = CONFIG[type];
  return (
    <aside
      // 左边框 2px 用语义色（小面积）；用内联 border-color 引用 currentColor 让语义色随 colorClass 走
      className={`mdx-callout my-4 flex gap-3 rounded-control border border-border border-l-2 bg-elevated p-4 ${colorClass}`}
      style={{ borderLeftColor: "currentColor" }}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        className="mt-1 h-4 w-4 shrink-0"
      >
        {icon}
      </svg>
      <div className="min-w-0 flex-1 text-primary">
        <p className={`mb-1 text-xs font-semibold ${colorClass}`}>{label}</p>
        {children}
      </div>
    </aside>
  );
}
