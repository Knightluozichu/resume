/**
 * <MosSecurityProtectionDiagram>：访问控制矩阵 + ACL/能力表压缩存储图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function MosSecurityProtectionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="访问控制矩阵与 ACL 能力表压缩存储图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            访问控制矩阵与两种压缩存储（ACL / 能力表）
          </text>

          {/* 左侧：访问控制矩阵 */}
          <text x="180" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">访问控制矩阵（稀疏）</text>

          <rect x="40" y="70" width="300" height="160" rx="6" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" />

          <text x="90" y="90" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">file_a</text>
          <text x="160" y="90" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">file_b</text>
          <text x="230" y="90" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">printer</text>

          <text x="60" y="116" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">alice</text>
          <rect x="75" y="104" width="30" height="16" rx="2" fill="var(--success)" fillOpacity="0.3" />
          <text x="90" y="116" textAnchor="middle" fontSize="8" fill="var(--success)">rw</text>
          <rect x="145" y="104" width="30" height="16" rx="2" fill="var(--warning)" fillOpacity="0.3" />
          <text x="160" y="116" textAnchor="middle" fontSize="8" fill="var(--warning)">r</text>
          <rect x="215" y="104" width="30" height="16" rx="2" fill="var(--danger)" fillOpacity="0.3" />
          <text x="230" y="116" textAnchor="middle" fontSize="8" fill="var(--danger)">w</text>

          <text x="60" y="146" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">bob</text>
          <rect x="75" y="134" width="30" height="16" rx="2" fill="var(--warning)" fillOpacity="0.3" />
          <text x="90" y="146" textAnchor="middle" fontSize="8" fill="var(--warning)">r</text>
          <rect x="145" y="134" width="30" height="16" rx="2" fill="var(--success)" fillOpacity="0.3" />
          <text x="160" y="146" textAnchor="middle" fontSize="8" fill="var(--success)">rw</text>
          <rect x="215" y="134" width="30" height="16" rx="2" fill="var(--danger)" fillOpacity="0.3" />
          <text x="230" y="146" textAnchor="middle" fontSize="8" fill="var(--danger)">w</text>

          <text x="60" y="176" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">carol</text>
          <rect x="75" y="164" width="30" height="16" rx="2" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="0.6" />
          <text x="90" y="176" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">-</text>
          <rect x="145" y="164" width="30" height="16" rx="2" fill="var(--warning)" fillOpacity="0.3" />
          <text x="160" y="176" textAnchor="middle" fontSize="8" fill="var(--warning)">r</text>
          <rect x="215" y="164" width="30" height="16" rx="2" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="0.6" />
          <text x="230" y="176" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">-</text>

          <text x="190" y="210" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">矩阵稀疏 → 按列压缩或按行压缩</text>

          {/* 右侧上：ACL（按列） */}
          <text x="560" y="58" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">ACL 按列（挂客体）</text>

          <rect x="400" y="68" width="300" height="74" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="412" y="86" fontSize="9" fill="var(--text-tertiary)">file_a: [alice:rw, bob:r]</text>
          <text x="412" y="102" fontSize="9" fill="var(--text-tertiary)">file_b: [alice:r, bob:rw, carol:r]</text>
          <text x="412" y="118" fontSize="9" fill="var(--text-tertiary)">printer: [alice:w, bob:w]</text>
          <text x="412" y="136" fontSize="9" fill="var(--success)">撤销方便（改客体清单）/ 查主体权限慢</text>

          {/* 右侧下：能力表（按行） */}
          <text x="560" y="162" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">能力表 按行（装主体）</text>

          <rect x="400" y="172" width="300" height="74" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <text x="412" y="190" fontSize="9" fill="var(--text-tertiary)">alice: [(a,rw),(b,r),(p,w)]</text>
          <text x="412" y="206" fontSize="9" fill="var(--text-tertiary)">bob: [(a,r),(b,rw),(p,w)]</text>
          <text x="412" y="222" fontSize="9" fill="var(--text-tertiary)">carol: [(b,r)]</text>
          <text x="412" y="240" fontSize="9" fill="var(--warning)">查权限快/可传递委托 / 撤销难</text>

          {/* 底部：认证与密码学 */}
          <rect x="40" y="262" width="660" height="188" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="284" fontSize="13" fontWeight="600" fill="var(--text-primary)">认证与密码学基础</text>

          <text x="60" y="308" fontSize="11" fill="var(--danger)">错误：明文存密码 / 快哈希（MD5/SHA-256）→ GPU 每秒上亿次暴力破</text>
          <text x="60" y="328" fontSize="11" fill="var(--success)">正确：加盐 + 慢哈希（bcrypt/scrypt/argon2）</text>

          <rect x="60" y="340" width="300" height="44" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="72" y="358" fontSize="10" fontWeight="600" fill="var(--success)">加盐 salt</text>
          <text x="72" y="374" fontSize="9" fill="var(--text-tertiary)">每用户随机盐 → 相同密码哈希不同 → 防彩虹表</text>

          <rect x="380" y="340" width="300" height="44" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="392" y="358" fontSize="10" fontWeight="600" fill="var(--accent)">慢哈希 slow hash</text>
          <text x="392" y="374" fontSize="9" fill="var(--text-tertiary)">单次百毫秒 → GPU 破解速度降万倍 → 8 位从秒破变千年</text>

          <text x="60" y="408" fontSize="11" fontWeight="600" fill="var(--text-primary)">安全设计两铁律</text>
          <text x="60" y="428" fontSize="10" fill="var(--warning)">最小权限：进程只给完成任务所需最小权限（服务不以 root 跑）</text>
          <text x="60" y="444" fontSize="10" fill="var(--accent)">纵深防御：多层独立防护，一层被破不致全盘崩（隔离+SELinux+防火墙+审计）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        访问控制矩阵及其 ACL/能力表两种压缩存储，加盐慢哈希与最小权限/纵深防御原则
      </figcaption>
    </figure>
  );
}
