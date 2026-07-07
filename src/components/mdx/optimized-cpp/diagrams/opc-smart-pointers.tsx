/**
 * <OpcSmartPtrPerfDiagram>：智能指针性能（optimized-cpp 智能指针章）。
 *
 * 三列对比：unique_ptr（绿，零开销）/ shared_ptr（红，原子引用计数开销）/ 裸指针（灰，基准）。
 * 每列含开销来源、性能评级、使用建议。
 * 底部总结：优先 unique_ptr，谨慎用 shared_ptr。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 440;

type Ptr = {
  id: string;
  name: string;
  color: string;
  perf: string;
  overhead: string;
  advice: string;
};

const PTRS: readonly Ptr[] = [
  {
    id: "unique",
    name: "unique_ptr",
    color: "var(--success)",
    perf: "零开销",
    overhead: "编译期所有权\n无运行时成本",
    advice: "默认首选\n可 move 不可 copy",
  },
  {
    id: "shared",
    name: "shared_ptr",
    color: "var(--danger)",
    perf: "有开销",
    overhead: "原子引用计数\n控制块堆分配",
    advice: "共享所有权时用\n避免循环引用",
  },
  {
    id: "raw",
    name: "裸指针",
    color: "var(--text-secondary)",
    perf: "基准",
    overhead: "无任何开销\n无任何保护",
    advice: "仅性能极限场景\n手动管理生命周期",
  },
];

export function OpcSmartPtrPerfDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="智能指针性能对比图。三列：unique_ptr（绿色，零开销，编译期所有权无运行时成本，默认首选）、shared_ptr（红色，有开销，原子引用计数加控制块堆分配，共享所有权时用）、裸指针（灰色，基准，无任何开销也无任何保护，仅性能极限场景）。底部总结：优先 unique_ptr，谨慎用 shared_ptr。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            智能指针性能 · 开销对比
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            unique_ptr 零开销等于裸指针；shared_ptr 的原子引用计数是隐藏成本
          </text>

          {/* ===== 三列卡片 ===== */}
          {PTRS.map((p, i) => {
            const x = 44 + i * 220;
            const w = 200;
            return (
              <g key={p.id}>
                <rect x={x} y="80" width={w} height="250" rx="10" fill="var(--bg)" stroke={p.color} strokeWidth="1.2" strokeOpacity="0.5" />
                {/* 标题 pill */}
                <rect x={x + 12} y="92" width={w - 24} height="30" rx="8" fill={p.color} fillOpacity="0.12" stroke={p.color} strokeWidth="1.2" />
                <text x={x + w / 2} y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill={p.color}>{p.name}</text>
                {/* 性能评级 */}
                <text x={x + w / 2} y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">性能</text>
                <text x={x + w / 2} y="166" textAnchor="middle" fontSize="16" fontWeight="700" fill={p.color}>{p.perf}</text>
                <line x1={x + 16} y1="180" x2={x + w - 16} y2="180" stroke="var(--border)" strokeWidth="1" />
                {/* 开销来源 */}
                <text x={x + w / 2} y="198" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">开销来源</text>
                {p.overhead.split("\n").map((line, li) => (
                  <text key={li} x={x + w / 2} y={216 + li * 18} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{line}</text>
                ))}
                <line x1={x + 16} y1="256" x2={x + w - 16} y2="256" stroke="var(--border)" strokeWidth="1" />
                {/* 使用建议 */}
                <text x={x + w / 2} y="274" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">使用建议</text>
                {p.advice.split("\n").map((line, li) => (
                  <text key={li} x={x + w / 2} y={292 + li * 18} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{line}</text>
                ))}
              </g>
            );
          })}

          {/* ===== 底部总结 ===== */}
          <rect x="60" y="360" width={VIEW_W - 120} height="56" rx="12" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="384" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">
            选择原则：优先 unique_ptr，谨慎用 shared_ptr
          </text>
          <text x={VIEW_W / 2} y="404" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            unique_ptr 零成本提供所有权语义；shared_ptr 的原子操作在多线程下有缓存行竞争开销
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        unique_ptr 编译期所有权转移，运行时与裸指针无差异；shared_ptr 需要原子引用计数和独立控制块，在多线程场景下因缓存同步产生额外开销。默认用 unique_ptr，只有真正需要共享所有权时才用 shared_ptr。
      </figcaption>
    </figure>
  );
}
