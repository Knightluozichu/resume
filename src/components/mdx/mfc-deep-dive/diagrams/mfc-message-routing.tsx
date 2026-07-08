/**
 * <MfcMessageRoutingDiagram>：MFC 命令消息路由图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function MfcMessageRoutingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MFC命令消息路由图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            命令消息（WM_COMMAND）的路由
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            CCmdTarget::OnCmdMsg 逐级询问，直到找到处理者
          </text>

          {/* 消息映射表示意 */}
          <rect x="30" y="66" width="300" height="170" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="180" y="88" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">消息映射表（Message Map）</text>
          <text x="42" y="108" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">BEGIN_MESSAGE_MAP(CMyView, CView)</text>
          <text x="42" y="124" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">  ON_COMMAND(ID_FILE_OPEN,</text>
          <text x="42" y="140" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">          OnFileOpen)</text>
          <text x="42" y="156" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">  ON_WM_PAINT()</text>
          <text x="42" y="172" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">  ON_UPDATE_COMMAND_UI(...)</text>
          <text x="42" y="188" fontSize="10" fill="var(--text-primary)" fontFamily="monospace">END_MESSAGE_MAP()</text>
          <text x="180" y="212" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">编译期生成静态表，运行期查表分发</text>

          {/* 路由链 */}
          <text x="540" y="78" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">路由顺序（谁先被问）</text>

          <rect x="400" y="88" width="280" height="32" rx="6" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="540" y="108" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">1. CView::OnCmdMsg</text>
          <text x="690" y="108" textAnchor="end" fontSize="9" fill="var(--text-tertiary)">活动视图</text>

          <text x="540" y="128" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&darr; 未处理则上交</text>

          <rect x="400" y="138" width="280" height="32" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="158" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">2. CDocument::OnCmdMsg</text>
          <text x="690" y="158" textAnchor="end" fontSize="9" fill="var(--text-tertiary)">关联文档</text>

          <text x="540" y="178" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="188" width="280" height="32" rx="6" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="540" y="208" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">3. CFrameWnd::OnCmdMsg</text>
          <text x="690" y="208" textAnchor="end" fontSize="9" fill="var(--text-tertiary)">框架窗口</text>

          <text x="540" y="228" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="238" width="280" height="32" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="540" y="258" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">4. CWinApp::OnCmdMsg</text>
          <text x="690" y="258" textAnchor="end" fontSize="9" fill="var(--text-tertiary)">应用对象</text>

          {/* CCmdTarget 基类 */}
          <rect x="30" y="260" width="300" height="70" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="180" y="282" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">CCmdTarget（消息处理基类）</text>
          <text x="180" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CView / CDocument / CFrameWnd / CWinApp 均派生自它</text>
          <text x="180" y="316" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">提供 OnCmdMsg 与消息映射查找的统一接口</text>

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y="362" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：非命令消息（如 WM_PAINT）直接发给目标窗口；命令消息才走逐级路由
          </text>
          <text x={VIEW_W / 2} y="380" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            路由让「菜单点击」可被最合适的对象处理——视图没接住就交给文档，再交给框架
          </text>
          <text x={VIEW_W / 2} y="398" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            ON_COMMAND 宏把 ID 映射到成员函数，取代 Win32 的 switch-case
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MFC 命令消息路由——WM_COMMAND 经 View → Document → Frame → App 逐级询问消息映射表
      </figcaption>
    </figure>
  );
}
