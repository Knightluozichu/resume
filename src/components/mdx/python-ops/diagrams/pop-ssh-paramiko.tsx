/**
 * <PopSshParamikoDiagram>：paramiko SSH 批量执行流程。
 *
 * 上半：单机 SSH 四步（connect → exec_command → 读输出 → close）。
 * 下半：批量执行（循环多主机 + 并发）与安全要点。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const STEPS = [
  { x: 36, w: 156, color: accent, title: "① connect", body: "SSHClient.connect(\n  host, pkey=...)" },
  { x: 212, w: 156, color: success, title: "② exec_command", body: "stdin,stdout,stderr\n= exec_command(cmd)" },
  { x: 388, w: 156, color: warning, title: "③ 读输出", body: "stdout.read()\n判断 returncode" },
  { x: 564, w: 120, color: danger, title: "④ close", body: "释放连接" },
];

export function PopSshParamikoDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="paramiko SSH流程：connect连接、exec_command执行、读输出、close关闭；批量循环多主机可并发。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            paramiko：SSH 远程执行与批量管理
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill={secondary}>
            一台台手敲 ssh 已过时——用代码批量、可重复地管几百台机器
          </text>

          {/* 单机四步 */}
          <text x={48} y={80} fontSize="12" fontWeight="700" fill={secondary}>
            单机 SSH 四步
          </text>
          {STEPS.map((s, i) => {
            const lines = s.body.split("\n");
            return (
              <g key={s.title}>
                <rect x={s.x} y={88} width={s.w} height={76} rx="8" fill={s.color} fillOpacity="0.10" stroke={s.color} strokeWidth="1.4" strokeOpacity="0.55" />
                <text x={s.x + s.w / 2} y={110} textAnchor="middle" fontSize="12" fontWeight="700" fill={s.color}>
                  {s.title}
                </text>
                {lines.map((ln, li) => (
                  <text key={li} x={s.x + s.w / 2} y={130 + li * 16} textAnchor="middle" fontSize="10" fill={primary}>
                    {ln}
                  </text>
                ))}
                {i < STEPS.length - 1 && (
                  <line x1={s.x + s.w + 2} y1={126} x2={STEPS[i + 1].x - 6} y2={126} stroke={accent} strokeWidth="1.6" markerEnd="url(#pop-ssh-arrow)" />
                )}
              </g>
            );
          })}

          {/* 批量执行 */}
          <text x={48} y={196} fontSize="12" fontWeight="700" fill={secondary}>
            批量执行（循环 + 并发）
          </text>
          <line x1={32} y1={190} x2={VIEW_W - 32} y2={190} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <rect x={48} y={208} width={624} height={92} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={64} y={232} fontSize="11" fontWeight="600" fill={accent}>for host in hosts:</text>
          <text x={88} y={252} fontSize="11" fill={primary}>ssh.connect(host, pkey=key)</text>
          <text x={88} y={270} fontSize="11" fill={primary}>_, out, _ = ssh.exec_command('uptime')</text>
          <text x={88} y={288} fontSize="11" fill={primary}>results[host] = out.read().decode()   # 收集结果</text>
          <text x={400} y={232} fontSize="11" fontWeight="700" fill={success}>→ 串行慢</text>
          <text x={400} y={252} fontSize="11" fill={success}>ThreadPoolExecutor 并发</text>
          <text x={400} y={270} fontSize="11" fill={success}>几百台机器几分钟搞定</text>
          <text x={400} y={288} fontSize="11" fill={warning}>注意：限并发数 + 超时 + 错误隔离</text>

          <defs>
            <marker id="pop-ssh-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={318} x2={VIEW_W - 32} y2={318} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={340} textAnchor="middle" fontSize="11" fill={danger}>
            安全：用密钥认证不用密码、设 AutoAddPolicy 或管好 known_hosts、密钥不进 git
          </text>
          <text x={VIEW_W / 2} y={360} textAnchor="middle" fontSize="11" fill={secondary}>
            批量执行要：限并发数避免压垮目标、设超时、单台失败不中断整体（错误隔离）
          </text>
          <text x={VIEW_W / 2} y={380} textAnchor="middle" fontSize="11" fill={secondary}>
            需传文件用 SFTP（ssh.open_sftp）；复杂配置管理上 Ansible
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        paramiko 的 SSH 远程执行与批量管理流程。
      </figcaption>
    </figure>
  );
}
