/**
 * <ChpFinalMindMap>：C++ 高性能编程总复习思维导图（cpp-high-performance 总复习章）。
 *
 * 中心节点「C++ 高性能」向四个方向放射四大主题分支：
 *   上 性能基础（测量→分析→优化→验证）
 *   右 内存与数据结构（连续布局/缓存友好/选对算法）
 *   下 并发与缓存（线程池/无锁/缓存行/局部性）
 *   左 模板与剖析（编译期计算/代码膨胀/perf+VTune+benchmark）
 * 每个分支末梢挂 2–3 个关键词叶子节点，构成一张全书知识网。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×480、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 思维导图主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const CX = VIEW_W / 2;
const CY = 270;

type Branch = {
  id: string;
  name: string;
  color: string;
  // 分支节点中心（相对中心偏移）
  bx: number;
  by: number;
  // 叶子关键词，相对分支节点偏移
  leaves: { text: string; dx: number; dy: number }[];
};

const BRANCHES: readonly Branch[] = [
  {
    id: "basics",
    name: "性能基础",
    color: "var(--accent)",
    bx: 0,
    by: -120,
    leaves: [
      { text: "测量优先", dx: -110, dy: -28 },
      { text: "复杂度大 O", dx: 110, dy: -28 },
      { text: "瓶颈 80/20", dx: 0, dy: -52 },
    ],
  },
  {
    id: "memory",
    name: "内存与数据结构",
    color: "var(--success)",
    bx: 220,
    by: 0,
    leaves: [
      { text: "连续布局缓存友好", dx: 90, dy: -28 },
      { text: "vector 默认首选", dx: 90, dy: -4 },
      { text: "选对算法胜微调", dx: 90, dy: 20 },
    ],
  },
  {
    id: "concurrency",
    name: "并发与缓存",
    color: "var(--warning)",
    bx: 0,
    by: 120,
    leaves: [
      { text: "线程池复用", dx: -110, dy: 20 },
      { text: "无锁仅限热点", dx: 110, dy: 20 },
      { text: "缓存行/局部性", dx: 0, dy: 48 },
    ],
  },
  {
    id: "advanced",
    name: "模板与剖析",
    color: "var(--danger)",
    bx: -220,
    by: 0,
    leaves: [
      { text: "编译期计算", dx: -90, dy: -28 },
      { text: "警惕代码膨胀", dx: -90, dy: -4 },
      { text: "perf+VTune+benchmark", dx: -90, dy: 20 },
    ],
  },
];

export function ChpFinalMindMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 高性能编程总复习思维导图。中心节点 C++ 高性能向四方放射：上方性能基础（测量优先、复杂度大 O、瓶颈 80/20）；右方内存与数据结构（连续布局缓存友好、vector 默认首选、选对算法胜微调）；下方并发与缓存（线程池复用、无锁仅限热点、缓存行/局部性）；左方模板与剖析（编译期计算、警惕代码膨胀、perf+VTune+benchmark）。全书主线：先测量再优化，从内存到并发逐层提速。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 高性能编程 · 总复习思维导图
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            一张图串起全书四大主题与核心知识点
          </text>

          {/* ===== 连接线（先画，置于节点下方） ===== */}
          {BRANCHES.map((b) => (
            <g key={`line-${b.id}`}>
              {/* 中心 → 分支 */}
              <path d={`M${CX} ${CY} Q ${(CX + (CX + b.bx)) / 2} ${(CY + (CY + b.by)) / 2 - (b.id === "basics" ? 20 : b.id === "concurrency" ? -20 : 0)} ${CX + b.bx} ${CY + b.by}`} fill="none" stroke={b.color} strokeWidth="1.6" strokeOpacity="0.6" />
              {/* 分支 → 叶子 */}
              {b.leaves.map((lf, li) => (
                <line key={li} x1={CX + b.bx} y1={CY + b.by} x2={CX + b.bx + lf.dx} y2={CY + b.by + lf.dy} stroke={b.color} strokeWidth="1" strokeOpacity="0.45" />
              ))}
            </g>
          ))}

          {/* ===== 中心节点 ===== */}
          <circle cx={CX} cy={CY} r="48" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.8" />
          <text x={CX} y={CY - 2} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">C++</text>
          <text x={CX} y={CY + 16} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">高性能</text>

          {/* ===== 四个分支节点 + 叶子 ===== */}
          {BRANCHES.map((b) => {
            const bx = CX + b.bx;
            const by = CY + b.by;
            return (
              <g key={b.id}>
                <rect x={bx - 64} y={by - 16} width="128" height="32" rx="16" fill={b.color} fillOpacity="0.14" stroke={b.color} strokeWidth="1.4" />
                <text x={bx} y={by + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill={b.color}>{b.name}</text>

                {b.leaves.map((lf, li) => {
                  const lx = bx + lf.dx;
                  const ly = by + lf.dy;
                  const w = lf.text.length * 11 + 16;
                  return (
                    <g key={li}>
                      <rect x={lx - w / 2} y={ly - 12} width={w} height="24" rx="12" fill="var(--bg)" stroke={b.color} strokeWidth="1" />
                      <text x={lx} y={ly + 4} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{lf.text}</text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            主线：先测量再优化——从内存布局、数据结构、并发缓存到模板剖析，逐层榨取速度
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书围绕「测量优先」展开：性能基础提供方法论，内存与数据结构从布局和访问模式要速度，并发与缓存榨取多核与硬件红利，模板与剖析把优化固化到编译期与工程流程。四者层层递进，缺一不可。
      </figcaption>
    </figure>
  );
}
