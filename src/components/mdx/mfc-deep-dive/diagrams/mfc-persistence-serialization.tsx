/**
 * <MfcPersistenceSerializationDiagram>：MFC 持久化与序列化机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function MfcPersistenceSerializationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MFC持久化与序列化机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CArchive 序列化——对象状态的存取
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            CObject::Serialize(CArchive&amp;) 把对象图写入/读出字节流
          </text>

          {/* 内存对象图 */}
          <rect x="30" y="70" width="200" height="160" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="130" y="92" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">内存中的对象图</text>
          <rect x="50" y="104" width="160" height="36" rx="6" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="126" textAnchor="middle" fontSize="11" fill="var(--warning)">CMyDoc</text>
          <rect x="50" y="148" width="160" height="30" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="167" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">m_lines (CObArray)</text>
          <rect x="50" y="184" width="160" height="30" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="203" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">m_pSetting (CObject*)</text>

          {/* CArchive 中介 */}
          <rect x="270" y="70" width="200" height="160" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="92" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">CArchive</text>
          <text x="370" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">读写模式 + Schema 版本</text>
          <text x="282" y="132" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">ar &lt;&lt; pObj;  // 写</text>
          <text x="282" y="148" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">ar &gt;&gt; pObj;  // 读</text>
          <text x="282" y="170" fontSize="9" fill="var(--text-tertiary)">先写 CRuntimeClass 类名</text>
          <text x="282" y="186" fontSize="9" fill="var(--text-tertiary)">读时按名动态创建对象</text>
          <text x="282" y="202" fontSize="9" fill="var(--text-tertiary)">再用 Schema 校验版本</text>
          <text x="282" y="218" fontSize="9" fill="var(--text-tertiary)">支持对象引用去重</text>

          {/* 文件字节流 */}
          <rect x="510" y="70" width="200" height="160" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="610" y="92" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">文件 .dat（字节流）</text>
          <text x="522" y="114" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">[classCMyDoc][schema]</text>
          <text x="522" y="130" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">[nCount]</text>
          <text x="522" y="146" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">[Line0][Line1]...</text>
          <text x="522" y="162" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">[classCSetting][data]</text>
          <text x="522" y="186" fontSize="9" fill="var(--text-tertiary)">类名 + 版本 + 字段值</text>
          <text x="522" y="202" fontSize="9" fill="var(--text-tertiary)">自描述格式</text>
          <text x="522" y="218" fontSize="9" fill="var(--text-tertiary)">跨版本用 Schema 兼容</text>

          {/* 箭头 */}
          <path d="M 230 150 L 270 150" fill="none" stroke="var(--accent)" strokeWidth="1.4" markerEnd="url(#arrSer1)" />
          <text x="250" y="142" textAnchor="middle" fontSize="9" fill="var(--accent)">Serialize</text>
          <path d="M 470 150 L 510 150" fill="none" stroke="var(--success)" strokeWidth="1.4" markerEnd="url(#arrSer1)" />
          <text x="490" y="142" textAnchor="middle" fontSize="9" fill="var(--success)">流式</text>

          <defs>
            <marker id="arrSer1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 代码 + 宏 */}
          <rect x="30" y="252" width="330" height="120" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="195" y="274" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">CMyDoc::Serialize</text>
          <text x="42" y="294" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">void CMyDoc::Serialize(CArchive&amp; ar)</text>
          <text x="42" y="310" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">&#123;</text>
          <text x="42" y="326" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">  CDocument::Serialize(ar);</text>
          <text x="42" y="342" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">  m_lines.Serialize(ar);</text>
          <text x="42" y="358" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">&#125;</text>

          <rect x="400" y="252" width="300" height="120" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="550" y="274" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">序列化宏</text>
          <text x="412" y="294" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">DECLARE_SERIAL(CMyDoc)</text>
          <text x="412" y="310" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">IMPLEMENT_SERIAL(</text>
          <text x="412" y="326" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">  CMyDoc, CDocument, 1 /*schema*/)</text>
          <text x="412" y="348" fontSize="9" fill="var(--text-tertiary)">SERIAL = DYNAMIC + DYNCREATE</text>
          <text x="412" y="364" fontSize="9" fill="var(--text-tertiary)">+ 带版本号的 &lt;&lt; / &gt;&gt; 操作符</text>

          <text x={VIEW_W / 2} y="402" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：序列化 = RTTI（按类名重建）+ 动态创建（new）+ 逐成员读写
          </text>
          <text x={VIEW_W / 2} y="420" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            CArchive 重载 &lt;&lt;/&gt;&gt; 让「存盘/读盘」像流式 I/O 一样自然
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MFC 持久化序列化——对象图经 CArchive 流式写入自描述字节流，读时按类名动态重建
      </figcaption>
    </figure>
  );
}
