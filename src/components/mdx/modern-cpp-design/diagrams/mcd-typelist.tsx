/**
 * <McdTypelistDiagram>：Typelist 递归结构与编译时操作。
 *
 * 上方横向链表展示 Typelist<int, Typelist<double, Typelist<string, NullType>>>
 * 的 head/tail 递归结构；下方列出 Length / TypeAt / Append / Erase 等编译时操作。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

interface Node {
  head: string;
  x: number;
  isEnd?: boolean;
}

const NODE_W = 130;
const NODE_H = 92;
const NODE_Y = 100;
const NODES: readonly Node[] = [
  { head: "int", x: 32 },
  { head: "double", x: 182 },
  { head: "string", x: 332 },
  { head: "NullType", x: 482, isEnd: true },
];

interface Op {
  name: string;
  result: string;
  color: string;
  x: number;
}
const OP_W = 150;
const OP_H = 70;
const OP_Y = 268;
const OPS: readonly Op[] = [
  { name: "Length", result: "= 3", color: "var(--accent)", x: 32 },
  { name: "TypeAt<1>", result: "= double", color: "var(--success)", x: 202 },
  { name: "Append<float>", result: "4 元素", color: "var(--warning)", x: 372 },
  { name: "Erase<double>", result: "2 元素", color: "var(--accent)", x: 542 },
];

export function McdTypelistDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Typelist 递归结构。上方横向链表：节点1 Head 为 int 尾指向节点2；节点2 Head 为 double 尾指向节点3；节点3 Head 为 string 尾指向 NullType 终止。下方四个编译时操作：Length 等于 3、TypeAt 第1项等于 double、Append float 得到 4 元素、Erase double 得到 2 元素。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="mcd-tl-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Typelist：编译时类型链表
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
            {"TYPELIST(int, double, string)"}
          </text>

          {/* 链节点 */}
          {NODES.map((n, i) => {
            const isEnd = n.isEnd;
            return (
              <g key={`node-${i}`}>
                <rect x={n.x} y={NODE_Y} width={NODE_W} height={NODE_H} rx="8" fill={isEnd ? "var(--bg)" : "var(--accent)"} fillOpacity={isEnd ? "1" : "0.08"} stroke={isEnd ? "var(--text-secondary)" : "var(--accent)"} strokeWidth="1.6" />
                {!isEnd && (
                  <>
                    <text x={n.x + NODE_W / 2} y={NODE_Y + 24} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
                      Typelist
                    </text>
                    <line x1={n.x + 12} y1={NODE_Y + 36} x2={n.x + NODE_W - 12} y2={NODE_Y + 36} stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
                  </>
                )}
                <text x={n.x + NODE_W / 2} y={NODE_Y + (isEnd ? 50 : 60)} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
                  {isEnd ? n.head : `Head: ${n.head}`}
                </text>
                {!isEnd && (
                  <text x={n.x + NODE_W / 2} y={NODE_Y + 80} textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)" fontFamily="monospace">
                    Tail →
                  </text>
                )}
                {/* 节点间箭头 */}
                {!isEnd && i < NODES.length - 1 && (
                  <line
                    x1={n.x + NODE_W}
                    y1={NODE_Y + NODE_H / 2}
                    x2={NODES[i + 1].x}
                    y2={NODE_Y + NODE_H / 2}
                    stroke="var(--text-secondary)"
                    strokeWidth="1.6"
                    markerEnd="url(#mcd-tl-arrow)"
                  />
                )}
              </g>
            );
          })}

          {/* 操作区标题 */}
          <text x={VIEW_W / 2} y={244} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
            编译时类型操作
          </text>

          {/* 操作框 */}
          {OPS.map((op) => (
            <g key={op.name}>
              <rect x={op.x} y={OP_Y} width={OP_W} height={OP_H} rx="8" fill={op.color} fillOpacity="0.08" stroke={op.color} strokeWidth="1.4" strokeOpacity="0.55" />
              <text x={op.x + OP_W / 2} y={OP_Y + 30} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={op.color} fontFamily="monospace">
                {op.name}
              </text>
              <text x={op.x + OP_W / 2} y={OP_Y + 54} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
                {op.result}
              </text>
            </g>
          ))}

          {/* 底部说明 */}
          <line x1={32} y1={416} x2={VIEW_W - 32} y2={416} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={438} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            用递归模板把类型串成链表，在编译期完成遍历、索引、增删
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Typelist 用 head/tail 递归模板把类型串成编译时链表，支持 Length、TypeAt、Append、Erase 等类型级操作。
      </figcaption>
    </figure>
  );
}
