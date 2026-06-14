/**
 * <TemplateInstantiationDiagram step={1|2|3|4}>：函数模板实例化四阶段过程图。
 *
 * Step 1: 模板声明——用户编写 template<typename T> T max(T a, T b)
 * Step 2: 函数调用——编译器遇到 max(3, 7) 调用点
 * Step 3: 隐式推导——编译器推导 T = int，检查签名匹配
 * Step 4: 编译器生成实例——编译器生成 int max(int, int) 并插入调用
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface TemplateInstantiationDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function TemplateInstantiationDiagram({ step = 1 }: TemplateInstantiationDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const w = 820;
  const h = 420;
  const cx = w / 2;

  const stageColors = [good, warn, accent, accent];
  const stageLabels = [
    "① 模板声明",
    "② 函数调用",
    "③ 隐式推导",
    "④ 生成实例",
  ];
  const stageDescriptions = [
    "用户写 template<typename T>\nT max(T a, T b) { …… }",
    "编译器遇到 max(3, 7);\n——模板还未生成代码",
    "编译器推导 T = int\n检查签名是否匹配",
    "生成 int max(int,int)\n插入对它的调用",
  ];

  // Draw the 4 stages as a pipeline
  const boxW = 150;
  const boxH = 70;
  const gap = 15;
  const totalW = 4 * boxW + 3 * gap;
  const startX = (w - totalW) / 2;
  const topY = 50;

  const stageBoxes = [0, 1, 2, 3].map((i) => ({
    x: startX + i * (boxW + gap),
    y: topY,
    w: boxW,
    h: boxH,
  }));

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="模板实例化四阶段：声明→调用→推导→生成实例的编译期展开过程"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x={cx} y="28" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            模板实例化的四阶段过程
          </text>

          {[0, 1, 2, 3].map((i) => {
            const box = stageBoxes[i];
            const isActive = i < step;
            const color = stageColors[i];
            return (
              <g key={i}>
                {/* Box */}
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.w}
                  height={box.h}
                  rx="10"
                  fill={isActive ? `${color}${color === accent ? "1A" : "0F"}` : "transparent"}
                  stroke={isActive ? color : border}
                  strokeWidth={isActive ? 2 : 1}
                />

                {/* Number + title */}
                <text
                  x={box.x + box.w / 2}
                  y={box.y + 28}
                  fontSize="12"
                  fontWeight="700"
                  fill={isActive ? color : secondary}
                  textAnchor="middle"
                >
                  {stageLabels[i]}
                </text>

                {/* Description */}
                <text
                  x={box.x + 8}
                  y={box.y + 48}
                  fontSize="9"
                  fill={isActive ? primary : secondary}
                  fontFamily="monospace"
                >
                  {stageDescriptions[i].split("\n")[0]}
                </text>
                <text
                  x={box.x + 8}
                  y={box.y + 62}
                  fontSize="9"
                  fill={isActive ? primary : secondary}
                  fontFamily="monospace"
                >
                  {stageDescriptions[i].split("\n")[1]}
                </text>
              </g>
            );
          })}

          {/* Arrows between boxes */}
          {[0, 1, 2].map((i) => {
            const from = stageBoxes[i];
            const to = stageBoxes[i + 1];
            const arrowY = topY + boxH / 2;
            const isActive = i + 1 < step;
            return (
              <g key={`arrow-${i}`}>
                <line
                  x1={from.x + from.w}
                  y1={arrowY}
                  x2={to.x}
                  y2={arrowY}
                  stroke={isActive ? accent : border}
                  strokeWidth={isActive ? 2 : 1}
                  markerEnd="url(#arrowAccent)"
                />
              </g>
            );
          })}

          {/* Step indicator */}
          <rect x={cx - 160} y={topY + 90} width="320" height="28" rx="6" fill={accent} fillOpacity="0.06" stroke={border} />
          <text x={cx} y={topY + 109} fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">
            {step === 1 && "当前阶段：模板声明——只写了蓝图，还没生成任何代码"}
            {step === 2 && "当前阶段：遇到调用点——编译器发现 max(3,7)，决定实例化"}
            {step === 3 && "当前阶段：自动推导——T=int，签名 max(int,int) 匹配调用"}
            {step === 4 && "当前阶段：实例化完成——编译器生成了 int max(int,int) 并调用"}
          </text>

          {/* Bottom: code pane showing current state */}
          <g transform="translate(40, topY + 140)">
            <rect x="0" y="0" width={w - 80} height="90" rx="8" fill="var(--code-bg)" stroke={border} />

            {step >= 1 && (
              <text x="16" y="22" fontSize="10" fill={step >= 1 ? good : secondary} fontFamily="monospace">
                template&lt;typename T&gt;
              </text>
            )}
            {step >= 1 && (
              <text x="16" y="40" fontSize="10" fill={step >= 1 ? good : secondary} fontFamily="monospace">
                T max(T a, T b) {'{'} return a &gt; b ? a : b; {'}'}
              </text>
            )}

            {step >= 2 && (
              <text x="16" y="62" fontSize="10" fill={step >= 2 ? warn : secondary} fontFamily="monospace">
                int main() {'{'} int x = max(3, 7); {'}'}  // ← 调用点
              </text>
            )}

            {/* Step 4: show generated code */}
            {step >= 4 && (
              <text x="420" y="22" fontSize="10" fill={accent} fontFamily="monospace">
                {`// 编译器生成的实例：`}
              </text>
            )}
            {step >= 4 && (
              <text x="420" y="40" fontSize="10" fill={accent} fontFamily="monospace">
                {`int max(int a, int b) { return a > b ? a : b; }`}
              </text>
            )}
            {step >= 4 && (
              <text x="420" y="62" fontSize="10" fill={accent} fontFamily="monospace">
                {`// 被插入到调用点，等价于 int x = max_int(a, b)`}
              </text>
            )}

            {step >= 3 && step < 4 && (
              <text x="420" y="22" fontSize="10" fill={accent} fontFamily="monospace">
                {`// 推导：实参 int,int → 模板参数 T = int`}
              </text>
            )}
            {step >= 3 && step < 4 && (
              <text x="420" y="40" fontSize="10" fill={accent} fontFamily="monospace">
                {`// 签名匹配：int max(int, int)`}
              </text>
            )}
            {step >= 3 && step < 4 && (
              <text x="420" y="62" fontSize="10" fill={accent} fontFamily="monospace">
                {`// 编译器现在去生成 int 版本的 max →`}
              </text>
            )}
          </g>

          <defs>
            <marker id="arrowAccent" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
              <polygon points="0,1 8,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && "阶段一：模板只是一个蓝图——只有 template 声明，没有任何类型确定、没有任何代码生成。"}
        {step === 2 && "阶段二：编译器在调用点 max(3,7) 发现需要该模板，决定进行实例化。"}
        {step === 3 && "阶段三：编译器从实参类型 int 推导模板参数 T = int——全自动，无需人为指定。"}
        {step === 4 && "阶段四：编译器生成了一份 int max(int,int) 的代码，并将其插入调用点——等价于你手写了一版 int 特化。"}
      </figcaption>
    </figure>
  );
}
