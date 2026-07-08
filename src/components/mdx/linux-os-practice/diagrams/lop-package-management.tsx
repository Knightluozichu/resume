/**
 * <LopPackageManagementDiagram>：包管理——apt/yum/dnf 机制对比图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function LopPackageManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux包管理apt与yum/dnf机制对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            包管理：软件包生命周期与仓库机制
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            仓库索引 &gt; 依赖解析 &gt; 下载安装 &gt; 更新卸载
          </text>

          {/* Debian系 */}
          <rect x="40" y="70" width="320" height="200" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="200" y="94" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--warning)">Debian 系（apt/dpkg）</text>
          <text x="60" y="118" fontSize="11" fill="var(--text-secondary)">Ubuntu / Debian / Mint</text>
          <text x="60" y="140" fontSize="11" fill="var(--success)" fontFamily="monospace">apt update          # 刷新仓库索引</text>
          <text x="60" y="158" fontSize="11" fill="var(--success)" fontFamily="monospace">apt install nginx   # 安装包</text>
          <text x="60" y="176" fontSize="11" fill="var(--success)" fontFamily="monospace">apt upgrade         # 升级所有包</text>
          <text x="60" y="194" fontSize="11" fill="var(--success)" fontFamily="monospace">apt remove nginx    # 卸载包</text>
          <text x="60" y="212" fontSize="11" fill="var(--success)" fontFamily="monospace">apt search keyword  # 搜索包</text>
          <text x="60" y="234" fontSize="10" fill="var(--text-tertiary)">包格式: .deb  |  底层: dpkg</text>
          <text x="60" y="252" fontSize="10" fill="var(--text-tertiary)">仓库: /etc/apt/sources.list</text>

          {/* RHEL系 */}
          <rect x="380" y="70" width="320" height="200" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="540" y="94" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">RHEL 系（dnf/yum/rpm）</text>
          <text x="400" y="118" fontSize="11" fill="var(--text-secondary)">RHEL / CentOS / Fedora</text>
          <text x="400" y="140" fontSize="11" fill="var(--success)" fontFamily="monospace">dnf check-update     # 检查更新</text>
          <text x="400" y="158" fontSize="11" fill="var(--success)" fontFamily="monospace">dnf install nginx    # 安装包</text>
          <text x="400" y="176" fontSize="11" fill="var(--success)" fontFamily="monospace">dnf upgrade          # 升级所有包</text>
          <text x="400" y="194" fontSize="11" fill="var(--success)" fontFamily="monospace">dnf remove nginx     # 卸载包</text>
          <text x="400" y="212" fontSize="11" fill="var(--success)" fontFamily="monospace">dnf search keyword   # 搜索包</text>
          <text x="400" y="234" fontSize="10" fill="var(--text-tertiary)">包格式: .rpm  |  底层: rpm</text>
          <text x="400" y="252" fontSize="10" fill="var(--text-tertiary)">仓库: /etc/yum.repos.d/</text>

          {/* 依赖解析流程 */}
          <rect x="40" y="290" width="660" height="130" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="60" y="314" fontSize="13" fontWeight="600" fill="var(--danger)">依赖解析流程（以 apt install nginx 为例）</text>

          <rect x="60" y="328" width="110" height="32" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="115" y="348" textAnchor="middle" fontSize="10" fill="var(--warning)">读取本地索引</text>

          <text x="185" y="348" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="205" y="328" width="110" height="32" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="260" y="348" textAnchor="middle" fontSize="10" fill="var(--accent)">构建依赖树</text>

          <text x="330" y="348" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="350" y="328" width="110" height="32" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="405" y="348" textAnchor="middle" fontSize="10" fill="var(--danger)">下载.deb包</text>

          <text x="475" y="348" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="495" y="328" width="110" height="32" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="550" y="348" textAnchor="middle" fontSize="10" fill="var(--success)">解包+配置+注册</text>

          <text x="630" y="348" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="645" y="328" width="40" height="32" rx="6" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="665" y="348" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">done</text>

          <text x="60" y="388" fontSize="10" fill="var(--text-tertiary)">包管理器自动处理依赖关系：缺少的依赖自动安装，冲突的包自动解决</text>
          <text x="60" y="406" fontSize="10" fill="var(--text-tertiary)">apt/dnf 是高层前端（含依赖解析+仓库），dpkg/rpm 是底层工具（单包操作）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        包管理图解——apt/dnf软件包生命周期、仓库索引与依赖解析流程
      </figcaption>
    </figure>
  );
}
