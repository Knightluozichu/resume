/**
 * <CpcVirtualFunctionsDiagram>：虚函数 vtable/vptr 机制（cpu-eye-cpp 虚函数实现章）。
 *
 * 左侧展示对象内存布局：vptr 指向虚表。
 * 中间展示虚表：存函数指针数组，每个槽指向实际虚函数地址。
 * 右侧展示派生类覆盖虚函数后虚表槽指向变化。
 * 底部对比普通调用（直接 call）与虚调用（间接 call）的差异。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×500、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层。
 */

const VIEW_W = 720;
const VIEW_H = 500;

export function CpcVirtualFunctionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="虚函数 vtable/vptr 机制。左侧 Base 对象内存布局：起始是 vptr 指针（8 字节），指向 Base 的虚表。中间 Base 虚表：含两个槽，槽 0 指向 Base::f 地址，槽 1 指向 Base::g 地址。右侧 Derived 对象的 vptr 指向 Derived 虚表：槽 0 指向 Derived::f（覆盖），槽 1 仍指向 Base::g（未覆盖）。底部对比：普通调用是 call 直接地址（可内联），虚调用是经 vptr 取虚表槽再间接 call（多两次访存、阻碍内联）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            虚函数实现 · vtable 与 vptr
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            对象经 vptr 找虚表，虚表槽存实际函数地址，间接跳转实现运行期分派
          </text>

          {/* ===== 左：Base 对象 ===== */}
          <text x="72" y="92" fontSize="13" fontWeight="700" fill="var(--text-primary)">Base 对象</text>
          <rect x="72" y="104" width="140" height="100" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="84" y="116" width="116" height="30" rx="4" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="142" y="136" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">vptr</text>
          <rect x="84" y="154" width="116" height="30" rx="4" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="142" y="174" textAnchor="middle" fontSize="12" fill="var(--text-primary)">int data</text>

          {/* vptr 箭头指向虚表 */}
          <line x1="200" y1="131" x2="268" y2="131" stroke="var(--warning)" strokeWidth="1.6" strokeOpacity="0.7" />
          <polygon points="268,127 276,131 268,135" fill="var(--warning)" fillOpacity="0.7" />
          <text x="234" y="124" textAnchor="middle" fontSize="11" fill="var(--warning)">指向</text>

          {/* ===== 中：Base 虚表 ===== */}
          <text x="284" y="92" fontSize="13" fontWeight="700" fill="var(--text-primary)">Base 虚表</text>
          <rect x="284" y="104" width="156" height="100" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="284" y="104" width="156" height="24" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="362" y="121" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">vtable for Base</text>
          <rect x="296" y="136" width="132" height="26" rx="4" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="306" y="153" fontSize="11" fill="var(--text-primary)">槽 0 → &amp;Base::f</text>
          <rect x="296" y="166" width="132" height="26" rx="4" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="306" y="183" fontSize="11" fill="var(--text-primary)">槽 1 → &amp;Base::g</text>

          {/* ===== 右：Derived 虚表 ===== */}
          <text x="484" y="92" fontSize="13" fontWeight="700" fill="var(--text-primary)">Derived 虚表</text>
          <rect x="484" y="104" width="168" height="100" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="484" y="104" width="168" height="24" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="568" y="121" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">vtable for Derived</text>
          <rect x="496" y="136" width="144" height="26" rx="4" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="506" y="153" fontSize="11" fill="var(--text-primary)">槽 0 → &amp;Derived::f</text>
          <text x="630" y="153" textAnchor="end" fontSize="11" fontWeight="700" fill="var(--danger)">覆盖</text>
          <rect x="496" y="166" width="144" height="26" rx="4" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="506" y="183" fontSize="11" fill="var(--text-primary)">槽 1 → &amp;Base::g</text>
          <text x="630" y="183" textAnchor="end" fontSize="11" fill="var(--text-secondary)">未覆盖</text>

          {/* ===== 中下：调用流程 ===== */}
          <text x={VIEW_W / 2} y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">虚调用流程 p-&gt;f()</text>

          <rect x="100" y="256" width="520" height="44" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="120" y="275" fontSize="11" fill="var(--text-primary)">
            <tspan fontWeight="700" fill="var(--warning)">①</tspan>
            <tspan>{" 取 vptr："}</tspan>
            <tspan fill="var(--text-secondary)">从对象起始地址读 8 字节，得到虚表地址</tspan>
          </text>
          <text x="120" y="292" fontSize="11" fill="var(--text-primary)">
            <tspan fontWeight="700" fill="var(--warning)">②</tspan>
            <tspan>{" 查槽："}</tspan>
            <tspan fill="var(--text-secondary)">虚表基址 + 偏移，取函数指针</tspan>
            <tspan fontWeight="700" fill="var(--warning)"> ③</tspan>
            <tspan>{" 间接 call："}</tspan>
            <tspan fill="var(--text-secondary)">跳转到取到的地址执行</tspan>
          </text>

          {/* ===== 底部对比 ===== */}
          <rect x="60" y="320" width="288" height="84" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="60" y="320" width="288" height="24" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="204" y="337" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">普通调用</text>
          <text x="76" y="360" fontSize="11" fill="var(--text-primary)">call 直接地址</text>
          <text x="76" y="376" fontSize="11" fill="var(--text-secondary)">· 编译期已知目标</text>
          <text x="76" y="392" fontSize="11" fill="var(--text-secondary)">· 可内联 · 可精确预测</text>

          <rect x="372" y="320" width="288" height="84" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="372" y="320" width="288" height="24" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="516" y="337" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">虚调用</text>
          <text x="388" y="360" fontSize="11" fill="var(--text-primary)">call [寄存器]（间接）</text>
          <text x="388" y="376" fontSize="11" fill="var(--text-secondary)">· 多两次访存（vptr + 槽）</text>
          <text x="388" y="392" fontSize="11" fill="var(--text-secondary)">· 阻碍内联 · 预测难</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 40} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 22} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            虚函数真正成本不在两次访存，而在切断内联与后续优化链
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        含虚函数的对象起始有 vptr 指向类的虚表，虚表槽存实际函数地址。虚调用经 vptr 取虚表槽再间接跳转，比普通调用多两次访存且阻碍内联。派生类覆盖虚函数时对应槽改为指向派生类实现。
      </figcaption>
    </figure>
  );
}
