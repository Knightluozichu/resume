/**
 * <EcsEqualityDiagram>：相等性体系（条款 6、9）。
 *
 * 三角关系：== 运算符 / Equals / GetHashCode
 *   - == 默认引用比较（引用类型），Equals 可被重写为值比较
 *   - 重写 Equals 必须同时重写 GetHashCode（哈希一致性）
 *   - IEquatable<T> 提供类型安全的 Equals(T)
 * 下方：值类型应重写 == 并实现 IEquatable，避免装箱
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const danger = "var(--danger)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function EcsEqualityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="相等性体系三角关系。== 运算符默认引用比较，Equals 可重写为值比较，重写 Equals 必须同时重写 GetHashCode。IEquatable T 提供类型安全的 Equals。下方值类型应重写 == 并实现 IEquatable 避免装箱。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ecs-eq-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            相等性体系
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            == · Equals · GetHashCode——三者必须协调一致
          </text>

          {/* 三角关系 */}
          {/* == 节点 */}
          <g>
            <rect x={80} y={90} width={170} height={70} rx="10" fill={accent} fillOpacity="0.10" stroke={accent} strokeWidth="1.6" />
            <text x={165} y={114} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent} fontFamily="monospace">
              {"== 运算符"}
            </text>
            <text x={165} y={134} textAnchor="middle" fontSize="11" fill={secondary}>引用类型默认比引用</text>
            <text x={165} y={150} textAnchor="middle" fontSize="11" fill={secondary}>可重载（不重写 Equals）</text>
          </g>

          {/* Equals 节点 */}
          <g>
            <rect x={470} y={90} width={170} height={70} rx="10" fill={success} fillOpacity="0.10" stroke={success} strokeWidth="1.6" />
            <text x={555} y={114} textAnchor="middle" fontSize="13" fontWeight="700" fill={success} fontFamily="monospace">
              Equals(object)
            </text>
            <text x={555} y={134} textAnchor="middle" fontSize="11" fill={secondary}>虚方法 · 可重写为值比较</text>
            <text x={555} y={150} textAnchor="middle" fontSize="11" fill={secondary}>参数是 object 有装箱</text>
          </g>

          {/* GetHashCode 节点 */}
          <g>
            <rect x={275} y={200} width={170} height={70} rx="10" fill={warning} fillOpacity="0.10" stroke={warning} strokeWidth="1.6" />
            <text x={360} y={224} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning} fontFamily="monospace">
              GetHashCode()
            </text>
            <text x={360} y={244} textAnchor="middle" fontSize="11" fill={secondary}>字典/哈希表定位桶</text>
            <text x={360} y={260} textAnchor="middle" fontSize="11" fill={secondary}>相等的对象必须同哈希</text>
          </g>

          {/* 连线 */}
          <line x1={250} y1={125} x2={470} y2={125} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ecs-eq-arrow)" />
          <text x={360} y={118} textAnchor="middle" fontSize="10" fill={secondary}>应与 Equals 一致</text>

          <line x1={555} y1={160} x2={430} y2={200} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ecs-eq-arrow)" />
          <text x={520} y={188} textAnchor="middle" fontSize="10" fill={secondary}>重写则必重写</text>

          <line x1={290} y1={200} x2={200} y2={160} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ecs-eq-arrow)" />
          <text x={220} y={190} textAnchor="middle" fontSize="10" fill={secondary}>协调</text>

          {/* IEquatable<T> */}
          <g>
            <rect x={470} y={200} width={170} height={70} rx="10" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={555} y={224} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent} fontFamily="monospace">
              {"IEquatable<T>"}
            </text>
            <text x={555} y={244} textAnchor="middle" fontSize="11" fill={secondary}>类型安全 Equals(T)</text>
            <text x={555} y={260} textAnchor="middle" fontSize="11" fill={secondary}>无装箱 · 值类型首选</text>
          </g>

          {/* 下方：铁律 */}
          <line x1={32} y1={296} x2={VIEW_W - 32} y2={296} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={320} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            相等性三条铁律
          </text>
          {[
            { n: "1", text: "重写 Equals 必须重写 GetHashCode", color: danger },
            { n: "2", text: "Equals 相等 → 哈希必相等（反之不必）", color: warning },
            { n: "3", text: "值类型实现 IEquatable 避免装箱", color: success },
          ].map((r, i) => {
            const y = 340 + i * 22;
            return (
              <g key={r.n}>
                <circle cx={120} cy={y - 4} r="9" fill={r.color} fillOpacity="0.15" stroke={r.color} strokeWidth="1.2" />
                <text x={120} y={y} textAnchor="middle" fontSize="11" fontWeight="700" fill={r.color}>{r.n}</text>
                <text x={140} y={y} fontSize="11.5" fill={primary}>{r.text}</text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y={410} textAnchor="middle" fontSize="11" fill={secondary}>
            == · Equals · GetHashCode 三者协调——破坏一致性 = 字典里找不到相等的键
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        引用类型 == 默认比较引用，Equals 可重写为值比较；重写 Equals 必须同时重写 GetHashCode 以保证哈希一致性。值类型应实现 IEquatable&lt;T&gt; 提供无装箱的类型安全相等判定。
      </figcaption>
    </figure>
  );
}
