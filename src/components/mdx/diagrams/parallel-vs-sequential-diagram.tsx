/**
 * <ParallelVsSequentialDiagram>：并行调用 vs 串行调用对照（HEL-314，第 8 章）。
 *
 * 一张静态 SVG，两栏并列：
 *   左栏「并行」：用户一句话里有几件互不依赖的事，模型一次性发出多个调用（A、B 同时发，
 *     谁也不等谁），结果一起回来——一根「同时」的分叉箭头。
 *   右栏「串行」：后一个调用要用到前一个的结果，只能 A → 拿到结果 → 再用它去 B，一条链。
 * 核心一图：调用之间有没有「数据依赖」决定能不能并行——彼此独立就一次性并发省时间，
 * 后者要吃前者的输出就只能排队串起来。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名且为 4 的倍数（硬规则 5）。
 * 几何自检：两栏与各节点零重叠、文字中心落在自己框内、四周留白 ≥ 12px、字号 ≥ 10px、单一 x/y 公式。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 360;

// —— 两栏分区。 ——
const COL_W = 328;
const LEFT_X = 24; // 左栏左边界
const RIGHT_X = VIEW_W - COL_W - 24; // 368，右栏左边界（右留白 24）
const COL_TOP = 56;
const COL_H = 280; // 底 = 56 + 280 = 336 → 距底 24

const TITLE_Y = 40;

// —— 栏内节点：一个「模型」起点 + 两个调用框。 ——
const NODE_W = 132;
const NODE_H = 52;

// 并行栏：模型在上居中，两调用框在下并排（同时）。
const PAR_MODEL_X = LEFT_X + (COL_W - NODE_W) / 2; // 居中
const PAR_MODEL_Y = COL_TOP + 36;
const PAR_CALL_Y = COL_TOP + 168;
const PAR_CALL_A_X = LEFT_X + 28;
const PAR_CALL_B_X = LEFT_X + COL_W - NODE_W - 28;

// 串行栏：模型在上居中，A 在中、B 在下，竖直一条链。
const SEQ_MODEL_X = RIGHT_X + (COL_W - NODE_W) / 2;
const SEQ_MODEL_Y = COL_TOP + 24;
const SEQ_CALL_A_Y = COL_TOP + 116;
const SEQ_CALL_B_Y = COL_TOP + 208;
const SEQ_CALL_X = RIGHT_X + (COL_W - NODE_W) / 2;

export function ParallelVsSequentialDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并行调用与串行调用的对照图，左右两栏。左栏是并行调用：用户一句话里有几件互不依赖的事，模型一次性同时发出两个调用，查订单 check_order 和查天气 get_weather 同时发出、谁也不等谁，结果一起回来，用一根分叉箭头表示同时。右栏是串行调用：后一个调用要用到前一个的结果，模型只能先调 search_docs 拿到订单政策，再把这个结果喂给下一步去调 check_order，连成一条上下相连的链。核心结论：调用之间有没有数据依赖，决定能不能并行。彼此独立的调用一次性并发，省时间；后一个要吃前一个的输出，就只能排队串起来。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="pvs-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* —— 左栏「并行」区底框 + 标题 —— */}
          <rect
            x={LEFT_X}
            y={COL_TOP}
            width={COL_W}
            height={COL_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <text
            x={LEFT_X + 4}
            y={TITLE_Y - 8}
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            ⇉ 并行：互不依赖，一起发
          </text>
          <text
            x={LEFT_X + 4}
            y={TITLE_Y + 8}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            「查订单 + 查天气」两件事彼此独立
          </text>

          {/* 并行：模型 → 同时分叉到两个调用 */}
          <line
            x1={PAR_MODEL_X + NODE_W / 2}
            y1={PAR_MODEL_Y + NODE_H}
            x2={PAR_CALL_A_X + NODE_W / 2}
            y2={PAR_CALL_Y}
            stroke="var(--success)"
            strokeWidth="1.6"
            markerEnd="url(#pvs-arrow)"
          />
          <line
            x1={PAR_MODEL_X + NODE_W / 2}
            y1={PAR_MODEL_Y + NODE_H}
            x2={PAR_CALL_B_X + NODE_W / 2}
            y2={PAR_CALL_Y}
            stroke="var(--success)"
            strokeWidth="1.6"
            markerEnd="url(#pvs-arrow)"
          />
          {/* 并行：模型框 */}
          <rect
            x={PAR_MODEL_X}
            y={PAR_MODEL_Y}
            width={NODE_W}
            height={NODE_H}
            rx="8"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x={PAR_MODEL_X + NODE_W / 2}
            y={PAR_MODEL_Y + NODE_H / 2 + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            模型一次提议
          </text>
          {/* 并行：调用 A */}
          <rect
            x={PAR_CALL_A_X}
            y={PAR_CALL_Y}
            width={NODE_W}
            height={NODE_H}
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x={PAR_CALL_A_X + NODE_W / 2}
            y={PAR_CALL_Y + NODE_H / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            check_order
          </text>
          {/* 并行：调用 B */}
          <rect
            x={PAR_CALL_B_X}
            y={PAR_CALL_Y}
            width={NODE_W}
            height={NODE_H}
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x={PAR_CALL_B_X + NODE_W / 2}
            y={PAR_CALL_Y + NODE_H / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            get_weather
          </text>
          {/* 并行：底注 */}
          <text
            x={LEFT_X + COL_W / 2}
            y={COL_TOP + COL_H - 16}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            同时发、一起回——省时间
          </text>

          {/* —— 右栏「串行」区底框 + 标题 —— */}
          <rect
            x={RIGHT_X}
            y={COL_TOP}
            width={COL_W}
            height={COL_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--warning)"
            strokeWidth="1.6"
          />
          <text
            x={RIGHT_X + 4}
            y={TITLE_Y - 8}
            fontSize="13"
            fontWeight="700"
            fill="var(--warning)"
          >
            ↓ 串行：后者吃前者结果
          </text>
          <text
            x={RIGHT_X + 4}
            y={TITLE_Y + 8}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            先查到政策，才知道该查哪张单
          </text>

          {/* 串行：模型 → A → B 一条竖链 */}
          <line
            x1={SEQ_MODEL_X + NODE_W / 2}
            y1={SEQ_MODEL_Y + NODE_H}
            x2={SEQ_CALL_X + NODE_W / 2}
            y2={SEQ_CALL_A_Y}
            stroke="var(--warning)"
            strokeWidth="1.6"
            markerEnd="url(#pvs-arrow)"
          />
          <line
            x1={SEQ_CALL_X + NODE_W / 2}
            y1={SEQ_CALL_A_Y + NODE_H}
            x2={SEQ_CALL_X + NODE_W / 2}
            y2={SEQ_CALL_B_Y}
            stroke="var(--warning)"
            strokeWidth="1.6"
            markerEnd="url(#pvs-arrow)"
          />
          {/* 串行：模型框 */}
          <rect
            x={SEQ_MODEL_X}
            y={SEQ_MODEL_Y}
            width={NODE_W}
            height={NODE_H}
            rx="8"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x={SEQ_MODEL_X + NODE_W / 2}
            y={SEQ_MODEL_Y + NODE_H / 2 + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            模型先调一个
          </text>
          {/* 串行：调用 A */}
          <rect
            x={SEQ_CALL_X}
            y={SEQ_CALL_A_Y}
            width={NODE_W}
            height={NODE_H}
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--warning)"
            strokeWidth="1.4"
          />
          <text
            x={SEQ_CALL_X + NODE_W / 2}
            y={SEQ_CALL_A_Y + NODE_H / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            search_docs
          </text>
          {/* 串行：调用 B（吃 A 的结果） */}
          <rect
            x={SEQ_CALL_X}
            y={SEQ_CALL_B_Y}
            width={NODE_W}
            height={NODE_H}
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--warning)"
            strokeWidth="1.4"
          />
          <text
            x={SEQ_CALL_X + NODE_W / 2}
            y={SEQ_CALL_B_Y + NODE_H / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--text-primary)"
          >
            check_order
          </text>
          {/* 串行：底注 */}
          <text
            x={RIGHT_X + COL_W / 2}
            y={COL_TOP + COL_H - 16}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            只能排队——前者结果是后者的输入
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        调用之间有没有「数据依赖」决定能不能并行：彼此独立的（查订单 +
        查天气）一次性并发省时间；后一个要吃前一个的输出（先查政策再查单），就只能串成一条链排队。
      </figcaption>
    </figure>
  );
}
