/**
 * <CtrDebuggingTestDiagram>：sanitizer 工具矩阵与先测后优流程。
 *
 * 上半：四类诊断工具卡片（ASan 内存/UBSan UB/TSan 并发/Valgrind 全量）及各自抓的问题。
 * 下半：先测后优四步流程（运行→采样定位热点→针对性优化→重新测验证）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×520，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 520;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const CARD_W = 152;
const CARD_GAP = 12;
const CARD_MARGIN = 36;
const cardX = (i: number) => CARD_MARGIN + i * (CARD_W + CARD_GAP);

interface ToolCard {
  name: string;
  color: string;
  catches: string;
  cost: string;
}

const TOOLS: readonly ToolCard[] = [
  { name: "ASan", color: "var(--accent)", catches: "越界·use-after-free", cost: "约 2× 减速" },
  { name: "UBSan", color: "var(--success)", catches: "有符号溢出·空指针", cost: "极低开销" },
  { name: "TSan", color: "var(--warning)", catches: "数据竞争·死锁", cost: "约 5-15× 减速" },
  { name: "Valgrind", color: "var(--danger)", catches: "泄漏·未初始化·全量", cost: "约 10-20× 减速" },
];

const STEPS = ["运行复现", "采样定位热点", "针对性优化", "重新测验证"];
const STEP_W = 150;
const STEP_GAP = 22;
const STEP_MARGIN = 30;

export function CtrDebuggingTestDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="sanitizer 工具矩阵与先测后优流程。上半四类诊断工具：ASan 抓越界和 use-after-free 约 2 倍减速、UBSan 抓有符号溢出和空指针极低开销、TSan 抓数据竞争约 5 到 15 倍减速、Valgrind 抓泄漏和未初始化约 10 到 20 倍减速。下半先测后优四步：运行复现、采样定位热点、针对性优化、重新测验证。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ctr-dbg-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            诊断工具矩阵与先测后优
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            ASan/UBSan/TSan/Valgrind 各司其职 · 先测后优是性能铁律
          </text>

          {/* 上半：四工具卡片 */}
          {TOOLS.map((t, i) => {
            const x = cardX(i);
            return (
              <g key={t.name}>
                <rect x={x} y={80} width={CARD_W} height={150} rx="10" fill={elevated} stroke={t.color} strokeWidth="1.6" strokeOpacity="0.6" />
                <rect x={x} y={80} width={CARD_W} height={34} rx="10" fill={t.color} fillOpacity="0.14" />
                <rect x={x} y={104} width={CARD_W} height={10} fill={t.color} fillOpacity="0.14" />
                <text x={x + CARD_W / 2} y={103} textAnchor="middle" fontSize="13" fontWeight="700" fill={t.color} fontFamily="monospace">{t.name}</text>
                <text x={x + CARD_W / 2} y={138} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={primary}>{t.catches}</text>
                <line x1={x + 16} y1={154} x2={x + CARD_W - 16} y2={154} stroke={border} strokeWidth="1" />
                <text x={x + CARD_W / 2} y={176} textAnchor="middle" fontSize="11" fill={secondary}>开销</text>
                <text x={x + CARD_W / 2} y={196} textAnchor="middle" fontSize="11" fontWeight="600" fill={secondary} fontFamily="monospace">{t.cost}</text>
                <text x={x + CARD_W / 2} y={218} textAnchor="middle" fontSize="11" fill={t.color}>{i === 3 ? "无需重编" : "需重编"}</text>
              </g>
            );
          })}

          {/* 分隔线 */}
          <line x1={32} y1={260} x2={VIEW_W - 32} y2={260} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={284} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            先测后优：性能优化流程
          </text>

          {/* 下半：四步流程 */}
          {STEPS.map((s, i) => {
            const x = STEP_MARGIN + i * (STEP_W + STEP_GAP);
            const isLast = i === STEPS.length - 1;
            return (
              <g key={s}>
                <rect x={x} y={306} width={STEP_W} height={64} rx="10" fill={elevated} stroke="var(--accent)" strokeWidth="1.6" />
                <circle cx={x + 28} cy={338} r="16" fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="1.4" />
                <text x={x + 28} y={343} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">{i + 1}</text>
                <text x={x + 92} y={343} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={primary}>{s}</text>
                {!isLast && (
                  <line x1={x + STEP_W + 4} y1={338} x2={x + STEP_W + STEP_GAP - 4} y2={338} stroke={secondary} strokeWidth="1.8" markerEnd="url(#ctr-dbg-arr)" />
                )}
              </g>
            );
          })}

          {/* 流程说明 */}
          <text x={VIEW_W / 2} y={402} textAnchor="middle" fontSize="12" fill={secondary}>
            优化顺序：算法复杂度 → 数据布局/缓存 → 微优化（位运算等）
          </text>
          <text x={VIEW_W / 2} y={424} textAnchor="middle" fontSize="12" fill={secondary}>
            Amdahl 定律：只优化占比最大的部分才有显著收益
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={454} x2={VIEW_W - 32} y2={454} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={478} textAnchor="middle" fontSize="12" fill={secondary}>
            Release 偶发崩溃优先怀疑 UB/内存 · 在保留优化配置下用 sanitizer 复现
          </text>
          <text x={VIEW_W / 2} y={498} textAnchor="middle" fontSize="12" fill={secondary}>
            工具顺序：ASan 内存 → UBSan UB → TSan 并发 → GDB 手动
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四类诊断工具（ASan/UBSan/TSan/Valgrind）各抓一类问题；性能优化遵循先测后优——采样定位热点再针对性优化并验证。
      </figcaption>
    </figure>
  );
}
