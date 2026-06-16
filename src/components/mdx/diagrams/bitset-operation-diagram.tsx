/**
 * <BitsetOperationDiagram>：bitset 位集合操作可视化。
 *
 * 展示 bitset<8> 上五种常用操作的视觉效果：
 *   set(pos)   —— 指定位置设为 1
 *   reset(pos) —— 指定位置清零
 *   flip(pos)  —— 指定位翻转（0→1 / 1→0）
 *   test(pos)  —— 检查指定位是 0 还是 1
 *   count()    —— 统计整个 bitset 中值为 1 的位数
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */
export function BitsetOperationDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";
  const red = "rgb(229,103,92)";

  const w = 880;
  const h = 520;
  const cx = w / 2;

  const bitW = 48;
  const bitH = 52;
  const bitGap = 6;
  const initBits = [1, 0, 1, 0, 0, 1, 1, 0]; // 初始位模式
  const bitLabels = ["7", "6", "5", "4", "3", "2", "1", "0"];

  const totalBitW = 8 * bitW + 7 * bitGap;
  const bitStartX = (w - totalBitW) / 2;
  const bitY = 60;

  const ops = [
    { label: "set(3)", desc: "设 1", color: good, pos: 3, result: [...initBits.slice(0, 4), 1, ...initBits.slice(5)] },
    { label: "reset(6)", desc: "清 0", color: red, pos: 6, result: [0, ...initBits.slice(1)] },
    { label: "flip(5)", desc: "翻转", color: warn, pos: 5, result: [...initBits.slice(0,3), 1, ...initBits.slice(3)] },
    { label: "test(0)", desc: "测试", color: accent, pos: 0, result: initBits },
    { label: "count()", desc: "计数", color: accent, pos: -1, result: initBits },
  ];

  const opsStartY = bitY + bitH + 40;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="bitset 位操作——set/reset/flip/test/count 五操作可视化"
          className="mx-auto block h-auto w-full max-w-[880px]"
        >
          <text x={cx} y="30" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            bitset 操作示意图——8 个二进制位的集合
          </text>

          <text x={cx} y="44" fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
            bitset&lt;8&gt; b(&quot;10100110&quot;);
          </text>

          {/* Initial bits display */}
          <rect x={bitStartX - 12} y={bitY - 12} width={totalBitW + 48} height={bitH + 26} rx="8" fill="var(--code-bg)" stroke={border} />

          <text x={bitStartX - 8} y={bitY + bitH / 2 + 4} fontSize="11" fill={secondary} textAnchor="start" fontFamily="monospace">
            b =
          </text>

          {initBits.map((bit, i) => {
            const x = bitStartX + i * (bitW + bitGap) + 24;
            return (
              <g key={`bit-${i}`}>
                <rect
                  x={x}
                  y={bitY}
                  width={bitW}
                  height={bitH}
                  rx="6"
                  fill={bit === 1 ? `${good}18` : "transparent"}
                  stroke={bit === 1 ? good : border}
                  strokeWidth={bit === 1 ? 2 : 1}
                />
                <text x={x + bitW / 2} y={bitY + 20} fontSize="14" fontWeight="700" fill={bit === 1 ? good : secondary} textAnchor="middle">
                  {bit}
                </text>
                <text x={x + bitW / 2} y={bitY + 38} fontSize="9" fill={secondary} textAnchor="middle">
                  位{bitLabels[i]}
                </text>
              </g>
            );
          })}

          {/* Operation rows */}
          {ops.map((op, oi) => {
            const rowY = opsStartY + oi * 64;

            return (
              <g key={`op-row-${oi}`}>
                {/* Separator */}
                <line x1={bitStartX - 12} y1={rowY - 4} x2={bitStartX + totalBitW + 12} y2={rowY - 4} stroke={border} strokeWidth={0.5} />

                {/* Operation label */}
                <rect
                  x={bitStartX - 12}
                  y={rowY + 4}
                  width="82"
                  height={48}
                  rx="6"
                  fill={`${op.color}12`}
                  stroke={op.color}
                  strokeWidth={1.5}
                />
                <text x={bitStartX + 28} y={rowY + 20} fontSize="12" fontWeight="700" fill={op.color} textAnchor="middle">
                  {op.label}
                </text>
                <text x={bitStartX + 28} y={rowY + 36} fontSize="9" fill={op.color} textAnchor="middle">
                  {op.desc}
                </text>

                {/* Arrow */}
                <line
                  x1={bitStartX + 76}
                  y1={rowY + 28}
                  x2={bitStartX + 108}
                  y2={rowY + 28}
                  stroke={op.color}
                  strokeWidth={1.5}
                  markerEnd={op.pos >= 0 ? `url(#arrow-${op.color.replace("#", "").replace("rgb", "").replace(/[()]/g, "")})` : "url(#arrowCount)"}
                />
                <defs>
                  <marker id="arrowCount" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0,0.5 6.5,3 0,5.5" fill={accent} />
                  </marker>
                </defs>

                {/* Result bits */}
                {op.result.map((bit, i) => {
                  const x = bitStartX + i * (bitW + bitGap) + 110;
                  const isTarget = i === op.pos;
                  const isCount = op.pos === -1;

                  return (
                    <g key={`res-${oi}-${i}`}>
                      <rect
                        x={x}
                        y={rowY + 4}
                        width={bitW}
                        height={48}
                        rx="6"
                        fill={isTarget ? `${op.color}20` : isCount && bit === 1 ? `${accent}10` : "transparent"}
                        stroke={isTarget ? op.color : isCount && bit === 1 ? accent : border}
                        strokeWidth={isTarget || (isCount && bit === 1) ? 2 : 1}
                      />
                      <text
                        x={x + bitW / 2}
                        y={rowY + 22}
                        fontSize="14"
                        fontWeight="700"
                        fill={isTarget ? op.color : isCount && bit === 1 ? accent : bit === 1 ? good : secondary}
                        textAnchor="middle"
                      >
                        {bit}
                      </text>
                      {isTarget && (
                        <text x={x + bitW / 2} y={rowY + 40} fontSize="8" fill={op.color} textAnchor="middle">
                          {op.desc}
                        </text>
                      )}
                      {isCount && bit === 1 && (
                        <text x={x + bitW / 2} y={rowY + 40} fontSize="8" fill={accent} textAnchor="middle">
                          ✓
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* count() result */}
                {op.pos === -1 && (
                  <text
                    x={bitStartX + totalBitW + 130}
                    y={rowY + 28}
                    fontSize="11"
                    fontWeight="700"
                    fill={accent}
                    textAnchor="start"
                    fontFamily="monospace"
                  >
                    = 4
                  </text>
                )}
              </g>
            );
          })}

          {/* Legend */}
          <g transform={`translate(${bitStartX - 12}, ${opsStartY + 5 * 64 + 8})`}>
            <rect x="0" y="0" width={totalBitW + 24} height="48" rx="6" fill={accent} fillOpacity="0.04" stroke={border} />
            <text x="16" y="18" fontSize="10" fill={secondary}>
              核心记忆：set=置1  reset=清0  flip=翻转  test=查值(不修改)  count=统计所有1的个数
            </text>
            <text x="16" y="34" fontSize="10" fill={secondary}>
              所有操作都发生在编译期——bitset 是模板，大小 N 必须是编译期常量，运行时零开销。
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        bitset 把二进制位当作独立对象来操作：set(3) 把第 3 位变成 1、reset(6) 把第 6 位清零、flip(5) 把第 5 位翻转、
        test(0) 检查第 0 位是 0 还是 1（不修改）、count() 统计所有 1 的总数。所有操作在编译期确定——零运行时开销。
      </figcaption>
    </figure>
  );
}
