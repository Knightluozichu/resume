/**
 * <RubStringsDiagram>：Ruby 字符串——可变、编码、操作。
 *
 * 展示字符串创建方式、可变性、常用操作与符号(Symbol)对比。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function RubStringsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Ruby 字符串：可变性、创建方式、常用操作，以及 String 与 Symbol 的对比。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Ruby 字符串与符号
          </text>
          <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize="11" fill={secondary}>
            String 可变 · Symbol 不可变 · 冻结 = 不可变保护
          </text>

          {/* 左半：字符串操作 */}
          <text x={170} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            字符串核心操作
          </text>

          <rect x={32} y={86} width={280} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={108} fontSize="11" fill={primary}>s = "Hello"</text>
          <text x={160} y={108} fontSize="10" fill={secondary}># 创建</text>

          <rect x={32} y={128} width={280} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={150} fontSize="11" fill={primary}>s + " World"</text>
          <text x={160} y={150} fontSize="10" fill={secondary}># 拼接 → "Hello World"</text>

          <rect x={32} y={170} width={280} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={192} fontSize="11" fill={primary}>s &lt;&lt; "!"</text>
          <text x={160} y={192} fontSize="10" fill={success}># 追加（原地修改）</text>

          <rect x={32} y={212} width={280} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={234} fontSize="11" fill={primary}>s.upcase / s.downcase</text>
          <text x={200} y={234} fontSize="10" fill={secondary}># 大小写转换</text>

          <rect x={32} y={254} width={280} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={276} fontSize="11" fill={primary}>"#{s}!"</text>
          <text x={120} y={276} fontSize="10" fill={secondary}># 插值 → "Hello!"</text>

          <rect x={32} y={296} width={280} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={318} fontSize="11" fill={primary}>s.freeze</text>
          <text x={120} y={318} fontSize="10" fill={warning}># 冻结为不可变</text>

          {/* 右半：String vs Symbol */}
          <line x1={336} y1={64} x2={336} y2={348} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          <text x={524} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            String vs Symbol
          </text>

          {/* String 列 */}
          <rect x={360} y={88} width={150} height={120} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={435} y={108} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>String</text>
          <text x={372} y={128} fontSize="11" fill={primary}>"hello"</text>
          <text x={372} y={146} fontSize="10" fill={secondary}>可变（可 &lt;&lt; + upcase!）</text>
          <text x={372} y={162} fontSize="10" fill={secondary}>每次创建新对象</text>
          <text x={372} y={178} fontSize="10" fill={secondary}>占内存多</text>
          <text x={372} y={194} fontSize="10" fill={secondary}>适合：文本数据</text>

          {/* Symbol 列 */}
          <rect x={530} y={88} width={150} height={120} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={605} y={108} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>Symbol</text>
          <text x={542} y={128} fontSize="11" fill={primary}>:hello</text>
          <text x={542} y={146} fontSize="10" fill={secondary}>不可变（永远不变）</text>
          <text x={542} y={162} fontSize="10" fill={secondary}>同名始终同一对象</text>
          <text x={542} y={178} fontSize="10" fill={secondary}>占内存少（GC 友好）</text>
          <text x={542} y={194} fontSize="10" fill={secondary}>适合：键名、枚举</text>

          {/* 对比示例 */}
          <rect x={360} y={224} width={320} height={52} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={372} y={244} fontSize="11" fill={primary}>{':hello.object_id == :hello.object_id  # true'}</text>
          <text x={372} y={262} fontSize="11" fill={primary}>{'"hello".object_id == "hello".object_id  # false'}</text>

          {/* 底部说明 */}
          <text x={360} y={300} fontSize="11" fill={secondary}>Symbol 是内部以整数存储的不可变名字</text>
          <text x={360} y={318} fontSize="11" fill={secondary}>做 Hash 键时 :name 比 "name" 更高效</text>
          <text x={360} y={336} fontSize="11" fill={secondary}>冻结字符串（freeze）可模拟 Symbol 行为</text>

          <defs>
            <marker id="rub-str-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Ruby 字符串可变且支持插值，Symbol 不可变且同名唯一——做哈希键优先用 Symbol。
      </figcaption>
    </figure>
  );
}
