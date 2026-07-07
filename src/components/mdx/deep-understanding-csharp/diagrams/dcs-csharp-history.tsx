/**
 * <DcsCsharpHistoryDiagram>：C# 版本演进时间线（1.0 → 9.0）。
 *
 * 水平时间线展示各版本标志性特性。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

interface VersionInfo {
  ver: string;
  year: string;
  feature: string;
  color: string;
}

const VERSIONS: readonly VersionInfo[] = [
  { ver: "1.0", year: "2002", feature: "委托/事件", color: accent },
  { ver: "2.0", year: "2005", feature: "泛型/yield", color: accent },
  { ver: "3.0", year: "2007", feature: "LINQ/Lambda", color: accent },
  { ver: "4.0", year: "2010", feature: "dynamic", color: warning },
  { ver: "5.0", year: "2012", feature: "async/await", color: warning },
  { ver: "6.0", year: "2015", feature: "语法糖", color: secondary },
  { ver: "7.x", year: "2017", feature: "模式匹配", color: success },
  { ver: "8.0", year: "2019", feature: "可空引用", color: success },
  { ver: "9.0", year: "2020", feature: "Record", color: danger },
];

const X_START = 60;
const X_END = 660;
const X_STEP = (X_END - X_START) / (VERSIONS.length - 1);
const xAt = (i: number) => X_START + i * X_STEP;

const BOX_W = 68;
const BOX_H = 50;

export function DcsCsharpHistoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C# 版本演进时间线。从 C# 1.0（2002 委托事件）到 C# 9.0（2020 Record），展示每个版本的标志性特性。分为三个阶段：奠基期（1.0-3.0）、进化期（4.0-6.0）、现代化期（7.0-9.0）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            C# 版本演进时间线
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            奠基期（1.0-3.0） · 进化期（4.0-6.0） · 现代化期（7.0-9.0）
          </text>

          {/* 阶段背景 */}
          <rect x={48} y={120} width={X_STEP * 2 + 60} height={200} rx="8" fill={accent} fillOpacity="0.05" />
          <rect x={X_START + X_STEP * 3 - 30} y={120} width={X_STEP * 2 + 60} height={200} rx="8" fill={warning} fillOpacity="0.05" />
          <rect x={X_START + X_STEP * 6 - 30} y={120} width={X_STEP * 2 + 80} height={200} rx="8" fill={success} fillOpacity="0.05" />

          {/* 阶段标签 */}
          <text x={X_START + X_STEP} y={140} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>奠基期</text>
          <text x={X_START + X_STEP * 4} y={140} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>进化期</text>
          <text x={X_START + X_STEP * 7} y={140} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>现代化期</text>

          {/* 时间线 */}
          <line x1={X_START} y1={230} x2={X_END} y2={230} stroke={border} strokeWidth="2" />

          {/* 版本节点 */}
          {VERSIONS.map((v, i) => {
            const x = xAt(i);
            const isUpper = i % 2 === 0;
            const boxY = isUpper ? 162 : 250;
            const nodeY = 230;
            return (
              <g key={v.ver}>
                {/* 节点圆点 */}
                <circle cx={x} cy={nodeY} r="5" fill={v.color} stroke={elevated} strokeWidth="2" />
                {/* 连接线 */}
                <line x1={x} y1={nodeY} x2={x} y2={isUpper ? boxY + BOX_H : boxY} stroke={v.color} strokeWidth="1.2" strokeDasharray="2 2" />
                {/* 版本卡片 */}
                <rect x={x - BOX_W / 2} y={boxY} width={BOX_W} height={BOX_H} rx="6" fill={elevated} stroke={v.color} strokeWidth="1.4" strokeOpacity="0.5" />
                <text x={x} y={boxY + 18} textAnchor="middle" fontSize="13" fontWeight="700" fill={v.color} fontFamily="monospace">
                  {`C# ${v.ver}`}
                </text>
                <text x={x} y={boxY + 34} textAnchor="middle" fontSize="10" fill={secondary}>
                  {v.year}
                </text>
                <text x={x} y={boxY + 46} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
                  {v.feature}
                </text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={32} y1={376} x2={VIEW_W - 32} y2={376} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11" fill={secondary}>
            每个特性是对前一版本痛点的回应 · 叠加进化不破坏兼容
          </text>
          <text x={VIEW_W / 2} y={410} textAnchor="middle" fontSize="11" fill={secondary}>
            委托 是Lambda 的前身 · 迭代器状态机 是 async/await 的技术基础
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C# 1.0 到 9.0 版本演进时间线，三大阶段与标志性特性。
      </figcaption>
    </figure>
  );
}
