/**
 * <IteratorDiagram>：vector 元素 + begin()/end() 迭代器位置示意图。
 *
 * 展示一个包含 4 个元素的 vector，begin() 指向首元素，end() 指向尾后位置。
 * 箭头标注 begin 和 end 的指向关系。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary / --text-secondary）。
 */
export function IteratorDiagram() {
  const token = {
    accent: "var(--accent)",
    border: "var(--border)",
    bg: "var(--bg)",
    bgElevated: "var(--bg-elevated)",
    textPrimary: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
  };

  const elements = ["10", "42", "99", "7"];
  const cellSize = 56;
  const gap = 8;
  const startX = 80;
  const startY = 160;
  const svgW = 640;
  const svgH = 360;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          role="img"
          aria-label="迭代器 begin() 和 end() 与 vector 元素的关系示意"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 标题 */}
          <text x={svgW / 2} y="36" fontSize="15" fontWeight="700" fill={token.textPrimary} textAnchor="middle" fontFamily="monospace">
            vector&lt;int&gt; v = &#123;10, 42, 99, 7&#125;;
          </text>

          {/* 元素格子区域背景 */}
          <rect
            x={startX - 8}
            y={startY - 8}
            width={elements.length * (cellSize + gap) - gap + 16}
            height={cellSize + 16}
            rx="8"
            fill={token.bgElevated}
            stroke={token.border}
          />

          {/* 元素格子 */}
          {elements.map((el, i) => {
            const cx = startX + i * (cellSize + gap);
            return (
              <g key={i}>
                <rect
                  x={cx}
                  y={startY}
                  width={cellSize}
                  height={cellSize}
                  rx="6"
                  fill={token.accent}
                  fillOpacity="0.15"
                  stroke={token.accent}
                />
                <text
                  x={cx + cellSize / 2}
                  y={startY + cellSize / 2 + 4}
                  fontSize="16"
                  fontWeight="700"
                  fill={token.textPrimary}
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {el}
                </text>
                <text
                  x={cx + cellSize / 2}
                  y={startY + cellSize + 18}
                  fontSize="10"
                  fill={token.textSecondary}
                  textAnchor="middle"
                >
                  [v[{i}]]
                </text>
              </g>
            );
          })}

          {/* ===== begin() 箭头 ===== */}
          {/* 从下方指向首元素 */}
          <line
            x1={startX + cellSize / 2}
            y1={startY + cellSize + 46}
            x2={startX + cellSize / 2}
            y2={startY + cellSize + 10}
            stroke={token.accent}
            strokeWidth="2"
            markerEnd="url(#arrowHead)"
          />

          <text
            x={startX + cellSize / 2}
            y={startY + cellSize + 64}
            fontSize="13"
            fontWeight="600"
            fill={token.accent}
            textAnchor="middle"
            fontFamily="monospace"
          >
            v.begin()
          </text>
          <text
            x={startX + cellSize / 2}
            y={startY + cellSize + 82}
            fontSize="10"
            fill={token.textSecondary}
            textAnchor="middle"
          >
            指向第一个元素
          </text>

          {/* ===== end() 箭头 ===== */}
          {/* 从下方指向尾后位置 */}
          <line
            x1={startX + elements.length * (cellSize + gap) - gap / 2}
            y1={startY + cellSize + 46}
            x2={startX + elements.length * (cellSize + gap) - gap / 2}
            y2={startY + cellSize + 10}
            stroke="rgb(229,181,103)"
            strokeWidth="2"
            markerEnd="url(#arrowHeadYellow)"
          />

          <text
            x={startX + elements.length * (cellSize + gap) - gap / 2}
            y={startY + cellSize + 64}
            fontSize="13"
            fontWeight="600"
            fill="rgb(229,181,103)"
            textAnchor="middle"
            fontFamily="monospace"
          >
            v.end()
          </text>
          <text
            x={startX + elements.length * (cellSize + gap) - gap / 2}
            y={startY + cellSize + 82}
            fontSize="10"
            fill={token.textSecondary}
            textAnchor="middle"
          >
            指向尾后（不是最后一个元素！）
          </text>

          {/* 尾后位置标记 - 虚线 */}
          <rect
            x={startX + elements.length * (cellSize + gap)}
            y={startY}
            width={cellSize * 0.6}
            height={cellSize}
            rx="4"
            fill="none"
            stroke="rgb(229,181,103)"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* 说明区 */}
          <text x={svgW / 2} y={svgH - 36} fontSize="11" fill={token.textSecondary} textAnchor="middle">
            end() 不指向任何元素——它标记容器末尾边界，遍历时遇到 end() 就停下
          </text>

          <defs>
            <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill={token.accent} />
            </marker>
            <marker id="arrowHeadYellow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="rgb(229,181,103)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        迭代器像一根「指向容器元素的指针」：begin() 指向第一个元素，end() 指向最后一个元素**之后**的位置（哨兵，不存数据）。遍历时只要迭代器不等于 end()，就说明还有元素。
      </figcaption>
    </figure>
  );
}
