/**
 * <AaeParallelAlgorithmsDiagram>：并行算法模型图（advanced-algorithm 并行算法章）。
 *
 * 三种并行计算模型并排对比：
 *   - MapReduce（accent 紫）：Map → Shuffle → Reduce 三阶段
 *   - BSP（success 绿）：Superstep = Compute → Communicate → Barrier Sync
 *   - PRAM（warning 暖）：多处理器共享内存
 * 各标注适用场景与关键度量，底部统一说明 Work / Span / Parallelism。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×450（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 450;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const CARD_W = 210;
const CARD_X = [32, 254, 476];
const CARD_Y = 72;
const CARD_H = 326;

interface ColDef {
  title: string;
  subtitle: string;
  color: string;
  scene: string;
  metric: string;
}

const COLS: readonly ColDef[] = [
  { title: "MapReduce", subtitle: "批处理模型", color: accent, scene: "离线大数据批处理", metric: "Map / Reduce 任务数" },
  { title: "BSP", subtitle: "整体同步并行", color: success, scene: "迭代计算 · 图计算", metric: "Superstep 数 · Work / Span" },
  { title: "PRAM", subtitle: "共享内存模型", color: warning, scene: "理论模型 · 多核共享内存", metric: "Work · Span · Parallelism" },
];

export function AaeParallelAlgorithmsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并行算法模型图。三种并行计算模型并排：MapReduce（紫色，Map→Shuffle→Reduce 三阶段，离线批处理）；BSP（绿色，Superstep 计算→通信→栅栏同步，迭代图计算）；PRAM（暖色，多处理器共享内存，理论模型）。底部说明复杂度度量 Work、Span、Parallelism。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="pa-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
            <marker id="pa-loop" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={success} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            并行算法 · 三大计算模型
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            批处理同步、整体同步、共享内存——三种并行抽象
          </text>

          {/* 三列 */}
          {COLS.map((col, ci) => {
            const x = CARD_X[ci];
            return (
              <g key={col.title}>
                {/* 列背景 */}
                <rect x={x} y={CARD_Y} width={CARD_W} height={CARD_H} rx="12" fill={col.color} fillOpacity="0.05" stroke={col.color} strokeWidth="1.6" strokeOpacity="0.5" />
                {/* 头部 */}
                <rect x={x} y={CARD_Y} width={CARD_W} height={34} rx="12" fill={col.color} fillOpacity="0.14" />
                <rect x={x} y={CARD_Y + 16} width={CARD_W} height={18} fill={col.color} fillOpacity="0.14" />
                <text x={x + CARD_W / 2} y={CARD_Y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={col.color} fontFamily="monospace">
                  {col.title}
                </text>
                <text x={x + CARD_W / 2} y={CARD_Y + 52} textAnchor="middle" fontSize="11" fill={secondary}>
                  {col.subtitle}
                </text>

                {/* ===== MapReduce 图示 ===== */}
                {ci === 0 && (
                  <g>
                    {/* Map 行 */}
                    {[72, 118, 164].map((mx, i) => (
                      <g key={`mr-map-${i}`}>
                        <rect x={mx} y={CARD_Y + 66} width="38" height="28" rx="4" fill={elevated} stroke={col.color} strokeWidth="1.4" />
                        <text x={mx + 19} y={CARD_Y + 84} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={col.color} fontFamily="monospace">Map</text>
                      </g>
                    ))}
                    {/* Map → Shuffle 箭头 */}
                    {[91, 137, 183].map((mx, i) => (
                      <line key={`mr-ms-${i}`} x1={mx} y1={CARD_Y + 94} x2={137} y2={CARD_Y + 120} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pa-arr)" />
                    ))}
                    {/* Shuffle */}
                    <rect x={72} y={CARD_Y + 120} width="130" height="26" rx="5" fill={col.color} fillOpacity="0.18" stroke={col.color} strokeWidth="1.5" />
                    <text x={137} y={CARD_Y + 137} textAnchor="middle" fontSize="11" fontWeight="700" fill={col.color} fontFamily="monospace">Shuffle</text>
                    {/* Shuffle → Reduce 箭头 */}
                    {[106, 168].map((mx, i) => (
                      <line key={`mr-sr-${i}`} x1={137} y1={CARD_Y + 146} x2={mx} y2={CARD_Y + 172} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pa-arr)" />
                    ))}
                    {/* Reduce 行 */}
                    {[80, 142].map((mx, i) => (
                      <g key={`mr-red-${i}`}>
                        <rect x={mx} y={CARD_Y + 172} width="52" height="28" rx="4" fill={elevated} stroke={col.color} strokeWidth="1.4" />
                        <text x={mx + 26} y={CARD_Y + 190} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={col.color} fontFamily="monospace">Reduce</text>
                      </g>
                    ))}
                  </g>
                )}

                {/* ===== BSP 图示 ===== */}
                {ci === 1 && (
                  <g>
                    {/* 处理器 */}
                    {[323, 359, 395].map((px, i) => (
                      <g key={`bsp-p-${i}`}>
                        <circle cx={px} cy={CARD_Y + 76} r="11" fill={elevated} stroke={col.color} strokeWidth="1.5" />
                        <text x={px} y={CARD_Y + 80} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={col.color} fontFamily="monospace">P{i}</text>
                      </g>
                    ))}
                    {/* Superstep 盒 */}
                    <rect x={282} y={CARD_Y + 100} width="154" height="120" rx="8" fill={col.color} fillOpacity="0.08" stroke={col.color} strokeWidth="1.6" />
                    <text x={359} y={CARD_Y + 118} textAnchor="middle" fontSize="11" fontWeight="700" fill={col.color}>Superstep</text>
                    <text x={294} y={CARD_Y + 142} fontSize="11" fill={primary}>① Compute 计算</text>
                    <text x={294} y={CARD_Y + 166} fontSize="11" fill={primary}>② Communicate 通信</text>
                    <text x={294} y={CARD_Y + 190} fontSize="11" fill={primary}>③ Barrier 栅栏同步</text>
                    <line x1={294} y1={CARD_Y + 200} x2={424} y2={CARD_Y + 200} stroke={col.color} strokeWidth="1" strokeOpacity="0.4" />
                    <text x={359} y={CARD_Y + 214} textAnchor="middle" fontSize="10" fill={secondary}>每步末尾全局同步</text>
                    {/* 循环箭头 */}
                    <path d={`M 436 ${CARD_Y + 160} C 460 ${CARD_Y + 160}, 460 ${CARD_Y + 110}, 436 ${CARD_Y + 110}`} fill="none" stroke={col.color} strokeWidth="1.4" markerEnd="url(#pa-loop)" />
                    <text x={458} y={CARD_Y + 138} fontSize="9.5" fill={col.color}>循环</text>
                  </g>
                )}

                {/* ===== PRAM 图示 ===== */}
                {ci === 2 && (
                  <g>
                    {/* 处理器 */}
                    {[524, 560, 596, 632].map((px, i) => (
                      <g key={`pram-p-${i}`}>
                        <circle cx={px} cy={CARD_Y + 76} r="11" fill={elevated} stroke={col.color} strokeWidth="1.5" />
                        <text x={px} y={CARD_Y + 80} textAnchor="middle" fontSize="9" fontWeight="700" fill={col.color} fontFamily="monospace">P{i}</text>
                      </g>
                    ))}
                    {/* 箭头到共享内存 */}
                    {[524, 560, 596, 632].map((px, i) => (
                      <line key={`pram-l-${i}`} x1={px} y1={CARD_Y + 87} x2={px} y2={CARD_Y + 150} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pa-arr)" />
                    ))}
                    {/* 共享内存 */}
                    <rect x={496} y={CARD_Y + 150} width="170" height="56" rx="8" fill={col.color} fillOpacity="0.1" stroke={col.color} strokeWidth="1.6" />
                    <text x={581} y={CARD_Y + 168} textAnchor="middle" fontSize="11" fontWeight="700" fill={col.color}>共享内存 Shared Memory</text>
                    {/* 内存单元 */}
                    {[508, 542, 576, 610, 644].map((mx, i) => (
                      <g key={`pram-m-${i}`}>
                        <rect x={mx} y={CARD_Y + 178} width="28" height="22" rx="3" fill={elevated} stroke={col.color} strokeWidth="1.2" />
                        <text x={mx + 14} y={CARD_Y + 193} textAnchor="middle" fontSize="9.5" fill={primary} fontFamily="monospace">M{i}</text>
                      </g>
                    ))}
                  </g>
                )}

                {/* 分隔线 */}
                <line x1={x + 14} y1={CARD_Y + 244} x2={x + CARD_W - 14} y2={CARD_Y + 244} stroke={border} strokeWidth="1" strokeDasharray="3 3" />

                {/* 场景 */}
                <rect x={x + 12} y={CARD_Y + 256} width={64} height={18} rx="4" fill={col.color} fillOpacity="0.1" stroke={col.color} strokeWidth="1" strokeOpacity="0.5" />
                <text x={x + 44} y={CARD_Y + 269} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={col.color}>场景</text>
                <text x={x + 12} y={CARD_Y + 292} fontSize="11" fill={primary}>{col.scene}</text>

                {/* 度量 */}
                <rect x={x + 12} y={CARD_Y + 300} width={64} height={18} rx="4" fill={col.color} fillOpacity="0.1" stroke={col.color} strokeWidth="1" strokeOpacity="0.5" />
                <text x={x + 44} y={CARD_Y + 313} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={col.color}>度量</text>
                <text x={x + 12} y={CARD_Y + 336} fontSize="10.5" fill={primary} fontFamily="monospace">{col.metric}</text>
              </g>
            );
          })}

          {/* 底部度量说明 */}
          <line x1={32} y1={414} x2={VIEW_W - 32} y2={414} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={436} textAnchor="middle" fontSize="11.5" fill={secondary}>
            复杂度度量：Work 总工作量 · Span 最长依赖路径 · Parallelism = Work / Span
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        三种并行模型：MapReduce（Map→Shuffle→Reduce，离线批处理）、BSP（Superstep 计算→通信→栅栏同步，迭代图计算）、PRAM（多处理器共享内存，理论模型）。统一度量 Work / Span / Parallelism = Work / Span。
      </figcaption>
    </figure>
  );
}
