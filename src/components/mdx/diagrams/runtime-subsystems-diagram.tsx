import type { FC } from "react";

const VIEW_W = 760;
const VIEW_H = 480;
const CENTER_X = 380;
const CENTER_Y = 210;
const CORE_R = 52;

type Subsystem = {
  label: string;
  angle: number;
  radius: number;
  note: string;
};

const SUBSYSTEMS: Subsystem[] = [
  { label: "渲染", angle: -90, radius: 148, note: "画三角形、光照、后处理" },
  { label: "物理", angle: -40, radius: 148, note: "碰撞、刚体、约束" },
  { label: "音频", angle: 10, radius: 148, note: "混音、空间化、流式播放" },
  { label: "输入", angle: 55, radius: 148, note: "键鼠、手柄、触屏映射" },
  { label: "动画", angle: 100, radius: 148, note: "骨骼、Blend Tree、状态机" },
  { label: "脚本", angle: 150, radius: 148, note: "Lua/C# 驱动玩法逻辑" },
  { label: "AI/导航", angle: -160, radius: 148, note: "寻路、行为树、感知" },
  { label: "资源", angle: -130, radius: 110, note: "加载、缓存、卸载" },
  { label: "网络", angle: -70, radius: 110, note: "同步、复制、预测" },
  { label: "UI", angle: -5, radius: 110, note: "HUD、菜单、本地化" },
];

function nodePos(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: CENTER_X + Math.cos(rad) * radius,
    y: CENTER_Y + Math.sin(rad) * radius,
  };
}

export const RuntimeSubsystemsDiagram: FC = () => (
  <figure className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-4">
    <figcaption className="mb-3">
      <p className="text-xs font-medium text-accent">运行时全景</p>
      <h4 className="text-base font-semibold text-primary">
        游戏引擎运行时子系统分类
      </h4>
      <p className="mt-1 text-xs leading-5 text-secondary">
        所有子系统围绕游戏循环核心协作。外圈是&quot;帧内高频系统&quot;（每帧必跑），内圈是&quot;按需系统&quot;（触发时才跑）。
      </p>
    </figcaption>

    <div className="overflow-x-auto rounded-card border border-border bg-bg">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="引擎运行时子系统分类图"
        className="block w-full min-w-[660px]"
      >
        {/* Radial lines from center to each subsystem */}
        {SUBSYSTEMS.map((sys) => {
          const pos = nodePos(sys.angle, sys.radius - 32);
          return (
            <line
              key={sys.label}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={pos.x}
              y2={pos.y}
              className="stroke-border"
              strokeWidth="1"
              strokeDasharray="4,3"
            />
          );
        })}

        {/* Core: Game Loop */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={CORE_R}
          className="fill-accent-glow stroke-accent"
          strokeWidth="2"
        />
        <text
          x={CENTER_X}
          y={CENTER_Y - 8}
          textAnchor="middle"
          className="fill-primary text-[14px] font-semibold"
        >
          游戏循环
        </text>
        <text
          x={CENTER_X}
          y={CENTER_Y + 14}
          textAnchor="middle"
          className="fill-secondary text-[10px]"
        >
          每帧调度核心
        </text>

        {/* Subsystem nodes */}
        {SUBSYSTEMS.map((sys) => {
          const pos = nodePos(sys.angle, sys.radius);
          const isOuter = sys.radius > 130;
          return (
            <g key={sys.label}>
              <rect
                x={pos.x - 58}
                y={pos.y - 24}
                width="116"
                height="48"
                rx="8"
                className={
                  isOuter
                    ? "fill-elevated stroke-accent"
                    : "fill-elevated stroke-warning"
                }
                strokeWidth="1.5"
              />
              <text
                x={pos.x}
                y={pos.y - 4}
                textAnchor="middle"
                className="fill-primary text-[13px] font-semibold"
              >
                {sys.label}
              </text>
              <text
                x={pos.x}
                y={pos.y + 16}
                textAnchor="middle"
                className="fill-secondary text-[10px]"
              >
                {sys.note}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(24, 412)">
          <rect
            x="0"
            y="0"
            width="10"
            height="10"
            rx="2"
            className="fill-accent-glow stroke-accent"
            strokeWidth="1"
          />
          <text x="16" y="9" className="fill-secondary text-[10px]">
            高频系统（每帧必跑）
          </text>
        </g>
        <g transform="translate(184, 412)">
          <rect
            x="0"
            y="0"
            width="10"
            height="10"
            rx="2"
            className="fill-elevated stroke-warning"
            strokeWidth="1"
          />
          <text x="16" y="9" className="fill-secondary text-[10px]">
            按需系统（触发时运行）
          </text>
        </g>
      </svg>
    </div>
  </figure>
);
