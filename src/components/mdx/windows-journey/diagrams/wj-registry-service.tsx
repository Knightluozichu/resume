/**
 * <WjRegistryServiceDiagram>：Windows 注册表与服务体系图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function WjRegistryServiceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Windows 注册表与服务体系图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            注册表与服务体系
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            注册表五根键 + 服务控制管理器（SCM）
          </text>

          {/* 注册表五根键 */}
          <rect x="30" y="68" width="340" height="300" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="200" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">注册表五大根键</text>
          <line x1="50" y1="100" x2="350" y2="100" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.3" />

          <text x="50" y="120" fontSize="11" fontWeight="600" fill="var(--warning)">HKEY_CLASSES_ROOT</text>
          <text x="50" y="134" fontSize="9" fill="var(--text-secondary)">文件关联 / COM 注册信息</text>

          <text x="50" y="156" fontSize="11" fontWeight="600" fill="var(--warning)">HKEY_CURRENT_USER</text>
          <text x="50" y="170" fontSize="9" fill="var(--text-secondary)">当前用户配置（桌面/环境变量）</text>

          <text x="50" y="192" fontSize="11" fontWeight="600" fill="var(--warning)">HKEY_LOCAL_MACHINE</text>
          <text x="50" y="206" fontSize="9" fill="var(--text-secondary)">系统全局配置（硬件/软件/安全）</text>

          <text x="50" y="228" fontSize="11" fontWeight="600" fill="var(--warning)">HKEY_USERS</text>
          <text x="50" y="242" fontSize="9" fill="var(--text-secondary)">所有用户配置档案加载集</text>

          <text x="50" y="264" fontSize="11" fontWeight="600" fill="var(--warning)">HKEY_CURRENT_CONFIG</text>
          <text x="50" y="278" fontSize="9" fill="var(--text-secondary)">当前硬件配置文件</text>

          <line x1="50" y1="292" x2="350" y2="292" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="50" y="310" fontSize="10" fill="var(--text-tertiary)">键（Key）→ 子键（SubKey）→ 值项（Value）</text>
          <text x="50" y="326" fontSize="10" fill="var(--text-tertiary)">值项 = 名称 + 类型 + 数据</text>
          <text x="50" y="342" fontSize="10" fill="var(--text-tertiary)">类型：REG_SZ / REG_DWORD / REG_BINARY</text>
          <text x="50" y="358" fontSize="10" fill="var(--text-tertiary)">API：RegOpenKey / RegQueryValue / RegSetValue</text>

          {/* 服务体系 */}
          <rect x="390" y="68" width="320" height="300" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">Windows 服务体系</text>
          <line x1="410" y1="100" x2="690" y2="100" stroke="var(--danger)" strokeWidth="0.6" strokeOpacity="0.3" />

          {/* SCM 层 */}
          <rect x="420" y="112" width="260" height="40" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="550" y="130" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">服务控制管理器 SCM</text>
          <text x="550" y="144" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">services.exe 统一管理</text>

          <text x="550" y="166" textAnchor="middle" fontSize="12" fill="var(--text-tertiary)">&darr;</text>

          {/* 服务三种启动类型 */}
          <rect x="420" y="174" width="80" height="50" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="460" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">自动</text>
          <text x="460" y="210" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">AUTO_START</text>
          <text x="460" y="220" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">开机启动</text>

          <rect x="510" y="174" width="80" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="550" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">手动</text>
          <text x="550" y="210" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">DEMAND_START</text>
          <text x="550" y="220" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">按需启动</text>

          <rect x="600" y="174" width="80" height="50" rx="6" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="640" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-tertiary)">禁用</text>
          <text x="640" y="210" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">DISABLED</text>
          <text x="640" y="220" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">不可启动</text>

          {/* 服务控制 API */}
          <line x1="410" y1="240" x2="690" y2="240" stroke="var(--danger)" strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="410" y="258" fontSize="10" fontWeight="600" fill="var(--danger)">服务控制 API</text>
          <text x="410" y="274" fontSize="9" fill="var(--text-secondary)">OpenSCManager —— 打开 SCM</text>
          <text x="410" y="288" fontSize="9" fill="var(--text-secondary)">CreateService —— 注册新服务</text>
          <text x="410" y="302" fontSize="9" fill="var(--text-secondary)">StartService —— 启动服务</text>
          <text x="410" y="316" fontSize="9" fill="var(--text-secondary)">ControlService —— 控制服务</text>
          <text x="410" y="330" fontSize="9" fill="var(--text-secondary)">QueryServiceStatus —— 查询状态</text>
          <text x="410" y="344" fontSize="9" fill="var(--text-secondary)">DeleteService —— 删除服务</text>
          <text x="410" y="362" fontSize="9" fill="var(--text-tertiary)">服务状态：停止/启动/暂停/继续</text>

          <text x={VIEW_W / 2} y="400" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            注册表 = 系统全局配置存储，服务 = 后台长驻进程管理
          </text>
          <text x={VIEW_W / 2} y="420" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：服务配置就存在注册表 HKLM\SYSTEM\CurrentControlSet\Services 下
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        注册表与服务体系——五大根键结构、SCM 服务管理器与服务控制 API 全景
      </figcaption>
    </figure>
  );
}
