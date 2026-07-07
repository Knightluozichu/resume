/**
 * <BcgTypeSystemDiagram>：C++ 基本类型系统图（beginning-cpp-game-programming 类型章）。
 *
 * 四行布局对应四大类型族：
 *   整型（绿）/ 浮点（紫）/ 字符（橙）/ 布尔（红）
 * 每行左侧彩色类型标签，中间列出常见类型与字宽，右侧标注游戏中的典型用途。
 * 整型行额外用「有符号 / 无符号」两列对比取值范围。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×420、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 四行主体 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const LEFT_X = 40;
const LABEL_W = 92;
const BODY_X = LEFT_X + LABEL_W + 12; // 144
const BODY_W = 340;
const USE_X = BODY_X + BODY_W + 16; // 500
const USE_W = VIEW_W - USE_X - 40; // 180

const ROW_TOP = 96;
const ROW_H = 64;
const ROW_GAP = 12;

type TypeRow = {
  id: string;
  name: string;
  color: string;
  types: string;
  uses: string;
  signed?: string;
  unsigned?: string;
};

const ROWS: readonly TypeRow[] = [
  {
    id: "int",
    name: "整型",
    color: "var(--success)",
    types: "short · int · long · long long",
    signed: "有符号：可正可负",
    unsigned: "无符号：仅非负，范围翻倍",
    uses: "分数、生命、坐标",
  },
  {
    id: "float",
    name: "浮点",
    color: "var(--accent)",
    types: "float · double · long double",
    uses: "位置、速度、角度",
  },
  {
    id: "char",
    name: "字符",
    color: "var(--warning)",
    types: "char · wchar_t · char16_t · char32_t",
    uses: "菜单选项、文本",
  },
  {
    id: "bool",
    name: "布尔",
    color: "var(--danger)",
    types: "bool（true / false）",
    uses: "开关、碰撞与否",
  },
];

export function BcgTypeSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 基本类型系统图。四行从上到下：整型（绿色，short/int/long/long long，分有符号可正可负与无符号仅非负范围翻倍，游戏中用于分数生命坐标）、浮点（紫色，float/double/long double，用于位置速度角度）、字符（橙色，char/wchar_t/char16_t/char32_t，用于菜单文本）、布尔（红色，bool 取 true 或 false，用于开关与碰撞判断）。右列标注每种类型在游戏中的典型用途。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            C++ 基本类型系统
          </text>
          <text
            x={VIEW_W / 2}
            y="58"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-secondary)"
          >
            四大类型族 · 整型区分有符号 / 无符号
          </text>

          {/* 列头 */}
          <text x={LEFT_X + LABEL_W / 2} y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            类型族
          </text>
          <text x={BODY_X + BODY_W / 2} y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            常见类型
          </text>
          <text x={USE_X + USE_W / 2} y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            游戏中的用途
          </text>

          {/* ===== 四行 ===== */}
          {ROWS.map((row, ri) => {
            const y = ROW_TOP + ri * (ROW_H + ROW_GAP);
            return (
              <g key={row.id}>
                {/* 行背景 */}
                <rect
                  x={LEFT_X}
                  y={y}
                  width={VIEW_W - LEFT_X * 2}
                  height={ROW_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                {/* 左侧彩色标签 */}
                <rect
                  x={LEFT_X}
                  y={y}
                  width={LABEL_W}
                  height={ROW_H}
                  rx="8"
                  fill={row.color}
                  fillOpacity="0.12"
                  stroke={row.color}
                  strokeWidth="1.2"
                />
                <text
                  x={LEFT_X + LABEL_W / 2}
                  y={y + ROW_H / 2 + 5}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={row.color}
                >
                  {row.name}
                </text>

                {/* 类型列表 */}
                <text
                  x={BODY_X + 12}
                  y={y + 26}
                  fontSize="12"
                  fontFamily="monospace"
                  fill="var(--text-primary)"
                >
                  {row.types}
                </text>

                {/* 整型行：有符号/无符号对比 */}
                {row.signed && row.unsigned && (
                  <>
                    <text x={BODY_X + 12} y={y + 46} fontSize="11" fill="var(--success)">
                      ＋ {row.signed}
                    </text>
                    <text x={BODY_X + 12} y={y + 60} fontSize="11" fill="var(--warning)">
                      ＋ {row.unsigned}
                    </text>
                  </>
                )}
                {/* 非整型行：补充说明 */}
                {!row.signed && (
                  <text x={BODY_X + 12} y={y + 48} fontSize="11" fill="var(--text-secondary)">
                    {row.id === "float" && "小数精度：float 约 7 位，double 约 15 位"}
                    {row.id === "char" && "本质是小整数，可参与算术运算"}
                    {row.id === "bool" && "只占 1 字节，只有真 / 假两种值"}
                  </text>
                )}

                {/* 右侧用途 */}
                <text
                  x={USE_X + USE_W / 2}
                  y={y + ROW_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-primary)"
                >
                  {row.uses}
                </text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="80"
            y={VIEW_H - 44}
            width={VIEW_W - 160}
            height="28"
            rx="10"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 26}
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-primary)"
          >
            选类型看「范围 + 精度 + 是否可能为负」——游戏里坐标速度用浮点，计数用整型
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 基本类型分整型、浮点、字符、布尔四族。整型按是否有符号分为 signed/unsigned 两类，无符号类型把负数空间换成了更大的正数上限，适合不会为负的计数。
      </figcaption>
    </figure>
  );
}
