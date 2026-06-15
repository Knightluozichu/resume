/**
 * <ManagedVsNativeDiagram />：Managed Memory vs Native Memory 双栏对比。
 *
 * 左栏 Managed Memory（GC 管理 / C# 对象 / 自动回收），
 * 右栏 Native Memory（手动管理 / Texture · Mesh / 需显式 Destroy）。
 */

export function ManagedVsNativeDiagram() {
  const managed = {
    title: "Managed Memory",
    color: "var(--accent)",
    items: [
      { icon: "GC", text: "GC 自动管理" },
      { icon: "C#", text: "C# 对象 / string / array" },
      { icon: "↻", text: "不再引用 → GC 自动回收" },
    ],
  };
  const native = {
    title: "Native Memory",
    color: "var(--warning)",
    items: [
      { icon: "⚙", text: "引擎手动管理" },
      { icon: "■", text: "Texture / Mesh / Material" },
      { icon: "✖", text: "需显式 Destroy 释放" },
    ],
  };

  const cardW = 230;
  const cardH = 170;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 250"
          role="img"
          aria-label="内存类型对比：Managed Memory（GC 管理）vs Native Memory（手动 Destroy）"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* Title */}
          <text
            x="280"
            y="24"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Managed vs Native Memory
          </text>

          {/* Managed card */}
          <rect
            x="30"
            y="44"
            width={cardW}
            height={cardH}
            rx="8"
            fill="var(--surface-raised)"
            stroke={managed.color}
            strokeWidth="2"
          />
          <text
            x={30 + cardW / 2}
            y="70"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill={managed.color}
          >
            {managed.title}
          </text>
          {managed.items.map((item, i) => (
            <g key={i}>
              <text
                x="52"
                y={100 + i * 34}
                fontSize="14"
                fill={managed.color}
              >
                {item.icon}
              </text>
              <text
                x="80"
                y={100 + i * 34}
                fontSize="11"
                fill="var(--text-primary)"
              >
                {item.text}
              </text>
            </g>
          ))}

          {/* Native card */}
          <rect
            x="300"
            y="44"
            width={cardW}
            height={cardH}
            rx="8"
            fill="var(--surface-raised)"
            stroke={native.color}
            strokeWidth="2"
          />
          <text
            x={300 + cardW / 2}
            y="70"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill={native.color}
          >
            {native.title}
          </text>
          {native.items.map((item, i) => (
            <g key={i}>
              <text
                x="322"
                y={100 + i * 34}
                fontSize="14"
                fill={native.color}
              >
                {item.icon}
              </text>
              <text
                x="350"
                y={100 + i * 34}
                fontSize="11"
                fill="var(--text-primary)"
              >
                {item.text}
              </text>
            </g>
          ))}

          {/* VS divider */}
          <circle cx="280" cy="129" r="16" fill="var(--border)" />
          <text
            x="280"
            y="134"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            VS
          </text>

          {/* Bottom note */}
          <text
            x="280"
            y="238"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            Memory Profiler 分别展示两类内存；Native 泄漏不会被 GC 发现
          </text>
        </svg>
      </div>
    </figure>
  );
}
