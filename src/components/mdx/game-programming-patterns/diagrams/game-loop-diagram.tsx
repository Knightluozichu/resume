/**
 * <GameLoopDiagram>：游戏循环三种变体流程图（game-programming-patterns 课程）。
 *
 * 三列并排展示：
 *   左 简单循环（黄）：processInput → update → render → sleep，帧率随硬件变化
 *   中 固定时间步（紫，推荐）：accumulate → fixedUpdate(×N) → render，标「帧率无关」
 *   右 最大帧率（绿，最稳）：在固定时间步基础上 clamp dt ≤ MAX，避免螺旋死亡
 * 每列垂直流程节点 + 向下箭头 + 右侧回环箭头（表示每帧循环）+ 优缺点。底部总结栏。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 三列主体 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 460;

// 三列几何：宽 200、列间距 24、左右各留 36（≥32）。
const COL_W = 200;
const COL_GAP = 24;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

// 节点几何：宽 160、高 30、行距 44（节点间留 14 给箭头）。
const NODE_W = 160;
const NODE_H = 30;
const NODE_ROW = 44;
const NODES_TOP_Y = 124;
const nodeX = (i: number) => colX(i) + (COL_W - NODE_W) / 2; // 居中
const nodeCx = (i: number) => colX(i) + COL_W / 2;
const nodeRight = (i: number) => nodeX(i) + NODE_W;
const loopX = (i: number) => nodeRight(i) + 12; // 回环箭头折线 x

type Variant = {
  id: string;
  name: string;
  color: string;
  nodes: string[];
  badge?: string;
  pros: string;
  cons: string;
};

const VARIANTS: readonly Variant[] = [
  {
    id: "simple",
    name: "简单循环",
    color: "var(--warning)",
    nodes: ["processInput()", "update()", "render()", "sleep()"],
    pros: "实现最简单",
    cons: "帧率随硬件变化",
  },
  {
    id: "fixed",
    name: "固定时间步",
    color: "var(--accent)",
    nodes: ["accumulate(dt)", "fixedUpdate() × N", "render()"],
    badge: "帧率无关",
    pros: "物理稳定 · 帧率无关",
    cons: "实现略复杂",
  },
  {
    id: "maxframe",
    name: "最大帧率",
    color: "var(--success)",
    nodes: ["dt = min(dt, MAX)", "accumulate(dt)", "fixedUpdate() × N", "render()"],
    pros: "避免螺旋死亡",
    cons: "仍可能丢帧",
  },
];

const PROS_Y = 318;
const CONS_Y = 338;

export function GameLoopDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏循环三种变体流程图。左列简单循环（黄色）：processInput、update、render、sleep 四步循环，优点实现最简单，缺点帧率随硬件变化。中列固定时间步（紫色，推荐）：accumulate、fixedUpdate 乘 N、render 三步循环，标注帧率无关，优点物理稳定且帧率无关，缺点实现略复杂。右列最大帧率（绿色）：在固定时间步前加 dt 等于 min(dt, MAX) 限幅，四步循环，优点避免螺旋死亡，缺点仍可能丢帧。每列右侧有回环箭头表示每帧重复。底部总结：现代引擎主流是固定时间步加最大帧率。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 流程箭头：实心三角，向下与回环共用 */}
            <marker
              id="gpp-loop-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            游戏循环 · 三种变体
          </text>
          <text
            x={VIEW_W / 2}
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            从最简到帧率无关，再到防螺旋死亡
          </text>

          {/* ===== 三列 ===== */}
          {VARIANTS.map((v, ci) => {
            const x = colX(ci);
            const cx = nodeCx(ci);
            const nx = nodeX(ci);
            const firstMidY = NODES_TOP_Y + NODE_H / 2; // 139
            const lastMidY = NODES_TOP_Y + (v.nodes.length - 1) * NODE_ROW + NODE_H / 2;
            return (
              <g key={v.id}>
                {/* 列头彩色 pill */}
                <rect
                  x={x}
                  y="80"
                  width={COL_W}
                  height="28"
                  rx="8"
                  fill={v.color}
                  fillOpacity="0.12"
                  stroke={v.color}
                  strokeWidth="1.2"
                />
                <text
                  x={cx}
                  y="99"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={v.color}
                >
                  {v.name}
                </text>

                {/* 节点 + 向下箭头 */}
                {v.nodes.map((label, ni) => {
                  const ny = NODES_TOP_Y + ni * NODE_ROW;
                  return (
                    <g key={label}>
                      <rect
                        x={nx}
                        y={ny}
                        width={NODE_W}
                        height={NODE_H}
                        rx="6"
                        fill="var(--bg)"
                        stroke="var(--border)"
                        strokeWidth="1"
                      />
                      <text
                        x={cx}
                        y={ny + NODE_H / 2 + 4}
                        textAnchor="middle"
                        fontSize="12"
                        fontFamily="monospace"
                        fill="var(--text-primary)"
                      >
                        {label}
                      </text>
                      {/* 向下箭头（最后一个节点不画） */}
                      {ni < v.nodes.length - 1 && (
                        <line
                          x1={cx}
                          y1={ny + NODE_H}
                          x2={cx}
                          y2={ny + NODE_ROW - 2}
                          stroke="var(--accent)"
                          strokeWidth="1.6"
                          markerEnd="url(#gpp-loop-arrow)"
                        />
                      )}
                    </g>
                  );
                })}

                {/* 回环箭头：末节点 → 首节点（右侧折线） */}
                <path
                  d={`M ${nodeRight(ci)} ${lastMidY} L ${loopX(ci)} ${lastMidY} L ${loopX(ci)} ${firstMidY} L ${nodeRight(ci) - 2} ${firstMidY}`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.6"
                  markerEnd="url(#gpp-loop-arrow)"
                />
                <text
                  x={loopX(ci) + 4}
                  y={(firstMidY + lastMidY) / 2}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  循环
                </text>

                {/* 「帧率无关」徽章（仅固定时间步列） */}
                {v.badge && (
                  <g>
                    <rect
                      x={cx - 40}
                      y="250"
                      width="80"
                      height="20"
                      rx="10"
                      fill="var(--accent)"
                      fillOpacity="0.12"
                      stroke="var(--accent)"
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y="264"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="var(--accent)"
                    >
                      {v.badge}
                    </text>
                  </g>
                )}

                {/* 优缺点 */}
                <text x={cx} y={PROS_Y} textAnchor="middle" fontSize="11">
                  <tspan fontWeight="700" fill="var(--success)">
                    ＋{" "}
                  </tspan>
                  <tspan fill="var(--text-primary)">{v.pros}</tspan>
                </text>
                <text x={cx} y={CONS_Y} textAnchor="middle" fontSize="11">
                  <tspan fontWeight="700" fill="var(--danger)">
                    －{" "}
                  </tspan>
                  <tspan fill="var(--text-primary)">{v.cons}</tspan>
                </text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="60"
            y="366"
            width={VIEW_W - 120}
            height="64"
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="390"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            现代引擎主流 = 固定时间步 + 最大帧率
          </text>
          <text
            x={VIEW_W / 2}
            y="412"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            固定时间步保证物理稳定；最大 dt 上限避免「更新追不上渲染」的螺旋死亡
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        简单循环把更新频率绑死在帧率上，快慢机器表现不一致；固定时间步把模拟与渲染解耦，物理始终以恒定步长推进；再加最大 dt 上限，即使单帧卡顿也不会让更新陷入追不上的死循环。
      </figcaption>
    </figure>
  );
}
