/**
 * <Gep2NetworkArchitectureDiagram>：网络架构——C/S 模型与同步策略图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function Gep2NetworkArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="网络架构客户端服务器模型与同步策略图解"
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
            网络架构：客户端 / 服务器与同步策略
          </text>

          {/* 三个客户端 */}
          {[
            { x: 40, label: "客户端 A" },
            { x: 170, label: "客户端 B" },
            { x: 300, label: "客户端 C" },
          ].map((c, i) => (
            <g key={i}>
              <rect
                x={c.x}
                y="64"
                width="110"
                height="56"
                rx="8"
                fill="var(--accent)"
                fillOpacity="0.14"
                stroke="var(--accent)"
                strokeWidth="1.4"
              />
              <text
                x={c.x + 55}
                y="86"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {c.label}
              </text>
              <text
                x={c.x + 55}
                y="104"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                预测 + 插值
              </text>
              <line
                x1={c.x + 55}
                y1="120"
                x2={c.x + 55}
                y2="158"
                stroke="var(--text-tertiary)"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
            </g>
          ))}

          {/* 服务器 */}
          <rect
            x="200"
            y="160"
            width="340"
            height="76"
            rx="10"
            fill="var(--warning)"
            fillOpacity="0.12"
            stroke="var(--warning)"
            strokeWidth="1.6"
          />
          <text
            x="370"
            y="184"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--warning)"
          >
            权威服务器 Authoritative Server
          </text>
          <text
            x="370"
            y="204"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            世界状态唯一真相源
          </text>
          <text
            x="370"
            y="222"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-tertiary)"
          >
            校验输入 → 模拟 → 广播快照
          </text>

          {/* 同步方向 */}
          <text
            x="120"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            输入 ↑
          </text>
          <text
            x="250"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            输入 ↑
          </text>
          <text
            x="380"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            输入 ↑
          </text>
          <text
            x="490"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fill="var(--success)"
          >
            快照 ↓
          </text>
          <text
            x="560"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fill="var(--success)"
          >
            快照 ↓
          </text>

          {/* 服务器到客户端快照 */}
          {[
            { x: 95, tx: 95 },
            { x: 225, tx: 225 },
            { x: 355, tx: 355 },
          ].map((c, i) => (
            <line
              key={i}
              x1={370}
              y1={236}
              x2={c.x}
              y2={250}
              stroke="var(--success)"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              strokeDasharray="4 3"
            />
          ))}

          {/* 三种同步策略 */}
          <rect
            x="30"
            y="262"
            width="680"
            height="110"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.04"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />
          <text
            x="370"
            y="282"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            三种同步策略对比
          </text>

          <rect
            x="50"
            y="294"
            width="200"
            height="68"
            rx="8"
            fill="var(--success)"
            fillOpacity="0.1"
            stroke="var(--success)"
            strokeWidth="1.2"
          />
          <text
            x="150"
            y="314"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            客户端预测 + 回滚
          </text>
          <text x="60" y="332" fontSize="10" fill="var(--text-secondary)">
            本地立即响应输入
          </text>
          <text x="60" y="348" fontSize="10" fill="var(--success)">
            服务器确认后修正
          </text>
          <text x="60" y="362" fontSize="10" fill="var(--text-tertiary)">
            体验顺滑，实现复杂
          </text>

          <rect
            x="270"
            y="294"
            width="200"
            height="68"
            rx="8"
            fill="var(--warning)"
            fillOpacity="0.1"
            stroke="var(--warning)"
            strokeWidth="1.2"
          />
          <text
            x="370"
            y="314"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            服务器权威 + 插值
          </text>
          <text x="280" y="332" fontSize="10" fill="var(--text-secondary)">
            等服务器快照才更新
          </text>
          <text x="280" y="348" fontSize="10" fill="var(--warning)">
            插值平滑，有延迟
          </text>
          <text x="280" y="362" fontSize="10" fill="var(--text-tertiary)">
            简单公平，输入迟钝
          </text>

          <rect
            x="490"
            y="294"
            width="200"
            height="68"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="590"
            y="314"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            状态同步 vs 帧同步
          </text>
          <text x="500" y="332" fontSize="10" fill="var(--text-secondary)">
            状态同步：传结果
          </text>
          <text x="500" y="348" fontSize="10" fill="var(--accent)">
            帧同步：传输入，各自模拟
          </text>
          <text x="500" y="362" fontSize="10" fill="var(--text-tertiary)">
            帧同步省带宽但怕不同步
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
            核心：服务器是真相源，客户端用预测掩盖延迟、用插值掩盖丢包——权衡延迟、公平与带宽
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        网络架构——权威服务器统一模拟，客户端预测插值掩盖网络延迟
      </figcaption>
    </figure>
  );
}
