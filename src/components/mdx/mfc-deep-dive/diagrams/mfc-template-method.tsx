/**
 * <MfcTemplateMethodDiagram>：模板方法模式在 MFC 中的应用图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function MfcTemplateMethodDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="模板方法模式在MFC中的应用图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            模板方法模式——基类定骨架，派生类填步骤
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            「不要叫我，我会叫你」——Hollywood Principle
          </text>

          {/* 基类骨架 */}
          <rect x="30" y="68" width="340" height="300" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="200" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">CWinApp（基类·框架）</text>
          <text x="200" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">InitInstance() = 模板方法（算法骨架）</text>

          <rect x="48" y="118" width="304" height="34" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="140" textAnchor="middle" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">1. Enable3dControls() / 注册模板</text>

          <rect x="48" y="158" width="304" height="34" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1.4" strokeDasharray="5 3" />
          <text x="200" y="180" textAnchor="middle" fontSize="11" fill="var(--warning)" fontFamily="monospace">2. virtual InitInstance() → 派生重写</text>

          <rect x="48" y="198" width="304" height="34" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="220" textAnchor="middle" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">3. ParseCommandLine() / 处理参数</text>

          <rect x="48" y="238" width="304" height="34" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="260" textAnchor="middle" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">4. ShowWindow / UpdateWindow</text>

          <rect x="48" y="278" width="304" height="34" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1.4" strokeDasharray="5 3" />
          <text x="200" y="300" textAnchor="middle" fontSize="11" fill="var(--warning)" fontFamily="monospace">5. virtual ExitInstance() → 派生重写</text>

          <rect x="48" y="318" width="304" height="34" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="340" textAnchor="middle" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">6. Run() → 消息循环（框架控制）</text>

          <text x="200" y="360" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">实线=固定步骤，虚线=可重写钩子</text>

          {/* 派生类 */}
          <rect x="400" y="120" width="300" height="180" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="142" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">CMyApp（派生类·用户）</text>
          <text x="550" y="158" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">只填「变化点」，不关心流程编排</text>

          <text x="412" y="182" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">BOOL CMyApp::InitInstance()</text>
          <text x="412" y="198" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">&#123;</text>
          <text x="412" y="214" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">  // 加载文档模板</text>
          <text x="412" y="230" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">  AddDocTemplate(pTemplate);</text>
          <text x="412" y="246" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">  // 创建主窗口</text>
          <text x="412" y="262" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">  m_pMainWnd-&gt;ShowWindow(SW_SHOW);</text>
          <text x="412" y="278" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">  return TRUE;</text>
          <text x="412" y="294" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">&#125;</text>

          <path d="M 400 168 Q 380 168 374 168" fill="none" stroke="var(--warning)" strokeWidth="1.4" markerEnd="url(#arrTm1)" />
          <text x="386" y="160" textAnchor="middle" fontSize="9" fill="var(--warning)">重写</text>
          <defs>
            <marker id="arrTm1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--warning)" />
            </marker>
          </defs>

          <text x={VIEW_W / 2} y="396" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：框架拥有主控权（控制反转），用户代码只填几个虚函数
          </text>
          <text x={VIEW_W / 2} y="414" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            CDocument::OnNewDocument / CView::OnDraw 同样是模板方法的钩子
          </text>
          <text x={VIEW_W / 2} y="432" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            「Don't call us, we'll call you」——你写的是被框架调用的代码
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MFC 模板方法模式——CWinApp::InitInstance 定义启动骨架，派生类重写虚函数填入具体步骤
      </figcaption>
    </figure>
  );
}
