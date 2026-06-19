/**
 * <AaAgentFiveComponentsDiagram>：智能体五大件解剖图（HEL-273，全书地图静态图）。
 *
 * 失忆天才小屋隐喻：中心是「模型（大脑·失忆天才本人）」，四周环绕他天生缺的四件
 * 配件——提示（塞进去的纸条）/ 工具（伸出屋外的电话）/ 记忆（笔记本+资料库）/
 * 规划（待办清单）。一张图把「一个智能体由哪五大件组成、各自干啥、隐喻物是什么」摊清。
 *
 * 布局（防遮挡红线，§四几何）：中心节点居中，四件分置左上/右上/左下/右下四角，
 * 中心与四角互不重叠；中心→四角的连线先画（在节点之下），不穿任何文字；每件节点
 * 三行文字（名称+隐喻物 / 职责），盒高足够容纳、textAnchor=middle 居中不溢出列。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 全部 DESIGN token 配色（var(--accent) / --warning / --success / --danger / --border /
 * --bg / --bg-elevated / --text-primary / --text-secondary），无裸 hex、无阴影。
 */

export function AaAgentFiveComponentsDiagram() {
  // —— 布局常量（viewBox 内坐标）——
  const VIEW_W = 760;
  const VIEW_H = 560;

  // 中心：模型（大脑）。盒 220×84，居中。
  const CEN_W = 220;
  const CEN_H = 84;
  const CX = VIEW_W / 2; // 380
  const CY = VIEW_H / 2 + 8; // 288（略下移，给顶部标题留白）
  const cenX = CX - CEN_W / 2;
  const cenY = CY - CEN_H / 2;

  // 四角配件盒 232×92。四角坐标用单一对称公式排（左右各留 24px 边距）。
  const SAT_W = 232;
  const SAT_H = 92;
  const MARGIN_X = 24; // 盒左/右缘距 viewBox 边
  const TOP_Y = 84; // 上排盒顶 y
  const BOTTOM_Y = VIEW_H - 16 - SAT_H; // 下排盒顶 y（= 452）
  const LEFT_X = MARGIN_X; // 左列盒左缘 = 24
  const RIGHT_X = VIEW_W - MARGIN_X - SAT_W; // 右列盒左缘 = 504

  // 四件配件：名称 / 隐喻物 / 一句话职责 / 色 / 角位置 / 对应全书第几篇。
  type Satellite = {
    id: string;
    name: string;
    metaphor: string; // 隐喻物
    duty: string; // 一句话职责
    color: string;
    x: number; // 盒左缘
    y: number; // 盒顶
  };
  const sats: readonly Satellite[] = [
    {
      id: "prompt",
      name: "提示 Prompt",
      metaphor: "🗒 塞进去的纸条",
      duty: "怎么跟它说话：把任务写清楚",
      color: "var(--success)",
      x: LEFT_X,
      y: TOP_Y,
    },
    {
      id: "tools",
      name: "工具 Tools",
      metaphor: "📞 伸出屋外的电话",
      duty: "替它出屋做事：搜索·算账·读写",
      color: "var(--warning)",
      x: RIGHT_X,
      y: TOP_Y,
    },
    {
      id: "memory",
      name: "记忆 Memory",
      metaphor: "📓 笔记本 + 资料库",
      duty: "治失忆：该记的存下来、要用时取回",
      color: "var(--danger)",
      x: LEFT_X,
      y: BOTTOM_Y,
    },
    {
      id: "planning",
      name: "规划 Planning",
      metaphor: "✅ 待办清单",
      duty: "拆解多步任务、做完回头自检",
      color: "var(--accent)",
      x: RIGHT_X,
      y: BOTTOM_Y,
    },
  ];

  // 中心四边的连线锚点（从中心盒边缘往四角，避免线从盒中心穿出压字）。
  const cenLeft = cenX;
  const cenRight = cenX + CEN_W;
  const cenTop = cenY;
  const cenBottom = cenY + CEN_H;

  // 连线：中心盒边某点 → 配件盒朝中心的内角。用配件盒朝中心的内侧中点为靶。
  function satAnchor(s: Satellite): { x: number; y: number } {
    const isLeft = s.x < CX;
    const isTop = s.y < CY;
    return {
      x: isLeft ? s.x + SAT_W : s.x, // 朝中心的那条竖边
      y: isTop ? s.y + SAT_H : s.y, // 朝中心的那条横边（取盒角）
    };
  }
  function cenAnchor(s: Satellite): { x: number; y: number } {
    const isLeft = s.x < CX;
    const isTop = s.y < CY;
    return {
      x: isLeft ? cenLeft + 16 : cenRight - 16,
      y: isTop ? cenTop : cenBottom,
    };
  }

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="智能体五大件解剖图。正中央是「模型（大脑）」，也就是失忆天才本人，负责决策、动脑。围绕它的四个角各有一件配件：左上「提示」是塞进去的纸条，负责怎么跟模型说话、把任务写清楚；右上「工具」是伸出屋外的电话，替模型出屋做事，如搜索、算账、读写文件；左下「记忆」是笔记本加资料库，治失忆，把该记的存下来、要用时取回；右下「规划」是待办清单，负责拆解多步任务、做完回头自检。四件分别由四条连线连回中心的模型，组成一个完整的智能体。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          {/* ===== 标题 ===== */}
          <text
            x={CX}
            y="34"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一个智能体 = 模型（大脑）+ 围着它的四件配件
          </text>

          {/* ===== 中心 → 四角连线（先画，落在节点之下，不穿字）===== */}
          {sats.map((s) => {
            const a = cenAnchor(s);
            const b = satAnchor(s);
            return (
              <line
                key={`edge-${s.id}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={s.color}
                strokeWidth="1.6"
                strokeDasharray="5 4"
                opacity="0.55"
              />
            );
          })}

          {/* ===== 中心节点：模型（大脑）===== */}
          <rect
            x={cenX}
            y={cenY}
            width={CEN_W}
            height={CEN_H}
            rx="14"
            fill="var(--accent)"
            fillOpacity="0.16"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={CX}
            y={cenY + 32}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🧠 模型（大脑）
          </text>
          <text
            x={CX}
            y={cenY + 54}
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            失忆天才本人 · 负责决策、动脑
          </text>
          <text
            x={CX}
            y={cenY + 72}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            会幻觉 · 记不住 · 动不了手
          </text>

          {/* ===== 四角配件节点 ===== */}
          {sats.map((s) => (
            <g key={s.id}>
              <rect
                x={s.x}
                y={s.y}
                width={SAT_W}
                height={SAT_H}
                rx="12"
                fill={s.color}
                fillOpacity="0.1"
                stroke={s.color}
                strokeWidth="1.6"
              />
              {/* 名称（盒内第一行） */}
              <text
                x={s.x + SAT_W / 2}
                y={s.y + 26}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {s.name}
              </text>
              {/* 隐喻物（第二行） */}
              <text
                x={s.x + SAT_W / 2}
                y={s.y + 48}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={s.color}
              >
                {s.metaphor}
              </text>
              {/* 一句话职责（第三行） */}
              <text
                x={s.x + SAT_W / 2}
                y={s.y + 70}
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {s.duty}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        智能体的五大件：中心是「模型」这颗大脑，四周是提示（纸条）、工具（电话）、记忆（笔记本+资料库）、
        规划（待办清单）——把这位失忆天才缺的能力一件件补齐，他才成了能干活的智能体。
      </figcaption>
    </figure>
  );
}
