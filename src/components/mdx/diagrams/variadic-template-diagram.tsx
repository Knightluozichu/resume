/**
 * <VariadicTemplateDiagram step={1|2|3|4|5}>：可变参数模板递归展开过程图。
 *
 * 以 print(args...) 为例，展示参数包如何逐个被消耗：
 *   Step 1: print("hello", 42, 3.14) ——三个参数打包
 *   Step 2: 处理 "hello" → 剩余 {42, 3.14}
 *   Step 3: 处理 42 → 剩余 {3.14}
 *   Step 4: 处理 3.14 → 剩余 {}（空包，递归终止）
 *   Step 5: 终止——调用重载的无参版本或 base case
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface VariadicTemplateDiagramProps {
  step?: 1 | 2 | 3 | 4 | 5;
}

export function VariadicTemplateDiagram({ step = 1 }: VariadicTemplateDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const green = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const red = "rgb(229,103,92)";

  const w = 820;
  const h = 460;
  const cx = w / 2;

  // Data for each recursive step
  const args = [
    ["hello", "42", "3.14"],
    ["42", "3.14"],
    ["3.14"],
    [],
  ];
  const argColors = [green, warn, accent];
  const currentArg = ["\"hello\"", "42", "3.14", "(空)"];

  const currentStep = step - 1; // 0-based
  const stepLabels = [
    "初始调用——参数包",
    "第一次递归——消耗一个参数",
    "第二次递归——再消耗一个参数",
    "第三次递归——只剩一个参数",
    "递归终止——空包，调用 base case",
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="可变参数模板递归展开——参数包逐个被消耗直到空包终止"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x={cx} y="28" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            {stepLabels[currentStep]}
          </text>

          {/* Call chain */}
          <g transform="translate(40, 52)">
            <rect x="0" y="0" width={w - 80} height="56" rx="8" fill="var(--code-bg)" stroke={border} />
            <text x="16" y="22" fontSize="10" fill={secondary} fontFamily="monospace">
              // 调用：print("hello", 42, 3.14);
            </text>
            <text x="16" y="42" fontSize="10" fill={primary} fontFamily="monospace">
              {`template<typename T, typename... Args>`}
            </text>
            <text x="16" y="58" fontSize="10" fill={primary} fontFamily="monospace">
              {`void print(T first, Args... rest) { ... }`}
            </text>
          </g>

          {/* Recursion visualization */}
          {[0, 1, 2, 3].map((i) => {
            const isActive = i <= currentStep;
            const y = 128 + i * 65;
            const show = i <= currentStep;
            const isLast = i === 3;

            return (
              <g key={i} opacity={show ? 1 : 0.2}>
                {/* Step number */}
                <text x="36" y={y + 22} fontSize="11" fontWeight="700" fill={isActive ? accent : secondary} textAnchor="start">
                  {i === 0 ? "①" : i === 1 ? "②" : i === 2 ? "③" : "④"}
                </text>

                {/* Recursion frame */}
                <rect
                  x="70"
                  y={y}
                  width={w - 110}
                  height={44}
                  rx="8"
                  fill={isActive ? accent : "transparent"}
                  fillOpacity={isActive ? 0.04 : 0}
                  stroke={isActive && !isLast ? accent : border}
                  strokeWidth={isActive ? 1.5 : 1}
                />

                {/* Consumed arg */}
                {args[i].length > 0 && (
                  <>
                    <text x="86" y={y + 18} fontSize="9" fill={secondary} fontFamily="monospace">
                      first =&nbsp;
                    </text>
                    <text x="130" y={y + 18} fontSize="10" fontWeight="600" fill={isActive ? argColors[i] : secondary} fontFamily="monospace">
                      {currentArg[i]}
                    </text>
                  </>
                )}

                {/* Remaining pack */}
                {args[i + 1] && (
                  <>
                    <text x="220" y={y + 18} fontSize="9" fill={secondary} fontFamily="monospace">
                      rest = {'{'}
                    </text>
                    {args[i + 1].length > 0 ? (
                      <>
                        {args[i + 1].map((a, j) => (
                          <text key={j} x={268 + j * 80} y={y + 18} fontSize="10" fill={isActive ? argColors[i + 1 + j] || accent : secondary} fontFamily="monospace">
                            {a}
                          </text>
                        ))}
                        <text x={270 + args[i + 1].length * 70} y={y + 18} fontSize="9" fill={secondary} fontFamily="monospace">
                          {'}'}
                        </text>
                      </>
                    ) : (
                      <>
                        <text x="268" y={y + 18} fontSize="10" fill={red} fontFamily="monospace">
                          (空包)
                        </text>
                        <text x="310" y={y + 18} fontSize="9" fill={secondary} fontFamily="monospace">
                          {'}'}
                        </text>
                      </>
                    )}
                  </>
                )}

                {/* sizeof... indicator */}
                {i <= currentStep && (
                  <text x={w - 140} y={y + 18} fontSize="9" fill={secondary} fontFamily="monospace">
                    sizeof...(Args) = {args[i + 1]?.length ?? 0}
                  </text>
                )}

                {/* Action line */}
                <text x="86" y={y + 36} fontSize="9" fill={isActive ? primary : secondary} fontFamily="monospace">
                  {args[i].length > 0
                    ? `cout << first;  print(rest...);  // 递归调用自身`
                    : `// 调用 base case——递归终止`}
                </text>
              </g>
            );
          })}

          {/* Base case callout */}
          {currentStep >= 3 && (
            <g transform="translate(70, 388)">
              <rect x="0" y="0" width={w - 140} height="36" rx="6" fill={red} fillOpacity="0.06" stroke={red} strokeWidth="1.5" />
              <text x={cx - 70} y="16" fontSize="11" fontWeight="700" fill={red} textAnchor="middle">
                终止条件——必须提供无参重载 &nbsp;
              </text>
              <text x={cx - 70} y="30" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
                {`void print() { }  // base case：参数包为空时调用，防止无限递归`}
              </text>
            </g>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && '初始状态——参数包包含 {Hello, 42, 3.14} 三个参数，sizeof...(Args) = 3。'}
        {step === 2 && '第一次递归——取出 Hello 作为 first，剩余 {42, 3.14} 作为 rest。对 first 执行操作，对 rest 递归调用。'}
        {step === 3 && "第二次递归——取出 42，剩余 {3.14}。sizeof...(Args) 减少到 1。"}
        {step === 4 && "第三次递归——取出 3.14，剩余 {}（空包）。下一次将触发终止——调用无参重载。"}
        {step === 5 && "递归终止——rest 是空包，编译器匹配到 void print() 重载（base case），递归结束，不再展开。"}
      </figcaption>
    </figure>
  );
}
