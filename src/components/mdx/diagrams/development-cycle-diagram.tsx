/**
 * <DevelopmentCycleDiagram step={1|2|3|4|5|6|7}>：编程七步骤循环图。
 *
 * 七步骤：定义目标→设计→编写→编译→运行→测试→维护
 * step prop 高亮当前步骤（accent 色填充 + 加粗边框），其余灰显。
 *
 * 布局：七步成环排列（类正七边形），每步一个圆角盒，箭头指向下一步。
 * 维护→定义目标 有回环箭头表示循环迭代。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

type CycleStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface Props {
  step?: CycleStep;
}

export function DevelopmentCycleDiagram({ step = 1 }: Props) {
  const steps = [
    { num: 1, label: "定义目标", sub: "明确程序\n要做什么", angle: -90 },
    { num: 2, label: "设计", sub: "规划结构\n算法选型", angle: -38.57 },
    { num: 3, label: "编写", sub: "敲代码\n实现逻辑", angle: 12.86 },
    { num: 4, label: "编译", sub: "源码变\n可运行", angle: 64.29 },
    { num: 5, label: "运行", sub: "执行程序\n看结果", angle: 115.71 },
    { num: 6, label: "测试", sub: "验证正确\n找 bug", angle: 167.14 },
    { num: 7, label: "维护", sub: "修 bug\n加功能", angle: 218.57 },
  ];

  const cx = 360;
  const cy = 130;
  const r = 100;

  const positions = steps.map((s) => {
    const rad = (s.angle * Math.PI) / 180;
    return {
      ...s,
      x: cx + r * Math.cos(rad) - 56,
      y: cy + r * Math.sin(rad) - 28,
    };
  });

  const isActive = (num: number) => step === num;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 720 280"
          role="img"
          aria-label="编程七步骤循环图：定义目标→设计→编写→编译→运行→测试→维护，首尾相连"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 连接箭头（步骤间） */}
          {positions.map((p, i) => {
            const next = positions[(i + 1) % positions.length];
            const sx = p.x + 56;
            const sy = p.y + 28;
            const ex = next.x + 56;
            const ey = next.y + 28;
            const midX = (sx + ex) / 2;
            const midY = (sy + ey) / 2;
            const active = isActive(p.num);
            const stroke = active ? "var(--accent)" : "var(--border)";
            return (
              <g key={`arrow-${i}`}>
                <line
                  x1={sx}
                  y1={sy}
                  x2={midX}
                  y2={midY}
                  stroke={stroke}
                  strokeWidth="2"
                />
                <line
                  x1={midX}
                  y1={midY}
                  x2={ex}
                  y2={ey}
                  stroke={stroke}
                  strokeWidth="2"
                />
                {/* 简化箭头尖 */}
                <polygon
                  points={`${ex},${ey} ${ex - 6},${ey + 4} ${ex - 4},${ey - 6}`}
                  fill={stroke}
                />
              </g>
            );
          })}

          {/* 步骤盒子 */}
          {positions.map((p) => {
            const active = isActive(p.num);
            const fill = active ? "var(--accent)" : "var(--bg)";
            const stroke = active ? "var(--accent)" : "var(--border)";
            const textFill = active ? "var(--bg)" : "var(--text-primary)";
            const subFill = active ? "var(--bg)" : "var(--text-secondary)";
            return (
              <g key={p.num}>
                <rect
                  x={p.x}
                  y={p.y}
                  width="112"
                  height="56"
                  rx="8"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={active ? 2.5 : 1.5}
                />
                {/* 步骤编号 */}
                <circle
                  cx={p.x + 16}
                  cy={p.y + 16}
                  r="10"
                  fill={active ? "var(--bg)" : "var(--border)"}
                  opacity={active ? 0.3 : 1}
                />
                <text
                  x={p.x + 16}
                  y={p.y + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={textFill}
                >
                  {p.num}
                </text>
                {/* 标签 */}
                <text
                  x={p.x + 56}
                  y={p.y + 22}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill={textFill}
                >
                  {p.label}
                </text>
                {/* 副标注 */}
                {p.sub.split("\n").map((line, li) => (
                  <text
                    key={li}
                    x={p.x + 56}
                    y={p.y + 38 + li * 12}
                    textAnchor="middle"
                    fontSize="10"
                    fill={subFill}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* 中心标注 */}
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            编程七步骤
          </text>
          <text
            x={cx}
            y={cy + 10}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            定义 → 设计 → 编写
          </text>
          <text
            x={cx}
            y={cy + 24}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            编译 → 运行 → 测试 → 维护
          </text>

          {/* 当前步骤提示 */}
          {isActive(step) && (
            <text
              x={cx}
              y={248}
              textAnchor="middle"
              fontSize="12"
              fill="var(--accent)"
              fontWeight="600"
            >
              当前高亮：第 {step} 步 — {steps[step - 1].label}
            </text>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        编程七步骤形成一个循环：定义目标 → 设计 → 编写 → 编译 → 运行 → 测试 → 维护。
        每完成一轮，根据反馈回到"定义目标"或"设计"，开始下一轮迭代。
      </figcaption>
    </figure>
  );
}
