/**
 * <YdkTypeCoercionDiagram>：类型转换的隐式规则图解（== 与 ===、抽象操作）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 * SVG 文本中 > 用 &gt;、} 用 &rbrace;、{ 用 &lbrace;。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function YdkTypeCoercionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类型转换的隐式规则图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <defs>
            <marker id="arrTc" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="34" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            类型转换：抽象操作与 == 比较规则
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            ToPrimitive / ToNumber / ToString / ToBoolean 四个抽象操作驱动隐式转换
          </text>

          {/* 顶部：四个抽象操作 */}
          <rect x="30" y="72" width="680" height="92" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">四个抽象操作（类型转换的底层原语）</text>

          <rect x="50" y="104" width="150" height="50" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="125" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">ToPrimitive</text>
          <text x="125" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对象 → 原始值</text>

          <rect x="214" y="104" width="150" height="50" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="289" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">ToNumber</text>
          <text x="289" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">"" → 0, [] → 0</text>

          <rect x="378" y="104" width="150" height="50" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="453" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">ToString</text>
          <text x="453" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">[] → "", [9] → "9"</text>

          <rect x="542" y="104" width="150" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="617" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">ToBoolean</text>
          <text x="617" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">falsy 共 6 个值</text>

          {/* 中部：== 比较流程 */}
          <rect x="30" y="180" width="680" height="148" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="200" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">== 抽象相等比较流程（=== 不转换，类型不同直接 false）</text>

          <rect x="50" y="214" width="200" height="48" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="150" y="234" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">1. 类型相同？</text>
          <text x="150" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">走 ===（含 NaN 判断）</text>

          <rect x="270" y="214" width="200" height="48" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="234" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">2. null 与 undefined？</text>
          <text x="370" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">null == undefined 为 true</text>

          <rect x="490" y="214" width="200" height="48" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="590" y="234" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">3. 数字与字符串？</text>
          <text x="590" y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">字符串 ToNumber 后比</text>

          <path d="M250 238 L 268 238" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrTc)" />
          <path d="M470 238 L 488 238" stroke="var(--accent)" strokeWidth="1.6" fill="none" markerEnd="url(#arrTc)" />

          <text x="60" y="290" fontSize="11" fill="var(--text-secondary)">布尔参与：先 ToNumber（true → 1）</text>
          <text x="60" y="308" fontSize="11" fill="var(--text-secondary)">对象参与：先 ToPrimitive 再比</text>
          <text x="400" y="290" fontSize="11" fill="var(--danger)">[] == ![]  →  "" == false  →  0 == 0  →  true</text>
          <text x="400" y="308" fontSize="11" fill="var(--danger)">这是隐式转换最反直觉的坑</text>

          {/* 底部：建议 */}
          <rect x="30" y="344" width="680" height="76" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="364" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">工程建议</text>
          <text x="50" y="386" fontSize="11" fill="var(--text-secondary)">默认用 ===，杜绝隐式转换；只有 null/undefined 用 == 做存在性判断</text>
          <text x="50" y="406" fontSize="11" fill="var(--text-secondary)">显式转换更安全：String(x) / Number(x) / Boolean(x)，比 x + "" / +x / !!x 更可读</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        隐式类型转换由四个抽象操作驱动；== 在类型不同时强制转换，=== 不转换直接判类型
      </figcaption>
    </figure>
  );
}
