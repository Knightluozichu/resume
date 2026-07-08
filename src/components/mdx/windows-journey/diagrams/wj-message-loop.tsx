/**
 * <WjMessageLoopDiagram>：Windows 消息循环机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function WjMessageLoopDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Windows 消息循环机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Windows 消息驱动模型
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            产生 → 队列 → 取出 → 翻译 → 分发 → 窗口过程 → 处理
          </text>

          {/* 左列：消息产生源 */}
          <rect x="40" y="70" width="160" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="120" y="94" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">用户输入</text>
          <text x="120" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">键盘 / 鼠标 / 触摸</text>
          <text x="120" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">产生 WM_KEYDOWN 等</text>

          <rect x="40" y="150" width="160" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="120" y="174" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">系统事件</text>
          <text x="120" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">窗口创建 / 绘制</text>
          <text x="120" y="202" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">产生 WM_CREATE 等</text>

          <rect x="40" y="230" width="160" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="120" y="254" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">应用程序</text>
          <text x="120" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">PostMessage / SendMessage</text>
          <text x="120" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自定义消息发送</text>

          {/* 箭头到队列 */}
          <text x="230" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>

          {/* 中列：消息队列 */}
          <rect x="260" y="90" width="200" height="180" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="360" y="114" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">消息队列</text>
          <text x="360" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">（系统队列 + 线程队列）</text>
          <line x1="280" y1="146" x2="440" y2="146" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="360" y="164" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">WM_MOUSEMOVE</text>
          <text x="360" y="182" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">WM_PAINT</text>
          <text x="360" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">WM_COMMAND</text>
          <text x="360" y="218" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">WM_DESTROY</text>
          <text x="360" y="236" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">WM_USER+100</text>
          <text x="360" y="258" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">FIFO 先进先出</text>

          {/* 箭头到消息循环 */}
          <text x="490" y="180" textAnchor="middle" fontSize="20" fill="var(--text-tertiary)">&rarr;</text>

          {/* 右列：消息循环 + 窗口过程 */}
          <rect x="520" y="70" width="180" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="610" y="92" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">GetMessage</text>
          <text x="610" y="108" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从队列取出消息</text>
          <text x="610" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">阻塞直到有消息</text>

          <text x="610" y="138" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="520" y="146" width="180" height="48" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="610" y="168" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">TranslateMessage</text>
          <text x="610" y="184" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">翻译按键为字符消息</text>

          <text x="610" y="206" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="520" y="214" width="180" height="48" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="610" y="236" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">DispatchMessage</text>
          <text x="610" y="252" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分发到窗口过程</text>

          <text x="610" y="274" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="520" y="282" width="180" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="610" y="304" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">WindowProc</text>
          <text x="610" y="320" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">switch(message)</text>
          <text x="610" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">处理并返回</text>

          {/* 循环箭头 */}
          <path d="M 610 340 Q 610 370 400 370 Q 200 370 200 340 Q 200 320 260 250" fill="none" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="380" y="386" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">循环回到 GetMessage，直到 WM_QUIT</text>

          <text x={VIEW_W / 2} y="416" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：Windows 程序 = 消息队列 + 循环取出 + 窗口过程分发
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Windows 消息驱动模型——消息产生、队列缓冲、循环分发、窗口过程处理的完整闭环
      </figcaption>
    </figure>
  );
}
