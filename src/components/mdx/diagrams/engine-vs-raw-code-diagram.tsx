import type { FC } from "react";

const VIEW_W = 760;
const VIEW_H = 380;
const COL_X = [80, 430] as const;
const COL_W = 290;
const HEAD_Y = 50;
const ITEM_START_Y = 90;
const ITEM_H = 54;
const ITEM_GAP = 8;

type ColumnItem = { label: string; detail: string; tone: "risk" | "success" };

const LEFT_ITEMS: ColumnItem[] = [
  { label: "手写图形 API 调用", detail: "glDrawArrays、创建窗口、处理上下文", tone: "risk" },
  { label: "手写物理计算", detail: "碰撞检测、刚体模拟、约束求解", tone: "risk" },
  { label: "手写音频处理", detail: "加载 WAV、混音、空间化", tone: "risk" },
  { label: "手写输入系统", detail: "键鼠、手柄、触屏一一适配", tone: "risk" },
];

const RIGHT_ITEMS: ColumnItem[] = [
  { label: "引擎封装 API", detail: "Scene → Draw，引擎替你组织渲染", tone: "success" },
  { label: "内置物理引擎", detail: "加 RigidBody + Collider，碰了就弹", tone: "success" },
  { label: "音频子系统", detail: "PlaySound(位置, 资源)，空间化自动", tone: "success" },
  { label: "统一输入抽象", detail: "GetAxis(\"Horizontal\")，跨平台一致", tone: "success" },
];

export const EngineVsRawCodeDiagram: FC = () => (
  <figure className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-4">
    <figcaption className="mb-3">
      <p className="text-xs font-medium text-accent">有无引擎对比</p>
      <h4 className="text-base font-semibold text-primary">
        没有引擎 vs 有引擎：开发者要关心什么
      </h4>
      <p className="mt-1 text-xs leading-5 text-secondary">
        引擎的价值不是"帮你写代码"，而是把基础设施藏起来，让你只写玩法。
      </p>
    </figcaption>

    <div className="overflow-x-auto rounded-card border border-border bg-bg">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="有无引擎对比图"
        className="block w-full min-w-[660px]"
      >
        {/* Column headers */}
        <text
          x={COL_X[0] + COL_W / 2}
          y={HEAD_Y}
          textAnchor="middle"
          className="fill-danger text-[15px] font-semibold"
        >
          没有引擎：从头造轮子
        </text>
        <text
          x={COL_X[1] + COL_W / 2}
          y={HEAD_Y}
          textAnchor="middle"
          className="fill-success text-[15px] font-semibold"
        >
          有引擎：站在巨人的肩膀上
        </text>

        {/* Left column items */}
        {LEFT_ITEMS.map((item, i) => {
          const y = ITEM_START_Y + i * (ITEM_H + ITEM_GAP);
          return (
            <g key={item.label}>
              <rect
                x={COL_X[0]}
                y={y}
                width={COL_W}
                height={ITEM_H}
                rx="8"
                className="fill-danger/10 stroke-danger"
                strokeWidth="1"
              />
              <text
                x={COL_X[0] + 14}
                y={y + 20}
                className="fill-primary text-[12px] font-semibold"
              >
                {item.label}
              </text>
              <text
                x={COL_X[0] + 14}
                y={y + 38}
                className="fill-secondary text-[10px]"
              >
                {item.detail}
              </text>
            </g>
          );
        })}

        {/* Right column items */}
        {RIGHT_ITEMS.map((item, i) => {
          const y = ITEM_START_Y + i * (ITEM_H + ITEM_GAP);
          return (
            <g key={item.label}>
              <rect
                x={COL_X[1]}
                y={y}
                width={COL_W}
                height={ITEM_H}
                rx="8"
                className="fill-success/10 stroke-success"
                strokeWidth="1"
              />
              <text
                x={COL_X[1] + 14}
                y={y + 20}
                className="fill-primary text-[12px] font-semibold"
              >
                {item.label}
              </text>
              <text
                x={COL_X[1] + 14}
                y={y + 38}
                className="fill-secondary text-[10px]"
              >
                {item.detail}
              </text>
            </g>
          );
        })}

        {/* Middle vertical divider */}
        <line
          x1={390}
          y1={HEAD_Y + 10}
          x2={390}
          y2={350}
          className="stroke-border"
          strokeWidth="1"
          strokeDasharray="6,4"
        />
      </svg>
    </div>
  </figure>
);
