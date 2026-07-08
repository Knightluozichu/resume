/**
 * <WjWin32ApiDiagram>：Win32 API 基础架构图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function WjWin32ApiDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Win32 API 基础架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Win32 API 分层架构
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            应用程序 → Win32 API → NTDLL → 内核 → 硬件
          </text>

          {/* 应用层 */}
          <rect x="120" y="68" width="500" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">应用程序（Application）</text>
          <text x="370" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">调用 CreateWindow、MessageBox、ReadFile 等 API</text>

          <text x="370" y="134" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* Win32 API 层 */}
          <rect x="120" y="144" width="500" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="166" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Win32 API 层（user32.dll / kernel32.dll / gdi32.dll）</text>
          <text x="370" y="182" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">三大子系统：窗口管理 / 系统服务 / 图形设备</text>

          <text x="370" y="210" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* NTDLL 层 */}
          <rect x="120" y="220" width="500" height="48" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="242" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">NTDLL.dll（系统调用入口）</text>
          <text x="370" y="258" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">将 API 请求翻译为系统调用（syscall），进入内核态</text>

          <text x="370" y="286" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 内核层 */}
          <rect x="120" y="296" width="500" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="318" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Windows 内核（ntoskrnl.exe）</text>
          <text x="370" y="334" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对象管理器 / 进程线程 / 内存管理 / I/O 管理器</text>

          <text x="370" y="362" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 硬件层 */}
          <rect x="120" y="372" width="500" height="36" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="370" y="394" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">硬件（CPU / 内存 / 磁盘 / 设备）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Win32 API 分层架构——从应用调用到内核系统调用的完整路径
      </figcaption>
    </figure>
  );
}
