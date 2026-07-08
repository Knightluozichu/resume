/**
 * <MfcFinalReviewDiagram>：深入浅出MFC 全书总复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function MfcFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="深入浅出MFC全书总复习图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CObject 为根——串起 MFC 六大技术
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            一条主线：从 Win32 到 MFC，从 C++ 多态到组件化
          </text>

          {/* CObject 中心 */}
          <rect x="300" y="66" width="140" height="48" rx="8" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">CObject</text>
          <text x="370" y="104" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MFC 之根</text>

          {/* 六大技术扇出 */}
          <path d="M 370 114 L 130 160" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <path d="M 370 114 L 300 160" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <path d="M 370 114 L 470 160" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <path d="M 370 114 L 640 160" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" />

          <rect x="40" y="160" width="180" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="182" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">1. 程序初始化</text>
          <text x="130" y="198" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CWinApp::InitInstance</text>
          <text x="130" y="210" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第2/8章 模板方法</text>

          <rect x="240" y="160" width="160" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="320" y="182" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">2. 消息映射</text>
          <text x="320" y="198" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CCmdTarget / OnCmdMsg</text>
          <text x="320" y="210" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第5章 路由</text>

          <rect x="420" y="160" width="160" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="500" y="182" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">3. RTTI/动态创建</text>
          <text x="500" y="198" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CRuntimeClass</text>
          <text x="500" y="210" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第6章</text>

          <rect x="600" y="160" width="120" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="660" y="182" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">4. 序列化</text>
          <text x="660" y="198" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CArchive</text>
          <text x="660" y="210" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第7章</text>

          {/* 下层：文档/视图 + COM */}
          <path d="M 220 216 L 250 250" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <path d="M 500 216 L 470 250" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" />

          <rect x="180" y="250" width="200" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="280" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">5. 文档/视图</text>
          <text x="280" y="288" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CDocTemplate + Doc + View + Frame</text>
          <text x="280" y="300" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第4章</text>

          <rect x="400" y="250" width="200" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="500" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">6. COM 接口</text>
          <text x="500" y="288" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">IUnknown + CCmdTarget</text>
          <text x="500" y="300" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第9章</text>

          {/* 主线 */}
          <rect x="40" y="332" width="660" height="44" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="354" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">主线：Win32程序 → C++多态 → MFC封装六大技术 → 模板方法控制流 → COM组件化</text>
          <text x="370" y="370" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每项技术都建立在 CObject 的虚函数 + CRuntimeClass 之上</text>

          <text x={VIEW_W / 2} y="406" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：MFC 不是「另一套 API」，而是用 C++ 把 Win32 模型抽象成可复用框架
          </text>
          <text x={VIEW_W / 2} y="424" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            六大技术 = 程序初始化 / 消息映射 / RTTI / 动态创建 / 序列化 / 文档视图（+COM 扩展）
          </text>
          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            懂了「为什么这样设计」，写 MFC 才是从抄到通
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        深入浅出MFC 总复习——以 CObject 为根串联六大技术，从 Win32 到 COM 的设计哲学主线
      </figcaption>
    </figure>
  );
}
