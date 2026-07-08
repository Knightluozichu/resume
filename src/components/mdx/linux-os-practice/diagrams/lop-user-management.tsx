/**
 * <LopUserManagementDiagram>：用户管理——用户/组/sudo 提权机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function LopUserManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux用户管理与sudo提权机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            用户管理：UID/GID 与 sudo 提权
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            用户账户 &gt; 组归属 &gt; 权限分离 &gt; sudo 临时提权
          </text>

          {/* 用户与组 */}
          <rect x="40" y="70" width="200" height="130" rx="10" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="94" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">用户（User）</text>
          <text x="140" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">UID 唯一标识</text>
          <text x="140" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">root UID=0（超级用户）</text>
          <text x="140" y="148" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">普通用户 UID&gt;=1000</text>
          <text x="140" y="168" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">/etc/passwd</text>
          <text x="140" y="184" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">/etc/shadow</text>

          {/* 组 */}
          <rect x="270" y="70" width="200" height="130" rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="94" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">组（Group）</text>
          <text x="370" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">GID 唯一标识</text>
          <text x="370" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">主组：用户创建时指定</text>
          <text x="370" y="148" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">附加组：可加入多个</text>
          <text x="370" y="168" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">/etc/group</text>
          <text x="370" y="184" textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">usermod -aG sudo bob</text>

          {/* 文件权限关联 */}
          <rect x="500" y="70" width="200" height="130" rx="10" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="600" y="94" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">权限关联</text>
          <text x="600" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">文件属主 = UID</text>
          <text x="600" y="132" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">文件属组 = GID</text>
          <text x="600" y="148" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">进程以 UID 身份运行</text>
          <text x="600" y="168" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">内核比对 UID/GID</text>
          <text x="600" y="184" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">决定能否读写执行</text>

          {/* sudo 提权流程 */}
          <rect x="40" y="220" width="660" height="120" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="60" y="244" fontSize="13" fontWeight="600" fill="var(--success)">sudo 提权流程（最小权限原则）</text>

          <rect x="60" y="258" width="130" height="36" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="125" y="280" textAnchor="middle" fontSize="10" fill="var(--warning)">普通用户执行 sudo</text>

          <text x="205" y="280" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="225" y="258" width="130" height="36" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="290" y="280" textAnchor="middle" fontSize="10" fill="var(--accent)">查 /etc/sudoers</text>

          <text x="370" y="280" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="390" y="258" width="130" height="36" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="455" y="280" textAnchor="middle" fontSize="10" fill="var(--danger)">验证密码+规则</text>

          <text x="535" y="280" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="555" y="258" width="125" height="36" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="617" y="280" textAnchor="middle" fontSize="10" fill="var(--success)">以root执行命令</text>

          <text x="60" y="320" fontSize="10" fill="var(--text-tertiary)">关键：sudo 允许授权用户临时以 root 身份执行特定命令，无需共享 root 密码</text>

          {/* 管理命令 */}
          <rect x="40" y="355" width="660" height="70" rx="10" fill="var(--bg-secondary)" fillOpacity="0.5" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="377" fontSize="12" fontWeight="600" fill="var(--text-primary)">核心命令</text>
          <text x="60" y="398" fontSize="11" fill="var(--success)" fontFamily="monospace">useradd -m -s /bin/bash bob  # 创建用户+家目录+Shell</text>
          <text x="60" y="416" fontSize="11" fill="var(--accent)" fontFamily="monospace">usermod -aG docker bob  # 加入docker附加组</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        用户管理图解——UID/GID身份系统、权限关联与sudo最小权限提权
      </figcaption>
    </figure>
  );
}
