/**
 * <EnumDiagram>：enum 命名常量与整数值映射。
 *
 * Server Component，token 色，无阴影。
 */

export function EnumDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";

  const items = [
    { name: "RED", value: 0, color: "rgb(229,103,92)" },
    { name: "GREEN", value: 1, color: "rgb(63,185,127)" },
    { name: "BLUE", value: 2, color: "rgb(99,149,229)" },
    { name: "YELLOW", value: 3, color: "rgb(229,181,103)" },
  ];

  const startY = 100;
  const rowH = 48;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 320"
          role="img"
          aria-label="枚举类型将命名常量映射到整数"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            enum color {"{ RED, GREEN, BLUE, YELLOW }"}
          </text>
          <text x={24} y={52} fontSize="12" fill={secondary}>
            未赋值的枚举常从 0 起递增；也可显式指定如 BLUE = 10
          </text>

          {/* Source code panel */}
          <rect x={24} y={68} width={280} height={36} rx="6" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={40} y={90} fontSize="10" fill={primary} fontFamily="monospace">
            enum color c = GREEN;  /* c 的值是 1 */
          </text>

          {/* Mapping table header */}
          <text x={340} y={78} fontSize="11" fontWeight="600" fill={secondary}>
            标识符
          </text>
          <text x={480} y={78} fontSize="11" fontWeight="600" fill={secondary}>
            整数值
          </text>

          {items.map((item, i) => {
            const y = startY + i * rowH;
            return (
              <g key={item.name}>
                <rect
                  x={320}
                  y={y}
                  width={280}
                  height={rowH - 8}
                  rx="8"
                  fill={bgEl}
                  stroke={border}
                  strokeWidth="1.5"
                />
                <circle cx={348} cy={y + 20} r={8} fill={item.color} opacity={0.85} />
                <text x={368} y={y + 24} fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">
                  {item.name}
                </text>
                <text x={500} y={y + 24} textAnchor="middle" fontSize="14" fontWeight="700" fill={accent} fontFamily="monospace">
                  {item.value}
                </text>
                {i < items.length - 1 && (
                  <line x1={340} y1={y + rowH - 4} x2={580} y2={y + rowH - 4} stroke={border} strokeWidth="1" opacity={0.5} />
                )}
              </g>
            );
          })}

          {/* Arrow from enum to int */}
          <path
            d="M 300 118 L 312 118"
            stroke={accent}
            strokeWidth="2"
            markerEnd="url(#enumArrow)"
          />
          <text x={150} y={268} textAnchor="middle" fontSize="10" fill={secondary}>
            switch (c) 可分支处理；printf 用 %d 打印枚举的整数值
          </text>
          <text x={150} y={288} textAnchor="middle" fontSize="10" fill={secondary}>
            typedef enum {"{ ... } Color;"} 可像 struct 一样起别名
          </text>

          <defs>
            <marker id="enumArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        枚举把一组相关的命名常量映射为整数，替代魔法数字，让 switch 与函数参数更易读；底层类型通常是 int。
      </figcaption>
    </figure>
  );
}
