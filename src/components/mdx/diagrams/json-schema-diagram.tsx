/**
 * <JsonSchemaDiagram>：JSON 模式 / schema 约束——一份 schema 约束出一个固定形状的 JSON（HEL-309，第 7 章）。
 *
 * 一张静态 SVG，左右两块 + 中间一条「约束」箭头：
 *   左块「schema（形状约定）」逐行列出字段名 / 类型 / 是否必填；
 *   右块「合法输出（每次都这个形状）」展示一个严格符合 schema 的 JSON 实例；
 *   中间箭头标「约束 / constrain」，点明 schema 决定输出长什么样。
 * 让读者一眼看清：给一份 schema，模型就被约束着吐出一个固定形状、合法的 JSON。
 *
 * 两块用「单一 x 公式」blockX(i) 排布，schema 行 / json 行各用「单一 y 公式」。
 * 纯展示 Server 组件（无交互）。配色全部走 DESIGN token（无裸 hex）；几何常量具名、
 * 为 4 的倍数（硬规则 5）。几何自检：两块零重叠、文字落自己块内、四周留白 ≥ 12px、
 * 字号 ≥ 10px、viewBox 利用率适中。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 388;

// —— 两块布局（单一 x 公式）。块宽 280，间隙 80（容中间箭头 + 约束标签）。
// 右边界 = 24 + 360 + 280 = 664 → 右留白 56；左留白 24。 ——
const BLOCK_W = 280;
const BLOCK_GAP = 80;
const BLOCK_MARGIN = 24;
/** 第 i 块左上角 x（单一公式）。 */
const blockX = (i: number) => BLOCK_MARGIN + i * (BLOCK_W + BLOCK_GAP);

// —— 块外框。 ——
const BLOCK_Y = 64;
const BLOCK_H = 280; // 底边 = 64 + 280 = 344 → 底留白 44

// —— 块内行（单一 y 公式）。 ——
const LINE_Y0 = BLOCK_Y + 76; // 首行 y（给块标题让空间）
const LINE_STEP = 36;
/** 第 r 行的基准 y。 */
const lineY = (r: number) => LINE_Y0 + r * LINE_STEP;

// schema 三个字段：名字 / 类型 / 必填。
type Field = {
  name: string;
  type: string;
  required: boolean;
};

const FIELDS: readonly Field[] = [
  { name: "can_return", type: "boolean", required: true },
  { name: "reason", type: "string", required: true },
  { name: "days_left", type: "integer", required: false },
];

// 右块合法输出的三行（与 schema 字段一一对应）。
const JSON_LINES: readonly string[] = [
  '"can_return": true,',
  '"reason": "7 天内未拆封",',
  '"days_left": 4',
];

export function JsonSchemaDiagram() {
  const schemaX = blockX(0);
  const jsonX = blockX(1);
  const arrowMidY = BLOCK_Y + BLOCK_H / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="JSON 模式与 schema 约束的示意图：一份 schema 约束出一个固定形状的合法 JSON。左块是 schema，也就是形状约定，逐行列出字段：can_return 是 boolean 类型、必填；reason 是 string 类型、必填；days_left 是 integer 类型、可选。中间一条箭头从左指向右，标着「约束 constrain」。右块是合法输出，每次都这个形状，展示一个严格符合 schema 的 JSON：can_return 等于 true，reason 等于「7 天内未拆封」，days_left 等于 4——字段名、类型、必填项全照 schema 来。核心要点：给模型一份 schema，就等于把输出的形状提前定死，模型被约束着吐出一个字段固定、类型明确的合法 JSON，下游程序照着字段取就稳。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* —— 标题行 —— */}
          <text
            x={VIEW_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一份 schema 约束出一个固定形状的 JSON
          </text>

          {/* —— 左块：schema —— */}
          <rect
            x={schemaX}
            y={BLOCK_Y}
            width={BLOCK_W}
            height={BLOCK_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x={schemaX + BLOCK_W / 2}
            y={BLOCK_Y + 28}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            📐 schema（形状约定）
          </text>
          <text
            x={schemaX + BLOCK_W / 2}
            y={BLOCK_Y + 46}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            字段名 · 类型 · 是否必填
          </text>
          {FIELDS.map((f, r) => (
            <g key={`field-${f.name}`}>
              <text
                x={schemaX + 20}
                y={lineY(r)}
                textAnchor="start"
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {f.name}
              </text>
              <text
                x={schemaX + 20}
                y={lineY(r) + 16}
                textAnchor="start"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {`${f.type} · ${f.required ? "必填" : "可选"}`}
              </text>
            </g>
          ))}

          {/* —— 中间「约束」箭头 —— */}
          <line
            x1={schemaX + BLOCK_W + 10}
            y1={arrowMidY}
            x2={jsonX - 14}
            y2={arrowMidY}
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d={`M ${jsonX - 14} ${arrowMidY} l -10 -6 v 12 z`}
            fill="var(--accent)"
          />
          <text
            x={schemaX + BLOCK_W + BLOCK_GAP / 2}
            y={arrowMidY - 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--accent)"
          >
            约束
          </text>
          <text
            x={schemaX + BLOCK_W + BLOCK_GAP / 2}
            y={arrowMidY + 24}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            constrain
          </text>

          {/* —— 右块：合法输出 —— */}
          <rect
            x={jsonX}
            y={BLOCK_Y}
            width={BLOCK_W}
            height={BLOCK_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <text
            x={jsonX + BLOCK_W / 2}
            y={BLOCK_Y + 28}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            ✅ 合法输出（每次都这形状）
          </text>
          {/* 开括号 */}
          <text
            x={jsonX + 20}
            y={BLOCK_Y + 52}
            textAnchor="start"
            fontSize="12"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            {"{"}
          </text>
          {JSON_LINES.map((ln, r) => (
            <text
              key={`json-${r}`}
              x={jsonX + 36}
              y={lineY(r) + 4}
              textAnchor="start"
              fontSize="12"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              {ln}
            </text>
          ))}
          {/* 闭括号 */}
          <text
            x={jsonX + 20}
            y={lineY(JSON_LINES.length - 1) + 32}
            textAnchor="start"
            fontSize="12"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            {"}"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        给模型一份 schema，就把输出形状提前定死——字段名、类型、必填项全照
        schema，模型被约束着吐出一个合法、可解析的 JSON。
      </figcaption>
    </figure>
  );
}
