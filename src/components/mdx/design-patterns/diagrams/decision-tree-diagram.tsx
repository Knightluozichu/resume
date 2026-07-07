/**
 * <DecisionTreeDiagram>：GoF 23 模式选型决策树（design-patterns 课程）。
 *
 * 从「问题类型」开始的三路分支：
 *   - 创建对象 → 创建型（5 个模式：单例 / 工厂方法 / 抽象工厂 / 建造者 / 原型）
 *   - 组合类与对象 → 结构型（7 个模式：适配器 / 桥接 / 组合 / 装饰器 / 外观 / 享元 / 代理）
 *   - 对象间通信 → 行为型（11 个模式：责任链 / 命令 / 解释器 / 迭代器 / 中介者 /
 *     备忘录 / 观察者 / 状态 / 策略 / 模板方法 / 访问者）
 * 每个分支下再给出 2 个关键判断问题（如「需要唯一实例？→ 单例」）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×520（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 + 根 / 三分支面板 / 底部总结）。
 * 间距用 4 的倍数。三分支用 success / warning / accent 三色区分。
 */

const VIEW_W = 720;
const VIEW_H = 520;

// 根节点（问题类型）
const ROOT = { x: 296, y: 52, w: 128, h: 32 };
const ROOT_CX = ROOT.x + ROOT.w / 2; // 360
const ROOT_BOTTOM = ROOT.y + ROOT.h; // 84

// 三个分类节点（等宽，居中于各自面板上方）
const NODE_W = 116;
const NODE_H = 28;
const NODE_Y = 102;
const NODE_BOTTOM = NODE_Y + NODE_H; // 130
const NODE_CENTERS = [136, 360, 584] as const; // 创建 / 结构 / 行为

// 三个面板（等宽 200，间距 24）
const PANEL_W = 200;
const PANEL_Y = 152;
const PANELS = [
  { x: 36, cx: 136, h: 156, color: "var(--success)", label: "创建型（5 个）" },
  { x: 260, cx: 360, h: 172, color: "var(--warning)", label: "结构型（7 个）" },
  { x: 484, cx: 584, h: 208, color: "var(--accent)", label: "行为型（11 个）" },
] as const;

// 各分支的模式名（两列排列）
const CREATIONAL = ["单例", "工厂方法", "抽象工厂", "建造者", "原型"];
const STRUCTURAL = ["适配器", "桥接", "组合", "装饰器", "外观", "享元", "代理"];
const BEHAVIORAL = [
  "责任链",
  "命令",
  "解释器",
  "迭代器",
  "中介者",
  "备忘录",
  "观察者",
  "状态",
  "策略",
  "模板方法",
  "访问者",
];

// 各分支的判断问题
const CREATIONAL_HINTS = ["需要唯一实例？→ 单例", "需要分步构建？→ 建造者"];
const STRUCTURAL_HINTS = ["需要接口转换？→ 适配器", "需要树形结构？→ 组合"];
const BEHAVIORAL_HINTS = ["需要解耦请求？→ 命令", "需要状态切换？→ 状态"];

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";
const warning = "var(--warning)";

/** 把模式名数组拆成两列行（左列在前，右列在后，左列多一个）。 */
function toRows(names: string[]): Array<[string, string | null]> {
  const rows: Array<[string, string | null]> = [];
  for (let i = 0; i < names.length; i += 2) {
    rows.push([names[i], names[i + 1] ?? null]);
  }
  return rows;
}

export function DecisionTreeDiagram() {
  const panels = [
    { ...PANELS[0], names: CREATIONAL, hints: CREATIONAL_HINTS, color: success },
    { ...PANELS[1], names: STRUCTURAL, hints: STRUCTURAL_HINTS, color: warning },
    { ...PANELS[2], names: BEHAVIORAL, hints: BEHAVIORAL_HINTS, color: accent },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GoF 23 模式选型决策树。顶部根节点「问题类型？」向下分三路：左路「创建对象」指向创建型面板（绿色，5 个模式：单例、工厂方法、抽象工厂、建造者、原型），判断问题：需要唯一实例→单例、需要分步构建→建造者；中路「组合类与对象」指向结构型面板（黄色，7 个模式：适配器、桥接、组合、装饰器、外观、享元、代理），判断问题：需要接口转换→适配器、需要树形结构→组合；右路「对象间通信」指向行为型面板（紫色，11 个模式：责任链、命令、解释器、迭代器、中介者、备忘录、观察者、状态、策略、模板方法、访问者），判断问题：需要解耦请求→命令、需要状态切换→状态。底部总结：选型决策树，先定类型，再问问题。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="38"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            模式选型决策树
          </text>

          {/* ===== 根节点「问题类型？」 ===== */}
          <rect
            x={ROOT.x}
            y={ROOT.y}
            width={ROOT.w}
            height={ROOT.h}
            rx="8"
            fill={accent}
            fillOpacity="0.1"
            stroke={accent}
            strokeWidth="1.8"
          />
          <text
            x={ROOT_CX}
            y={ROOT.y + 21}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            问题类型？
          </text>

          {/* ===== 根 → 三个分类节点的连线 ===== */}
          {NODE_CENTERS.map((cx, i) => (
            <line
              key={`root-line-${i}`}
              x1={ROOT_CX}
              y1={ROOT_BOTTOM}
              x2={cx}
              y2={NODE_Y}
              stroke={border}
              strokeWidth="1.6"
            />
          ))}

          {/* ===== 三个分类节点 + 连线到面板 ===== */}
          {(["创建对象", "组合类与对象", "对象间通信"] as const).map((label, i) => {
            const cx = NODE_CENTERS[i];
            const color = panels[i].color;
            return (
              <g key={`node-${i}`}>
                {/* 分类节点 */}
                <rect
                  x={cx - NODE_W / 2}
                  y={NODE_Y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="8"
                  fill={color}
                  fillOpacity="0.1"
                  stroke={color}
                  strokeWidth="1.8"
                />
                <text
                  x={cx}
                  y={NODE_Y + 19}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={color}
                >
                  {label}
                </text>
                {/* 分类节点 → 面板 连线 */}
                <line
                  x1={cx}
                  y1={NODE_BOTTOM}
                  x2={cx}
                  y2={PANEL_Y}
                  stroke={border}
                  strokeWidth="1.6"
                />
              </g>
            );
          })}

          {/* ===== 三个面板（模式名 + 判断问题） ===== */}
          {panels.map((p, pi) => {
            const rows = toRows(p.names);
            const nameStartY = PANEL_Y + 48; // 模式名起始 y
            const rowGap = 18;
            const dividerY = nameStartY + rows.length * rowGap - 6;
            return (
              <g key={`panel-${pi}`}>
                {/* 面板边框 */}
                <rect
                  x={p.x}
                  y={PANEL_Y}
                  width={PANEL_W}
                  height={p.h}
                  rx="10"
                  fill={elevated}
                  stroke={p.color}
                  strokeWidth="1.6"
                  strokeOpacity="0.7"
                />
                {/* 面板标题 */}
                <text
                  x={p.cx}
                  y={PANEL_Y + 22}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={p.color}
                >
                  {p.label}
                </text>
                <line
                  x1={p.x + 12}
                  y1={PANEL_Y + 32}
                  x2={p.x + PANEL_W - 12}
                  y2={PANEL_Y + 32}
                  stroke={p.color}
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                {/* 模式名两列 */}
                {rows.map(([left, right], ri) => {
                  const y = nameStartY + ri * rowGap;
                  return (
                    <g key={`name-${pi}-${ri}`}>
                      <text
                        x={p.x + 20}
                        y={y}
                        fontSize="11"
                        fill={primary}
                        fontFamily="monospace"
                      >
                        {left}
                      </text>
                      {right !== null && (
                        <text
                          x={p.x + 112}
                          y={y}
                          fontSize="11"
                          fill={primary}
                          fontFamily="monospace"
                        >
                          {right}
                        </text>
                      )}
                    </g>
                  );
                })}
                {/* 分隔线 */}
                <line
                  x1={p.x + 12}
                  y1={dividerY}
                  x2={p.x + PANEL_W - 12}
                  y2={dividerY}
                  stroke={border}
                  strokeWidth="1"
                />
                {/* 判断问题 */}
                {p.hints.map((hint, hi) => (
                  <text
                    key={`hint-${pi}-${hi}`}
                    x={p.x + 20}
                    y={dividerY + 18 + hi * 18}
                    fontSize="11"
                    fill={p.color}
                    fontStyle="italic"
                  >
                    {hint}
                  </text>
                ))}
              </g>
            );
          })}

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="470"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            选型决策树：先定类型，再问问题
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        先判断问题属于创建型、结构型还是行为型，再用关键判断问题缩小到具体模式。
        决策树不是死规矩——它只是帮你快速定位候选模式，最终仍要结合场景权衡。
      </figcaption>
    </figure>
  );
}
