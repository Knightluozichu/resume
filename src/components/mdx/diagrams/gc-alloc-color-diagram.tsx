/**
 * <GCAllocColorDiagram />：GC 分配可视化示意。
 *
 * 时间轴上用彩色尖峰展示 GC.Collect（danger）和分配突发（warning），
 * 标注"0 Alloc = gold standard"。
 */

export function GCAllocColorDiagram() {
  /* spike data: x position, height, color, label */
  const spikes = [
    { x: 80, h: 70, color: "var(--warning)", label: "Alloc" },
    { x: 140, h: 30, color: "var(--warning)", label: "" },
    { x: 200, h: 90, color: "var(--danger)", label: "GC.Collect" },
    { x: 260, h: 20, color: "var(--warning)", label: "" },
    { x: 310, h: 45, color: "var(--warning)", label: "Alloc" },
    { x: 400, h: 85, color: "var(--danger)", label: "GC.Collect" },
    { x: 460, h: 35, color: "var(--warning)", label: "" },
  ];
  const baseY = 140;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 200"
          role="img"
          aria-label="GC 分配时间轴：橙色分配突发 + 红色 GC.Collect 尖峰"
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
            GC Allocation Timeline
          </text>

          {/* Baseline */}
          <line
            x1="50"
            y1={baseY}
            x2="510"
            y2={baseY}
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* Time arrow */}
          <text
            x="520"
            y={baseY + 4}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            t
          </text>

          {/* Spikes */}
          {spikes.map((spike, i) => (
            <g key={i}>
              <rect
                x={spike.x - 6}
                y={baseY - spike.h}
                width="12"
                height={spike.h}
                rx="2"
                fill={spike.color}
                opacity="0.8"
              />
              {spike.label && (
                <text
                  x={spike.x}
                  y={baseY - spike.h - 6}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="500"
                  fill={spike.color}
                >
                  {spike.label}
                </text>
              )}
            </g>
          ))}

          {/* Gold standard region (flat, no spikes) */}
          <rect
            x="320"
            y={baseY - 4}
            width="60"
            height="4"
            rx="2"
            fill="var(--success)"
            opacity="0.6"
          />

          {/* Gold standard badge */}
          <rect
            x="305"
            y="156"
            width="90"
            height="22"
            rx="6"
            fill="var(--success)"
            opacity="0.15"
          />
          <text
            x="350"
            y="171"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--success)"
          >
            0 Alloc
          </text>

          {/* Legend */}
          <rect x="80" y="178" width="10" height="10" rx="2" fill="var(--danger)" opacity="0.8" />
          <text x="94" y="188" fontSize="10" fill="var(--text-secondary)">
            GC.Collect（卡顿尖峰）
          </text>
          <rect x="240" y="178" width="10" height="10" rx="2" fill="var(--warning)" opacity="0.8" />
          <text x="254" y="188" fontSize="10" fill="var(--text-secondary)">
            分配突发
          </text>
          <rect x="380" y="178" width="10" height="10" rx="2" fill="var(--success)" opacity="0.6" />
          <text x="394" y="188" fontSize="10" fill="var(--text-secondary)">
            0 Alloc = gold standard
          </text>
        </svg>
      </div>
    </figure>
  );
}
