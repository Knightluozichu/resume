/**
 * <ChatbotWorkflowAgentDiagram>：聊天机器人 / 工作流 / 智能体 三列对比解剖图（HEL-271）。
 *
 * 三列并排，单一 x 公式 xs[i]=LEFT+i*(colW+GAP)，列宽相等、绝不互压：
 *  - 列1 聊天机器人：一问一答的直线（用户问 ↓ 模型答），到此为止，无流程。
 *  - 列2 工作流：人事先写死的固定流程，步骤 A → B → C 串成固定箭头链，每次都走同一条路。
 *  - 列3 智能体：大脑在中心，按情况自己决定下一步、可回环（决策 ↔ 工具，带闭环回边）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 全部 DESIGN token 配色（var(--accent) / --warning / --success / --border / --bg /
 * --bg-elevated / --text-primary / --text-secondary），无裸 hex、无阴影。
 * 遮挡红线：箭头不穿字、列标题不压列内元素、长中文标签预留宽度，列框互不重叠。
 */

export function ChatbotWorkflowAgentDiagram() {
  // —— 布局常量（viewBox 内坐标；单一公式排三列）——
  const VIEW_W = 724;
  const VIEW_H = 384;
  const LEFT = 16;
  const GAP = 16;
  const COL_W = 220;
  const PAD = 16; // 列内左右内边距
  const NODE_H = 44;

  // 三列左缘 x：单一公式，等距、无重叠。
  const xs = [0, 1, 2].map((i) => LEFT + i * (COL_W + GAP));
  const colCenter = (i: number) => xs[i] + COL_W / 2;
  const innerX = (i: number) => xs[i] + PAD;
  const innerW = COL_W - 2 * PAD;

  // 列框上下界（列标题在框上方）。
  const FRAME_Y = 68;
  const FRAME_BOTTOM = VIEW_H - 16;

  const titles = [
    { name: "聊天机器人", sub: "一问一答" },
    { name: "工作流", sub: "人写死的固定流程" },
    { name: "智能体", sub: "自己决定下一步" },
  ];
  const accents = ["var(--text-secondary)", "var(--warning)", "var(--accent)"];

  // 列1 聊天机器人：两块竖排（用户问 ↓ 模型答）。
  const cbY0 = FRAME_Y + 44;
  const cbY1 = cbY0 + NODE_H + 36;

  // 列2 工作流：三块竖排 A → B → C，固定箭头链。
  const wfGap = 30;
  const wfY = [0, 1, 2].map((i) => FRAME_Y + 44 + i * (NODE_H + wfGap));
  const wfBoxes = [
    { label: "步骤 A", sub: "取数据" },
    { label: "步骤 B", sub: "做处理" },
    { label: "步骤 C", sub: "出结果" },
  ];

  // 列3 智能体：大脑居中 + 工具块，带闭环回边。
  const agCx = colCenter(2);
  const brainY = FRAME_Y + 52;
  const toolY = brainY + NODE_H + 70;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="聊天机器人、工作流、智能体三种系统的对比解剖图。左列「聊天机器人」是一条直线：用户问在上、模型答在下，一问一答到此为止，没有流程。中列「工作流」是人事先写死的固定流程：步骤 A 取数据 → 步骤 B 做处理 → 步骤 C 出结果，串成一条固定箭头链，每次都走同一条路、不会临场变化。右列「智能体」中心是一个大脑节点，下方是工具节点，大脑根据情况自己决定调哪个工具、并带一条从工具回到大脑的闭环回边——可以反复循环、临场决定下一步，而不是走死板的固定流程。"
          className="mx-auto block h-auto w-full max-w-[724px]"
        >
          <defs>
            <marker
              id="cwa-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="cwa-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ===== 三列：列框 + 列标题 ===== */}
          {[0, 1, 2].map((i) => (
            <g key={`col-${i}`}>
              <rect
                x={xs[i]}
                y={FRAME_Y}
                width={COL_W}
                height={FRAME_BOTTOM - FRAME_Y}
                rx="12"
                fill="var(--bg)"
                stroke={accents[i]}
                strokeWidth="1.4"
                strokeOpacity="0.5"
              />
              <text
                x={colCenter(i)}
                y="32"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {titles[i].name}
              </text>
              <text
                x={colCenter(i)}
                y="52"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {titles[i].sub}
              </text>
            </g>
          ))}

          {/* ===== 列1 聊天机器人：用户问 ↓ 模型答 ===== */}
          {[
            { y: cbY0, label: "用户提问", color: "var(--text-secondary)" },
            { y: cbY1, label: "模型回答", color: "var(--text-secondary)" },
          ].map((b, k) => (
            <g key={`cb-${k}`}>
              <rect
                x={innerX(0)}
                y={b.y}
                width={innerW}
                height={NODE_H}
                rx="8"
                fill={b.color}
                fillOpacity="0.1"
                stroke={b.color}
                strokeWidth="1.2"
              />
              <text
                x={colCenter(0)}
                y={b.y + NODE_H / 2 + 4}
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-primary)"
              >
                {b.label}
              </text>
            </g>
          ))}
          <line
            x1={colCenter(0)}
            y1={cbY0 + NODE_H}
            x2={colCenter(0)}
            y2={cbY1}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            markerEnd="url(#cwa-arrow)"
            opacity="0.7"
          />
          <text
            x={colCenter(0)}
            y={cbY1 + NODE_H + 28}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            答完即止 · 无下一步
          </text>

          {/* ===== 列2 工作流：A → B → C 固定箭头链 ===== */}
          {wfBoxes.map((b, k) => (
            <g key={`wf-${k}`}>
              <rect
                x={innerX(1)}
                y={wfY[k]}
                width={innerW}
                height={NODE_H}
                rx="8"
                fill="var(--warning)"
                fillOpacity="0.1"
                stroke="var(--warning)"
                strokeWidth="1.2"
              />
              <text
                x={colCenter(1)}
                y={wfY[k] + 19}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {b.label}
              </text>
              <text
                x={colCenter(1)}
                y={wfY[k] + 35}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {b.sub}
              </text>
            </g>
          ))}
          {[0, 1].map((k) => (
            <line
              key={`wf-edge-${k}`}
              x1={colCenter(1)}
              y1={wfY[k] + NODE_H}
              x2={colCenter(1)}
              y2={wfY[k + 1]}
              stroke="var(--warning)"
              strokeWidth="1.4"
              markerEnd="url(#cwa-arrow)"
              opacity="0.8"
            />
          ))}

          {/* ===== 列3 智能体：大脑居中 + 工具 + 闭环回边 ===== */}
          {/* 大脑 */}
          <rect
            x={innerX(2)}
            y={brainY}
            width={innerW}
            height={NODE_H}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.16"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x={agCx}
            y={brainY + 19}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🧠 大脑（决策）
          </text>
          <text
            x={agCx}
            y={brainY + 35}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            按情况决定下一步
          </text>
          {/* 工具 */}
          <rect
            x={innerX(2)}
            y={toolY}
            width={innerW}
            height={NODE_H}
            rx="8"
            fill="var(--success)"
            fillOpacity="0.12"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x={agCx}
            y={toolY + 19}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            🔧 工具 / 行动
          </text>
          <text
            x={agCx}
            y={toolY + 35}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            搜索 · 算账 · 写文件
          </text>
          {/* 去边：大脑 → 工具（左侧下行） */}
          <line
            x1={agCx - 28}
            y1={brainY + NODE_H}
            x2={agCx - 28}
            y2={toolY}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#cwa-arrow-accent)"
            opacity="0.85"
          />
          {/* 回边：工具 → 大脑（右侧上行，闭环） */}
          <line
            x1={agCx + 28}
            y1={toolY}
            x2={agCx + 28}
            y2={brainY + NODE_H}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#cwa-arrow-accent)"
            strokeDasharray="5 4"
            opacity="0.85"
          />
          <text
            x={agCx}
            y={toolY + NODE_H + 26}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ↻ 可回环 · 自己循环
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        聊天机器人是一问一答的直线；工作流是人事先写死、每次都走同一条的固定流程；
        智能体的大脑按情况自己决定下一步、可回环——这正是三者最根本的区别。
      </figcaption>
    </figure>
  );
}
