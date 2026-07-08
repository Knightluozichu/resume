/**
 * <LopFinalReviewDiagram>：全书总复习——一台服务器从装好到上线全链路图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function LopFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux操作系统实战全书总复习全链路图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书总复习：一台服务器从装好到上线
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            命令行 &gt; 权限 &gt; 用户 &gt; 包管理 &gt; 网络 &gt; 防火墙 &gt; 服务 &gt; 脚本
          </text>

          <rect x="30" y="64" width="680" height="376" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一步：系统安装与命令行 */}
          <rect x="50" y="80" width="310" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="60" y="100" fontSize="12" fontWeight="600" fill="var(--warning)">1. 命令行基础（第1章）</text>
          <text x="60" y="118" fontSize="10" fill="var(--text-secondary)">终端操作：ls/cd/cp/rm/grep/管道重定向</text>

          <rect x="380" y="80" width="310" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="390" y="100" fontSize="12" fontWeight="600" fill="var(--warning)">2. 文件权限（第2章）</text>
          <text x="390" y="118" fontSize="10" fill="var(--text-secondary)">rwx/UGO/chmod 755/setfacl ACL授权</text>

          <text x="205" y="146" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="146" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二步：用户与包管理 */}
          <rect x="50" y="158" width="310" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="60" y="178" fontSize="12" fontWeight="600" fill="var(--accent)">3. 用户管理（第3章）</text>
          <text x="60" y="196" fontSize="10" fill="var(--text-secondary)">useradd/usermod/sudo提权/SSH密钥</text>

          <rect x="380" y="158" width="310" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="390" y="178" fontSize="12" fontWeight="600" fill="var(--accent)">4. 包管理（第4章）</text>
          <text x="390" y="196" fontSize="10" fill="var(--text-secondary)">apt install nginx/dnf update/依赖解析</text>

          <text x="205" y="224" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="224" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三步：网络与防火墙 */}
          <rect x="50" y="236" width="310" height="48" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="60" y="256" fontSize="12" fontWeight="600" fill="var(--danger)">5. 网络配置（第5章）</text>
          <text x="60" y="274" fontSize="10" fill="var(--text-secondary)">ip addr/netplan配置/网关路由/DNS</text>

          <rect x="380" y="236" width="310" height="48" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="390" y="256" fontSize="12" fontWeight="600" fill="var(--danger)">6. 防火墙安全（第6章）</text>
          <text x="390" y="274" fontSize="10" fill="var(--text-secondary)">ufw allow 22/ufw deny 3306/iptables链</text>

          <text x="205" y="302" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="302" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四步：服务与脚本 */}
          <rect x="50" y="314" width="310" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="60" y="334" fontSize="12" fontWeight="600" fill="var(--success)">7. systemd服务（第7章）</text>
          <text x="60" y="352" fontSize="10" fill="var(--text-secondary)">systemctl enable nginx/Unit文件/开机自启</text>

          <rect x="380" y="314" width="310" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="390" y="334" fontSize="12" fontWeight="600" fill="var(--success)">8. Shell脚本（第8章）</text>
          <text x="390" y="352" fontSize="10" fill="var(--text-secondary)">自动化备份/日志清理/监控脚本/crontab</text>

          <text x="205" y="380" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="380" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 最终成果 */}
          <rect x="130" y="392" width="480" height="38" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" />
          <text x="370" y="416" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">
            服务器上线：安全配置 + 服务运行 + 自动化运维
          </text>

          <text x={VIEW_W / 2} y="448" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            八章知识串成一条线：从裸机命令行到生产级运维
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习——一台服务器从装好到上线的八步全链路
      </figcaption>
    </figure>
  );
}
