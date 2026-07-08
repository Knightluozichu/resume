/**
 * <LopSystemdServicesDiagram>：systemd 服务管理——Unit/Target/生命周期图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function LopSystemdServicesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux systemd服务管理Unit与生命周期图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            systemd 服务管理：Unit 类型与生命周期
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            systemd (PID 1) &gt; Unit 单元 &gt; 状态流转 &gt; 开机自启
          </text>

          {/* systemd 架构 */}
          <rect x="40" y="70" width="660" height="80" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="60" y="94" fontSize="13" fontWeight="600" fill="var(--accent)">systemd = PID 1（init 进程），管理所有系统资源为「Unit」</text>

          <rect x="60" y="108" width="130" height="30" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="125" y="128" textAnchor="middle" fontSize="10" fill="var(--warning)">.service 服务</text>

          <rect x="210" y="108" width="130" height="30" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="275" y="128" textAnchor="middle" fontSize="10" fill="var(--success)">.target 目标组</text>

          <rect x="360" y="108" width="130" height="30" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="425" y="128" textAnchor="middle" fontSize="10" fill="var(--danger)">.socket 套接字</text>

          <rect x="510" y="108" width="170" height="30" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="595" y="128" textAnchor="middle" fontSize="10" fill="var(--accent)">.timer/.mount/.device</text>

          {/* 服务生命周期 */}
          <rect x="40" y="170" width="660" height="110" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="60" y="194" fontSize="13" fontWeight="600" fill="var(--success)">服务状态生命周期</text>

          <rect x="60" y="208" width="90" height="32" rx="6" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="105" y="228" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">inactive</text>

          <text x="165" y="228" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="185" y="208" width="90" height="32" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="230" y="228" textAnchor="middle" fontSize="10" fill="var(--warning)">activating</text>

          <text x="290" y="228" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="310" y="208" width="90" height="32" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="355" y="228" textAnchor="middle" fontSize="10" fill="var(--success)">active(running)</text>

          <text x="415" y="228" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="435" y="208" width="90" height="32" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="480" y="228" textAnchor="middle" fontSize="10" fill="var(--danger)">deactivating</text>

          <text x="540" y="228" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="560" y="208" width="90" height="32" rx="6" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="605" y="228" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">failed/inactive</text>

          <text x="60" y="260" fontSize="10" fill="var(--text-tertiary)">start: inactive → activating → active(running)</text>
          <text x="60" y="276" fontSize="10" fill="var(--text-tertiary)">stop:  active → deactivating → inactive（异常退出则为 failed）</text>

          {/* 核心命令 */}
          <rect x="40" y="300" width="320" height="120" rx="10" fill="var(--bg-secondary)" fillOpacity="0.5" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="324" fontSize="13" fontWeight="600" fill="var(--text-primary)">核心命令</text>
          <text x="60" y="346" fontSize="10" fill="var(--success)" fontFamily="monospace">systemctl start nginx   # 启动</text>
          <text x="60" y="362" fontSize="10" fill="var(--danger)" fontFamily="monospace">systemctl stop nginx    # 停止</text>
          <text x="60" y="378" fontSize="10" fill="var(--accent)" fontFamily="monospace">systemctl restart nginx # 重启</text>
          <text x="60" y="394" fontSize="10" fill="var(--warning)" fontFamily="monospace">systemctl enable nginx  # 开机自启</text>
          <text x="60" y="410" fontSize="10" fill="var(--text-tertiary)" fontFamily="monospace">systemctl status nginx  # 查看状态</text>

          {/* Unit 文件 */}
          <rect x="380" y="300" width="320" height="120" rx="10" fill="var(--bg-secondary)" fillOpacity="0.5" stroke="var(--border)" strokeWidth="1" />
          <text x="400" y="324" fontSize="13" fontWeight="600" fill="var(--text-primary)">Unit 文件结构</text>
          <text x="400" y="346" fontSize="10" fill="var(--success)" fontFamily="monospace">[Unit]</text>
          <text x="400" y="360" fontSize="10" fill="var(--text-tertiary)" fontFamily="monospace">  Description=Web Server</text>
          <text x="400" y="376" fontSize="10" fill="var(--accent)" fontFamily="monospace">[Service]</text>
          <text x="400" y="390" fontSize="10" fill="var(--text-tertiary)" fontFamily="monospace">  ExecStart=/usr/sbin/nginx</text>
          <text x="400" y="406" fontSize="10" fill="var(--warning)" fontFamily="monospace">[Install]</text>
          <text x="400" y="420" fontSize="10" fill="var(--text-tertiary)" fontFamily="monospace">  WantedBy=multi-user.target</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        systemd服务管理图解——Unit类型、服务生命周期与Unit文件结构
      </figcaption>
    </figure>
  );
}
