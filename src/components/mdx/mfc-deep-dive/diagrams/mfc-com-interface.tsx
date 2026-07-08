/**
 * <MfcComInterfaceDiagram>：COM 接口与 MFC 支持图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function MfcComInterfaceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="COM接口与MFC支持图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            COM 接口——二进制层面的对象契约
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            IUnknown 三方法 + 接口表 + MFC 用 CCmdTarget 承载
          </text>

          {/* IUnknown */}
          <rect x="30" y="70" width="300" height="170" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="180" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">interface IUnknown（一切接口之根）</text>
          <text x="42" y="114" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">virtual HRESULT QueryInterface(</text>
          <text x="42" y="130" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">    REFIID riid, void** ppv) = 0;</text>
          <text x="42" y="148" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">virtual ULONG AddRef() = 0;</text>
          <text x="42" y="166" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">virtual ULONG Release() = 0;</text>
          <text x="42" y="190" fontSize="9" fill="var(--text-tertiary)">QueryInterface：按 IID 查接口指针</text>
          <text x="42" y="206" fontSize="9" fill="var(--text-tertiary)">AddRef/Release：引用计数管理生命周期</text>
          <text x="42" y="222" fontSize="9" fill="var(--text-tertiary)">接口 = 纯虚基类（vtable 即二进制契约）</text>

          {/* 接口表 */}
          <rect x="360" y="70" width="340" height="170" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="530" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">一个对象可多接口</text>

          <rect x="380" y="104" width="300" height="40" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1" />
          <text x="530" y="122" textAnchor="middle" fontSize="11" fill="var(--text-primary)">CComObject（实现体）</text>
          <text x="530" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">承载多个接口的 vtable</text>

          <rect x="380" y="152" width="92" height="34" rx="6" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1" />
          <text x="426" y="174" textAnchor="middle" fontSize="10" fill="var(--success)">IUnknown</text>

          <rect x="484" y="152" width="92" height="34" rx="6" fill="var(--danger)" fillOpacity="0.16" stroke="var(--danger)" strokeWidth="1" />
          <text x="530" y="174" textAnchor="middle" fontSize="10" fill="var(--danger)">IDispatch</text>

          <rect x="588" y="152" width="92" height="34" rx="6" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1" />
          <text x="634" y="174" textAnchor="middle" fontSize="10" fill="var(--warning)">IMyServer</text>

          <text x="530" y="206" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">QueryInterface 在接口表里查 riid</text>
          <text x="530" y="222" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">返回对应 vptr，调用方只认接口不认实现</text>

          {/* MFC 支持 */}
          <rect x="30" y="262" width="670" height="100" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="365" y="284" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">MFC 如何承载 COM</text>
          <text x="42" y="306" fontSize="10" fill="var(--text-primary)">CCmdTarget 派生类可用宏实现 IUnknown：引用计数由 ExternalAddRef / ExternalRelease 管理</text>
          <text x="42" y="324" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">BEGIN_INTERFACE_PART(MyImpl, IMyServer) ... END_INTERFACE_PART(MyImpl)</text>
          <text x="42" y="342" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">INTERFACE_MAP：DECLARE_INTERFACE_MAP / BEGIN_INTERFACE_MAP / INTERFACE_PART</text>
          <text x="42" y="358" fontSize="9" fill="var(--text-tertiary)">嵌套类 + 接口映射表，把 COM 接口委托给 CCmdTarget 成员</text>

          <text x={VIEW_W / 2} y="392" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：COM 是「二进制标准」，vtable 布局固定，跨语言跨进程可互通
          </text>
          <text x={VIEW_W / 2} y="410" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            MFC 的 CCmdTarget 借鉴 COM 的引用计数与接口思想，是 OLE/ActiveX 的根基
          </text>
          <text x={VIEW_W / 2} y="428" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            理解 COM 后回看 CCmdTarget，会发现消息映射与接口表是同构的
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        COM 接口与 MFC——IUnknown 三方法 + 多接口表，CCmdTarget 用嵌套类与映射表承载 COM
      </figcaption>
    </figure>
  );
}
