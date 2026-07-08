/**
 * <Gep2AnimationBlendDiagram>：动画混合与状态机图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function Gep2AnimationBlendDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="动画混合与状态机图解"
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
            动画系统：状态机 + 混合树
          </text>

          {/* 左：状态机 */}
          <rect
            x="30"
            y="56"
            width="330"
            height="320"
            rx="10"
            fill="var(--success)"
            fillOpacity="0.05"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="195"
            y="78"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            动画状态机 FSM
          </text>

          {/* 状态节点 */}
          <rect
            x="60"
            y="100"
            width="120"
            height="44"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.16"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <text
            x="120"
            y="126"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Idle 待机
          </text>

          <rect
            x="220"
            y="100"
            width="120"
            height="44"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.16"
            stroke="var(--warning)"
            strokeWidth="1.4"
          />
          <text
            x="280"
            y="126"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Walk 行走
          </text>

          <rect
            x="60"
            y="200"
            width="120"
            height="44"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.16"
            stroke="var(--success)"
            strokeWidth="1.4"
          />
          <text
            x="120"
            y="226"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Run 奔跑
          </text>

          <rect
            x="220"
            y="200"
            width="120"
            height="44"
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.16"
            stroke="var(--danger)"
            strokeWidth="1.4"
          />
          <text
            x="280"
            y="226"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Jump 跳跃
          </text>

          {/* 转移箭头 */}
          <path
            d="M 180 122 Q 200 110 220 122"
            fill="none"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
            markerEnd="url(#arr)"
          />
          <text
            x="200"
            y="100"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            速度&gt;0
          </text>
          <path
            d="M 220 132 Q 200 144 180 132"
            fill="none"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
            markerEnd="url(#arr)"
          />

          <path
            d="M 120 144 Q 110 170 120 200"
            fill="none"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
            markerEnd="url(#arr)"
          />
          <text
            x="92"
            y="176"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            加速
          </text>

          <text
            x="195"
            y="290"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            转移带过渡时间（cross-fade）
          </text>
          <text
            x="195"
            y="308"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            过渡期两动画按权重混合输出
          </text>
          <text
            x="195"
            y="326"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            条件：参数（速度/血量/输入）
          </text>
          <text
            x="195"
            y="350"
            textAnchor="middle"
            fontSize="11"
            fill="var(--success)"
          >
            状态机决定「播什么、何时切换」
          </text>

          <defs>
            <marker
              id="arr"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 右：混合树 */}
          <rect
            x="380"
            y="56"
            width="330"
            height="320"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.05"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="545"
            y="78"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            混合树 Blend Tree（1D）
          </text>

          {/* 输入参数 */}
          <rect
            x="510"
            y="100"
            width="70"
            height="34"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.18"
            stroke="var(--accent)"
            strokeWidth="1.4"
          />
          <text
            x="545"
            y="122"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            speed
          </text>

          <line
            x1="545"
            y1="134"
            x2="545"
            y2="158"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
          />

          {/* 三个采样动画 */}
          <rect
            x="410"
            y="168"
            width="90"
            height="44"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.14"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="455"
            y="186"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Idle
          </text>
          <text
            x="455"
            y="202"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            speed=0
          </text>

          <rect
            x="510"
            y="168"
            width="90"
            height="44"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.14"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="555"
            y="186"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Walk
          </text>
          <text
            x="555"
            y="202"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            speed=3
          </text>

          <rect
            x="610"
            y="168"
            width="90"
            height="44"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.14"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="655"
            y="186"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Run
          </text>
          <text
            x="655"
            y="202"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            speed=7
          </text>

          {/* 权重曲线 */}
          <line
            x1="455"
            y1="212"
            x2="455"
            y2="246"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
          />
          <line
            x1="555"
            y1="212"
            x2="555"
            y2="246"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
          />
          <line
            x1="655"
            y1="212"
            x2="655"
            y2="246"
            stroke="var(--text-tertiary)"
            strokeWidth="1.4"
          />

          <rect
            x="400"
            y="252"
            width="300"
            height="56"
            rx="8"
            fill="var(--elevated)"
            fillOpacity="0.6"
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x="550"
            y="274"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            输出姿态 = Σ w(speed) · poseᵢ
          </text>
          <text
            x="550"
            y="294"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            线性插值 / 惯性化（Inertializing）平滑
          </text>

          <text
            x="545"
            y="334"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            混合树决定「多个动画如何加权融合」
          </text>
          <text
            x="545"
            y="352"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            2D 混合可按方向+速度，做 8 方向移动
          </text>

          {/* 底部 */}
          <rect
            x="30"
            y="388"
            width="680"
            height="34"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="410"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            状态机管「切换逻辑」，混合树管「过渡平滑」——二者组合才不抖、不滑步
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        动画系统——状态机驱动切换、混合树按参数加权融合，消除跳变与滑步
      </figcaption>
    </figure>
  );
}
