/**
 * <ChpProfilingToolsDiagram>：性能分析工具链对比（cpp-high-performance 性能分析章）。
 *
 * 三列对比三类剖析工具：
 *   perf（Linux 采样）/ Intel VTune（商用深度）/ gprof（插桩老牌）
 * 每列顶部画工具 logo 风格图标，中部列「原理 / 优势 / 局限 / 适用」，
 * 底部一条「采样 vs 插桩」原理对照与推荐工作流。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 三列主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const COL_W = 200;
const COL_GAP = 24;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);
const COL_TOP = 100;

type Tool = {
  id: string;
  name: string;
  color: string;
  principle: string;
  pro: string;
  con: string;
  fit: string;
};

const TOOLS: readonly Tool[] = [
  { id: "perf", name: "perf", color: "var(--accent)", principle: "采样（PMU 中断）", pro: "系统级、开销小、免费", con: "需符号表、不精确到行", fit: "Linux 生产环境首选" },
  { id: "vtune", name: "Intel VTune", color: "var(--success)", principle: "PMU 硬件计数器", pro: "缓存/分支/TLB 深度分析", con: "商用付费、仅 Intel", fit: "深挖缓存与流水线" },
  { id: "gprof", name: "gprof", color: "var(--warning)", principle: "编译期插桩", pro: "函数级精确调用次数", con: "插桩开销大、需重编译", fit: "教学/老项目快速摸底" },
];

export function ChpProfilingToolsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="性能分析工具链对比。perf：基于 PMU 采样，系统级开销小且免费，局限是需符号表不精确到行，适合 Linux 生产环境首选；Intel VTune：基于 PMU 硬件计数器，能深度分析缓存/分支/TLB，局限是商用付费仅 Intel，适合深挖缓存与流水线；gprof：编译期插桩，函数级精确调用次数，局限是插桩开销大需重编译，适合教学与老项目快速摸底。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            性能剖析工具链 · perf / VTune / gprof
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            采样低开销看热点，插桩精确看调用——按场景选工具
          </text>

          {/* ===== 三列 ===== */}
          {TOOLS.map((t, ci) => {
            const x = colX(ci);
            const cx = x + COL_W / 2;
            return (
              <g key={t.id}>
                {/* 列头 pill */}
                <rect x={x} y={COL_TOP} width={COL_W} height="28" rx="8" fill={t.color} fillOpacity="0.12" stroke={t.color} strokeWidth="1.2" />
                <text x={cx} y={COL_TOP + 19} textAnchor="middle" fontSize="14" fontWeight="700" fill={t.color}>{t.name}</text>

                {/* 图标区 */}
                <rect x={x} y={COL_TOP + 40} width={COL_W} height="68" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                {t.id === "perf" && (
                  <>
                    {/* 采样：时间轴上散点 */}
                    <line x1={x + 20} y1={COL_TOP + 88} x2={x + COL_W - 20} y2={COL_TOP + 88} stroke="var(--border)" strokeWidth="1" />
                    {[0, 1, 2, 3, 4].map((k) => (
                      <circle key={k} cx={x + 30 + k * 36} cy={COL_TOP + 88} r="3.5" fill={t.color} fillOpacity={k === 2 ? "0.9" : "0.4"} />
                    ))}
                    <text x={cx} y={COL_TOP + 66} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">时间轴采样热点</text>
                  </>
                )}
                {t.id === "vtune" && (
                  <>
                    {/* 硬件计数器：多柱状 */}
                    {[0, 1, 2, 3].map((k) => (
                      <rect key={k} x={x + 36 + k * 32} y={COL_TOP + 88 - (20 + k * 8)} width="20" height={20 + k * 8} rx="2" fill={t.color} fillOpacity={0.3 + k * 0.18} />
                    ))}
                    <text x={cx} y={COL_TOP + 66} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">PMU 硬件计数器</text>
                  </>
                )}
                {t.id === "gprof" && (
                  <>
                    {/* 插桩：函数调用图节点 */}
                    <circle cx={cx} cy={COL_TOP + 62} r="8" fill={t.color} fillOpacity="0.4" stroke={t.color} strokeWidth="1.2" />
                    <circle cx={x + 56} cy={COL_TOP + 92} r="7" fill={t.color} fillOpacity="0.4" stroke={t.color} strokeWidth="1.2" />
                    <circle cx={x + COL_W - 56} cy={COL_TOP + 92} r="7" fill={t.color} fillOpacity="0.4" stroke={t.color} strokeWidth="1.2" />
                    <line x1={cx} y1={COL_TOP + 70} x2={x + 56} y2={COL_TOP + 86} stroke={t.color} strokeWidth="1.2" />
                    <line x1={cx} y1={COL_TOP + 70} x2={x + COL_W - 56} y2={COL_TOP + 86} stroke={t.color} strokeWidth="1.2" />
                    <text x={cx} y={COL_TOP + 108} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">函数调用图插桩</text>
                  </>
                )}

                {/* 详情卡 */}
                <rect x={x} y={COL_TOP + 120} width={COL_W} height="140" rx="8" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="0.8" />
                <text x={x + 12} y={COL_TOP + 140} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">原理：</tspan>
                  <tspan fill={t.color}>{t.principle}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 162} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--success)">优势：</tspan>
                  <tspan fill="var(--text-primary)">{t.pro}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 184} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--danger)">局限：</tspan>
                  <tspan fill="var(--text-primary)">{t.con}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 206} fontSize="11" fill="var(--text-secondary)">
                  <tspan fontWeight="700" fill="var(--text-primary)">适合：</tspan>
                  <tspan fill="var(--text-primary)">{t.fit}</tspan>
                </text>
                <text x={x + 12} y={COL_TOP + 232} fontSize="11" fill="var(--text-secondary)">
                  {t.id === "perf" && "perf record / report / stat"}
                  {t.id === "vtune" && "Hotspots / Memory Access"}
                  {t.id === "gprof" && "-pg 编译后跑程序"}
                </text>
                <text x={x + 12} y={COL_TOP + 252} fontSize="11" fill="var(--text-secondary)">
                  {t.id === "perf" && "+ FlameGraph 火焰图"}
                  {t.id === "vtune" && "缓存缺失/分支预测"}
                  {t.id === "gprof" && "gprof 输出调用图"}
                </text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            推荐流：perf 采样定位热点 → VTune 深挖缓存/分支 → google-benchmark 量化回归
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        perf 基于 PMU 中断采样，开销小、系统级，是 Linux 生产环境首选；Intel VTune 用硬件计数器深挖缓存缺失、分支预测、TLB，适合精修热点；gprof 编译期插桩，给出精确函数调用次数但需重编译、开销大。工程上先用 perf 采样定位热点，再用 VTune 深挖，最后用 google-benchmark 量化提升与回归。
      </figcaption>
    </figure>
  );
}
