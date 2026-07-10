/**
 * <EjvCommonMethodsDiagram>：通用方法（equals/hashCode/toString/compareTo）契约图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function EjvCommonMethodsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="通用方法契约图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{`
            通用方法契约——equals / hashCode / toString / compareTo
          `}</text>

          {/* equals 契约 */}
          <rect x="30" y="50" width="340" height="200" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">{`equals 契约`}</text>
          <text x="45" y="96" fontSize="11" fill="var(--text-secondary)">{`自反性: x.equals(x) = true`}</text>
          <text x="45" y="114" fontSize="11" fill="var(--text-secondary)">{`对称性: a.equals(b) =&gt; b.equals(a)`}</text>
          <text x="45" y="132" fontSize="11" fill="var(--text-secondary)">{`传递性: a=b, b=c =&gt; a=c`}</text>
          <text x="45" y="150" fontSize="11" fill="var(--text-secondary)">{`一致性: 多次调用结果不变`}</text>
          <text x="45" y="168" fontSize="11" fill="var(--text-secondary)">{`非空性: x.equals(null) = false`}</text>
          <text x="45" y="194" fontSize="11" fill="var(--danger)">{`陷阱:`}</text>
          <text x="45" y="212" fontSize="11" fill="var(--danger)">{` 继承添加字段会破坏对称性`}</text>
          <text x="45" y="230" fontSize="11" fill="var(--danger)">{` 用 instanceof 而非 getClass`}</text>
          <text x="45" y="248" fontSize="11" fill="var(--text-secondary)">{`解决: 组合优于继承`}</text>

          {/* hashCode 契约 */}
          <rect x="390" y="50" width="320" height="200" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="550" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">{`hashCode 契约`}</text>
          <text x="405" y="96" fontSize="11" fill="var(--text-secondary)">{`核心规则:`}</text>
          <text x="405" y="114" fontSize="11" fill="var(--text-secondary)">{`equals 相等 =&gt; hashCode 必相等`}</text>
          <text x="405" y="132" fontSize="11" fill="var(--text-secondary)">{`hashCode 相等 != equals 相等`}</text>
          <text x="405" y="158" fontSize="11" fill="var(--text-secondary)">{`经典算法:`}</text>
          <text x="405" y="176" fontSize="11" fill="var(--text-secondary)">{`result = 31 * result + f.hashCode()`}</text>
          <text x="405" y="194" fontSize="11" fill="var(--text-secondary)">{`31 = 奇质数，位运算优化`}</text>
          <text x="405" y="220" fontSize="11" fill="var(--danger)">{`陷阱:`}</text>
          <text x="405" y="238" fontSize="11" fill="var(--danger)">{` 重写 equals 必须重写 hashCode`}</text>

          {/* toString */}
          <rect x="30" y="270" width="340" height="100" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="200" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">{`toString`}</text>
          <text x="45" y="316" fontSize="11" fill="var(--text-secondary)">{`覆盖 toString，包含所有关键信息`}</text>
          <text x="45" y="334" fontSize="11" fill="var(--text-secondary)">{`格式: PhoneNumber{area=02, num=1234}`}</text>
          <text x="45" y="352" fontSize="11" fill="var(--text-secondary)">{`编程式访问用 accessor，不依赖解析`}</text>

          {/* compareTo */}
          <rect x="390" y="270" width="320" height="100" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">{`compareTo (Comparable)`}</text>
          <text x="405" y="316" fontSize="11" fill="var(--text-secondary)">{`自反/对称/传递（同 equals）`}</text>
          <text x="405" y="334" fontSize="11" fill="var(--text-secondary)">{`建议: (x.compareTo(y) == 0)`}</text>
          <text x="405" y="352" fontSize="11" fill="var(--text-secondary)">{` == x.equals(y)（不强求但推荐）`}</text>

          {/* 底部总结 */}
          <rect x="30" y="390" width="680" height="80" rx="10" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="414" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">{`核心原则`}</text>
          <text x="370" y="434" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`equals 和 hashCode 必须同时重写——HashMap/HashSet 依赖两者配合`}</text>
          <text x="370" y="452" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`compareTo 实现 Comparable 接口，与 equals 保持一致可避免 TreeSet/TreeMap 异常`}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        通用方法契约——equals 自反/对称/传递/一致/非空五条性质，hashCode 必须与 equals 配合
      </figcaption>
    </figure>
  );
}
