/**
 * <IblConceptDiagram />：「PBR·IBL 漫反射辐照」§3「IBL 概念」配图（HEL-164，C 实战型）。
 *
 * 画面内容：
 *  - 中央一个球（场景对象）
 *  - 外围一个大圆，代表环境贴图（天空、建筑、地面…）
 *  - 多条箭头从外围各方向射向球（每个方向都是一个光源）
 *  - 文字标注：环境贴图 / 每个方向都是一个光源 / 与四盏点光源对比
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * 视觉语言：token 色，无阴影，rx 圆角，无裸 hex（硬规则 5）。
 */

export function IblConceptDiagram() {
  const cx = 280;
  const cy = 150;
  const envR = 120;
  const sphereR = 38;
  const arrowCount = 12;

  const arrows: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < arrowCount; i++) {
    const angle = (i / arrowCount) * Math.PI * 2;
    const x1 = cx + Math.cos(angle) * envR;
    const y1 = cy + Math.sin(angle) * envR;
    const x2 = cx + Math.cos(angle) * (sphereR + 8);
    const y2 = cy + Math.sin(angle) * (sphereR + 8);
    arrows.push({ x1, y1, x2, y2 });
  }

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 300"
          role="img"
          aria-label="IBL 概念图。中央是一个球（场景对象），外围是一个大圆代表环境贴图。多条箭头从环境贴图的各个方向射向球心，说明环境贴图中每个方向都是一个光源，而不是离散的几盏灯。左侧标注「传统：4 盏离散点光源」，右侧标注「IBL：整个环境全方向发光」。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* 标题 */}
          <text
            x="280"
            y="26"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            IBL：环境贴图 = 全方向光源
          </text>

          {/* 箭头 marker */}
          <defs>
            <marker
              id="ibl-arr"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="2.5"
              orient="auto"
            >
              <path d="M0 0 L5 2.5 L0 5 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 外环：环境贴图边界（虚线大圆） */}
          <circle
            cx={cx}
            cy={cy}
            r={envR}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.6"
          />

          {/* 环境色渐变背景弧段（用低不透明度矩形模拟） */}
          <circle
            cx={cx}
            cy={cy}
            r={envR - 1}
            fill="var(--accent)"
            opacity="0.04"
          />

          {/* 环境贴图标签 */}
          <text
            x={cx}
            y={cy - envR - 10}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            环境贴图（天空、建筑、地面…）
          </text>

          {/* 入射箭头 */}
          {arrows.map((a, i) => (
            <line
              key={i}
              x1={a.x1}
              y1={a.y1}
              x2={a.x2}
              y2={a.y2}
              stroke="var(--accent)"
              strokeWidth="1.4"
              markerEnd="url(#ibl-arr)"
              opacity="0.75"
            />
          ))}

          {/* 中央球 */}
          <circle
            cx={cx}
            cy={cy}
            r={sphereR}
            fill="var(--bg-elevated)"
            stroke="var(--text-primary)"
            strokeWidth="2"
          />
          {/* 球内高亮 */}
          <circle
            cx={cx - 10}
            cy={cy - 10}
            r={10}
            fill="var(--text-primary)"
            opacity="0.07"
          />
          <text
            x={cx}
            y={cy + 4}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            场景对象
          </text>

          {/* 「每个方向都是一个光源」注释 */}
          <rect
            x={cx - 115}
            y={cy + envR + 8}
            width={230}
            height={22}
            rx="6"
            fill="var(--accent)"
            opacity="0.08"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x={cx}
            y={cy + envR + 23}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--accent)"
          >
            每个方向都是一个光源 → 无穷盏
          </text>

          {/* 左侧：传统离散点光源示意 */}
          <text
            x="52"
            y="218"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="var(--warning)"
          >
            传统
          </text>
          <text
            x="52"
            y="232"
            textAnchor="middle"
            fontSize="8"
            fill="var(--text-secondary)"
          >
            4 盏点光源
          </text>
          {/* 4 个小光源点 */}
          {[[-16, -16], [16, -16], [-16, 16], [16, 16]].map(([dx, dy], i) => (
            <circle
              key={`pt-${i}`}
              cx={52 + dx}
              cy={255 + dy}
              r="4"
              fill="var(--warning)"
              opacity="0.7"
            />
          ))}

          {/* 右侧：IBL 示意 */}
          <text
            x="508"
            y="218"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="var(--success)"
          >
            IBL
          </text>
          <text
            x="508"
            y="232"
            textAnchor="middle"
            fontSize="8"
            fill="var(--text-secondary)"
          >
            全方向环境光
          </text>
          <circle
            cx={508}
            cy={260}
            r={22}
            fill="none"
            stroke="var(--success)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.7"
          />
          <circle
            cx={508}
            cy={260}
            r={8}
            fill="var(--bg-elevated)"
            stroke="var(--text-primary)"
            strokeWidth="1.5"
          />
          {/* 小箭头 */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <line
                key={`ibl-mini-${i}`}
                x1={508 + Math.cos(a) * 22}
                y1={260 + Math.sin(a) * 22}
                x2={508 + Math.cos(a) * 10}
                y2={260 + Math.sin(a) * 10}
                stroke="var(--success)"
                strokeWidth="1"
                markerEnd="url(#ibl-arr)"
                opacity="0.6"
              />
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        IBL 把一张环境贴图当作光源：贴图上的每个像素都是一个方向的入射光，球从
        四面八方收到来自环境的光照，而不只是来自几盏离散点光源。
      </figcaption>
    </figure>
  );
}
