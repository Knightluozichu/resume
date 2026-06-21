/**
 * <AlgorithmNextStepsDiagram>：Grokking Algorithms — 算法决策思维导图。
 *
 * 中心卡片"识别问题结构" → 4 条垂直排列的分支（排序/搜索/图/优化）→ 每分支 2 个子算法。
 * 底部横向流程条：识别结构 → 匹配算法 → 估算复杂度。
 *
 * 全部使用 DESIGN token，无魔法数字。
 * Server Component（纯 SVG，无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 590;

interface Branch {
  label: string;
  y: number;
  sub1: string;
  sub1Y: number;
  sub2: string;
  sub2Y: number;
}

const BRANCHES: Branch[] = [
  { label: "排序", y: 100, sub1: "快速排序", sub1Y: 80, sub2: "归并排序", sub2Y: 125 },
  { label: "搜索", y: 210, sub1: "二分查找", sub1Y: 190, sub2: "哈希查找", sub2Y: 235 },
  { label: "图", y: 320, sub1: "BFS", sub1Y: 300, sub2: "Dijkstra", sub2Y: 345 },
  { label: "优化", y: 430, sub1: "贪心算法", sub1Y: 410, sub2: "动态规划", sub2Y: 455 },
];

const STEP_CX = [240, 360, 480];
const STEP_LABELS = ["识别结构", "匹配算法", "估算复杂度"];

const ARIA =
  "算法决策思维导图。中心卡片'识别问题结构'连接四条分支：" +
  "排序（快速排序、归并排序）、搜索（二分查找、哈希查找）、" +
  "图（BFS、Dijkstra）、优化（贪心算法、动态规划）。" +
  "底部流程：识别结构 → 匹配算法 → 估算复杂度。";

export function AlgorithmNextStepsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={ARIA}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题层 (R10: 三层垂直分层) ===== */}
          <text
            x={VIEW_W / 2}
            y={34}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            算法决策思维导图
          </text>

          {/* ===== 主体层：中心卡片 + 分支 ===== */}

          {/* 中心卡片 */}
          <rect
            x={40}
            y={225}
            width={140}
            height={80}
            rx={8}
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <text
            x={110}
            y={260}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            识别
          </text>
          <text
            x={110}
            y={280}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            问题结构
          </text>

          {/* 连接中心与分支的线条 (stair-step 路由避免 diagonal overlap) */}
          <path
            d="M 180 265 L 210 265 M 210 100 L 210 430"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeOpacity="0.5"
            fill="none"
          />

          {BRANCHES.map((branch) => (
            <g key={branch.label}>
              {/* 中心到分支的水平横线 */}
              <line
                x1={210}
                y1={branch.y}
                x2={260}
                y2={branch.y}
                stroke="var(--accent)"
                strokeWidth="2"
                strokeOpacity="0.5"
              />

              {/* 分支卡片 (y 轴居中绘制) */}
              <rect
                x={260}
                y={branch.y - 16}
                width={100}
                height={32}
                rx={6}
                fill="var(--bg)"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <text
                x={310}
                y={branch.y + 5}
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {branch.label}
              </text>

              {/* 分支到子项的 stair-step 线条 */}
              <path
                d={`M 360 ${branch.y} L 410 ${branch.y} M 410 ${branch.sub1Y} L 410 ${branch.sub2Y} M 410 ${branch.sub1Y} L 460 ${branch.sub1Y} M 410 ${branch.sub2Y} L 460 ${branch.sub2Y}`}
                stroke="var(--border)"
                strokeWidth="1.5"
                fill="none"
              />

              {/* 子项卡片 1 */}
              <rect
                x={460}
                y={branch.sub1Y - 15}
                width={120}
                height={30}
                rx={6}
                fill="var(--bg-elevated)"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              <text
                x={520}
                y={branch.sub1Y + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {branch.sub1}
              </text>

              {/* 子项卡片 2 */}
              <rect
                x={460}
                y={branch.sub2Y - 15}
                width={120}
                height={30}
                rx={6}
                fill="var(--bg-elevated)"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              <text
                x={520}
                y={branch.sub2Y + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {branch.sub2}
              </text>
            </g>
          ))}

          {/* ===== 底部层：分隔线 + 流程条 (R10) ===== */}
          <line
            x1={60}
            y1={500}
            x2={VIEW_W - 60}
            y2={500}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* 流程横条 */}
          <line
            x1={80}
            y1={525}
            x2={640}
            y2={525}
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* 三个步骤节点 */}
          {STEP_CX.map((cx, i) => (
            <g key={i}>
              <circle
                cx={cx}
                cy={525}
                r={14}
                fill="var(--bg-elevated)"
                stroke={i === 0 ? "var(--accent)" : "var(--border)"}
                strokeWidth="2"
              />
              <text
                x={cx}
                y={529}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={i === 0 ? "var(--accent)" : "var(--text-secondary)"}
              >
                {i + 1}
              </text>
              <text
                x={cx}
                y={559}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={i === 0 ? "var(--text-primary)" : "var(--text-secondary)"}
              >
                {STEP_LABELS[i]}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        算法解题四步：先识别问题属于哪一类（排序/搜索/图/优化），
        再在对应类别中匹配具体算法，最后估算时间/空间复杂度验证可行性。
      </figcaption>
    </figure>
  );
}
