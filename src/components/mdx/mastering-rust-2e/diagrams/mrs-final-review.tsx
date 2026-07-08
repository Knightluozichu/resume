/**
 * <MrsFinalReviewDiagram>：精通 Rust 第2版 全书四象限能力自检图。
 *
 * 四大板块（进阶基础 · 内存并发 · 元编程 · 生态工程）能力矩阵。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

interface Quadrant {
  title: string;
  color: string;
  skills: string[];
  cx: number;
  cy: number;
}

const QUADRANTS: readonly Quadrant[] = [
  {
    title: "进阶基础",
    color: accent,
    skills: ["Newtype 类型安全", "DST 胖指针", "Never 类型"],
    cx: 180,
    cy: 130,
  },
  {
    title: "内存与并发",
    color: success,
    skills: ["所有权+借用规则", "Send/Sync 线程安全", "async/await 零成本"],
    cx: 540,
    cy: 130,
  },
  {
    title: "元编程",
    color: warning,
    skills: ["声明宏+过程宏", "Trait 关联类型/分发", "Unsafe 安全封装"],
    cx: 180,
    cy: 280,
  },
  {
    title: "生态与工程",
    color: danger,
    skills: ["WebAssembly 跨平台", "async 网络编程", "综合工程能力"],
    cx: 540,
    cy: 280,
  },
];

export function MrsFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="精通Rust第2版全书四象限能力自检图：进阶基础、内存与并发、元编程、生态与工程四大板块核心能力。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            精通 Rust 第2版 全书能力自检
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            四大板块 · 十章知识 · 零成本抽象 + 编译期安全
          </text>

          {/* 十字分隔线 */}
          <line x1={360} y1={76} x2={360} y2={340} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <line x1={40} y1={208} x2={680} y2={208} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 四象限 */}
          {QUADRANTS.map((q) => (
            <g key={q.title}>
              <rect x={q.cx - 150} y={q.cy - 44} width={300} height={96} rx="10" fill={q.color} fillOpacity="0.06" stroke={q.color} strokeWidth="1.2" />
              <circle cx={q.cx - 130} cy={q.cy - 24} r="8" fill={q.color} fillOpacity="0.2" stroke={q.color} strokeWidth="1.4" />
              <text x={q.cx - 110} y={q.cy - 20} fontSize="13" fontWeight="700" fill={q.color}>
                {q.title}
              </text>
              {q.skills.map((s, i) => (
                <text key={s} x={q.cx - 130} y={q.cy + 2 + i * 16} fontSize="11" fill={primary}>
                  {`· ${s}`}
                </text>
              ))}
            </g>
          ))}

          {/* 底部总结 */}
          <line x1={32} y1={352} x2={VIEW_W - 32} y2={352} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={372} textAnchor="middle" fontSize="11" fill={secondary}>
            类型是地基 · 内存并发是核心 · 元编程是利器 · 生态是落地
          </text>
          <text x={VIEW_W / 2} y={390} textAnchor="middle" fontSize="11" fill={secondary}>
            零成本抽象 + 编译期安全 = Rust 的设计哲学
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        精通 Rust 第2版 全书四象限能力自检：四大板块核心技能一览。
      </figcaption>
    </figure>
  );
}
