/**
 * <FillRateBandwidthDiagram />：Fill Rate vs Bandwidth 双栏对比。
 *
 * 左栏 Fill Rate（pixels/s，瓶颈 = overdraw），
 * 右栏 Bandwidth（bytes/s，瓶颈 = 纹理分辨率），
 * 各带一个仪表条视觉。
 */

export function FillRateBandwidthDiagram() {
  const columns = [
    {
      title: "Fill Rate",
      unit: "pixels/s",
      bottleneck: "Overdraw",
      fill: 0.7,
      color: "var(--warning)",
      x: 30,
    },
    {
      title: "Bandwidth",
      unit: "bytes/s",
      bottleneck: "纹理分辨率",
      fill: 0.55,
      color: "var(--info)",
      x: 300,
    },
  ];
  const gaugeW = 200;
  const gaugeH = 16;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 220"
          role="img"
          aria-label="GPU 瓶颈对比：Fill Rate（overdraw）vs Bandwidth（纹理分辨率）"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* Title */}
          <text
            x="280"
            y="22"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            GPU 瓶颈分类
          </text>

          {columns.map((col) => (
            <g key={col.title}>
              {/* Card */}
              <rect
                x={col.x}
                y="44"
                width="230"
                height="140"
                rx="8"
                fill="var(--surface-raised)"
                stroke={col.color}
                strokeWidth="2"
              />
              {/* Title */}
              <text
                x={col.x + 115}
                y="70"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill={col.color}
              >
                {col.title}
              </text>
              {/* Unit */}
              <text
                x={col.x + 115}
                y="88"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                单位：{col.unit}
              </text>
              {/* Gauge background */}
              <rect
                x={col.x + 15}
                y="102"
                width={gaugeW}
                height={gaugeH}
                rx="8"
                fill="var(--border)"
              />
              {/* Gauge fill */}
              <rect
                x={col.x + 15}
                y="102"
                width={gaugeW * col.fill}
                height={gaugeH}
                rx="8"
                fill={col.color}
                opacity="0.8"
              />
              <text
                x={col.x + 15 + gaugeW * col.fill + 6}
                y="114"
                fontSize="10"
                fontWeight="600"
                fill={col.color}
              >
                {Math.round(col.fill * 100)}%
              </text>
              {/* Bottleneck label */}
              <text
                x={col.x + 115}
                y="146"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-primary)"
              >
                瓶颈：
                <tspan fontWeight="600" fill={col.color}>
                  {col.bottleneck}
                </tspan>
              </text>
              {/* Hint */}
              <text
                x={col.x + 115}
                y="164"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                {col.title === "Fill Rate"
                  ? "减少 overdraw / 降低分辨率"
                  : "压缩纹理 / 降低 mip level"}
              </text>
            </g>
          ))}

          {/* Bottom note */}
          <text
            x="280"
            y="210"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            移动端最常见的两类 GPU 瓶颈，需分别排查
          </text>
        </svg>
      </div>
    </figure>
  );
}
