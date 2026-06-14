/**
 * <AlgorithmExecutionDiagram>：算法在容器上逐元素执行过程可视化。
 *
 * 支持 `step` prop（1-6）展示不同算法的逐步执行：
 *   1: 初始状态——vector [3,7,1,9,2,7,4,8]，目标值 7
 *   2: find 第 1 步——检查 v[0]=3，3≠7，继续
 *   3: find 第 2 步——检查 v[1]=7，7==7，找到！返回迭代器指向 v[1]
 *   4: std::count——遍历数组，计数值 7 出现次数=2
 *   5: std::fill——把 [begin, begin+4) 区间全部写成 0
 *   6: std::transform——src [1,2,3,4] ×2 → dst [2,4,6,8]
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 */
export function AlgorithmExecutionDiagram({ step = 1 }: { step?: number }) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  const w = 760;
  const h = 380;

  const stepMeta: Record<number, { title: string; algorithm: string }> = {
    1: { title: "初始数组", algorithm: "std::find(v, 7)" },
    2: { title: "find 第 1 步：检查 3 → 不匹配，继续", algorithm: "std::find(v.begin(), v.end(), 7)" },
    3: { title: "find 第 2 步：检查 7 → 找到！", algorithm: "std::find(v.begin(), v.end(), 7)" },
    4: { title: "std::count：统计 7 出现次数 = 2", algorithm: "std::count(v.begin(), v.end(), 7)" },
    5: { title: "std::fill：区间填充为 0", algorithm: "std::fill(v.begin(), v.begin()+4, 0)" },
    6: { title: "std::transform：每个元素 ×2", algorithm: "transform(src.begin(), src.end(), dst.begin(), [](int x){return x*2;})" },
  };

  const meta = stepMeta[step];
  const cellW = 50;
  const cellH = 44;
  const gap = 4;
  const data = [3, 7, 1, 9, 2, 7, 4, 8];
  const n = data.length;
  const totalW = n * (cellW + gap) - gap;
  const startX = (w - totalW) / 2;
  const startY = 100;
  const target = 7;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={`算法执行过程第 ${step} 步：${meta.title}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <text x={w / 2} y="24" fontSize="13" fontWeight="700" fill={primary} textAnchor="middle">
            {meta.title}
          </text>
          <text x={w / 2} y="44" fontSize="11" fill={secondary} textAnchor="middle" fontFamily="monospace">
            算法：{meta.algorithm}
          </text>

          {/* find/count/fill 共用单行数组 */}
          {step <= 5 && (
            <>
              {data.map((_, i) => (
                <text
                  key={`idx-${i}`}
                  x={startX + i * (cellW + gap) + cellW / 2}
                  y={startY - 12}
                  fontSize="9"
                  fill={secondary}
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  [{i}]
                </text>
              ))}

              {data.map((val, i) => {
                let cellFill = accent;
                let cOpacity = 0.15;
                let cellStroke = accent;
                let isMatch = step === 4 && val === target;
                let isFound = step === 3 && i === 1;
                let isChecked = step === 2 && i < 1;
                let isCurrent = step === 2 && i === 1;
                let isFilled = step === 5 && i < 4;

                if (isMatch) { cellFill = good; cOpacity = 0.2; cellStroke = good; }
                if (isFound) { cellFill = good; cOpacity = 0.3; cellStroke = good; }
                if (isChecked) { cOpacity = 0.06; }
                if (isFilled) { cellFill = warn; cOpacity = 0.2; cellStroke = warn; }

                const textColor = isFound ? good : (isMatch ? good : (isFilled ? warn : accent));
                const displayVal = isFilled ? 0 : val;

                return (
                  <g key={`elem-${i}`}>
                    <rect
                      x={startX + i * (cellW + gap)}
                      y={startY}
                      width={cellW}
                      height={cellH}
                      rx="6"
                      fill={cellFill}
                      fillOpacity={cOpacity}
                      stroke={cellStroke}
                      strokeWidth={isFound ? "2.5" : "1"}
                    />
                    <text
                      x={startX + i * (cellW + gap) + cellW / 2}
                      y={startY + cellH / 2 + 5}
                      fontSize="16"
                      fontWeight={isFound ? "700" : "500"}
                      fill={textColor}
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {displayVal}
                    </text>
                    {/* 当前迭代器指针 */}
                    {isCurrent && (
                      <>
                        <polygon
                          points={`${startX + i * (cellW + gap) + cellW / 2},${startY + cellH + 6} ${startX + i * (cellW + gap) + cellW / 2 - 6},${startY + cellH + 20} ${startX + i * (cellW + gap) + cellW / 2 + 6},${startY + cellH + 20}`}
                          fill={accent}
                        />
                        <text
                          x={startX + i * (cellW + gap) + cellW / 2}
                          y={startY + cellH + 36}
                          fontSize="10"
                          fill={accent}
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          iter
                        </text>
                      </>
                    )}
                    {isFound && (
                      <text
                        x={startX + i * (cellW + gap) + cellW / 2}
                        y={startY + cellH + 28}
                        fontSize="12"
                        fill={good}
                        textAnchor="middle"
                      >
                        ✓找到
                      </text>
                    )}
                    {(isChecked || isFound) && step <= 3 && !isCurrent && !isFound && (
                      <text
                        x={startX + i * (cellW + gap) + cellW / 2}
                        y={startY + cellH + 20}
                        fontSize="8"
                        fill={secondary}
                        textAnchor="middle"
                      >
                        已检查≠
                      </text>
                    )}
                  </g>
                );
              })}

              {/* fill 的区间标记 */}
              {step === 5 && (
                <rect
                  x={startX - 6}
                  y={startY - 6}
                  width={4 * (cellW + gap)}
                  height={cellH + 12}
                  rx="10"
                  fill="none"
                  stroke={warn}
                  strokeWidth="2"
                  strokeDasharray="6 3"
                />
              )}
            </>
          )}

          {/* count 结果 */}
          {step === 4 && (
            <g>
              <rect x={startX + totalW / 2 - 70} y={startY + cellH + 40} width="140" height="32" rx="8" fill={good} opacity="0.08" stroke={good} />
              <text x={startX + totalW / 2} y={startY + cellH + 62} fontSize="14" fontWeight="700" fill={good} textAnchor="middle">
                count = 2
              </text>
            </g>
          )}

          {/* transform 双行 */}
          {step === 6 && (
            <>
              <text x={startX - 56} y={startY + cellH / 2 + 4} fontSize="11" fontWeight="600" fill={secondary} textAnchor="end" fontFamily="monospace">
                src:
              </text>
              {[1, 2, 3, 4].map((val, i) => (
                <g key={`src-${i}`}>
                  <rect
                    x={startX + i * (cellW + gap)}
                    y={startY}
                    width={cellW}
                    height={cellH}
                    rx="6"
                    fill={accent}
                    fillOpacity="0.12"
                    stroke={accent}
                  />
                  <text
                    x={startX + i * (cellW + gap) + cellW / 2}
                    y={startY + cellH / 2 + 5}
                    fontSize="16"
                    fill={accent}
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {val}
                  </text>
                </g>
              ))}
              {/* 向下箭头 + ×2 */}
              {[0, 1, 2, 3].map((i) => (
                <g key={`down-${i}`}>
                  <line
                    x1={startX + i * (cellW + gap) + cellW / 2}
                    y1={startY + cellH + 4}
                    x2={startX + i * (cellW + gap) + cellW / 2}
                    y2={startY + cellH + 56}
                    stroke={accent}
                    strokeWidth="1.5"
                    markerEnd="url(#arrDownS)"
                  />
                </g>
              ))}
              {/* dst 行 */}
              <text x={startX - 56} y={startY + cellH + 80 + cellH / 2 + 4} fontSize="11" fontWeight="600" fill={good} textAnchor="end" fontFamily="monospace">
                dst:
              </text>
              {[2, 4, 6, 8].map((val, i) => (
                <g key={`dst-${i}`}>
                  <rect
                    x={startX + i * (cellW + gap)}
                    y={startY + cellH + 80}
                    width={cellW}
                    height={cellH}
                    rx="6"
                    fill={good}
                    fillOpacity="0.12"
                    stroke={good}
                  />
                  <text
                    x={startX + i * (cellW + gap) + cellW / 2}
                    y={startY + cellH + 80 + cellH / 2 + 5}
                    fontSize="16"
                    fontWeight="600"
                    fill={good}
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {val}
                  </text>
                </g>
              ))}
            </>
          )}

          {/* 底部说明 */}
          <text x={w / 2} y={h - 20} fontSize="10" fill={secondary} textAnchor="middle">
            {step <= 3
              ? "find 算法：遍历 [begin, end)，逐个比对元素值与目标值，找到即返回迭代器，未找到返回 end()"
              : step === 4
                ? "count 算法：遍历整个范围，累计与目标值相等的元素个数。count(v.begin(), v.end(), 7) → 2"
                : step === 5
                  ? "fill 算法：把指定区间 [begin, begin+4) 的每个元素都写入给定值 0"
                  : "transform 算法：对 src 的每个元素调用函数对象 → 写入 dst 对应位置。第三个参数是输出迭代器 dst.begin()"}
          </text>

          <defs>
            <marker id="arrDownS" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
              <polygon points="1,0 3,5 5,0" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        泛型算法在容器元素上逐步执行的过程。算法通过迭代器遍历范围 [begin, end)，不感知底层容器的具体类型——vector、list、deque 均可用同一算法操作。
      </figcaption>
    </figure>
  );
}
