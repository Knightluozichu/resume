/**
 * <AaJsonSchemaDiagram>：「schema 约束 ↔ 合法 JSON」并排对照解剖图（HEL-295，静态 Server SVG）。
 *
 * 左栏一张 schema（字段名: 类型 + 必填标记），右栏一份按它填出的合法 JSON；
 * 中间用连线把 schema 每个字段 ↔ JSON 里对应的键值对一一对齐，让读者一眼看清
 * 「schema 是表格的表头（每格要填什么、什么类型、必不必填）、JSON 是照表头填好的那张表」。
 *
 * 布局（防遮挡红线，§四几何，无容器框圈内容——靠两栏标题 + 等距行对齐分组）：
 *   - 左右两栏各自一列「字段行」，行 y 用单一公式 rowY(i)=ROW_TOP + i*ROW_H，两栏共用同一公式 → 行天然水平对齐；
 *   - 左栏行左对齐，右栏行左对齐，各自独立 rect（每行一个浅底条，仅圈自己那一行，非容器框）；
 *   - 中间连线从左栏行右缘 → 右栏行左缘，水平直线，落在两行中点、不穿字；
 *   - 栏标题在各栏顶上方，距 viewBox 边 ≥18px；字号 ≥10px。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 */

export function AaJsonSchemaDiagram() {
  // —— 布局常量（viewBox 内坐标）——
  const VIEW_W = 720;
  const VIEW_H = 320;

  const ROW_H = 48; // 行间距
  const ROW_BOX_H = 38; // 行底条高
  const ROW_TOP = 84; // 第一行顶 y
  const rowY = (i: number) => ROW_TOP + i * ROW_H;

  const LCOL_X = 24; // 左栏（schema）左缘
  const LCOL_W = 286;
  const RCOL_X = 410; // 右栏（JSON）左缘
  const RCOL_W = 286;

  type Field = {
    id: string;
    name: string; // 字段名
    type: string; // 类型
    required: boolean; // 必填？
    value: string; // 对应 JSON 里的值（文本）
    color: string;
  };

  // 一个极简「天气查询结果」schema 与它对应的合法 JSON（与 §6 代码里的 schema 同形）。
  const fields: readonly Field[] = [
    {
      id: "city",
      name: "city",
      type: "str",
      required: true,
      value: '"上海"',
      color: "var(--accent)",
    },
    {
      id: "temp",
      name: "temp",
      type: "int",
      required: true,
      value: "26",
      color: "var(--success)",
    },
    {
      id: "rain",
      name: "rain",
      type: "bool",
      required: true,
      value: "true",
      color: "var(--warning)",
    },
    {
      id: "tip",
      name: "tip",
      type: "str",
      required: false,
      value: '"记得带伞"',
      color: "var(--text-secondary)",
    },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="schema 约束与合法 JSON 的并排对照图。左栏是 schema，规定了四个字段：city 是字符串且必填、temp 是整数且必填、rain 是布尔且必填、tip 是字符串但可选。右栏是按这张 schema 填出的合法 JSON：city 等于上海、temp 等于 26、rain 等于 true、tip 等于记得带伞。中间的连线把 schema 每个字段和 JSON 里对应的键值一一对齐。schema 像表格的表头规定每格要填什么类型、必不必填，JSON 就是照表头填好的那张表。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="32"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            schema 是「表头」，合法 JSON 是「照表头填好的表」
          </text>

          {/* ===== 栏标题 ===== */}
          <text
            x={LCOL_X + 4}
            y="64"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            schema：每个字段要什么类型、必不必填
          </text>
          <text
            x={RCOL_X + 4}
            y="64"
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            合法 JSON：照 schema 填出的值
          </text>

          {/* ===== 字段行 ===== */}
          {fields.map((f, i) => {
            const y = rowY(i);
            const midY = y + ROW_BOX_H / 2;
            return (
              <g key={f.id}>
                {/* —— 连线：左栏行右缘 → 右栏行左缘（水平，落在行中点）—— */}
                <line
                  x1={LCOL_X + LCOL_W}
                  y1={midY}
                  x2={RCOL_X}
                  y2={midY}
                  stroke={f.color}
                  strokeWidth="1.4"
                  strokeDasharray="4 3"
                  opacity="0.6"
                />

                {/* —— 左栏：schema 字段行（独立行底条，仅圈自己）—— */}
                <rect
                  x={LCOL_X}
                  y={y}
                  width={LCOL_W}
                  height={ROW_BOX_H}
                  rx="8"
                  fill={f.color}
                  fillOpacity="0.1"
                  stroke={f.color}
                  strokeWidth="1.4"
                />
                <text
                  x={LCOL_X + 14}
                  y={midY + 4}
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {f.name}
                  <tspan fontWeight="400" fill="var(--text-secondary)">
                    {" : "}
                    {f.type}
                  </tspan>
                </text>
                <text
                  x={LCOL_X + LCOL_W - 14}
                  y={midY + 4}
                  textAnchor="end"
                  fontSize="10"
                  fontWeight="600"
                  fill={f.required ? "var(--danger)" : "var(--text-secondary)"}
                >
                  {f.required ? "必填" : "可选"}
                </text>

                {/* —— 右栏：合法 JSON 键值行（独立行底条，仅圈自己）—— */}
                <rect
                  x={RCOL_X}
                  y={y}
                  width={RCOL_W}
                  height={ROW_BOX_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text
                  x={RCOL_X + 14}
                  y={midY + 4}
                  fontSize="13"
                  fontFamily="var(--font-mono, monospace)"
                  fill="var(--text-primary)"
                >
                  <tspan fontWeight="700" fill={f.color}>
                    &quot;{f.name}&quot;
                  </tspan>
                  <tspan fill="var(--text-secondary)">: </tspan>
                  <tspan fill="var(--text-primary)">{f.value}</tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        schema 规定每个字段的名字、类型和必不必填（像表格表头），合法 JSON
        就是照它填好的那张表——校验做的事，就是逐行核对右边这张表有没有照左边的表头填对。
      </figcaption>
    </figure>
  );
}
