/**
 * <WjWindowManagementDiagram>：Windows 窗口管理生命周期图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 400;

export function WjWindowManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Windows 窗口管理生命周期图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            窗口生命周期与属性体系
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            注册 → 创建 → 显示 → 消息循环 → 销毁
          </text>

          {/* 生命周期流程 */}
          <rect x="30" y="68" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="90" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">RegisterClass</text>
          <text x="90" y="106" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">注册窗口类</text>

          <text x="165" y="93" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="180" y="68" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="240" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">CreateWindow</text>
          <text x="240" y="106" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">创建窗口实例</text>

          <text x="315" y="93" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="330" y="68" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="390" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">ShowWindow</text>
          <text x="390" y="106" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">显示并更新</text>

          <text x="465" y="93" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="480" y="68" width="120" height="50" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="540" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">消息循环</text>
          <text x="540" y="106" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">处理用户交互</text>

          <text x="615" y="93" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="630" y="68" width="90" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="675" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Destroy</text>
          <text x="675" y="106" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">销毁回收</text>

          {/* WNDCLASSEX 结构 */}
          <rect x="40" y="140" width="320" height="160" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="200" y="162" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">WNDCLASSEX 结构体</text>
          <line x1="60" y1="172" x2="340" y2="172" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="60" y="190" fontSize="10" fill="var(--text-secondary)">cbSize</text>
          <text x="200" y="190" fontSize="10" fill="var(--text-tertiary)">结构体大小</text>
          <text x="60" y="206" fontSize="10" fill="var(--text-secondary)">lpfnWndProc</text>
          <text x="200" y="206" fontSize="10" fill="var(--text-tertiary)">窗口过程回调函数指针</text>
          <text x="60" y="222" fontSize="10" fill="var(--text-secondary)">hInstance</text>
          <text x="200" y="222" fontSize="10" fill="var(--text-tertiary)">模块实例句柄</text>
          <text x="60" y="238" fontSize="10" fill="var(--text-secondary)">lpszClassName</text>
          <text x="200" y="238" fontSize="10" fill="var(--text-tertiary)">窗口类名（唯一标识）</text>
          <text x="60" y="254" fontSize="10" fill="var(--text-secondary)">hCursor / hIcon</text>
          <text x="200" y="254" fontSize="10" fill="var(--text-tertiary)">光标与图标资源</text>
          <text x="60" y="270" fontSize="10" fill="var(--text-secondary)">hbrBackground</text>
          <text x="200" y="270" fontSize="10" fill="var(--text-tertiary)">背景画刷</text>
          <text x="60" y="288" fontSize="10" fill="var(--text-secondary)">style</text>
          <text x="200" y="288" fontSize="10" fill="var(--text-tertiary)">类样式（CS_HREDRAW 等）</text>

          {/* 窗口属性 */}
          <rect x="390" y="140" width="310" height="160" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="162" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">窗口属性与关系</text>
          <line x1="410" y1="172" x2="680" y2="172" stroke="var(--warning)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="410" y="190" fontSize="10" fill="var(--text-secondary)">HWND</text>
          <text x="520" y="190" fontSize="10" fill="var(--text-tertiary)">窗口句柄（唯一标识）</text>
          <text x="410" y="206" fontSize="10" fill="var(--text-secondary)">父窗口 / 子窗口</text>
          <text x="520" y="206" fontSize="10" fill="var(--text-tertiary)">SetParent 建立层级</text>
          <text x="410" y="222" fontSize="10" fill="var(--text-secondary)">窗口样式</text>
          <text x="520" y="222" fontSize="10" fill="var(--text-tertiary)">WS_OVERLAPPEDWINDOW</text>
          <text x="410" y="238" fontSize="10" fill="var(--text-secondary)">扩展样式</text>
          <text x="520" y="238" fontSize="10" fill="var(--text-tertiary)">WS_EX_TOPMOST 等</text>
          <text x="410" y="254" fontSize="10" fill="var(--text-secondary)">子类化</text>
          <text x="520" y="254" fontSize="10" fill="var(--text-tertiary)">替换 WindowProc 拦截消息</text>
          <text x="410" y="270" fontSize="10" fill="var(--text-secondary)">超类化</text>
          <text x="520" y="270" fontSize="10" fill="var(--text-tertiary)">基于已有类创建新类</text>
          <text x="410" y="288" fontSize="10" fill="var(--text-secondary)">消息路由</text>
          <text x="520" y="288" fontSize="10" fill="var(--text-tertiary)">父窗口可转发给子窗口</text>

          <text x={VIEW_W / 2} y="340" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            窗口类 = 模板（注册一次），窗口实例 = 按模板创建（可创建多个）
          </text>
          <text x={VIEW_W / 2} y="360" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：窗口的本质是「类注册 + 实例创建 + 消息回调」三件套
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Windows 窗口管理生命周期——注册窗口类、创建实例、属性体系与子类化机制
      </figcaption>
    </figure>
  );
}
