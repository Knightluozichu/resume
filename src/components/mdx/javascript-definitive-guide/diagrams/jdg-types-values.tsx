/**
 * <JdgTypesValuesDiagram>：类型与值图解（原始类型、类型转换）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JdgTypesValuesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类型与值图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrTv" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            类型与值：七种原始类型与引用类型
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            原始类型按值访问 / 对象按引用访问 / 不可变字符串
          </text>

          {/* 顶部：原始类型 */}
          <rect x="30" y="68" width="680" height="100" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">七种原始类型（不可变、按值比较、栈上存储）</text>

          <rect x="44" y="100" width="92" height="56" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="90" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">number</text>
          <text x="90" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">IEEE 754 双精度</text>
          <text x="90" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">含 NaN / Infinity</text>

          <rect x="144" y="100" width="92" height="56" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="190" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">string</text>
          <text x="190" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不可变 16 位序列</text>
          <text x="190" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">索引返回新串</text>

          <rect x="244" y="100" width="92" height="56" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="290" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">boolean</text>
          <text x="290" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">true / false</text>
          <text x="290" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">6 个 falsy 值</text>

          <rect x="344" y="100" width="92" height="56" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="390" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">null</text>
          <text x="390" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">空值（有义）</text>
          <text x="390" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">typeof → object</text>

          <rect x="444" y="100" width="92" height="56" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="490" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">undefined</text>
          <text x="490" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">未定义</text>
          <text x="490" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">变量未赋值</text>

          <rect x="544" y="100" width="92" height="56" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="590" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">symbol</text>
          <text x="590" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">唯一不可变</text>
          <text x="590" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">私有属性键</text>

          <rect x="644" y="100" width="52" height="56" rx="6" fill="var(--elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="670" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">bigint</text>
          <text x="670" y="140" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">任意精度</text>
          <text x="670" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">123n</text>

          {/* 中部：原始 vs 引用 */}
          <rect x="30" y="184" width="330" height="120" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="204" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">原始类型（值传递）</text>
          <text x="50" y="226" fontSize="11" fill="var(--text-secondary)">赋值与传参复制副本</text>
          <text x="50" y="244" fontSize="11" fill="var(--text-secondary)">比较按值：1 === 1</text>
          <text x="50" y="262" fontSize="11" fill="var(--text-secondary)">不可变：s[0]="x" 不改原串</text>
          <text x="50" y="282" fontSize="11" fill="var(--text-secondary)">存储于栈，复制代价低</text>

          <rect x="380" y="184" width="330" height="120" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="204" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">引用类型（对象）</text>
          <text x="400" y="226" fontSize="11" fill="var(--text-secondary)">赋值与传参复制引用地址</text>
          <text x="400" y="244" fontSize="11" fill="var(--text-secondary)">比较按引用：&lbrace;&rbrace; !== &lbrace;&rbrace;</text>
          <text x="400" y="262" fontSize="11" fill="var(--text-secondary)">可变：o.x=1 直接改原对象</text>
          <text x="400" y="282" fontSize="11" fill="var(--text-secondary)">存储于堆，GC 管理生命周期</text>

          {/* 底部：类型转换要点 */}
          <rect x="30" y="320" width="680" height="112" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="340" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">类型转换关键点</text>
          <text x="50" y="362" fontSize="11" fill="var(--text-secondary)">显式：Number("3") / String(1) / Boolean(0) —— 意图写在明处</text>
          <text x="50" y="380" fontSize="11" fill="var(--text-secondary)">隐式：+x 转数字 / x+"" 转字符串 / !!x 转布尔 / == 触发抽象比较</text>
          <text x="50" y="398" fontSize="11" fill="var(--text-secondary)">NaN 陷阱：NaN 与任何值（含自身）都不等，用 Number.isNaN 判断</text>
          <text x="50" y="416" fontSize="11" fill="var(--text-secondary)">0.1+0.2 !== 0.3：浮点精度问题，用 Number.EPSILON 容差比较</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        七种原始类型按值访问且不可变，对象按引用访问；显式转换优于隐式，NaN 与浮点精度是常见陷阱
      </figcaption>
    </figure>
  );
}
