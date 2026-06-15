/**
 * <AdapterConceptDiagram>：stack / queue / priority_queue 底层容器适配关系图。
 *
 * 展示三个容器适配器如何把底层顺序容器包装成不同的逻辑结构：
 *   - stack（栈）：默认 deque，只暴露 top / push / pop（LIFO）
 *   - queue（队列）：默认 deque，只暴露 front / back / push / pop（FIFO）
 *   - priority_queue（优先队列）：默认 vector，只暴露 top / push / pop（最大/小优先）
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 *
 * 布局：每个适配器盒按「名称 → 暴露接口列表 → 结构示意图 → 数据流规则 → 默认底层」
 * 五段从上到下纵向排开，各段不重叠；结构示意图放在接口列表下方的独立条带里。
 */
export function AdapterConceptDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const warn = "rgb(229,181,103)";
  const good = "rgb(63,185,127)";

  const w = 900;
  const h = 530;

  // 底层容器
  const bottomY = 400;
  const bottomBoxes = [
    { name: "deque", x: 140, w: 180, desc: "默认底层" },
    { name: "vector", x: 360, w: 180, desc: "备选底层" },
    { name: "list", x: 580, w: 180, desc: "备选底层" },
  ];

  // 三个适配器
  const adapters = [
    {
      name: "stack",
      x: 140,
      y: 60,
      w: 180,
      bottom: "deque",
      ops: ["top()", "push()", "pop()"],
      default: "deque",
      others: "vector / list",
      rule: "LIFO（后进先出）",
    },
    {
      name: "queue",
      x: 360,
      y: 60,
      w: 180,
      bottom: "deque",
      ops: ["front()", "back()", "push()", "pop()"],
      default: "deque",
      others: "list",
      rule: "FIFO（先进先出）",
    },
    {
      name: "priority_queue",
      x: 585,
      y: 60,
      w: 190,
      bottom: "vector",
      ops: ["top()", "push()", "pop()"],
      default: "vector",
      others: "deque",
      rule: "堆序（最大/小优先）",
    },
  ];

  const boxH = 268;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="容器适配器关系图：stack/queue/priority_queue 默认底层容器及可选容器的对应关系"
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          {/* 标题 */}
          <text x={w / 2} y="24" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            容器适配器 = 底层容器 + 受限接口
          </text>

          {/* 三个适配器 */}
          {adapters.map((adp) => {
            const centerX = adp.x + adp.w / 2;
            return (
              <g key={adp.name}>
                {/* 适配器盒子 */}
                <rect
                  x={adp.x}
                  y={adp.y}
                  width={adp.w}
                  height={boxH}
                  rx="10"
                  fill={accent}
                  opacity="0.06"
                  stroke={accent}
                  strokeWidth="2"
                />

                {/* 适配器名称 */}
                <text x={centerX} y={adp.y + 24} fontSize="15" fontWeight="700" fill={accent} textAnchor="middle" fontFamily="monospace">
                  {adp.name}
                </text>

                {/* 操作接口 */}
                <text x={centerX} y={adp.y + 42} fontSize="10" fill={secondary} textAnchor="middle">
                  暴露接口：
                </text>
                {adp.ops.map((op, oi) => (
                  <text
                    key={op}
                    x={centerX}
                    y={adp.y + 58 + oi * 15}
                    fontSize="11"
                    fill={good}
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {op}
                  </text>
                ))}

                {/* 数据流规则 */}
                <rect
                  x={adp.x + 10}
                  y={adp.y + boxH - 54}
                  width={adp.w - 20}
                  height="22"
                  rx="6"
                  fill={warn}
                  opacity="0.1"
                />
                <text
                  x={centerX}
                  y={adp.y + boxH - 39}
                  fontSize="10"
                  fontWeight="600"
                  fill={warn}
                  textAnchor="middle"
                >
                  {adp.rule}
                </text>

                {/* 默认标记 */}
                <text
                  x={centerX}
                  y={adp.y + boxH - 14}
                  fontSize="9"
                  fill={secondary}
                  textAnchor="middle"
                >
                  默认底层：{adp.default}  备选：{adp.others}
                </text>
              </g>
            );
          })}

          {/* 底层容器 */}
          <rect x="24" y={bottomY - 10} width={w - 48} height="120" rx="10" fill={border} opacity="0.15" />
          <text x={w / 2} y={bottomY + 12} fontSize="12" fontWeight="700" fill={primary} textAnchor="middle">
            底层顺序容器（提供实际存储与操作）
          </text>

          {bottomBoxes.map((box) => {
            const centerX = box.x + box.w / 2;
            return (
              <g key={box.name}>
                <rect
                  x={box.x}
                  y={bottomY + 28}
                  width={box.w}
                  height="72"
                  rx="8"
                  fill={bg}
                  stroke={border}
                  strokeWidth="1.5"
                />
                <text x={centerX} y={bottomY + 52} fontSize="14" fontWeight="700" fill={primary} textAnchor="middle" fontFamily="monospace">
                  {box.name}
                </text>
                <text x={centerX} y={bottomY + 77} fontSize="10" fill={secondary} textAnchor="middle">
                  {box.desc}
                </text>
              </g>
            );
          })}

          {/* 连接线：stack → deque */}
          <line x1="230" y1={adapters[0].y + boxH} x2="230" y2={bottomY + 28} stroke={accent} strokeWidth="2" markerEnd="url(#arrBig)" />
          <text x="240" y={bottomY - 40} fontSize="9" fill={secondary} fontFamily="monospace">
            ≈ deque 只暴露
          </text>
          <text x="240" y={bottomY - 20} fontSize="9" fill={secondary} fontFamily="monospace">
            push_back + pop_back
          </text>

          {/* 连接线：queue → deque */}
          <line x1="450" y1={adapters[1].y + boxH} x2="230" y2={bottomY + 28} stroke={accent} strokeWidth="2" markerEnd="url(#arrBig)" strokeDasharray="6 3" opacity="0.6" />
          <text x="312" y={bottomY - 6} fontSize="9" fill={secondary} fontFamily="monospace">
            ≈ deque 只暴露 push_back + pop_front
          </text>

          {/* 连接线：priority_queue → vector */}
          <line x1="680" y1={adapters[2].y + boxH} x2="470" y2={bottomY + 28} stroke={accent} strokeWidth="2" markerEnd="url(#arrBig)" />
          <text x="540" y={bottomY - 24} fontSize="9" fill={secondary} fontFamily="monospace">
            ≈ vector 内部维护堆
          </text>

          {/* 结构示意：stack（垂直） */}
          <g transform={`translate(190, ${adapters[0].y + 116})`}>
            <rect x="0" y="32" width="50" height="12" rx="2" fill={accent} opacity="0.2" stroke={accent} />
            <text x="25" y="41" fontSize="7" fill={accent} textAnchor="middle" fontFamily="monospace">3</text>
            <rect x="0" y="16" width="50" height="12" rx="2" fill={accent} opacity="0.15" stroke={accent} />
            <text x="25" y="25" fontSize="7" fill={accent} textAnchor="middle" fontFamily="monospace">2</text>
            <rect x="0" y="0" width="50" height="12" rx="2" fill={accent} opacity="0.1" stroke={accent} />
            <text x="25" y="9" fontSize="7" fill={accent} textAnchor="middle" fontFamily="monospace">1</text>
            <line x1="62" y1="6" x2="62" y2="38" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrTop)" />
            <text x="78" y="26" fontSize="7" fill={secondary} textAnchor="middle">top</text>
          </g>

          {/* 结构示意：queue（水平） */}
          <g transform={`translate(${adapters[1].x + 24}, ${adapters[1].y + 124})`}>
            <rect x="60" y="4" width="22" height="14" rx="2" fill={accent} opacity="0.2" stroke={accent} />
            <text x="71" y="14" fontSize="7" fill={accent} textAnchor="middle" fontFamily="monospace">3</text>
            <rect x="34" y="4" width="22" height="14" rx="2" fill={accent} opacity="0.15" stroke={accent} />
            <text x="45" y="14" fontSize="7" fill={accent} textAnchor="middle" fontFamily="monospace">2</text>
            <rect x="8" y="4" width="22" height="14" rx="2" fill={accent} opacity="0.1" stroke={accent} />
            <text x="19" y="14" fontSize="7" fill={accent} textAnchor="middle" fontFamily="monospace">1</text>
            <line x1="8" y1="11" x2="-2" y2="11" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrLeft)" />
            <text x="-4" y="30" fontSize="7" fill={secondary} textAnchor="middle">front</text>
            <line x1="82" y1="11" x2="92" y2="11" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrRight)" />
            <text x="92" y="30" fontSize="7" fill={secondary} textAnchor="middle">back</text>
          </g>

          {/* 结构示意：priority_queue（堆） */}
          <g transform={`translate(${adapters[2].x + 14}, ${adapters[2].y + 116})`}>
            <text x="80" y="4" fontSize="7" fill={secondary} textAnchor="middle">max ▼</text>
            <rect x="70" y="14" width="20" height="14" rx="2" fill={accent} opacity="0.25" stroke={accent} />
            <text x="80" y="24" fontSize="7" fill={accent} textAnchor="middle" fontFamily="monospace">9</text>
            <line x1="72" y1="28" x2="56" y2="48" stroke={accent} opacity="0.5" strokeWidth="1" />
            <line x1="88" y1="28" x2="104" y2="48" stroke={accent} opacity="0.5" strokeWidth="1" />
            <rect x="48" y="48" width="18" height="14" rx="2" fill={accent} opacity="0.15" stroke={accent} />
            <text x="57" y="58" fontSize="7" fill={accent} textAnchor="middle" fontFamily="monospace">7</text>
            <rect x="96" y="48" width="18" height="14" rx="2" fill={accent} opacity="0.1" stroke={accent} />
            <text x="105" y="58" fontSize="7" fill={accent} textAnchor="middle" fontFamily="monospace">5</text>
          </g>

          <defs>
            <marker id="arrBig" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <polygon points="0,1 7,4 0,7" fill={accent} />
            </marker>
            <marker id="arrTop" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <polygon points="1,5 3,1 5,5" fill={accent} />
            </marker>
            <marker id="arrLeft" markerWidth="6" markerHeight="6" refX="5" refY="3">
              <polygon points="5,1 1,3 5,5" fill={accent} />
            </marker>
            <marker id="arrRight" markerWidth="6" markerHeight="6" refX="1" refY="3">
              <polygon points="1,1 5,3 1,5" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        容器适配器不提供自己的存储——它们通过限制底层顺序容器的操作接口来定义行为。stack 默认用 deque（只暴露一端操作），queue 默认用 deque（只暴露两端——一端进一端出），priority_queue 默认用 vector（内部维护大顶堆）。
      </figcaption>
    </figure>
  );
}
