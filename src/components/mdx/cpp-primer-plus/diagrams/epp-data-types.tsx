/**
 * <EppDataTypesDiagram>：C++ 内置类型族谱图（cpp-primer-plus 数据类型章）。
 *
 * 四列卡片对应四大类型族：整型 / 浮点 / 字符 / 布尔，每列列出成员与典型宽度；
 * 底部独立面板讲 const / constexpr 两种只读修饰的层次关系。
 * 类型族用板块色区分，const 面板用 accent 强调「编译期 vs 运行期」之分。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×460、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 四列类型 / 底部 const 面板）。
 */

const VIEW_W = 720;
const VIEW_H = 460;

const CARD_W = 152;
const CARD_GAP = 16;
const CARD_MARGIN = 32;
const cardX = (i: number) => CARD_MARGIN + i * (CARD_W + CARD_GAP);
const CARD_TOP = 116;
const CARD_H = 196;

type Family = {
  name: string;
  color: string;
  members: string[];
  width: string;
};

const FAMILIES: readonly Family[] = [
  { name: "整型", color: "var(--accent)", members: ["short", "int", "long", "long long"], width: "通常 16/32/32/64 位" },
  { name: "浮点", color: "var(--success)", members: ["float", "double", "long double"], width: "通常 32/64/80 位" },
  { name: "字符", color: "var(--warning)", members: ["char", "wchar_t", "char16_t", "char32_t"], width: "至少 8/16/16/32 位" },
  { name: "布尔", color: "var(--danger)", members: ["bool"], width: "取值 true / false" },
];

export function EppDataTypesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 内置类型族谱图。四列分别对应整型（short/int/long/long long，通常 16/32/32/64 位）、浮点（float/double/long double，通常 32/64/80 位）、字符（char/wchar_t/char16_t/char32_t）、布尔（bool，取值 true 或 false）。底部面板讲 const 运行期只读与 constexpr 编译期常量的区别。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 内置类型族谱
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            四大类型族 + const/constexpr 只读修饰，构成变量声明的全部素材
          </text>

          {/* ===== 四列类型卡片 ===== */}
          {FAMILIES.map((f, i) => {
            const x = cardX(i);
            return (
              <g key={f.name}>
                <rect x={x} y={CARD_TOP} width={CARD_W} height={CARD_H} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                {/* 族头 pill */}
                <rect x={x} y={CARD_TOP} width={CARD_W} height="28" rx="8" fill={f.color} fillOpacity="0.12" stroke={f.color} strokeWidth="1.2" />
                <text x={x + CARD_W / 2} y={CARD_TOP + 19} textAnchor="middle" fontSize="14" fontWeight="700" fill={f.color}>{f.name}</text>
                {/* 成员 */}
                {f.members.map((m, k) => (
                  <text key={m} x={x + CARD_W / 2} y={CARD_TOP + 52 + k * 24} textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--text-primary)">{m}</text>
                ))}
                {/* 分隔线 + 宽度 */}
                <line x1={x + 16} y1={CARD_TOP + CARD_H - 36} x2={x + CARD_W - 16} y2={CARD_TOP + CARD_H - 36} stroke="var(--border)" strokeWidth="1" />
                <text x={x + CARD_W / 2} y={CARD_TOP + CARD_H - 18} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{f.width}</text>
              </g>
            );
          })}

          {/* ===== 底部 const 面板 ===== */}
          <rect x="32" y="332" width={VIEW_W - 64} height="96" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="356" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">只读修饰：const vs constexpr</text>
          {/* const */}
          <rect x="56" y="370" width="288" height="44" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="200" y="389" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">const</text>
          <text x="200" y="406" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">运行期只读：值在运行时确定，不可再赋值</text>
          {/* constexpr */}
          <rect x="376" y="370" width="288" height="44" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="520" y="389" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">constexpr</text>
          <text x="520" y="406" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">编译期常量：值在编译时算出，可用于数组长度</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 内置类型分整型、浮点、字符、布尔四族，宽度由实现约定但保证大小关系。const 表示运行期只读，constexpr 表示编译期常量——后者更强，能在编译期求值的场合才能用。
      </figcaption>
    </figure>
  );
}
