/**
 * <EjvMethodsDiagram>：方法设计图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function EjvMethodsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="方法设计图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            方法设计——参数校验、防御性拷贝、Optional
          </text>

          {/* 参数校验 */}
          <rect x="30" y="50" width="330" height="180" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="195" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">参数校验</text>
          <text x="45" y="96" fontSize="11" fill="var(--text-secondary)">publicSortedSet&lt;K&gt; subSet(K from, K to)</text>
          <text x="45" y="114" fontSize="11" fill="var(--text-secondary)">  &rbrace;</text>
          <text x="45" y="132" fontSize="11" fill="var(--text-secondary)">  Objects.requireNonNull(from);</text>
          <text x="45" y="150" fontSize="11" fill="var(--text-secondary)">  Objects.requireNonNull(to);</text>
          <text x="45" y="168" fontSize="11" fill="var(--text-secondary)">  // fail-fast: 及早失败</text>
          <text x="45" y="194" fontSize="11" fill="var(--success)">原则: 检查参数有效性</text>
          <text x="45" y="212" fontSize="11" fill="var(--text-secondary)"> @throws javadoc 记录约束</text>

          {/* 防御性拷贝 */}
          <rect x="380" y="50" width="330" height="180" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="545" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">防御性拷贝</text>
          <text x="395" y="96" fontSize="11" fill="var(--text-secondary)">public Period(Date start, Date end) &rbrace;</text>
          <text x="395" y="114" fontSize="11" fill="var(--danger)">  this.start = start; // 不安全!</text>
          <text x="395" y="132" fontSize="11" fill="var(--text-secondary)">  // 安全: 防御性拷贝</text>
          <text x="395" y="150" fontSize="11" fill="var(--success)">  this.start = new Date(start.getTime());</text>
          <text x="395" y="168" fontSize="11" fill="var(--text-secondary)">  // 拷贝后再校验</text>
          <text x="395" y="194" fontSize="11" fill="var(--danger)">返回时也要拷贝</text>
          <text x="395" y="212" fontSize="11" fill="var(--text-secondary)">  return new Date(start.getTime());</text>

          {/* Optional */}
          <rect x="30" y="250" width="330" height="100" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="195" y="274" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">Optional&lt;T&gt;</text>
          <text x="45" y="296" fontSize="11" fill="var(--text-secondary)">返回值用 Optional 表示可能缺失</text>
          <text x="45" y="314" fontSize="11" fill="var(--success)">Optional&lt;T&gt; max(List&lt;T&gt; list)</text>
          <text x="45" y="332" fontSize="11" fill="var(--danger)">不用作: 参数/字段/Map值</text>

          {/* 重载 vs 覆写 */}
          <rect x="380" y="250" width="330" height="100" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="274" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">重载 (overload) vs 覆写 (override)</text>
          <text x="395" y="296" fontSize="11" fill="var(--text-secondary)">重载: 编译期静态分派</text>
          <text x="395" y="314" fontSize="11" fill="var(--text-secondary)">覆写: 运行时动态绑定</text>
          <text x="395" y="332" fontSize="11" fill="var(--danger)">慎用重载: 参数类型相近时易混淆</text>

          {/* 底部原则 */}
          <rect x="30" y="370" width="680" height="80" rx="10" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="394" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">方法设计核心原则</text>
          <text x="370" y="414" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">谨慎设计方法签名: 参数列表不超过4个，优先用枚举代替int/boolean参数</text>
          <text x="370" y="432" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">返回零长度集合而非null，返回Optional代替null返回值</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        方法设计——参数校验(fail-fast)、防御性拷贝(保护可变参数)、Optional(表示缺失返回值)、慎用重载
      </figcaption>
    </figure>
  );
}
