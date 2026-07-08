/**
 * <MfcRttiDynamicCreationDiagram>：MFC RTTI 与动态创建机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function MfcRttiDynamicCreationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MFC RTTI与动态创建机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CRuntimeClass——RTTI 与动态创建
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            每个类挂一个静态 CRuntimeClass，链成类型链表
          </text>

          {/* CRuntimeClass 结构 */}
          <rect x="30" y="66" width="330" height="200" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="195" y="88" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">struct CRuntimeClass</text>
          <text x="42" y="110" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">LPCSTR m_lpszClassName;</text>
          <text x="42" y="126" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">int m_nObjectSize;</text>
          <text x="42" y="142" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">UINT m_wSchema;</text>
          <text x="42" y="158" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">CObject* (*m_pfnCreateObject)();</text>
          <text x="42" y="174" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">CRuntimeClass* m_pBaseClass;</text>
          <text x="42" y="190" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">CRuntimeClass* m_pNext;</text>
          <text x="42" y="210" fontSize="9" fill="var(--text-tertiary)">类名 / 大小 / 版本号 / 工厂函数 / 父类 / 链表</text>
          <text x="42" y="228" fontSize="9" fill="var(--text-tertiary)">CObject::IsKindOf 顺 m_pBaseClass 向上比对</text>
          <text x="42" y="246" fontSize="9" fill="var(--text-tertiary)">CreateObject() 调工厂函数 new 出对象</text>

          {/* 类型链 */}
          <rect x="400" y="66" width="300" height="200" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="550" y="88" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">类型链（运行期挂接）</text>

          <rect x="420" y="100" width="260" height="36" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1" />
          <text x="550" y="122" textAnchor="middle" fontSize="11" fill="var(--warning)">CObject::classCObject</text>

          <rect x="420" y="142" width="260" height="36" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1" />
          <text x="550" y="164" textAnchor="middle" fontSize="11" fill="var(--accent)">CCmdTarget::classCCmdTarget</text>

          <rect x="420" y="184" width="260" height="36" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1" />
          <text x="550" y="206" textAnchor="middle" fontSize="11" fill="var(--success)">CDocument::classCDocument</text>

          <rect x="420" y="226" width="260" height="36" rx="6" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1" />
          <text x="550" y="248" textAnchor="middle" fontSize="11" fill="var(--danger)">CMyDoc::classCMyDoc</text>

          <text x="550" y="278" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">m_pBaseClass 指向上层，m_pNext 串同辈</text>

          {/* 宏与用法 */}
          <rect x="30" y="284" width="330" height="92" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="306" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">声明与实现宏</text>
          <text x="42" y="324" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">DECLARE_DYNAMIC(CMyDoc)   // 头文件</text>
          <text x="42" y="340" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">IMPLEMENT_DYNAMIC(CMyDoc, CDocument)</text>
          <text x="42" y="358" fontSize="9" fill="var(--text-tertiary)">DYNCREATE 用 _DYNCREATE 版本，多一个工厂函数</text>

          <rect x="400" y="284" width="300" height="92" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="306" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">运行期用法</text>
          <text x="412" y="324" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">p-&gt;IsKindOf(RUNTIME_CLASS(CDoc));</text>
          <text x="412" y="340" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">CRuntimeClass* pRC = p-&gt;GetRuntimeClass();</text>
          <text x="412" y="358" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">CObject* p = pRC-&gt;CreateObject();</text>

          <text x={VIEW_W / 2} y="402" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：MFC 早于 C++ 标准 RTTI，自建 CRuntimeClass 实现类型识别 + 动态创建
          </text>
          <text x={VIEW_W / 2} y="420" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            动态创建是文档模板、序列化「按类名还原对象」的前提（联动第4/7章）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MFC RTTI 与动态创建——CRuntimeClass 类型链支撑 IsKindOf 类型识别与 CreateObject 动态实例化
      </figcaption>
    </figure>
  );
}
