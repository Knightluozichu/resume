/**
 * <RandomPipelineDiagram step={1|2|3|4}>：随机数生成流水线——引擎→分布→输出值。
 *
 * Step 1: 随机数引擎——展示 mt19937 或 default_random_engine（种子 → 内部状态 → 原始随机 bits）
 * Step 2: 分布对象——展示 uniform_int_distribution 或 normal_distribution（参数 + 引擎输出 → 分布后值）
 * Step 3: 输出值——将分布对象作为可调用对象，传入引擎获得最终随机数
 * Step 4: 封装成可复用函数——用 lambda 将引擎+分布打包成一个便捷的 rand_int(a,b)
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface RandomPipelineDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function RandomPipelineDiagram({ step = 1 }: RandomPipelineDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const blue = "rgb(99,179,237)";

  const w = 840;
  const h = 450;
  const cx = w / 2;

  const boxW = 200;
  const boxH = 80;
  const topY = 58;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ 随机数生成流水线：引擎→分布→输出值三阶段"
          className="mx-auto block h-auto w-full max-w-[840px]"
        >
          <text x={cx} y="32" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            随机数生成流水线：引擎 → 分布 → 输出值
          </text>

          {/* ── Stage 1: Engine ── */}
          <g transform="translate(20, topY)">
            <rect x="0" y="0" width={boxW} height={boxH} rx="10" fill={step >= 1 ? `${blue}12` : "transparent"} stroke={step >= 1 ? blue : border} strokeWidth={step >= 1 ? 2 : 1} />
            <text x={boxW / 2} y="22" fontSize="12" fontWeight="700" fill={blue} textAnchor="middle">
              ① 随机数引擎
            </text>
            <text x={boxW / 2} y="40" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
              mt19937 gen(seed);
            </text>
            <text x={boxW / 2} y="56" fontSize="9" fill={secondary} textAnchor="middle">
              种子 → 内部状态 → 原始随机 bits
            </text>
            <text x={boxW / 2} y="72" fontSize="9" fill={blue} textAnchor="middle" fontFamily="monospace">
              gen() → 无符号整数
            </text>
          </g>

          {/* Arrow 1→2 */}
          <line x1={20 + boxW} y1={topY + boxH / 2} x2={300} y2={topY + boxH / 2} stroke={step >= 2 ? accent : border} strokeWidth={step >= 2 ? 2 : 1} markerEnd="url(#arrowAccent)" />
          <text x={20 + boxW + 24} y={topY + boxH / 2 - 6} fontSize="9" fill={secondary} textAnchor="middle">
            引擎输出
          </text>

          {/* ── Stage 2: Distribution ── */}
          <g transform="translate(300, topY)">
            <rect x="0" y="0" width={boxW} height={boxH} rx="10" fill={step >= 2 ? `${warn}12` : "transparent"} stroke={step >= 2 ? warn : border} strokeWidth={step >= 2 ? 2 : 1} />
            <text x={boxW / 2} y="22" fontSize="12" fontWeight="700" fill={warn} textAnchor="middle">
              ② 分布对象
            </text>
            <text x={boxW / 2} y="40" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
              uniform_int_distr&lt;&gt;(1, 6);
            </text>
            <text x={boxW / 2} y="56" fontSize="9" fill={secondary} textAnchor="middle">
              参数(a,b) + 引擎输出 → 范围[a,b]
            </text>
            <text x={boxW / 2} y="72" fontSize="9" fill={warn} textAnchor="middle" fontFamily="monospace">
              dist(gen) → [1,6] 均匀整数
            </text>
          </g>

          {/* Arrow 2→3 */}
          <line x1={300 + boxW} y1={topY + boxH / 2} x2={580} y2={topY + boxH / 2} stroke={step >= 3 ? accent : border} strokeWidth={step >= 3 ? 2 : 1} markerEnd="url(#arrowAccent)" />
          <text x={300 + boxW + 24} y={topY + boxH / 2 - 6} fontSize="9" fill={secondary} textAnchor="middle">
            分布后值
          </text>

          {/* ── Stage 3: Output ── */}
          <g transform="translate(580, topY)">
            <rect x="0" y="0" width={boxW} height={boxH} rx="10" fill={step >= 3 ? `${good}12` : "transparent"} stroke={step >= 3 ? good : border} strokeWidth={step >= 3 ? 2 : 1} />
            <text x={boxW / 2} y="22" fontSize="12" fontWeight="700" fill={good} textAnchor="middle">
              ③ 输出：骰子值
            </text>
            <text x={boxW / 2} y="40" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
              int dice = dist(gen);
            </text>
            <text x={boxW / 2} y="56" fontSize="9" fill={secondary} textAnchor="middle">
              每次调用返回 1~6 的整数
            </text>
            {step >= 3 && (
              <text x={boxW / 2} y="72" fontSize="9" fill={good} textAnchor="middle" fontFamily="monospace">
                例: 3, 6, 1, 4, 2, 5 ...
              </text>
            )}
          </g>

          {/* ── Stage 4: Lambda encapsulation ── */}
          {step >= 4 && (
            <g transform="translate(cx - 300, topY + boxH + 28)">
              <rect x="0" y="0" width="600" height="68" rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="2" />
              <text x="300" y="20" fontSize="11" fontWeight="700" fill={accent} textAnchor="middle">
                ④ 封装：把引擎+分布打包成可复用的函数
              </text>
              <text x="12" y="40" fontSize="10" fill={primary} fontFamily="monospace">
                auto rand_int = [&amp;gen, &amp;dist]() {'{'} return dist(gen); {'}'};
              </text>
              <text x="12" y="56" fontSize="10" fill={secondary} fontFamily="monospace">
                int x = rand_int();  // 每次调用得到一个 [1,6] 的随机整数
              </text>
            </g>
          )}

          {/* Step indicator bar */}
          <rect x={cx - 280} y={h - 50} width="560" height="28" rx="6" fill={accent} fillOpacity="0.06" stroke={border} />
          <text x={cx} y={h - 30} fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">
            {step === 1 && "① 引擎：mt19937 等算法将种子转换为高质量伪随机 bits——状态空间巨大、周期极长"}
            {step === 2 && "② 分布：将引擎输出的原始无符号整数映射到目标范围/分布——uniform_int 均匀、normal 正态"}
            {step === 3 && "③ 输出：dist(gen) 每次调用返回一个分布后的随机值——引擎状态推进、序列不重复"}
            {step === 4 && "④ 封装：用 lambda 捕获引擎和分布的引用——rand_int() 就是你的自定义 rand()"}
          </text>

          {/* Bottom note */}
          <g transform={`translate(${cx - 310}, ${h - 88})`}>
            <rect x="0" y="0" width="620" height="32" rx="6" fill="var(--code-bg)" stroke={border} />
            <text x="310" y="14" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
              引擎决定"质量"（是否真随机），分布决定"形状"（均匀/正态/指数...）。两者组合 → 任意分布的高质量随机数。
            </text>
            <text x="310" y="28" fontSize="9" fill={accent} textAnchor="middle" fontFamily="monospace">
              别再写 rand() % 6 + 1 ——取模引入偏差、范围小、随机性差。用 &lt;random&gt; 才是正确答案。
            </text>
          </g>

          <defs>
            <marker id="arrowAccent" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
              <polygon points="0,1 8,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && "第一阶段：随机数引擎（如 mt19937）用种子初始化内部状态，每次 gen() 调用输出原始无符号整数。"}
        {step === 2 && "第二阶段：分布对象（如 uniform_int_distribution）接收引擎输出，按指定参数将原始值映射到目标范围。"}
        {step === 3 && "第三阶段：dist(gen) 返回分布后的随机值。可重复调用——引擎状态自动推进，每次结果不同。"}
        {step === 4 && "第四阶段：把引擎+分布封装成 lambda，一行 rand_int() 就得到一个范围内的随机整数——既安全又好用。"}
      </figcaption>
    </figure>
  );
}
