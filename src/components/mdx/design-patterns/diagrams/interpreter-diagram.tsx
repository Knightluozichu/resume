/**
 * <InterpreterDiagram>：解释器模式文法树图（design-patterns 课程）。
 *
 *   - 左侧：Expression 接口（虚线边框），声明 interpret(context)
 *   - 右侧：示例表达式树 AND(OR(A, B), C)
 *       - 非终结符 AND / OR（warning 色，持有左右子表达式）
 *       - 终结符 A / B / C（success 色，叶子）
 *   - 虚线空心三角箭头：树节点 «implements» Expression
 *   - 节点类型用颜色区分，底部图例说明
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×420（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层
 * （标题 / 接口+文法树 / 图例+总结）。间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 420;

// Expression 接口框（左侧）
const EXPRESSION = { x: 40, y: 84, w: 196, h: 96 };
const EXPRESSION_CX = EXPRESSION.x + EXPRESSION.w / 2; // 138

// 文法树节点（统一尺寸；颜色区分终结 / 非终结符）
const NODE_W = 64;
const NODE_H = 44;
// 各节点中心坐标 + 类型
const NODES = {
  AND: { cx: 478, cy: 106, type: "non" }, // 非终结符（根）
  OR: { cx: 360, cy: 190, type: "non" }, // 非终结符
  C: { cx: 596, cy: 190, type: "term" }, // 终结符
  A: { cx: 300, cy: 278, type: "term" }, // 终结符
  B: { cx: 420, cy: 278, type: "term" }, // 终结符
} as const;
// 树边：parent 底部中心 → child 顶部中心
const EDGES: ReadonlyArray<readonly [keyof typeof NODES, keyof typeof NODES]> =
  [
    ["AND", "OR"],
    ["AND", "C"],
    ["OR", "A"],
    ["OR", "B"],
  ];

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";
const warning = "var(--warning)";

export function InterpreterDiagram() {
  const nodeColor = (t: "non" | "term") => (t === "non" ? warning : success);

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="解释器模式文法树图。左侧 Expression 接口（虚线边框）声明 interpret 方法。右侧画一棵示例表达式树：根节点 AND（非终结符，黄色）的左子是 OR（非终结符），右子是 C（终结符，绿色）；OR 的左右子分别是 A 和 B（均为终结符）。一条虚线空心三角箭头从树指向 Expression 表示树节点实现该接口。底部图例说明黄色为 NonTerminalExpression、绿色为 TerminalExpression。底部说明：解释器——用文法树解释语言，适合简单的 DSL。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 实现关系：空心三角箭头（指向接口） */}
            <marker
              id="interp-impl-arrow"
              markerWidth="12"
              markerHeight="12"
              refX="11"
              refY="6"
              orient="auto"
            >
              <path
                d="M1 1 L11 6 L1 11 z"
                fill={elevated}
                stroke={accent}
                strokeWidth="1"
              />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            解释器模式 · 文法树
          </text>

          {/* ===== Expression 接口框 ===== */}
          <g>
            <rect
              x={EXPRESSION.x}
              y={EXPRESSION.y}
              width={EXPRESSION.w}
              height={EXPRESSION.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <text
              x={EXPRESSION_CX}
              y={EXPRESSION.y + 18}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «interface»
            </text>
            <text
              x={EXPRESSION_CX}
              y={EXPRESSION.y + 36}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Expression
            </text>
            <line
              x1={EXPRESSION.x}
              y1={EXPRESSION.y + 46}
              x2={EXPRESSION.x + EXPRESSION.w}
              y2={EXPRESSION.y + 46}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={EXPRESSION.x + 14}
              y={EXPRESSION.y + 66}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + interpret(ctx)
            </text>
            <text
              x={EXPRESSION.x + 14}
              y={EXPRESSION.y + 84}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              {"// 统一解释入口"}
            </text>
          </g>

          {/* ===== 示例表达式标注 ===== */}
          <text
            x={478}
            y="68"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={secondary}
            fontFamily="monospace"
          >
            示例：AND(OR(A, B), C)
          </text>

          {/* ===== 实现箭头：树（AND）→ Expression ===== */}
          <line
            x1={NODES.AND.cx - NODE_W / 2}
            y1={NODES.AND.cy}
            x2={EXPRESSION.x + EXPRESSION.w + 2}
            y2={NODES.AND.cy + 12}
            stroke={accent}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#interp-impl-arrow)"
          />
          <text
            x={(EXPRESSION.x + EXPRESSION.w + NODES.AND.cx - NODE_W / 2) / 2}
            y={NODES.AND.cy - 4}
            textAnchor="middle"
            fontSize="11"
            fontStyle="italic"
            fill={secondary}
          >
            «implements»
          </text>

          {/* ===== 树边（先画，置于节点下方） ===== */}
          {EDGES.map(([p, c], i) => {
            const pn = NODES[p];
            const cn = NODES[c];
            return (
              <line
                key={`edge-${i}`}
                x1={pn.cx}
                y1={pn.cy + NODE_H / 2}
                x2={cn.cx}
                y2={cn.cy - NODE_H / 2}
                stroke={border}
                strokeWidth="1.6"
              />
            );
          })}

          {/* ===== 树节点 ===== */}
          {(Object.keys(NODES) as ReadonlyArray<keyof typeof NODES>).map(
            (k) => {
              const n = NODES[k];
              const color = nodeColor(n.type);
              return (
                <g key={`node-${k}`}>
                  <rect
                    x={n.cx - NODE_W / 2}
                    y={n.cy - NODE_H / 2}
                    width={NODE_W}
                    height={NODE_H}
                    rx="10"
                    fill={color}
                    fillOpacity="0.14"
                    stroke={color}
                    strokeWidth="1.8"
                  />
                  <text
                    x={n.cx}
                    y={n.cy + 5}
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    fill={color}
                    fontFamily="monospace"
                  >
                    {k}
                  </text>
                </g>
              );
            },
          )}

          {/* ===== 图例 ===== */}
          {/* 非终结符 */}
          <rect
            x="80"
            y="328"
            width="20"
            height="14"
            rx="3"
            fill={warning}
            fillOpacity="0.14"
            stroke={warning}
            strokeWidth="1.6"
          />
          <text x="110" y="340" fontSize="11" fill={primary}>
            NonTerminalExpression（AND / OR，持有左右子表达式）
          </text>

          {/* 终结符 */}
          <rect
            x="80"
            y="352"
            width="20"
            height="14"
            rx="3"
            fill={success}
            fillOpacity="0.14"
            stroke={success}
            strokeWidth="1.6"
          />
          <text x="110" y="364" fontSize="11" fill={primary}>
            TerminalExpression（A / B / C，叶子——解释时返回字面值）
          </text>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="396"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            解释器：用文法树解释语言——适合简单的 DSL
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        每个节点都是一个 Expression，非终结符的 interpret 递归调用子节点的
        interpret 再组合结果，终结符直接返回字面值。给一种文法规则加一种
        NonTerminal
        子类即可扩展语言——但文法一旦复杂，类数量会爆炸，因此只适合简单 DSL。
      </figcaption>
    </figure>
  );
}
