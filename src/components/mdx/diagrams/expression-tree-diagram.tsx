/**
 * <ExpressionTreeDiagram>：表达式树的树状可视化。
 *
 * 展示 a + b * c 的表达式树，标出运算符节点和操作数叶子，
 * 用箭头指示求值方向（先算深层 b*c、再算 a+结果）。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

export function ExpressionTreeDiagram() {
  // 节点坐标中心
  const cx = 280;
  // 根：+（在顶部）
  const rootY = 52;
  // 左子：a（在 + 的左下）
  const leftX = 140;
  const leftY = 160;
  // 右子：*（在 + 的右下）
  const rightX = 420;
  const rightY = 160;
  // * 的左子：b
  const starLeftX = 340;
  const starLeftY = 268;
  // * 的右子：c
  const starRightX = 500;
  const starRightY = 268;

  // 评估顺序标注位置
  const evalOrder = [
    { label: "① b × c", x: 480, y: 230, lineX: 420, lineY: 160 },
    { label: "② a + 结果", x: 250, y: 50, lineX: 280, lineY: 52 },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 620 360"
          role="img"
          aria-label="表达式 a + b * c 的语法树，展示运算符优先级决定求值顺序"
          className="mx-auto block h-auto w-full max-w-[620px]"
        >
          {/* ---- 连线（箭头）：从父节点指向子节点 ---- */}

          {/* + → a（左侧） */}
          <line
            x1={cx - 28} y1={rootY + 24} x2={leftX + 28} y2={leftY - 24}
            stroke="var(--border)" strokeWidth="2"
          />
          <polygon
            points={`${leftX + 20},${leftY - 28} ${leftX + 36},${leftY - 28} ${leftX + 28},${leftY - 16}`}
            fill="var(--border)"
          />

          {/* + → *（右侧） */}
          <line
            x1={cx + 28} y1={rootY + 24} x2={rightX - 28} y2={rightY - 24}
            stroke="var(--accent)" strokeWidth="2"
          />
          <polygon
            points={`${rightX - 20},${rightY - 28} ${rightX - 36},${rightY - 28} ${rightX - 28},${rightY - 16}`}
            fill="var(--accent)"
          />

          {/* * → b（左侧） */}
          <line
            x1={rightX - 28} y1={rightY + 24} x2={starLeftX + 16} y2={starLeftY - 24}
            stroke="var(--border)" strokeWidth="2"
          />
          <polygon
            points={`${starLeftX + 8},${starLeftY - 28} ${starLeftX + 24},${starLeftY - 28} ${starLeftX + 16},${starLeftY - 16}`}
            fill="var(--border)"
          />

          {/* * → c（右侧） */}
          <line
            x1={rightX + 28} y1={rightY + 24} x2={starRightX - 16} y2={starRightY - 24}
            stroke="var(--border)" strokeWidth="2"
          />
          <polygon
            points={`${starRightX - 24},${starRightY - 28} ${starRightX - 8},${starRightY - 28} ${starRightX - 16},${starRightY - 16}`}
            fill="var(--border)"
          />

          {/* ---- 节点圆 ---- */}

          {/* 根：+ */}
          <circle cx={cx} cy={rootY} r="28" fill="var(--accent)" opacity="0.18" stroke="var(--accent)" strokeWidth="2" />
          <text x={cx} y={rootY + 7} textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--accent)" fontFamily="monospace">+</text>

          {/* 左子：a */}
          <circle cx={leftX} cy={leftY} r="28" fill="var(--bg)" stroke="var(--border)" strokeWidth="2" />
          <text x={leftX} y={leftY + 7} textAnchor="middle" fontSize="20" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">a</text>

          {/* 右子：* */}
          <circle cx={rightX} cy={rightY} r="28" fill="var(--accent)" opacity="0.18" stroke="var(--accent)" strokeWidth="2" />
          <text x={rightX} y={rightY + 7} textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--accent)" fontFamily="monospace">×</text>

          {/* * 的左子：b */}
          <circle cx={starLeftX} cy={starLeftY} r="24" fill="var(--bg)" stroke="var(--border)" strokeWidth="2" />
          <text x={starLeftX} y={starLeftY + 7} textAnchor="middle" fontSize="18" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">b</text>

          {/* * 的右子：c */}
          <circle cx={starRightX} cy={starRightY} r="24" fill="var(--bg)" stroke="var(--border)" strokeWidth="2" />
          <text x={starRightX} y={starRightY + 7} textAnchor="middle" fontSize="18" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">c</text>

          {/* ---- 求值顺序标注 ---- */}

          {/* ①：先算 b*c（高优先级） */}
          <rect x={424} y={200} width="108" height="28" rx="6" fill="var(--accent)" opacity="0.12" />
          <text x={478} y={219} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            ① 先算 b×c
          </text>

          {/* ②：再算 a + b*c */}
          <rect x={214} y={12} width="112" height="28" rx="6" fill="var(--accent)" opacity="0.12" />
          <text x={270} y={31} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            ② 再算 a + ___
          </text>

          {/* ---- 底部图示 ---- */}
          <text x={cx} y={320} textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            表达式树：叶子 = 操作数，内部节点 = 运算符。越深层先算。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        表达式树直观展示运算符优先级：乘法 `*` 在更深的层次，先于加法 `+` 求值。
      </figcaption>
    </figure>
  );
}
