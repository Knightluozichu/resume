/**
 * <MrsMemoryMgmtDiagram>：Rust 内存管理图解。
 *
 * 所有权三原则 + 借用规则 + 生命周期，对比 Stack/Heap 布局。
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

interface Rule {
  title: string;
  desc: string;
  color: string;
}

const OWNERSHIP_RULES: readonly Rule[] = [
  { title: "唯一所有者", desc: "每个值只有一个所有者", color: accent },
  { title: "作用域释放", desc: "所有者离开作用域自动 drop", color: success },
  { title: "移动语义", desc: "赋值/传参转移所有权", color: warning },
];

interface BorrowRule {
  title: string;
  desc: string;
  color: string;
}

const BORROW_RULES: readonly BorrowRule[] = [
  { title: "多个 &T", desc: "多个不可变借用共存", color: success },
  { title: "一个 &mut T", desc: "唯一可变借用独占", color: danger },
  { title: "互斥", desc: "可变与不可变不能同时存在", color: warning },
];

export function MrsMemoryMgmtDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Rust内存管理图解：所有权三原则、借用规则和生命周期，对比栈和堆的内存布局。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Rust 内存管理：所有权 · 借用 · 生命周期
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            无 GC 的编译期内存安全 · 零运行时开销
          </text>

          {/* 左面板：所有权三原则 */}
          <rect x={36} y={80} width={200} height={220} rx="10" fill={elevated} stroke={border} strokeWidth="1.2" />
          <text x={136} y={104} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            所有权三原则
          </text>
          <line x1={56} y1={116} x2={216} y2={116} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          {OWNERSHIP_RULES.map((r, i) => {
            const y = 140 + i * 52;
            return (
              <g key={r.title}>
                <circle cx={56} cy={y} r="5" fill={r.color} />
                <text x={70} y={y - 4} fontSize="12" fontWeight="600" fill={primary}>
                  {r.title}
                </text>
                <text x={70} y={y + 12} fontSize="11" fill={secondary}>
                  {r.desc}
                </text>
              </g>
            );
          })}

          {/* 中面板：借用规则 */}
          <rect x={260} y={80} width={200} height={220} rx="10" fill={elevated} stroke={border} strokeWidth="1.2" />
          <text x={360} y={104} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            借用规则
          </text>
          <line x1={280} y1={116} x2={440} y2={116} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          {BORROW_RULES.map((r, i) => {
            const y = 140 + i * 52;
            return (
              <g key={r.title}>
                <circle cx={280} cy={y} r="5" fill={r.color} />
                <text x={294} y={y - 4} fontSize="12" fontWeight="600" fill={primary}>
                  {r.title}
                </text>
                <text x={294} y={y + 12} fontSize="11" fill={secondary}>
                  {r.desc}
                </text>
              </g>
            );
          })}

          {/* 右面板：栈 vs 堆 */}
          <rect x={484} y={80} width={200} height={220} rx="10" fill={elevated} stroke={border} strokeWidth="1.2" />
          <text x={584} y={104} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
            栈 vs 堆
          </text>
          <line x1={504} y1={116} x2={664} y2={116} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          {/* 栈 */}
          <rect x={504} y={128} width={74} height={70} rx="6" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1" />
          <text x={541} y={148} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>Stack</text>
          <text x={541} y={166} textAnchor="middle" fontSize="11" fill={secondary}>固定大小</text>
          <text x={541} y={182} textAnchor="middle" fontSize="11" fill={secondary}>自动管理</text>
          {/* 堆 */}
          <rect x={590} y={128} width={74} height={70} rx="6" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1" />
          <text x={627} y={148} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>Heap</text>
          <text x={627} y={166} textAnchor="middle" fontSize="11" fill={secondary}>动态大小</text>
          <text x={627} y={182} textAnchor="middle" fontSize="11" fill={secondary}>所有权管</text>
          {/* 生命周期 */}
          <rect x={504} y={212} width={160} height={70} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x={584} y={232} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>生命周期 'a</text>
          <text x={584} y={250} textAnchor="middle" fontSize="11" fill={secondary}>编译期标注引用</text>
          <text x={584} y={266} textAnchor="middle" fontSize="11" fill={secondary}>防止悬垂引用</text>

          {/* 底部总结 */}
          <line x1={32} y1={326} x2={VIEW_W - 32} y2={326} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={348} textAnchor="middle" fontSize="11" fill={secondary}>
            所有权管释放 · 借用管访问 · 生命周期管引用有效期
          </text>
          <text x={VIEW_W / 2} y={366} textAnchor="middle" fontSize="11" fill={secondary}>
            编译期检查 · 运行时零开销 · 无 GC
          </text>
          <text x={VIEW_W / 2} y={384} textAnchor="middle" fontSize="11" fill={secondary}>
            能编译通过 = 内存安全保证
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rust 内存管理：所有权三原则、借用规则与生命周期，无 GC 的编译期安全。
      </figcaption>
    </figure>
  );
}
