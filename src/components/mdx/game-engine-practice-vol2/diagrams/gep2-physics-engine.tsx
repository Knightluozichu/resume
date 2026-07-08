/**
 * <Gep2PhysicsEngineDiagram>：物理引擎架构——积分器与约束求解图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function Gep2PhysicsEngineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="物理引擎积分器与约束求解图解"
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
            物理引擎：积分器与约束求解的循环
          </text>

          {/* 单步循环外框 */}
          <rect
            x="30"
            y="54"
            width="680"
            height="280"
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />
          <text
            x="50"
            y="74"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            物理步进 Physics Step（固定 dt）
          </text>

          {/* 四阶段块 */}
          {[
            {
              x: 50,
              label: "施力",
              sub: "重力/弹簧/外力",
              c: "var(--success)",
              desc: "累加到 force",
            },
            {
              x: 210,
              label: "积分",
              sub: "半隐式 Euler",
              c: "var(--accent)",
              desc: "更新速度位置",
            },
            {
              x: 370,
              label: "约束求解",
              sub: "Sequential Impulse",
              c: "var(--warning)",
              desc: "迭代修正穿透",
            },
            {
              x: 530,
              label: "积分修正",
              sub: "解算后位置",
              c: "var(--success)",
              desc: "写回变换",
            },
          ].map((s, i) => (
            <g key={i}>
              <rect
                x={s.x}
                y="92"
                width="150"
                height="78"
                rx="8"
                fill={s.c}
                fillOpacity="0.12"
                stroke={s.c}
                strokeWidth="1.2"
              />
              <text
                x={s.x + 75}
                y="114"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {s.label}
              </text>
              <text
                x={s.x + 75}
                y="132"
                textAnchor="middle"
                fontSize="11"
                fill={s.c}
              >
                {s.sub}
              </text>
              <text
                x={s.x + 75}
                y="150"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {s.desc}
              </text>
              {i < 3 && (
                <text
                  x={s.x + 165}
                  y="134"
                  textAnchor="middle"
                  fontSize="16"
                  fill="var(--text-tertiary)"
                >
                  &rarr;
                </text>
              )}
            </g>
          ))}

          {/* 回环箭头 */}
          <path
            d="M 605 178 Q 605 200 480 200 Q 200 200 125 200 Q 125 200 125 178"
            fill="none"
            stroke="var(--text-tertiary)"
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <text
            x="365"
            y="216"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            下一子步（substep）继续，直到本帧 dt 耗尽
          </text>

          {/* 积分器对比 */}
          <rect
            x="50"
            y="232"
            width="320"
            height="86"
            rx="10"
            fill="var(--elevated)"
            fillOpacity="0.6"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x="210"
            y="252"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            显式 Euler vs 半隐式 Euler
          </text>
          <text x="64" y="272" fontSize="11" fill="var(--danger)">
            显式：v += a·dt；x += v·dt（旧 v）
          </text>
          <text x="64" y="288" fontSize="11" fill="var(--danger)">
            能量会持续增加 → 系统爆炸
          </text>
          <text x="64" y="306" fontSize="11" fill="var(--success)">
            半隐式：v += a·dt；x += v·dt（新 v）
          </text>
          <text x="64" y="322" fontSize="11" fill="var(--success)">
            对线性系统稳定，游戏首选
          </text>

          {/* 约束求解说明 */}
          <rect
            x="390"
            y="232"
            width="320"
            height="86"
            rx="10"
            fill="var(--elevated)"
            fillOpacity="0.6"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x="550"
            y="252"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            约束求解：迭代收敛
          </text>
          <text x="404" y="272" fontSize="11" fill="var(--text-secondary)">
            约束 J·v ≥ 0（非穿透、距离限制）
          </text>
          <text x="404" y="288" fontSize="11" fill="var(--text-secondary)">
            冲量法：求 λ 使约束满足
          </text>
          <text x="404" y="306" fontSize="11" fill="var(--warning)">
            多次迭代：收敛但非精确解
          </text>
          <text x="404" y="322" fontSize="11" fill="var(--text-tertiary)">
            迭代越多越稳定，但越耗 CPU
          </text>

          {/* 底部总结 */}
          <rect
            x="30"
            y="352"
            width="680"
            height="68"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="374"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            固定时间步 + 子步细分：解耦帧率与物理
          </text>
          <text
            x={VIEW_W / 2}
            y="392"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            渲染以可变 dt 跑，物理以固定 dt 累积推进，避免「大帧爆炸」
          </text>
          <text
            x={VIEW_W / 2}
            y="410"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            约束求解优先于积分精度：穿透比抖动更刺眼
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        物理引擎单步循环——施力、积分、约束求解、积分修正，固定 dt 子步推进
      </figcaption>
    </figure>
  );
}
