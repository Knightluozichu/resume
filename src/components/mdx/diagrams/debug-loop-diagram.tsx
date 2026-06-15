/**
 * <DebugLoopDiagram />：《Android 编程权威指南》basics/debugging 章「复现→定位→验证」配图（HEL-175）。
 *
 * 画面内容：调试闭环流程（环形）：
 *  复现（稳定重现） → 定位（看 Logcat / 读堆栈 / 下断点：普通·条件·异常）
 *  → 假设修复 → 验证（再跑一遍）；验证未通过则回边弹回「复现」重来。
 * 节点圆角矩形 + 有向箭头；关键节点旁附小注（堆栈从顶向下读第一行≈崩溃点、ANR=主线程阻塞>5s）。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：全部 DESIGN token 配色，无裸 hex，rx 圆角，无阴影，几何常量具名且为 4 的倍数（硬规则 5）。
 */

// —— 布局常量（间距走 4 倍数）。 ——
const VIEW_W = 720;
const VIEW_H = 360;
const NODE_W = 152; // 流程节点宽
const NODE_H = 56; // 流程节点高
const COL_1 = 48; // 第一列 x（复现）
const COL_2 = 284; // 第二列 x（定位）
const COL_3 = 520; // 第三列 x（修复 / 验证）
const ROW_TOP = 72; // 上排节点 y
const ROW_BOT = 224; // 下排节点 y（回边经过）

// 四个流程节点：圆角矩形，accent 主色，验证节点用 success 收口。
type FlowNode = {
  id: string;
  title: string;
  sub: string;
  x: number;
  y: number;
  color: string;
};

const NODES: readonly FlowNode[] = [
  {
    id: "repro",
    title: "复现",
    sub: "稳定重现这个 bug",
    x: COL_1,
    y: ROW_TOP,
    color: "var(--accent)",
  },
  {
    id: "locate",
    title: "定位",
    sub: "看 Logcat / 读堆栈 / 下断点",
    x: COL_2,
    y: ROW_TOP,
    color: "var(--accent)",
  },
  {
    id: "fix",
    title: "假设修复",
    sub: "改最可疑的那一行",
    x: COL_3,
    y: ROW_TOP,
    color: "var(--accent)",
  },
  {
    id: "verify",
    title: "验证",
    sub: "再跑一遍复现路径",
    x: COL_3,
    y: ROW_BOT,
    color: "var(--success)",
  },
];

// 三种断点（挂在「定位」节点下方的小标签）。
const BREAKPOINTS: readonly string[] = ["普通", "条件", "异常"];

export function DebugLoopDiagram() {
  // 节点中心点速查（连线用）。
  const center = (n: FlowNode) => ({ cx: n.x + NODE_W / 2, cy: n.y + NODE_H / 2 });
  const repro = NODES[0];
  const locate = NODES[1];
  const fix = NODES[2];
  const verify = NODES[3];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="调试闭环流程图。四个节点首尾相连：①复现，稳定重现这个 bug；箭头向右到 ②定位，看 Logcat、读堆栈追踪、下断点（断点分普通、条件、异常三种）；箭头向右到 ③假设修复，改最可疑的那一行；箭头向下到 ④验证，再跑一遍复现路径。验证通过则收尾完成；验证未通过则有一条回边从验证弯回最左的复现节点，重新来过。图中附两条提示：堆栈追踪从顶向下读，第一行约等于崩溃点；ANR 等于主线程阻塞超过 5 秒。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 箭头 marker：主流程用 accent，回边用 warning。 */}
          <defs>
            <marker
              id="dbg-arr"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="dbg-arr-back"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* 标题 */}
          <text
            x={COL_1}
            y="32"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            调试闭环：复现 → 定位 → 修复 → 验证
          </text>

          {/* —— 主流程箭头（画在节点下层）—— */}
          {/* 复现 → 定位 */}
          <line
            x1={repro.x + NODE_W}
            y1={center(repro).cy}
            x2={locate.x - 8}
            y2={center(locate).cy}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#dbg-arr)"
          />
          {/* 定位 → 假设修复 */}
          <line
            x1={locate.x + NODE_W}
            y1={center(locate).cy}
            x2={fix.x - 8}
            y2={center(fix).cy}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#dbg-arr)"
          />
          {/* 假设修复 → 验证（向下） */}
          <line
            x1={center(fix).cx}
            y1={fix.y + NODE_H}
            x2={center(verify).cx}
            y2={verify.y - 8}
            stroke="var(--accent)"
            strokeWidth="1.6"
            markerEnd="url(#dbg-arr)"
          />

          {/* —— 回边：验证「未通过」→ 复现（折线绕到左下再上去）—— */}
          <polyline
            points={`${verify.x - 8},${center(verify).cy} ${COL_1 + NODE_W / 2},${center(verify).cy} ${center(repro).cx},${repro.y + NODE_H + 8}`}
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#dbg-arr-back)"
          />
          <text
            x={COL_1 + NODE_W / 2 + 16}
            y={center(verify).cy - 8}
            fontSize="10"
            fontWeight="600"
            fill="var(--warning)"
          >
            未解决 → 回到复现重来
          </text>

          {/* —— 验证「通过」收口 —— */}
          <line
            x1={verify.x + NODE_W}
            y1={center(verify).cy}
            x2={verify.x + NODE_W + 40}
            y2={center(verify).cy}
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <text
            x={verify.x + NODE_W + 48}
            y={center(verify).cy + 4}
            fontSize="10.5"
            fontWeight="700"
            fill="var(--success)"
          >
            通过 ✓
          </text>

          {/* —— 四个流程节点 —— */}
          {NODES.map((n) => (
            <g key={n.id}>
              <rect
                x={n.x}
                y={n.y}
                width={NODE_W}
                height={NODE_H}
                rx="8"
                fill={n.color}
                fillOpacity="0.1"
                stroke={n.color}
                strokeWidth="1.4"
              />
              <text
                x={n.x + NODE_W / 2}
                y={n.y + 22}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="700"
                fill={n.color}
              >
                {n.title}
              </text>
              <text
                x={n.x + NODE_W / 2}
                y={n.y + 40}
                textAnchor="middle"
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                {n.sub}
              </text>
            </g>
          ))}

          {/* —— 「定位」节点下挂三种断点小标签 —— */}
          {BREAKPOINTS.map((bp, i) => {
            const tagW = 44;
            const gap = 8;
            const totalW = BREAKPOINTS.length * tagW + (BREAKPOINTS.length - 1) * gap;
            const startX = center(locate).cx - totalW / 2;
            const x = startX + i * (tagW + gap);
            const y = locate.y + NODE_H + 20;
            return (
              <g key={bp}>
                <rect
                  x={x}
                  y={y}
                  width={tagW}
                  height={20}
                  rx="4"
                  fill="var(--accent)"
                  fillOpacity="0.08"
                  stroke="var(--accent)"
                  strokeWidth="1"
                />
                <text
                  x={x + tagW / 2}
                  y={y + 14}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {bp}
                </text>
              </g>
            );
          })}
          <text
            x={center(locate).cx}
            y={locate.y + NODE_H + 16}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            断点三种：
          </text>

          {/* —— 关键提示注解 1：堆栈读法（挂在定位附近）—— */}
          <rect
            x={COL_2 - 12}
            y={locate.y + NODE_H + 52}
            width={NODE_W + 24}
            height={36}
            rx="6"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x={center(locate).cx}
            y={locate.y + NODE_H + 68}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            堆栈追踪从顶向下读
          </text>
          <text
            x={center(locate).cx}
            y={locate.y + NODE_H + 81}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            第一行 ≈ 崩溃点
          </text>

          {/* —— 关键提示注解 2：ANR（挂在验证下方）—— */}
          <rect
            x={COL_3 - 12}
            y={verify.y + NODE_H + 16}
            width={NODE_W + 24}
            height={36}
            rx="6"
            fill="var(--danger)"
            fillOpacity="0.07"
            stroke="var(--danger)"
            strokeWidth="1"
          />
          <text
            x={center(verify).cx}
            y={verify.y + NODE_H + 32}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            卡死无响应？查 ANR
          </text>
          <text
            x={center(verify).cx}
            y={verify.y + NODE_H + 45}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--danger)"
          >
            ANR = 主线程阻塞 &gt; 5s
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        调试不是一次性动作，而是一个闭环：先稳定复现，再用 Logcat / 堆栈 / 断点定位，
        提出修复假设后回到复现路径验证——没解决就再转一圈，直到验证通过。
      </figcaption>
    </figure>
  );
}
