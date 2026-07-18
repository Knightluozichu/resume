/**
 * <RtwLearningMapDiagram>：Ray Tracing in One Weekend 全书学习地图
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

export function RtwLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 720 400"
          role="img"
          aria-label="Ray Tracing in One Weekend 全书学习地图"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Ray Tracing in One Weekend · 十二个核心单元
          </text>
          <text
            x="360"
            y="50"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            从像素输出到最终路径追踪：基础 → 几何与采样 → 材质 → 相机与收尾
          </text>

          {/* 阶段标题 */}
          <rect
            x="36"
            y="74"
            width="153"
            height="30"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="112.5"
            y="94"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            基础（3）
          </text>
          <rect
            x="216"
            y="74"
            width="153"
            height="30"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="292.5"
            y="94"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            几何与采样（3）
          </text>
          <rect
            x="396"
            y="74"
            width="153"
            height="30"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="472.5"
            y="94"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            材质（3）
          </text>
          <rect
            x="576"
            y="74"
            width="108"
            height="30"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="630"
            y="94"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            相机与收尾（3）
          </text>

          {/* 阶段一 章节卡片 */}
          {[
            { x: 36, y: 118, t: "1 输出图像" },
            { x: 36, y: 158, t: "2 vec3 与颜色" },
            { x: 36, y: 198, t: "3 射线、相机与背景" },
          ].map((c) => (
            <g key={c.t}>
              <rect
                x={c.x}
                y={c.y}
                width="153"
                height="32"
                rx="6"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <circle cx={c.x + 12} cy={c.y + 16} r="3" fill="var(--accent)" />
              <text
                x={c.x + 80}
                y={c.y + 20}
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--text-primary)"
              >
                {c.t}
              </text>
            </g>
          ))}
          {/* 阶段二 */}
          {[
            { x: 216, y: 118, t: "4 添加球体" },
            { x: 216, y: 158, t: "5 法线与多物体" },
            { x: 216, y: 198, t: "6 抗锯齿" },
          ].map((c) => (
            <g key={c.t}>
              <rect
                x={c.x}
                y={c.y}
                width="153"
                height="32"
                rx="6"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <circle cx={c.x + 12} cy={c.y + 16} r="3" fill="var(--accent)" />
              <text
                x={c.x + 80}
                y={c.y + 20}
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--text-primary)"
              >
                {c.t}
              </text>
            </g>
          ))}
          {/* 阶段三 */}
          {[
            { x: 396, y: 118, t: "7 漫反射" },
            { x: 396, y: 158, t: "8 金属" },
            { x: 396, y: 198, t: "9 电介质" },
          ].map((c) => (
            <g key={c.t}>
              <rect
                x={c.x}
                y={c.y}
                width="153"
                height="32"
                rx="6"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <circle cx={c.x + 12} cy={c.y + 16} r="3" fill="var(--accent)" />
              <text
                x={c.x + 80}
                y={c.y + 20}
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--text-primary)"
              >
                {c.t}
              </text>
            </g>
          ))}
          {/* 阶段四 */}
          {[
            { y: 118, t: "10 可定位相机" },
            { y: 158, t: "11 散焦模糊" },
            { y: 198, t: "12 最终渲染" },
          ].map((c) => (
            <g key={c.t}>
              <rect
                x="576"
                y={c.y}
                width="108"
                height="32"
                rx="6"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <circle cx="588" cy={c.y + 16} r="3" fill="var(--accent)" />
              <text
                x="630"
                y={c.y + 20}
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--text-primary)"
              >
                {c.t}
              </text>
            </g>
          ))}

          {/* 流程箭头 */}
          <line
            x1="189"
            y1="150"
            x2="214"
            y2="150"
            stroke="var(--accent)"
            strokeWidth="1.3"
            strokeOpacity="0.5"
            markerEnd="url(#arrowRtw)"
          />
          <line
            x1="369"
            y1="150"
            x2="394"
            y2="150"
            stroke="var(--accent)"
            strokeWidth="1.3"
            strokeOpacity="0.5"
            markerEnd="url(#arrowRtw)"
          />
          <line
            x1="549"
            y1="150"
            x2="574"
            y2="150"
            stroke="var(--accent)"
            strokeWidth="1.3"
            strokeOpacity="0.5"
            markerEnd="url(#arrowRtw)"
          />
          <defs>
            <marker
              id="arrowRtw"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path
                d="M0,0 L6,4 L0,8 z"
                fill="var(--accent)"
                fillOpacity="0.6"
              />
            </marker>
          </defs>

          {/* 底部核心理念 */}
          <rect
            x="48"
            y="300"
            width="624"
            height="60"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x="360"
            y="324"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            核心思想：从相机反向追光，递归模拟散射
          </text>
          <text
            x="360"
            y="344"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            射线 → 求交 → 材质散射 → 递归与采样，几百行 C++ 渲染真实感图片
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        官方十二单元四阶段：像素与射线 → 几何与采样 → 三种材质 → 相机与最终场景
      </figcaption>
    </figure>
  );
}
