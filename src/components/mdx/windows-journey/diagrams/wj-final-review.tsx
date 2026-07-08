/**
 * <WjFinalReviewDiagram>：Windows逐梦旅程全书总复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function WjFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Windows逐梦旅程全书总复习图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            一个窗口程序的一生——全书知识串联
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从 WinMain 到 WM_DESTROY，九大机制全部参与
          </text>

          {/* 中心流程线 */}
          <rect x="30" y="64" width="680" height="372" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 步骤1: WinMain入口 */}
          <rect x="50" y="78" width="640" height="34" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="99" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">
            ① WinMain 入口 → WSAStartup 初始化网络（第9章）→ 注册窗口类 WNDCLASSEX（第4章）
          </text>

          {/* 步骤2: 创建窗口 */}
          <rect x="50" y="124" width="640" height="34" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="145" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            ② CreateWindowEx 创建窗口 → ShowWindow 显示 → UpdateWindow 触发首次 WM_PAINT（第4章）
          </text>

          {/* 步骤3: 消息循环 */}
          <rect x="50" y="170" width="640" height="34" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="191" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">
            ③ 消息循环：GetMessage → TranslateMessage → DispatchMessage（第3章）→ WindowProc 分发
          </text>

          {/* 步骤4: GDI绘制 */}
          <rect x="50" y="216" width="640" height="34" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="237" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">
            ④ WM_PAINT → BeginPaint 获取DC → SelectObject 选入画笔 → TextOut/Rectangle 绘制 → EndPaint（第5章）
          </text>

          {/* 步骤5: 系统交互 */}
          <rect x="50" y="262" width="640" height="34" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="283" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">
            ⑤ 读取配置：RegOpenKey → RegQueryValue（第6章）→ CreateThread 后台处理（第7章）
          </text>

          {/* 步骤6: 文件I/O */}
          <rect x="50" y="308" width="640" height="34" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="329" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            ⑥ CreateFile 打开数据文件 → ReadFile 异步读取（OVERLAPPED）→ 完成端口通知（第8章）
          </text>

          {/* 步骤7: 网络通信 */}
          <rect x="50" y="354" width="640" height="34" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="375" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">
            ⑦ socket → connect → send/recv 网络通信 → IOCP 高并发处理（第9章）
          </text>

          {/* 步骤8: 退出 */}
          <rect x="50" y="400" width="640" height="34" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="421" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">
            ⑧ WM_DESTROY → PostQuitMessage → closesocket → WSACleanup → DestroyWindow → 进程退出（第2~9章贯通）
          </text>

          <text x={VIEW_W / 2} y="450" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：一个 Windows 程序的一生 = API调用 + 消息驱动 + 窗口管理 + GDI绘制 + 系统配置 + 并发同步 + 文件I/O + 网络通信
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Windows逐梦旅程全书总复习——一个窗口程序从启动到退出的完整系统旅程
      </figcaption>
    </figure>
  );
}
