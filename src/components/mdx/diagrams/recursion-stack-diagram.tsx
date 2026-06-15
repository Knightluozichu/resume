/**
 * <RecursionStackDiagram>：简单递归（factorial）调用栈示意图。
 *
 * 四步：① 首次调用 ② 递归深入 ③ 到达基准情形 ④ 逐层返回
 * 支持 step prop (1-4)。
 */

interface RecursionStackDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function RecursionStackDiagram({ step = 4 }: RecursionStackDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  const stackX = 380;
  const stackW = 200;
  const frameH = 44;
  const frames = [
    { label: "fact(1)  n=1 → return 1", y: 300 },
    { label: "fact(2)  n=2, 等 fact(1)", y: 252 },
    { label: "fact(3)  n=3, 等 fact(2)", y: 204 },
    { label: "fact(4)  n=4, 等 fact(3)", y: 156 },
  ];

  const activeCount = step === 1 ? 1 : step === 2 ? 3 : step === 3 ? 4 : 4;
  const returning = step === 4;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 380"
          role="img"
          aria-label="阶乘递归 fact(4) 的调用栈压入与弹出过程"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            fact(4) 递归栈
          </text>

          {/* 左侧代码 */}
          <rect x={24} y={48} width={320} height={140} rx="8" fill={bg} stroke={border} strokeWidth="1" />
          <text x={40} y={72} fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">
            long fact(int n) {"{"}
          </text>
          <text x={52} y={92} fontSize="11" fill={secondary} fontFamily="monospace">
            if (n &lt;= 1) return 1;
          </text>
          <text x={52} y={112} fontSize="11" fill={secondary} fontFamily="monospace">
            return n * fact(n - 1);
          </text>
          <text x={40} y={132} fontSize="12" fill={primary} fontFamily="monospace">
            {"}"}
          </text>
          <text x={40} y={158} fontSize="11" fill={accent} fontFamily="monospace">
            main: printf(&quot;%ld&quot;, fact(4));
          </text>
          <text x={40} y={178} fontSize="11" fill={secondary}>
            基准：n&lt;=1 直接 return 1，不再递归
          </text>

          {/* 栈框 */}
          <rect x={stackX} y={120} width={stackW} height={240} rx="6" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={stackX + stackW / 2} y={108} textAnchor="middle" fontSize="11" fill={secondary}>
            调用栈（栈顶在上）
          </text>

          {frames.map((f, i) => {
            const idx = frames.length - 1 - i;
            const visible = idx < activeCount;
            const isTop = idx === activeCount - 1 && !returning;
            const isPopping = returning && idx >= 1;
            const opacity = visible ? (isPopping ? 0.45 : 1) : 0.2;
            return (
              <g key={f.label} opacity={opacity}>
                <rect
                  x={stackX + 12}
                  y={f.y}
                  width={stackW - 24}
                  height={frameH}
                  rx="4"
                  fill={isTop ? accent : bg}
                  opacity={isTop ? 0.18 : 1}
                  stroke={isTop ? accent : border}
                  strokeWidth={isTop ? 2 : 1}
                />
                <text
                  x={stackX + stackW / 2}
                  y={f.y + 18}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight={isTop ? 700 : 500}
                  fill={isTop ? accent : primary}
                  fontFamily="monospace"
                >
                  {f.label}
                </text>
                {returning && idx === 0 && (
                  <text x={stackX + stackW / 2} y={f.y + 34} textAnchor="middle" fontSize="9" fill={accent}>
                    return 1 ↑
                  </text>
                )}
              </g>
            );
          })}

          {/* 步骤说明 */}
          <text x={24} y={220} fontSize="14" fontWeight="700" fill={step === 1 ? accent : border}>
            {step === 1 && "① fact(4) 入栈，n=4，调用 fact(3)"}
            {step === 2 && "② 继续递归：fact(3)、fact(2) 依次压栈"}
            {step === 3 && "③ n=1 命中基准，return 1，不再压栈"}
            {step === 4 && "④ 逐层返回：1×2×3×4 = 24 传回 main"}
          </text>
          <text x={24} y={244} fontSize="12" fill={secondary}>
            {step === 1 && "每次递归调用都会新建一帧，保存当前 n 和返回地址。"}
            {step === 2 && "栈上同时挂着多个「未完成」的 fact 调用，每个等内层结果。"}
            {step === 3 && "递归必须有终止条件，否则栈会无限增长直至栈溢出。"}
            {step === 4 && "从内到外：fact(1)→1，fact(2)→2，fact(3)→6，fact(4)→24。"}
          </text>

          {step === 4 && (
            <text x={stackX + stackW / 2} y={368} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">
              main 收到返回值 24
            </text>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        递归 = 函数调用自身。每次调用压入新栈帧；到达基准情形后开始逐层返回，把结果乘回上一层。
      </figcaption>
    </figure>
  );
}
