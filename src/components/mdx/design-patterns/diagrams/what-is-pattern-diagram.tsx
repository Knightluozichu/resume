/**
 * <WhatIsPatternDiagram>：「问题 → 模式 → 解决」三步流程图（design-patterns 课程入门章）。
 *
 * 三块面板横向排布：左侧「没有模式」（红色调，if-else 意大利面，纠缠的分支节点）→
 * 中间「设计模式」（紫色调，桥梁/转换器，问题→模式→解决的竖向贯通）→ 右侧「有模式」
 * （绿色调，清晰的分层结构）。两段 accent 箭头连接三步，分别标「套用」「得到」。
 *
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 宽 720（≥660）、四周留白 ≥32、
 * 面板间距 28（≥20，R8）、字号 ≥11、箭头不戳进盒子（R7）、三段垂直分层（标题 / 三面板主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 340;

// 三面板几何：宽 200、间距 28、左右各留 32。
const PANEL_W = 200;
const PANEL_GAP = 28;
const PANEL_MARGIN = 32;
const PANEL_Y = 80;
const PANEL_H = 200;
const panelX = (i: number) => PANEL_MARGIN + i * (PANEL_W + PANEL_GAP);

// 面板竖向中线（箭头高度）。
const ARROW_Y = 186;

export function WhatIsPatternDiagram() {
  // 面板 1（没有模式）的纠缠节点：2×2 排布的 if/elif/else 分支，两条对角连线在行间
  // 空隙交叉，营造「if-else 意大利面」的纠缠感（不设中心盒，避免连线穿盒）。
  const p1 = panelX(0);
  const branches = [
    { x: p1 + 40, y: 146, w: 64, h: 24, label: "if A" },
    { x: p1 + 128, y: 146, w: 64, h: 24, label: "elif B" },
    { x: p1 + 40, y: 198, w: 64, h: 24, label: "elif C" },
    { x: p1 + 128, y: 198, w: 64, h: 24, label: "else" },
  ];
  // 两条对角连线：if A ↔ else、elif B ↔ elif C，在行间空隙（170→198）交叉，
  // 端点落在节点边缘，不穿任何节点。
  const tangles = [
    { x1: p1 + 72, y1: 170, x2: p1 + 160, y2: 198 }, // if A 底中 → else 顶中
    { x1: p1 + 160, y1: 170, x2: p1 + 72, y2: 198 }, // elif B 底中 → elif C 顶中
  ];

  // 面板 2（设计模式）坐标。
  const p2 = panelX(1);
  const modeBox = { x: p2 + 30, y: 164, w: 140, h: 44 };

  // 面板 3（有模式）分层条坐标。
  const p3 = panelX(2);
  const layers = [
    { y: 140, label: "接口层  Interface" },
    { y: 180, label: "业务层  Logic" },
    { y: 220, label: "数据层  Data" },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="设计模式是什么：三步流程图。左侧「没有模式」是纠缠的 if-else 分支（红色调，意大利面条式代码）；中间「设计模式」是一座桥梁/转换器（紫色调，问题经模式转换为解决）；右侧「有模式」是清晰的分层结构（绿色调，接口层、业务层、数据层）。两段箭头标「套用」「得到」把三步连起来。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="wip-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L7 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="34"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            设计模式是什么
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            从混乱的问题到清晰的解，中间隔着一套可复用的模式
          </text>

          {/* ===== 面板 1：没有模式（红）===== */}
          <g>
            <rect
              x={p1}
              y={PANEL_Y}
              width={PANEL_W}
              height={PANEL_H}
              rx="12"
              fill="var(--danger)"
              fillOpacity="0.06"
              stroke="var(--danger)"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <text
              x={p1 + PANEL_W / 2}
              y="104"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--danger)"
            >
              没有模式
            </text>
            <text
              x={p1 + PANEL_W / 2}
              y="122"
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              if-else 意大利面
            </text>
            {/* 纠缠连线（先画，落在节点之下）*/}
            {tangles.map((t, i) => (
              <line
                key={`tangle-${i}`}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="var(--danger)"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                opacity="0.45"
              />
            ))}
            {/* 四角分支节点 */}
            {branches.map((b) => (
              <g key={b.label}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx="6"
                  fill="var(--bg)"
                  stroke="var(--danger)"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />
                <text
                  x={b.x + b.w / 2}
                  y={b.y + b.h / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {b.label}
                </text>
              </g>
            ))}
          </g>

          {/* ===== 面板 2：设计模式（紫，桥梁/转换器）===== */}
          <g>
            <rect
              x={p2}
              y={PANEL_Y}
              width={PANEL_W}
              height={PANEL_H}
              rx="12"
              fill="var(--accent)"
              fillOpacity="0.06"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <text
              x={p2 + PANEL_W / 2}
              y="104"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--accent)"
            >
              设计模式
            </text>
            <text
              x={p2 + PANEL_W / 2}
              y="122"
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              桥梁 · 转换器
            </text>
            {/* 问题（输入）pill */}
            <rect
              x={p2 + 60}
              y="132"
              width="80"
              height="24"
              rx="6"
              fill="var(--bg)"
              stroke="var(--danger)"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
            <text
              x={p2 + 100}
              y="148"
              textAnchor="middle"
              fontSize="12"
              fill="var(--danger)"
            >
              问题
            </text>
            {/* 输入箭头 */}
            <line
              x1={p2 + 100}
              y1={156}
              x2={p2 + 100}
              y2={162}
              stroke="var(--accent)"
              strokeWidth="1.6"
              markerEnd="url(#wip-arrow)"
            />
            {/* 模式转换器盒 */}
            <rect
              x={modeBox.x}
              y={modeBox.y}
              width={modeBox.w}
              height={modeBox.h}
              rx="10"
              fill="var(--accent)"
              fillOpacity="0.14"
              stroke="var(--accent)"
              strokeWidth="1.8"
            />
            <text
              x={p2 + 100}
              y="184"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--accent)"
            >
              设计模式
            </text>
            <text
              x={p2 + 100}
              y="200"
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              经验沉淀的方案
            </text>
            {/* 输出箭头 */}
            <line
              x1={p2 + 100}
              y1={208}
              x2={p2 + 100}
              y2={214}
              stroke="var(--accent)"
              strokeWidth="1.6"
              markerEnd="url(#wip-arrow)"
            />
            {/* 解决（输出）pill */}
            <rect
              x={p2 + 60}
              y="216"
              width="80"
              height="24"
              rx="6"
              fill="var(--bg)"
              stroke="var(--success)"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
            <text
              x={p2 + 100}
              y="232"
              textAnchor="middle"
              fontSize="12"
              fill="var(--success)"
            >
              解决
            </text>
          </g>

          {/* ===== 面板 3：有模式（绿，清晰分层）===== */}
          <g>
            <rect
              x={p3}
              y={PANEL_Y}
              width={PANEL_W}
              height={PANEL_H}
              rx="12"
              fill="var(--success)"
              fillOpacity="0.06"
              stroke="var(--success)"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <text
              x={p3 + PANEL_W / 2}
              y="104"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--success)"
            >
              有模式
            </text>
            <text
              x={p3 + PANEL_W / 2}
              y="122"
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              清晰分层
            </text>
            {/* 三层条 */}
            {layers.map((l) => (
              <g key={l.label}>
                <rect
                  x={p3 + 20}
                  y={l.y}
                  width="160"
                  height="30"
                  rx="6"
                  fill="var(--success)"
                  fillOpacity="0.1"
                  stroke="var(--success)"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />
                <text
                  x={p3 + 100}
                  y={l.y + 19}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {l.label}
                </text>
              </g>
            ))}
          </g>

          {/* ===== 面板间连接箭头 ===== */}
          {/* 面板 1 → 面板 2：套用 */}
          <line
            x1={p1 + PANEL_W + 4}
            y1={ARROW_Y}
            x2={p2 - 4}
            y2={ARROW_Y}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#wip-arrow)"
          />
          <text
            x={(p1 + PANEL_W + p2) / 2}
            y={ARROW_Y - 10}
            textAnchor="middle"
            fontSize="11"
            fill="var(--accent)"
          >
            套用
          </text>
          {/* 面板 2 → 面板 3：得到 */}
          <line
            x1={p2 + PANEL_W + 4}
            y1={ARROW_Y}
            x2={p3 - 4}
            y2={ARROW_Y}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#wip-arrow)"
          />
          <text
            x={(p2 + PANEL_W + p3) / 2}
            y={ARROW_Y - 10}
            textAnchor="middle"
            fontSize="11"
            fill="var(--accent)"
          >
            得到
          </text>

          {/* ===== 底部总结（三段分层之底部）===== */}
          <text
            x={VIEW_W / 2}
            y="304"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            问题 → 套用模式 → 解决：模式是前人沉淀、可复用的解题方案
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        没有模式时代码是纠缠的
        if-else；套用设计模式这座「桥梁」，把问题映射到清晰的抽象分层——这就是模式的价值。
      </figcaption>
    </figure>
  );
}
