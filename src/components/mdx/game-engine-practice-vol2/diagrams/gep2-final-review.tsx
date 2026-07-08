/**
 * <Gep2FinalReviewDiagram>：全书总复习——知识图谱串联图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function Gep2FinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏引擎原理与实践卷2全书总复习知识图谱图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text
            x={VIEW_W / 2}
            y="32"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            卷2 总复习：八大子系统的协同全景
          </text>

          {/* 中心：运行时核心 */}
          <circle
            cx="370"
            cy="220"
            r="58"
            fill="var(--accent)"
            fillOpacity="0.14"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x="370"
            y="214"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            运行时核心
          </text>
          <text
            x="370"
            y="232"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            游戏循环 主线
          </text>
          <text
            x="370"
            y="248"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-tertiary)"
          >
            卷1 地基
          </text>

          {/* 八个子系统环绕 */}
          {[
            {
              x: 130,
              y: 90,
              label: "物理引擎",
              sub: "积分/约束",
              c: "var(--accent)",
            },
            {
              x: 370,
              y: 80,
              label: "碰撞系统",
              sub: "广相/窄相",
              c: "var(--accent)",
            },
            {
              x: 610,
              y: 90,
              label: "骨骼动画",
              sub: "蒙皮/层级",
              c: "var(--warning)",
            },
            {
              x: 630,
              y: 230,
              label: "动画混合",
              sub: "状态机",
              c: "var(--warning)",
            },
            {
              x: 610,
              y: 360,
              label: "音频系统",
              sub: "3D/混音",
              c: "var(--success)",
            },
            {
              x: 370,
              y: 372,
              label: "网络架构",
              sub: "C/S/同步",
              c: "var(--success)",
            },
            {
              x: 130,
              y: 360,
              label: "编辑器框架",
              sub: "资产管线",
              c: "var(--text-tertiary)",
            },
            {
              x: 110,
              y: 230,
              label: "脚本系统",
              sub: "绑定/热重载",
              c: "var(--text-tertiary)",
            },
          ].map((s, i) => (
            <g key={i}>
              <line
                x1={s.x}
                y1={s.y}
                x2="370"
                y2="220"
                stroke="var(--text-tertiary)"
                strokeWidth="1"
                strokeOpacity="0.4"
                strokeDasharray="3 3"
              />
              <rect
                x={s.x - 70}
                y={s.y - 22}
                width="140"
                height="44"
                rx="8"
                fill={s.c}
                fillOpacity="0.14"
                stroke={s.c}
                strokeWidth="1.2"
              />
              <text
                x={s.x}
                y={s.y - 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {s.label}
              </text>
              <text
                x={s.x}
                y={s.y + 14}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {s.sub}
              </text>
            </g>
          ))}

          {/* 协作链路标注 */}
          <text
            x="250"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fill="var(--accent)"
          >
            碰撞→物理
          </text>
          <text
            x="490"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fill="var(--warning)"
          >
            动画→渲染
          </text>
          <text
            x="490"
            y="300"
            textAnchor="middle"
            fontSize="10"
            fill="var(--success)"
          >
            音频→场景
          </text>
          <text
            x="250"
            y="300"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            脚本→全模块
          </text>

          {/* 底部：三阶段回顾 */}
          <rect
            x="30"
            y="396"
            width="680"
            height="30"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="416"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            模拟层（物理/碰撞）→ 表现层（动画/音频）→
            联机与工具层（网络/编辑器/脚本）协同成完整运行时
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        卷2
        总复习——八大子系统围绕运行时核心协同，从模拟、表现到联机工具的完整闭环
      </figcaption>
    </figure>
  );
}
