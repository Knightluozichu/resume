/**
 * <MrsUnsafeDeepDiagram>：Rust Unsafe 深入图解。
 *
 * Unsafe 的五项能力 + 安全边界封装模式 + 最小化原则。
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

interface UnsafePower {
  title: string;
  desc: string;
  color: string;
  y: number;
}

const POWERS: readonly UnsafePower[] = [
  { title: "解引用裸指针", desc: "*const T / *mut T", color: danger, y: 100 },
  { title: "调用 unsafe 函数", desc: "包括 FFI (C 函数)", color: warning, y: 132 },
  { title: "访问/修改可变 static", desc: "全局可变状态", color: accent, y: 164 },
  { title: "访问 union 字段", desc: "不安全联合体", color: success, y: 196 },
  { title: "实现 unsafe trait", desc: "如 Send/Sync 手动实现", color: danger, y: 228 },
];

export function MrsUnsafeDeepDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Rust Unsafe深入图解：五项unsafe能力、安全封装模式和最小化原则。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Rust Unsafe：安全边界的守护者
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            五项能力 · 封装模式 · 最小化原则
          </text>

          {/* 左面板：Unsafe 五项能力 */}
          <rect x={36} y={76} width={340} height={196} rx="10" fill={danger} fillOpacity="0.04" stroke={danger} strokeWidth="1.2" />
          <text x={206} y={96} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>
            unsafe 块的五项能力
          </text>
          <line x1={56} y1={106} x2={356} y2={106} stroke={danger} strokeWidth="1" strokeOpacity="0.3" />
          {POWERS.map((p) => (
            <g key={p.title}>
              <circle cx={58} cy={p.y} r="4" fill={p.color} />
              <text x={72} y={p.y - 2} fontSize="11" fontWeight="600" fill={primary}>
                {p.title}
              </text>
              <text x={72} y={p.y + 12} fontSize="11" fill={secondary} fontFamily="monospace">
                {p.desc}
              </text>
            </g>
          ))}

          {/* 右面板：安全封装模式 */}
          <rect x={396} y={76} width={288} height={196} rx="10" fill={success} fillOpacity="0.04" stroke={success} strokeWidth="1.2" />
          <text x={540} y={96} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            安全封装模式
          </text>
          <line x1={416} y1={106} x2={664} y2={106} stroke={success} strokeWidth="1" strokeOpacity="0.3" />

          {/* 封装步骤 */}
          <rect x={416} y={116} width={248} height={36} rx="6" fill={elevated} stroke={warning} strokeWidth="1" />
          <text x={540} y={130} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>1. unsafe 操作集中在内部</text>
          <text x={540} y={144} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">unsafe {{ /* raw ptr */ }}</text>

          <line x1={540} y1={152} x2={540} y2={162} stroke={secondary} strokeWidth="1" markerEnd="url(#mrs-ud-arrow)" />

          <rect x={416} y={166} width={248} height={36} rx="6" fill={elevated} stroke={accent} strokeWidth="1" />
          <text x={540} y={180} textAnchor="middle" fontSize="11" fontWeight="600" fill={accent}>2. 公开 safe API 做不变量检查</text>
          <text x={540} y={194} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">pub fn get(&amp;self) -&gt; &amp;T</text>

          <line x1={540} y1={202} x2={540} y2={212} stroke={secondary} strokeWidth="1" markerEnd="url(#mrs-ud-arrow)" />

          <rect x={416} y={216} width={248} height={44} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={540} y={232} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>3. 外部调用者只用 safe API</text>
          <text x={540} y={248} textAnchor="middle" fontSize="11" fill={secondary}>不变量由封装层保证</text>

          <defs>
            <marker id="mrs-ud-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 底部：最小化原则 */}
          <line x1={32} y1={296} x2={VIEW_W - 32} y2={296} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <rect x={48} y={306} width={624} height={64} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={60} y={326} fontSize="12" fontWeight="700" fill={warning}>
            最小化原则：Unsafe 代码越少越好
          </text>
          <text x={60} y={344} fontSize="11" fill={secondary}>
            · 每个 unsafe 块必须有注释说明为何安全 · 用 safe API 封装暴露给外部 · 集中在一个模块便于审计
          </text>
          <text x={60} y={360} fontSize="11" fill={secondary}>
            · Unsafe 不是「禁用检查」，而是「由程序员承担检查责任」 · 能 Safe 就不 Unsafe
          </text>

          <text x={VIEW_W / 2} y={388} textAnchor="middle" fontSize="11" fill={secondary}>
            Rust 的安全 = Safe 层保证 + Unsafe 层封装 · 责任明确边界清晰
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rust Unsafe 深入：五项能力、安全封装模式与最小化原则。
      </figcaption>
    </figure>
  );
}
