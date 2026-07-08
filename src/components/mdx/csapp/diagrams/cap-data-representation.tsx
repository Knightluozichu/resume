/**
 * <CapDataRepresentationDiagram>：信息表示与处理图解（补码/IEEE 754/编码）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CapDataRepresentationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="信息表示与处理图解：补码、IEEE 754 浮点数、字符编码"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            信息的表示与处理
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            补码统一加减法 · IEEE 754 浮点精度 · 同一比特多种解读
          </text>

          {/* 补码区域 */}
          <rect x="30" y="64" width="330" height="180" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="86" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">补码：有符号整数</text>
          <text x="195" y="108" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">8 位示例：+5 与 -5</text>
          <rect x="60" y="120" width="270" height="28" rx="4" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="138" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--success)">+5 = 0000 0101</text>
          <rect x="60" y="156" width="270" height="28" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="174" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--danger)">-5 = 1111 1011（取反+1）</text>
          <text x="195" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">范围 [-2^(w-1), 2^(w-1)-1] 关于0不对称</text>
          <text x="195" y="216" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">|TMin| = |TMax| + 1，A-B = A+(-B)</text>
          <text x="195" y="232" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">0xFFFFFFFF：无符号=4294967295，补码=-1</text>

          {/* IEEE 754 区域 */}
          <rect x="380" y="64" width="330" height="180" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="86" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">IEEE 754 浮点数</text>
          <text x="545" y="108" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">V = (-1)^s × M × 2^E（单精度 1+8+23）</text>
          <rect x="410" y="120" width="40" height="36" rx="3" fill="var(--danger)" fillOpacity="0.25" stroke="var(--danger)" strokeWidth="1" />
          <text x="430" y="142" textAnchor="middle" fontSize="11" fill="var(--danger)">s</text>
          <rect x="452" y="120" width="120" height="36" rx="3" fill="var(--warning)" fillOpacity="0.25" stroke="var(--warning)" strokeWidth="1" />
          <text x="512" y="142" textAnchor="middle" fontSize="11" fill="var(--warning)">阶码 E (8)</text>
          <rect x="574" y="120" width="106" height="36" rx="3" fill="var(--success)" fillOpacity="0.25" stroke="var(--success)" strokeWidth="1" />
          <text x="627" y="142" textAnchor="middle" fontSize="11" fill="var(--success)">尾数 M (23)</text>
          <text x="545" y="178" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">规格化：E = e - 127，M = 1.f（隐含1）</text>
          <text x="545" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">0.1 = 0.000110011... 无限循环须截断</text>
          <rect x="410" y="206" width="270" height="26" rx="4" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="223" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--danger)">0.1 + 0.2 ≠ 0.3（= 0.30000000000000004）</text>

          {/* 隐式转换陷阱 */}
          <rect x="30" y="260" width="330" height="160" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">隐式类型转换陷阱</text>
          <text x="195" y="304" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">有符号与无符号运算时</text>
          <text x="195" y="320" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">有符号被隐式转为无符号</text>
          <rect x="55" y="332" width="280" height="28" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
          <text x="195" y="350" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--danger)">-1 &lt; 0U → 假！（-1 变 0xFFFFFFFFU）</text>
          <text x="195" y="378" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">sizeof 返回 size_t（无符号）</text>
          <text x="195" y="394" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">循环计数比较易越界，须警惕</text>
          <text x="195" y="410" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">-1 &lt; sizeof(int) 同样为假</text>

          {/* 溢出行为 */}
          <rect x="380" y="260" width="330" height="160" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">整数溢出行为</text>
          <text x="545" y="306" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">无符号：回绕（模 2^w）</text>
          <rect x="405" y="316" width="280" height="24" rx="4" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="332" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--success)">255 + 1 = 0（8位无符号回绕）</text>
          <text x="545" y="356" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">补码：符号反转</text>
          <rect x="405" y="366" width="280" height="24" rx="4" fill="var(--danger)" fillOpacity="0.16" stroke="var(--danger)" strokeWidth="1" />
          <text x="545" y="382" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--danger)">127 + 1 = -128（正溢出变负）</text>
          <text x="545" y="406" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">检测：x,y 同号但 s 与其异号则溢出</text>

          <text x={VIEW_W / 2} y="448" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：一切数值都是比特串，编码规则决定它「是什么」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        信息表示与处理——补码、IEEE 754 浮点、隐式转换与溢出行为
      </figcaption>
    </figure>
  );
}
