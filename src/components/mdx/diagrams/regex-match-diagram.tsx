/**
 * <RegexMatchDiagram step={1|2|3|4}>：正则匹配过程图——从模式到输入到捕获组。
 *
 * Step 1: 正则模式——展示 regex 对象（模式字符串 + 捕获组）
 * Step 2: 输入字符串——展示待匹配的整行文本
 * Step 3: 逐字符匹配——引擎从左到右尝试匹配，展示当前匹配位置
 * Step 4: 捕获组结果——展示 smatch 中的捕获组（$0 全文 / $1 子组1）
 *
 * 使用 regex: R"((\d+)-(\w+))" 匹配 "123-abc, 456-def"
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface RegexMatchDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function RegexMatchDiagram({ step = 1 }: RegexMatchDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const blue = "rgb(99,179,237)";
  const orange = "rgb(237,137,99)";

  const w = 840;
  const h = 460;
  const cx = w / 2;

  const input = "123-abc, 456-def";
  const pattern = String.raw`(\d+)-(\w+)`;
  const charW = 22;

  const topBlockY = 50;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="正则匹配过程：模式→输入→匹配→捕获组的四步展开"
          className="mx-auto block h-auto w-full max-w-[840px]"
        >
          <text x={cx} y="32" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            正则匹配过程：模式 → 输入 → 匹配 → 捕获组
          </text>

          {/* ── Row 1: Pattern ── */}
          <text x="32" y={topBlockY + 20} fontSize="11" fill={primary} fontWeight="600">
            模式
          </text>
          <g transform="translate(100, topBlockY)">
            <rect x="0" y="0" width="340" height="36" rx="6" stroke={accent} strokeWidth={step >= 1 ? 2 : 1} fill={step >= 1 ? `${accent}0C` : "transparent"} />
            <text x="12" y="14" fontSize="11" fill={accent} fontFamily="monospace">
              regex re(R"((\d+)-(\w+))");
            </text>
            <text x="12" y="30" fontSize="9" fill={secondary} fontFamily="monospace">
              捕获组1=数字  捕获组2=字母/数字/下划线
            </text>
          </g>

          {/* ── Row 2: Input string ── */}
          <text x="32" y={topBlockY + 68} fontSize="11" fill={primary} fontWeight="600">
            输入
          </text>
          <g transform="translate(100, topBlockY + 50)">
            {input.split("").map((c, i) => {
              const isFirstMatch = step >= 3 && i >= 0 && i <= 6;
              const isSecondMatch = step >= 3 && i >= 8 && i <= 14;
              const isMatched = isFirstMatch;
              return (
                <g key={i}>
                  <rect
                    x={i * charW}
                    y={0}
                    width={charW}
                    height={30}
                    rx="3"
                    fill={isMatched ? `${good}1A` : "transparent"}
                    stroke={isMatched ? good : (i === 7 ? border : "transparent")}
                    strokeWidth={isMatched ? 1.5 : (i === 7 ? 1 : 0)}
                  />
                  <text x={i * charW + charW / 2} y={20} fontSize="12" fontWeight={isMatched ? "700" : "400"} fill={isMatched ? good : primary} textAnchor="middle" fontFamily="monospace">
                    {c}
                  </text>
                </g>
              );
            })}
            {/* Match indicator arrows */}
            {step >= 3 && (
              <>
                <text x={0} y={46} fontSize="8" fill={good} fontFamily="monospace">
                  ←──────── $1 ────────→
                </text>
                <text x={8 * charW - 2} y={64} fontSize="8" fill={accent} fontFamily="monospace">
                  ←─────── $2 ─────→
                </text>
                <text x={0 * charW} y={80} fontSize="9" fill={good} fontFamily="monospace">
                  ←────────── $0 (完整匹配) ────────────→
                </text>
              </>
            )}
          </g>

          {/* ── Row 3: Matching engine ── */}
          {step >= 2 && (
            <>
              <text x="32" y={topBlockY + 124} fontSize="11" fill={primary} fontWeight="600">
                引擎
              </text>
              <g transform="translate(100, topBlockY + 108)">
                <rect x="0" y="0" width={input.length * charW} height="30" rx="6" fill={border} fillOpacity="0.15" stroke={border} />
                <text x="8" y="12" fontSize="10" fill={secondary} fontFamily="monospace">
                  regex_search / sregex_iterator 从左到右扫描...
                </text>
                <text x="8" y="26" fontSize="9" fill={step >= 3 ? good : secondary} fontFamily="monospace">
                  {step < 3 && "尝试匹配：当前位置 0 → (\d+) 匹配 '123' → '-' 匹配 → (\w+) 匹配 'abc' ✓"}
                  {step >= 3 && "✓ 找到匹配！位置 [0,7)  → 扫描继续..."}
                </text>
              </g>
            </>
          )}

          {/* ── Row 4: Capture group results ── */}
          {step >= 4 && (
            <>
              <text x="32" y={topBlockY + 180} fontSize="11" fill={primary} fontWeight="600">
                结果
              </text>
              <g transform="translate(100, topBlockY + 164)">
                {/* smatch result table */}
                <rect x="0" y="0" width="360" height="72" rx="8" fill="var(--code-bg)" stroke={border} />

                {/* Row: $0 */}
                <text x="14" y="18" fontSize="10" fill={blue} fontFamily="monospace">$0[0]</text>
                <text x="60" y="18" fontSize="10" fill={secondary} fontFamily="monospace">完整匹配</text>
                <text x="140" y="18" fontSize="10" fill={primary} fontFamily="monospace">"123-abc"</text>

                {/* Row: $1 */}
                <text x="14" y="36" fontSize="10" fill={orange} fontFamily="monospace">$0[1]</text>
                <text x="60" y="36" fontSize="10" fill={secondary} fontFamily="monospace">捕获组1 (\d+)</text>
                <text x="140" y="36" fontSize="10" fill={good} fontFamily="monospace">"123"</text>

                {/* Row: $2 */}
                <text x="14" y="54" fontSize="10" fill={accent} fontFamily="monospace">$0[2]</text>
                <text x="60" y="54" fontSize="10" fill={secondary} fontFamily="monospace">捕获组2 (\w+)</text>
                <text x="140" y="54" fontSize="10" fill={accent} fontFamily="monospace">"abc"</text>

                {/* smatch access example */}
                <text x="180" y="18" fontSize="10" fill={secondary} fontFamily="monospace">sm.str(0) → </text>
                <text x="260" y="18" fontSize="10" fill={blue} fontFamily="monospace">"123-abc"</text>

                <text x="180" y="36" fontSize="10" fill={secondary} fontFamily="monospace">sm[1].str() → </text>
                <text x="260" y="36" fontSize="10" fill={good} fontFamily="monospace">"123"</text>

                <text x="180" y="54" fontSize="10" fill={secondary} fontFamily="monospace">sm[2].str() → </text>
                <text x="260" y="54" fontSize="10" fill={accent} fontFamily="monospace">"abc"</text>
              </g>
            </>
          )}

          {/* Next match indicator */}
          {step >= 4 && (
            <g transform="translate(100, topBlockY + 256)">
              <text x="0" y="0" fontSize="10" fill={secondary} fontFamily="monospace">
                sregex_iterator 继续 → 下一个匹配："456-def" → $0["456-def"] $1["456"] $2["def"]
              </text>
            </g>
          )}

          {/* Step indicator bar */}
          <rect x={cx - 240} y={h - 50} width="480" height="28" rx="6" fill={accent} fillOpacity="0.06" stroke={border} />
          <text x={cx} y={h - 30} fontSize="11" fill={accent} textAnchor="middle" fontFamily="monospace">
            {step === 1 && "① 模式：用正则字符串构造 regex 对象——(\d+) 捕获数字、(\w+) 捕获字母数字"}
            {step === 2 && "② 输入：待匹配的字符串。引擎从左到右扫描，寻找第一个匹配位置"}
            {step === 3 && "③ 匹配：引擎逐字符比对——\d+ 匹配 '123'、连字符匹配 '-'、\w+ 匹配 'abc'"}
            {step === 4 && "④ 捕获组：smatch[0] 存完整匹配，[1]/[2] 存各子表达式匹配的内容"}
          </text>

          <defs>
            <marker id="arrowAccent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0,0.5 6.5,3 0,5.5" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && "第一步：regex 对象用模式字符串构造——括号 () 定义捕获组，编译为内部自动机。"}
        {step === 2 && "第二步：待匹配输入。regex_search 或 sregex_iterator 开始从左到右扫描。"}
        {step === 3 && "第三步：匹配阶段——引擎逐字符比对，$0 存完整匹配（123-abc），$1 存第一个捕获组（123），$2 存第二个捕获组（abc）。"}
        {step === 4 && "第四步：smatch 结果——下标 0 返回完整匹配字符串，大于 0 的下标返回对应捕获组。regex_iterator 可遍历所有匹配。"}
      </figcaption>
    </figure>
  );
}
