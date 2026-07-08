/**
 * <LopFilePermissionsDiagram>：文件权限 rwx 与 ACL 机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function LopFilePermissionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux文件权限rwx与ACL机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            文件权限：rwx 三元组与 ACL 扩展
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            基本权限 UGO 模型 &gt; 数字表示法 &gt; ACL 精细化控制
          </text>

          {/* 权限位拆解 */}
          <rect x="40" y="70" width="660" height="110" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="60" y="92" fontSize="13" fontWeight="600" fill="var(--accent)">权限位拆解：以 drwxr-xr-- 为例</text>

          <rect x="60" y="105" width="50" height="40" rx="6" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="85" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">d</text>
          <text x="85" y="158" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">类型</text>

          <rect x="125" y="105" width="120" height="40" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="185" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">rwx</text>
          <text x="185" y="158" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">所有者(user)</text>

          <rect x="260" y="105" width="120" height="40" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="320" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">r-x</text>
          <text x="320" y="158" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">组(group)</text>

          <rect x="395" y="105" width="120" height="40" rx="6" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="455" y="130" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">r--</text>
          <text x="455" y="158" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">其他(other)</text>

          <text x="545" y="125" fontSize="11" fill="var(--text-secondary)">数字: 754</text>
          <text x="545" y="142" fontSize="10" fill="var(--text-tertiary)">r=4 w=2 x=1</text>

          {/* rwx 含义 */}
          <rect x="40" y="200" width="320" height="100" rx="10" fill="var(--bg-secondary)" fillOpacity="0.5" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="222" fontSize="13" fontWeight="600" fill="var(--text-primary)">rwx 对文件 / 目录的含义</text>
          <text x="60" y="244" fontSize="11" fill="var(--success)">r(read): 文件→读内容 / 目录→列文件名</text>
          <text x="60" y="264" fontSize="11" fill="var(--accent)">w(write): 文件→改内容 / 目录→增删文件</text>
          <text x="60" y="284" fontSize="11" fill="var(--danger)">x(execute): 文件→可执行 / 目录→可进入(cd)</text>

          {/* ACL */}
          <rect x="380" y="200" width="320" height="100" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="400" y="222" fontSize="13" fontWeight="600" fill="var(--warning)">ACL 精细化控制</text>
          <text x="400" y="244" fontSize="10" fill="var(--text-secondary)">setfacl -m u:alice:rw file</text>
          <text x="400" y="262" fontSize="10" fill="var(--text-secondary)">getfacl file  查看ACL列表</text>
          <text x="400" y="280" fontSize="10" fill="var(--text-tertiary)">突破UGO三组限制，按用户/组授权</text>

          {/* 修改命令 */}
          <rect x="40" y="320" width="660" height="100" rx="10" fill="var(--bg-secondary)" fillOpacity="0.5" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="342" fontSize="13" fontWeight="600" fill="var(--text-primary)">权限修改命令</text>
          <text x="60" y="365" fontSize="11" fill="var(--success)" fontFamily="monospace">chmod 754 file      # 数字法：rwxr-xr--</text>
          <text x="60" y="385" fontSize="11" fill="var(--accent)" fontFamily="monospace">chmod u+x,g-w file  # 符号法：所有者加x，组减w</text>
          <text x="60" y="405" fontSize="11" fill="var(--warning)" fontFamily="monospace">chown user:group file  # 改所有者和组</text>

          <text x={VIEW_W / 2} y="430" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            核心模型：权限 = 身份分组(UGO) &times; 操作位(rwx)，ACL 是精细化补充
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        文件权限图解——rwx三元组、数字表示法、ACL精细化授权
      </figcaption>
    </figure>
  );
}
