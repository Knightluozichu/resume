/**
 * <MfcCppMechanicsDiagram>：MFC依赖的C++机制（虚函数/多态/继承）图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function MfcCppMechanicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MFC依赖的C++虚函数与多态机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            虚函数与多态——MFC 的基石
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            vptr → vtable → 运行期动态绑定，让基类指针调用派生类实现
          </text>

          {/* 左侧：继承体系 */}
          <text x="170" y="78" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">MFC 继承体系</text>

          <rect x="90" y="90" width="160" height="40" rx="8" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="170" y="115" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">CObject（根）</text>

          <text x="170" y="142" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="90" y="152" width="160" height="40" rx="8" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="170" y="177" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">CCmdTarget</text>

          <text x="170" y="204" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="40" y="214" width="120" height="40" rx="8" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="100" y="239" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">CWnd</text>

          <rect x="180" y="214" width="120" height="40" rx="8" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="240" y="239" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">CDocument</text>

          <text x="100" y="266" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="240" y="266" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="40" y="276" width="120" height="36" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="100" y="299" textAnchor="middle" fontSize="10" fill="var(--danger)">CFrameWnd / CView</text>

          <rect x="180" y="276" width="120" height="36" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="240" y="299" textAnchor="middle" fontSize="10" fill="var(--success)">CMyDoc（用户派生）</text>

          {/* 右侧：虚函数表机制 */}
          <rect x="360" y="78" width="340" height="248" rx="10" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="530" y="100" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">虚函数表（vtable）机制</text>

          <text x="380" y="126" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">CMyDoc obj;</text>
          <text x="380" y="142" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">CObject* p = &amp;obj;</text>
          <text x="380" y="158" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">p-&gt;Serialize(ar);</text>

          <rect x="380" y="172" width="120" height="50" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="440" y="192" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">对象 obj</text>
          <text x="440" y="208" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">vptr 指向</text>

          <path d="M 500 197 L 540 197" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" markerEnd="url(#arrowMfc1)" />
          <text x="520" y="190" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">vptr</text>

          <rect x="540" y="172" width="150" height="118" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="615" y="190" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">CMyDoc 的 vtable</text>
          <text x="555" y="210" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">[0] -&gt; CMyDoc::Serialize</text>
          <text x="555" y="226" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">[1] -&gt; CMyDoc::IsKindOf</text>
          <text x="555" y="242" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">[2] -&gt; CMyDoc::OnNewDoc</text>
          <text x="555" y="258" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">[3] -&gt; CMyDoc::Dump</text>
          <text x="555" y="280" fontSize="9" fill="var(--text-tertiary)">运行期查表跳转</text>

          <text x="380" y="312" fontSize="11" fill="var(--success)" fontFamily="monospace">=&gt; 实际调用 CMyDoc::Serialize</text>

          <defs>
            <marker id="arrowMfc1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="356" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：基类指针 p-&gt;Serialize() 在运行期通过 vtable 动态绑定到派生类实现
          </text>
          <text x={VIEW_W / 2} y="374" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            MFC 的消息映射、RTTI、序列化全部依赖这套虚函数/多态机制
          </text>
          <text x={VIEW_W / 2} y="392" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            CObject 提供虚 Serialize / IsKindOf / GetRuntimeClass，派生类按需重写
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MFC 的 C++ 基石——CObject 继承体系与 vtable 动态绑定，支撑多态、RTTI 与序列化
      </figcaption>
    </figure>
  );
}
