/**
 * <MfcDocumentViewDiagram>：MFC 文档/视图架构图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function MfcDocumentViewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MFC文档视图架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Document / View 架构
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            CDocTemplate 把 文档、视图、框架 三者绑定为一个协作单元
          </text>

          {/* CWinApp 顶层 */}
          <rect x="270" y="66" width="200" height="44" rx="8" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="86" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">CWinApp（应用）</text>
          <text x="370" y="102" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">管理文档模板列表</text>

          <text x="370" y="124" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 持有</text>

          {/* CDocTemplate 中层 */}
          <rect x="230" y="134" width="280" height="56" rx="8" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="156" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">CDocTemplate</text>
          <text x="370" y="172" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CSingleDocTemplate / CMultiDocTemplate</text>
          <text x="370" y="184" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">记录三类的运行时信息（CRuntimeClass*）</text>

          {/* 三个分支连线 */}
          <path d="M 370 190 L 130 230" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <path d="M 370 190 L 370 230" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <path d="M 370 190 L 610 230" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" />

          {/* CDocument */}
          <rect x="40" y="230" width="180" height="120" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="130" y="252" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">CDocument</text>
          <text x="130" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">职责：存储数据</text>
          <text x="50" y="290" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">Serialize(ar)</text>
          <text x="50" y="306" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">OnNewDocument()</text>
          <text x="50" y="322" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">UpdateAllViews()</text>
          <text x="50" y="340" fontSize="9" fill="var(--text-tertiary)">派生：CMyDoc</text>

          {/* CView */}
          <rect x="280" y="230" width="180" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="252" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">CView</text>
          <text x="370" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">职责：显示与交互</text>
          <text x="290" y="290" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">OnDraw(CDC*)</text>
          <text x="290" y="306" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">GetDocument()</text>
          <text x="290" y="322" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">OnCommand()</text>
          <text x="290" y="340" fontSize="9" fill="var(--text-tertiary)">派生：CMyView</text>

          {/* CFrameWnd */}
          <rect x="520" y="230" width="180" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="610" y="252" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">CFrameWnd</text>
          <text x="610" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">职责：容纳视图</text>
          <text x="530" y="290" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">菜单/工具栏/状态栏</text>
          <text x="530" y="306" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">ActivateFrame()</text>
          <text x="530" y="322" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">托管 CView 子窗口</text>
          <text x="530" y="340" fontSize="9" fill="var(--text-tertiary)">派生：CMainFrame</text>

          {/* 协作关系 */}
          <path d="M 220 290 L 280 290" fill="none" stroke="var(--success)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="250" y="282" textAnchor="middle" fontSize="9" fill="var(--success)">通知更新</text>

          <path d="M 460 290 L 520 290" fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="490" y="282" textAnchor="middle" fontSize="9" fill="var(--accent)">容纳</text>

          <text x={VIEW_W / 2} y="384" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：文档管数据、视图管显示、框架管外壳——三者解耦又协作
          </text>
          <text x={VIEW_W / 2} y="402" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            数据改动 → CDocument::UpdateAllViews → 所有 CView::OnUpdate 重绘
          </text>
          <text x={VIEW_W / 2} y="420" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            CDocTemplate 用 CRuntimeClass 动态创建三者的实例（联动第6章 RTTI）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MFC 文档/视图架构——CDocTemplate 绑定 CDocument、CView、CFrameWnd，数据与显示解耦协作
      </figcaption>
    </figure>
  );
}
