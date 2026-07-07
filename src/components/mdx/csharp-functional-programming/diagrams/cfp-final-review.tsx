/**
 * <CfpFinalReviewDiagram>：全书知识图谱总复习。
 *
 * 四大板块的核心概念及其因果链，以放射状结构展示全书知识脉络。
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

interface Node {
  label: string;
  x: number;
  y: number;
  color: string;
}

const CENTER: Node = { label: "C# 函数式\n编程", x: 360, y: 210, color: primary };

const NODES: readonly Node[] = [
  { label: "函数是一等公民", x: 130, y: 90, color: accent },
  { label: "高阶函数\nMap/Filter/Reduce", x: 360, y: 70, color: success },
  { label: "柯里化\n偏应用", x: 590, y: 90, color: success },
  { label: "不可变数据\nrecord + with", x: 100, y: 210, color: warning },
  { label: "模式匹配\nswitch 表达式", x: 620, y: 210, color: warning },
  { label: "延迟求值\nyield", x: 130, y: 330, color: danger },
  { label: "Monad\nBind 链式", x: 360, y: 350, color: danger },
  { label: "错误处理\nResult 类型", x: 590, y: 330, color: danger },
];

export function CfpFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C#函数式编程全书知识图谱。中心是函数式编程，四周辐射八大核心概念：函数是一等公民、高阶函数、柯里化、不可变数据、模式匹配、延迟求值、Monad、错误处理。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="15" fontWeight="700" fill={primary}>
            C# 函数式编程全书知识图谱
          </text>

          {/* 连线：中心到各节点 */}
          {NODES.map((n, i) => (
            <line
              key={`line-${i}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={n.x}
              y2={n.y}
              stroke={n.color}
              strokeWidth="1"
              strokeOpacity="0.25"
            />
          ))}

          {/* 中心节点 */}
          <ellipse cx={CENTER.x} cy={CENTER.y} rx="58" ry="32" fill={elevated} stroke={primary} strokeWidth="1.4" />
          <text x={CENTER.x} y={CENTER.y - 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            函数式
          </text>
          <text x={CENTER.x} y={CENTER.y + 12} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary}>
            编程
          </text>

          {/* 各节点 */}
          {NODES.map((n, i) => {
            const lines = n.label.split("\n");
            const w = 104;
            const h = lines.length > 1 ? 44 : 30;
            return (
              <g key={`node-${i}`}>
                <rect
                  x={n.x - w / 2}
                  y={n.y - h / 2}
                  width={w}
                  height={h}
                  rx="6"
                  fill={n.color}
                  fillOpacity="0.08"
                  stroke={n.color}
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                />
                {lines.map((line, j) => (
                  <text
                    key={`${i}-${j}`}
                    x={n.x}
                    y={n.y - (lines.length - 1) * 7 + j * 14}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fill={n.color}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* 板块标签 */}
          <text x={70} y={50} fontSize="10" fontWeight="700" fill={accent}>基础</text>
          <text x={445} y={52} fontSize="10" fontWeight="700" fill={success}>高阶</text>
          <text x={40} y={175} fontSize="10" fontWeight="700" fill={warning}>不可变</text>
          <text x={660} y={175} fontSize="10" fontWeight="700" fill={warning}>不可变</text>
          <text x={70} y={375} fontSize="10" fontWeight="700" fill={danger}>实践</text>
          <text x={440} y={378} fontSize="10" fontWeight="700" fill={danger}>实践</text>

          {/* 底部总结 */}
          <line x1={32} y1={390} x2={VIEW_W - 32} y2={390} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={408} textAnchor="middle" fontSize="10" fill={secondary}>
            函数是一等公民（基石）→ 高阶函数（组合引擎）→ 不可变性（安全基石）→ Monad/错误处理（实践工具箱）
          </text>

          <defs />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C# 函数式编程全书八大核心概念知识图谱与因果链。
      </figcaption>
    </figure>
  );
}
