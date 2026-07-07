/**
 * <ChpPerfPipelineDiagram>：性能优化流水线（cpp-high-performance 性能基础章）。
 *
 * 四阶段横向流水线：测量 → 分析 → 优化 → 验证，每阶段一张圆角卡片，箭头串联。
 * 每张卡片含：阶段名（彩色 pill）、一句话职责、典型工具/手段、产物。
 * 底部一条「闭环回路」箭头：验证不达标则回到测量，强调性能优化是迭代过程。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×440、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 四阶段主体 / 底部闭环说明）。
 */

const VIEW_W = 720;
const VIEW_H = 440;

// 四阶段几何：宽 148、间距 16（含箭头空间）、左右各留 38。
const STAGE_W = 148;
const STAGE_GAP = 16;
const STAGE_MARGIN = 38;
const stageX = (i: number) => STAGE_MARGIN + i * (STAGE_W + STAGE_GAP);
const STAGE_TOP = 116;
const STAGE_H = 196;

type Stage = {
  id: string;
  name: string;
  color: string;
  duty: string;
  tool: string;
  output: string;
};

const STAGES: readonly Stage[] = [
  { id: "measure", name: "测量", color: "var(--accent)", duty: "量化当前性能", tool: "google-benchmark\nperf stat", output: "基线数据" },
  { id: "analyze", name: "分析", color: "var(--success)", duty: "定位热点瓶颈", tool: "perf record\nVTune FlameGraph", output: "热点排序" },
  { id: "optimize", name: "优化", color: "var(--warning)", duty: "改算法/布局/并发", tool: "换数据结构\n对齐/预取/线程池", output: "新实现" },
  { id: "verify", name: "验证", color: "var(--danger)", duty: "确认提升且无回归", tool: "再跑 benchmark\n对比基线", output: "提速比" },
];

export function ChpPerfPipelineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="性能优化流水线四阶段：测量（量化当前性能，工具 google-benchmark、perf stat，产物基线数据）→ 分析（定位热点瓶颈，工具 perf record、VTune、FlameGraph，产物热点排序）→ 优化（改算法/布局/并发，工具换数据结构、对齐/预取/线程池，产物新实现）→ 验证（确认提升且无回归，工具再跑 benchmark 对比基线，产物提速比）。底部闭环：验证不达标则回到测量，性能优化是迭代过程。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            性能优化流水线 · 测量 → 分析 → 优化 → 验证
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            先量化再动手，每轮闭环都拿数据说话，禁止凭感觉优化
          </text>

          {/* ===== 顶部阶段编号带 ===== */}
          <text x={VIEW_W / 2} y="92" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            <tspan fontWeight="700" fill="var(--accent)">迭代闭环</tspan>
            <tspan>{"　"}</tspan>
            <tspan fill="var(--text-primary)">每轮都从测量开始，以验证收尾</tspan>
          </text>

          {/* ===== 四阶段卡片 ===== */}
          {STAGES.map((s, i) => {
            const x = stageX(i);
            const cx = x + STAGE_W / 2;
            return (
              <g key={s.id}>
                {/* 卡片背板 */}
                <rect x={x} y={STAGE_TOP} width={STAGE_W} height={STAGE_H} rx="10" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                {/* 阶段名 pill */}
                <rect x={x + 12} y={STAGE_TOP + 12} width={STAGE_W - 24} height="28" rx="8" fill={s.color} fillOpacity="0.12" stroke={s.color} strokeWidth="1.2" />
                <text x={cx} y={STAGE_TOP + 31} textAnchor="middle" fontSize="14" fontWeight="700" fill={s.color}>{i + 1}. {s.name}</text>
                {/* 职责 */}
                <text x={cx} y={STAGE_TOP + 60} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">{s.duty}</text>
                {/* 工具/手段 */}
                <line x1={x + 16} y1={STAGE_TOP + 72} x2={x + STAGE_W - 16} y2={STAGE_TOP + 72} stroke="var(--border)" strokeWidth="1" />
                <text x={cx} y={STAGE_TOP + 90} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">工具 / 手段</text>
                {s.tool.split("\n").map((line, li) => (
                  <text key={li} x={cx} y={STAGE_TOP + 110 + li * 18} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{line}</text>
                ))}
                {/* 产物 */}
                <line x1={x + 16} y1={STAGE_TOP + 152} x2={x + STAGE_W - 16} y2={STAGE_TOP + 152} stroke="var(--border)" strokeWidth="1" />
                <text x={cx} y={STAGE_TOP + 170} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">产物：<tspan fill={s.color} fontWeight="700">{s.output}</tspan></text>

                {/* 阶段间向右箭头 */}
                {i < STAGES.length - 1 && (
                  <g>
                    <line x1={x + STAGE_W + 2} y1={STAGE_TOP + STAGE_H / 2} x2={x + STAGE_W + STAGE_GAP - 4} y2={STAGE_TOP + STAGE_H / 2} stroke="var(--accent)" strokeWidth="1.6" />
                    <path d={`M${x + STAGE_W + STAGE_GAP - 8} ${STAGE_TOP + STAGE_H / 2 - 4} L${x + STAGE_W + STAGE_GAP - 2} ${STAGE_TOP + STAGE_H / 2} L${x + STAGE_W + STAGE_GAP - 8} ${STAGE_TOP + STAGE_H / 2 + 4}`} fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
                  </g>
                )}
              </g>
            );
          })}

          {/* ===== 底部闭环回路说明 ===== */}
          <path d={`M${stageX(3) + STAGE_W / 2} ${STAGE_TOP + STAGE_H + 8} C ${stageX(3) + STAGE_W / 2} ${STAGE_TOP + STAGE_H + 40}, ${stageX(0) + STAGE_W / 2} ${STAGE_TOP + STAGE_H + 40}, ${stageX(0) + STAGE_W / 2} ${STAGE_TOP + STAGE_H + 8}`} fill="none" stroke="var(--danger)" strokeWidth="1.4" strokeDasharray="5 4" />
          <path d={`M${stageX(0) + STAGE_W / 2 - 4} ${STAGE_TOP + STAGE_H + 14} L${stageX(0) + STAGE_W / 2} ${STAGE_TOP + STAGE_H + 6} L${stageX(0) + STAGE_W / 2 + 4} ${STAGE_TOP + STAGE_H + 14}`} fill="none" stroke="var(--danger)" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
          <rect x="180" y={STAGE_TOP + STAGE_H + 28} width="360" height="28" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={STAGE_TOP + STAGE_H + 46} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            <tspan fontWeight="700" fill="var(--danger)">未达标？</tspan>
            <tspan>{"　"}</tspan>
            <tspan>回到测量，开启下一轮迭代</tspan>
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        性能优化的正确姿势是闭环迭代：先用 benchmark 建立基线，再用剖析器定位热点，针对热点改算法/布局/并发，最后回到 benchmark 确认提升且无回归。验证不达标就回到测量，绝不凭感觉改代码。
      </figcaption>
    </figure>
  );
}
