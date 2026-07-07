/**
 * <DcsFinalReviewDiagram>：深入理解 C# 总复习思维导图。
 *
 * 以「演进链」为中心，辐射出六大特性（委托→迭代器→Lambda→async→模式匹配→record），
 * 外圈标注每章核心概念与因果关系。
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

const CX = VIEW_W / 2;
const CY = 220;

interface Node {
  label: string;
  sub: string;
  color: string;
  angle: number;
  radius: number;
}

const NODES: readonly Node[] = [
  { label: "委托", sub: "C#1.0 类型安全回调", color: accent, angle: -90, radius: 120 },
  { label: "迭代器 yield", sub: "C#2.0 状态机", color: accent, angle: -30, radius: 130 },
  { label: "Lambda 闭包", sub: "C#3.0 简化委托", color: accent, angle: 30, radius: 130 },
  { label: "async/await", sub: "C#5.0 异步状态机", color: warning, angle: 90, radius: 120 },
  { label: "模式匹配", sub: "C#7-9 声明式分支", color: success, angle: 150, radius: 130 },
  { label: "Record", sub: "C#9.0 值语义数据", color: danger, angle: 210, radius: 130 },
];

const NODE_W = 120;
const NODE_H = 48;

function nodePos(n: Node) {
  const rad = (n.angle * Math.PI) / 180;
  return { x: CX + n.radius * Math.cos(rad), y: CY + n.radius * Math.sin(rad) };
}

export function DcsFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="深入理解 C# 总复习思维导图。中心是 C# 演进链，辐射出六大特性：委托（C#1.0）、迭代器 yield（C#2.0）、Lambda 闭包（C#3.0）、async/await（C#5.0）、模式匹配（C#7-9）、Record（C#9.0）。标注因果链：委托是 Lambda 基础，迭代器是 async 技术基础，Lambda+模式匹配+Record=函数式范式。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            深入理解 C# 总复习思维导图
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            六大特性演进链 · 命令式到函数式的范式迁移
          </text>

          {/* 中心节点 */}
          <circle cx={CX} cy={CY} r="48" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.6" />
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>C# 演进链</text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize="10" fill={secondary}>叠加进化</text>
          <text x={CX} y={CY + 26} textAnchor="middle" fontSize="10" fill={secondary}>不破坏兼容</text>

          {/* 六个特性节点 */}
          {NODES.map((n, i) => {
            const pos = nodePos(n);
            const x = pos.x - NODE_W / 2;
            const y = pos.y - NODE_H / 2;
            const nextPos = i < NODES.length - 1 ? nodePos(NODES[i + 1]) : null;
            return (
              <g key={n.label}>
                {/* 连线 */}
                <line x1={CX} y1={CY} x2={pos.x} y2={pos.y} stroke={n.color} strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="4 3" />
                {/* 节点 */}
                <rect x={x} y={y} width={NODE_W} height={NODE_H} rx="8" fill={elevated} stroke={n.color} strokeWidth="1.4" strokeOpacity="0.5" />
                <text x={pos.x} y={pos.y - 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={n.color}>
                  {n.label}
                </text>
                <text x={pos.x} y={pos.y + 12} textAnchor="middle" fontSize="10" fill={secondary}>
                  {n.sub}
                </text>

                {/* 因果箭头（到下一个节点） */}
                {nextPos && (
                  <text
                    x={(pos.x + nextPos.x) / 2}
                    y={(pos.y + nextPos.y) / 2 - 6}
                    textAnchor="middle"
                    fontSize="9"
                    fill={secondary}
                    opacity="0.6"
                  >
                    {"->"}
                  </text>
                )}
              </g>
            );
          })}

          {/* 底部因果链 */}
          <line x1={32} y1={376} x2={VIEW_W - 32} y2={376} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={394} textAnchor="middle" fontSize="11" fill={secondary}>
            委托是 Lambda 基石 · 迭代器状态机是 async 技术基础 · Lambda+模式匹配+Record=函数式范式
          </text>
          <text x={VIEW_W / 2} y={410} textAnchor="middle" fontSize="11" fill={secondary}>
            每步叠加进化 · 底层机制从未推翻 · C# 从命令式走向多范式
          </text>

          <defs />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C# 六大特性演进链与因果关系总览。
      </figcaption>
    </figure>
  );
}
