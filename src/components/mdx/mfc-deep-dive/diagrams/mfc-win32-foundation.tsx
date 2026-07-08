/**
 * <MfcWin32FoundationDiagram>：Win32窗口程序基础模型图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function MfcWin32FoundationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Win32窗口程序基础模型图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Win32 窗口程序的一生
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            WinMain → 注册窗口类 → 创建窗口 → 消息循环 → 窗口过程
          </text>

          {/* WinMain 入口 */}
          <rect x="40" y="68" width="280" height="52" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="180" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">WinMain(hInstance, ...)</text>
          <text x="180" y="108" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">程序入口，获取实例句柄 hInstance</text>

          <text x="180" y="136" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 注册窗口类 */}
          <rect x="40" y="148" width="280" height="62" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="180" y="170" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">RegisterClass(&amp;wc)</text>
          <text x="180" y="186" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">WNDCLASS&#123; lpfnWndProc=WndProc &#125;</text>
          <text x="180" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">绑定窗口类名与窗口过程函数</text>

          <text x="180" y="226" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 创建并显示窗口 */}
          <rect x="40" y="238" width="280" height="62" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="180" y="260" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">CreateWindow → HWND</text>
          <text x="180" y="276" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">实例化窗口，返回窗口句柄</text>
          <text x="180" y="290" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ShowWindow / UpdateWindow</text>

          <text x="180" y="316" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 消息循环 */}
          <rect x="40" y="328" width="280" height="72" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="180" y="350" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">消息循环 GetMessage</text>
          <text x="180" y="366" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">TranslateMessage / DispatchMessage</text>
          <text x="180" y="380" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">取消息 → 翻译 → 分发到窗口过程</text>
          <text x="180" y="394" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">收到 WM_QUIT 退出循环</text>

          {/* 右侧：窗口过程 */}
          <rect x="400" y="148" width="300" height="252" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="172" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">WndProc(HWND, msg, wParam, lParam)</text>
          <text x="550" y="188" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">窗口过程：消息的处理中枢</text>

          <rect x="420" y="202" width="260" height="34" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="550" y="224" textAnchor="middle" fontSize="11" fill="var(--text-primary)">case WM_CREATE：初始化</text>

          <rect x="420" y="244" width="260" height="34" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="550" y="266" textAnchor="middle" fontSize="11" fill="var(--text-primary)">case WM_PAINT：绘制窗口</text>

          <rect x="420" y="286" width="260" height="34" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="550" y="308" textAnchor="middle" fontSize="11" fill="var(--text-primary)">case WM_COMMAND：菜单/控件</text>

          <rect x="420" y="328" width="260" height="34" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="550" y="350" textAnchor="middle" fontSize="11" fill="var(--text-primary)">case WM_DESTROY：PostQuitMessage</text>

          <text x="550" y="388" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">default → DefWindowProc 默认处理</text>

          {/* 连接线：消息循环 → 窗口过程 */}
          <path d="M 320 364 Q 360 364 400 274" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="356" y="332" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Dispatch</text>

          <text x={VIEW_W / 2} y="440" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：HWND 标识窗口，WndProc 处理消息——这是 MFC 封装的起点
          </text>
          <text x={VIEW_W / 2} y="458" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            MFC 把 WndProc 与 switch-case 升级为消息映射表与成员函数
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Win32窗口程序基础——从 WinMain 经注册、创建、消息循环到窗口过程的完整链路
      </figcaption>
    </figure>
  );
}
