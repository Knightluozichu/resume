/**
 * <EcpVariablesTypesDiagram>：C++ 基本类型系统图（easy-cpp-5e 变量与类型章）。
 *
 * 四行布局对应四大类型族：
 *   整型（绿）/ 浮点（紫）/ 字符（橙）/ 布尔（红）
 * 每行左侧彩色类型标签，中间列出常见类型，右侧标注用途。
 * 整型行额外标注「有符号 / 无符号」对比。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11、间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const LEFT_X = 40;
const LABEL_W = 92;
const BODY_X = LEFT_X + LABEL_W + 12;
const BODY_W = 340;
const USE_X = BODY_X + BODY_W + 16;
const USE_W = VIEW_W - USE_X - 40;

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
  extra?: string;
};

const ROWS: readonly TypeRow[] = [
  {
    id: "int",
    name: "整型",
    color: "var(--success)",
    types: "short · int · long · long long",
    signed: "有符号：可正可负",
    unsigned: "无符号：仅非负，范围翻倍",
    uses: "计数、索引、年龄",
  },
  {
    id: "float",
    name: "浮点",
    color: "var(--accent)",
    types: "float · double · long double",
    extra: "float 约 7 位精度，double 约 15 位",
    uses: "温度、价格、坐标",
  },
  {
    id: "char",
    name: "字符",
    color: "var(--warning)",
    types: "char · wchar_t",
    extra: "本质是 1 字节小整数，可算术运算",
    uses: "等级、单字符",
  },
  {
    id: "bool",
    name: "布尔",
    color: "var(--danger)",
    types: "bool（true / false）",
    extra: "只占 1 字节，只有真假两种值",
    uses: "开关、是否通过",
  },
];

export function EcpVariablesTypesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 基本类型系统图。四行从上到下：整型（绿色，short/int/long/long long，分有符号可正可负与无符号仅非负范围翻倍，用于计数索引年龄）、浮点（紫色，float/double/long double，float 约 7 位精度 double 约 15 位，用于温度价格坐标）、字符（橙色，char/wchar_t，本质是 1 字节小整数，用于等级单字符）、布尔（红色，bool 取 true 或 false，用于开关是否通过）。右列标注每种类型的典型用途。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 基本类型系统
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            四大类型族 · 整型区分有符号 / 无符号
          </text>

          {/* 列头 */}
          <text x={LEFT_X + LABEL_W / 2} y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">类型族</text>
          <text x={BODY_X + BODY_W / 2} y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">常见类型</text>
          <text x={USE_X + USE_W / 2} y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">典型用途</text>

          {/* ===== 四行 ===== */}
          {ROWS.map((row, ri) => {
            const y = ROW_TOP + ri * (ROW_H + ROW_GAP);
            return (
              <g key={row.id}>
                {/* 行背景 */}
                <rect x={LEFT_X} y={y} width={VIEW_W - LEFT_X * 2} height={ROW_H} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                {/* 左侧彩色标签 */}
                <rect x={LEFT_X} y={y} width={LABEL_W} height={ROW_H} rx="8" fill={row.color} fillOpacity="0.12" stroke={row.color} strokeWidth="1.2" />
                <text x={LEFT_X + LABEL_W / 2} y={y + ROW_H / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={row.color}>{row.name}</text>

                {/* 类型列表 */}
                <text x={BODY_X + 12} y={y + 26} fontSize="12" fontFamily="monospace" fill="var(--text-primary)">{row.types}</text>

                {/* 整型行：有符号/无符号对比 */}
                {row.signed && row.unsigned && (
                  <>
                    <text x={BODY_X + 12} y={y + 46} fontSize="11" fill="var(--success)">＋ {row.signed}</text>
                    <text x={BODY_X + 12} y={y + 60} fontSize="11" fill="var(--warning)">＋ {row.unsigned}</text>
                  </>
                )}
                {/* 非整型行：补充说明 */}
                {!row.signed && row.extra && (
                  <text x={BODY_X + 12} y={y + 48} fontSize="11" fill="var(--text-secondary)">{row.extra}</text>
                )}

                {/* 右侧用途 */}
                <text x={USE_X + USE_W / 2} y={y + ROW_H / 2 + 4} textAnchor="middle" fontSize="12" fill="var(--text-primary)">{row.uses}</text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="80" y={VIEW_H - 44} width={VIEW_W - 160} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            选类型看「范围 + 精度 + 是否可能为负」——计数用整型，小数用 double，非负计数可用 unsigned
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 基本类型分整型、浮点、字符、布尔四族。整型按是否有符号分为 signed/unsigned，无符号把负数空间换成更大的正数上限。`const` 可修饰变量使其不可变。
      </figcaption>
    </figure>
  );
}
