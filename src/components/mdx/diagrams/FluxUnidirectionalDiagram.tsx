/**
 * <FluxUnidirectionalDiagram>：Flux 架构单向数据流循环图。
 *
 * 展示 Flux 架构的核心概念：Action → Dispatcher → Store → View 的单向循环。
 * 四个节点顺时针排列，粗方向箭头只有一个方向，强调"没有旁路、没有双向调用"。
 * 底部标注与 MVP 的关键区别。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 */

const VIEW_W = 720;
const VIEW_H = 530;

// 四个节点，顺时针排布：顶→右→底→左
const NODE_W = 200;
const NODE_H = 72;

const CX = VIEW_W / 2;
const CY = VIEW_H / 2;

const TOP = { x: CX - NODE_W / 2, y: 36 };
const RIGHT = { x: VIEW_W - NODE_W - 32, y: CY - NODE_H / 2 - 20 };
const BOTTOM = { x: CX - NODE_W / 2, y: VIEW_H - 146 };
const LEFT = { x: 32, y: CY - NODE_H / 2 - 20 };

interface BoxDef {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  color: string;
}

const BOXES: readonly BoxDef[] = [
  {
    id: "action",
    label: "Action",
    sub: "用户收藏\n(type + payload)",
    x: TOP.x,
    y: TOP.y,
    color: "var(--accent)",
  },
  {
    id: "dispatcher",
    label: "Dispatcher",
    sub: "派发 Action\n到所有 Store",
    x: RIGHT.x,
    y: RIGHT.y,
    color: "var(--warning)",
  },
  {
    id: "store",
    label: "Store",
    sub: "State = Reducer\n(oldState, action)",
    x: BOTTOM.x,
    y: BOTTOM.y,
    color: "var(--success)",
  },
  {
    id: "view",
    label: "View",
    sub: "观察 Store 变化\n→ 自动重绘",
    x: LEFT.x,
    y: LEFT.y,
    color: "var(--danger)",
  },
];

interface PathDef {
  id: string;
  d1: string;
  d2: string;
  color: string;
  label: string;
  lblX: number;
  lblY: number;
  lblW: number;
  lblH: number;
}

const PATHS: readonly PathDef[] = [
  {
    id: "a2d",
    d1: `M ${TOP.x + NODE_W / 2} ${TOP.y + NODE_H} L ${TOP.x + NODE_W / 2} 148 L 404 148`,
    d2: `M 544 148 L ${RIGHT.x + NODE_W / 2} 148 L ${RIGHT.x + NODE_W / 2} ${RIGHT.y}`,
    color: "var(--accent)",
    label: "dispatch(action)",
    lblX: (TOP.x + NODE_W / 2 + RIGHT.x + NODE_W / 2) / 2,
    lblY: 148,
    lblW: 130,
    lblH: 26,
  },
  {
    id: "d2s",
    d1: `M ${RIGHT.x + NODE_W / 2} ${RIGHT.y + NODE_H} L ${RIGHT.x + NODE_W / 2} 338 L 534 338`,
    d2: `M 414 338 L ${BOTTOM.x + NODE_W / 2} 338 L ${BOTTOM.x + NODE_W / 2} ${BOTTOM.y}`,
    color: "var(--warning)",
    label: "emitChange()",
    lblX: (RIGHT.x + NODE_W / 2 + BOTTOM.x + NODE_W / 2) / 2,
    lblY: 338,
    lblW: 110,
    lblH: 26,
  },
  {
    id: "s2v",
    d1: `M ${BOTTOM.x} ${BOTTOM.y + NODE_H / 2} L ${LEFT.x + NODE_W / 2} ${BOTTOM.y + NODE_H / 2} L ${LEFT.x + NODE_W / 2} 382`,
    d2: `M ${LEFT.x + NODE_W / 2} 332 L ${LEFT.x + NODE_W / 2} ${LEFT.y + NODE_H}`,
    color: "var(--success)",
    label: "监听 Store\n自动更新",
    lblX: LEFT.x + NODE_W / 2,
    lblY: (BOTTOM.y + NODE_H / 2 + LEFT.y + NODE_H) / 2,
    lblW: 110,
    lblH: 40,
  },
  {
    id: "v2a",
    d1: `M ${LEFT.x + NODE_W / 2} ${LEFT.y} L ${LEFT.x + NODE_W / 2} 168`,
    d2: `M ${LEFT.x + NODE_W / 2} 118 L ${LEFT.x + NODE_W / 2} ${TOP.y + NODE_H / 2} L ${TOP.x} ${TOP.y + NODE_H / 2}`,
    color: "var(--danger)",
    label: "用户操作\n创建 Action",
    lblX: LEFT.x + NODE_W / 2,
    lblY: (LEFT.y + TOP.y + NODE_H / 2) / 2,
    lblW: 110,
    lblH: 40,
  },
];

export function FluxUnidirectionalDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Flux 单向数据流循环图。四个节点顺时针排列：顶部 Action（用户收藏 type+payload）、右侧 Dispatcher（派发 Action 到所有 Store）、底部 Store（State = Reducer(oldState, action)）、左侧 View（观察 Store 变化自动重绘）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {PATHS.map((p) => (
              <marker
                key={p.id}
                id={`flux-arrow-${p.id}`}
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0 0 L6 3 L0 6 z" fill={p.color} />
              </marker>
            ))}
          </defs>

          {/* 四个节点框 */}
          {BOXES.map((b) => (
            <g key={b.id}>
              <rect
                x={b.x}
                y={b.y}
                width={NODE_W}
                height={NODE_H}
                rx="10"
                fill="var(--bg)"
                stroke={b.color}
                strokeWidth="2.5"
              />
              <rect
                x={b.x}
                y={b.y}
                width={NODE_W}
                height={NODE_H}
                rx="10"
                fill={b.color}
                fillOpacity="0.08"
              />
              <text
                x={b.x + NODE_W / 2}
                y={b.y + 24}
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={b.color}
              >
                {b.label}
              </text>
              {b.sub.split("\n").map((line, i) => (
                <text
                  key={i}
                  x={b.x + NODE_W / 2}
                  y={b.y + 44 + i * 16}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  {line}
                </text>
              ))}
            </g>
          ))}

          {/* 四条方向路径与标签 */}
          {PATHS.map((p) => (
            <g key={p.id}>
              {/* 第一段线 */}
              <path
                d={p.d1}
                stroke={p.color}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* 第二段线，带箭头指向终点 */}
              <path
                d={p.d2}
                stroke={p.color}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                markerEnd={`url(#flux-arrow-${p.id})`}
              />
              <rect
                x={p.lblX - p.lblW / 2}
                y={p.lblY - p.lblH / 2}
                width={p.lblW}
                height={p.lblH}
                rx="6"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1"
              />
              {p.label.split("\n").map((line, idx) => (
                <text
                  key={idx}
                  x={p.lblX}
                  y={p.lblY - (p.label.includes("\n") ? 10 : 0) + idx * 15 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {line}
                </text>
              ))}
            </g>
          ))}

          {/* 中心标注：单向 */}
          <text
            x={CX}
            y={CY - 16}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--accent)"
          >
            单向循环
          </text>
          <text
            x={CX}
            y={CY + 2}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            无旁路 · 无双向调用
          </text>

          {/* 底部与 MVP 的区别标注 */}
          <line
            x1={32}
            y1={VIEW_H - 52}
            x2={VIEW_W - 32}
            y2={VIEW_H - 52}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={CX}
            y={VIEW_H - 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            与 MVP 的区别：Presenter 可以双向调用 View，Flux 只有单向循环
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Flux 单向数据流：Action → Dispatcher → Store → View → Action，只有一个方向，没有旁路。
      </figcaption>
    </figure>
  );
}
