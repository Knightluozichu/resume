/**
 * <LopCommandLineDiagram>：命令行基础——终端交互流程图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function LopCommandLineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Linux命令行基础终端交互流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            命令行基础：Shell 交互模型
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            用户输入 &gt; Shell解析 &gt; 内核执行 &gt; 输出结果
          </text>

          {/* 用户层 */}
          <rect x="40" y="70" width="140" height="70" rx="10" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="110" y="96" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">用户</text>
          <text x="110" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">键入命令</text>
          <text x="110" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">$ ls -la /home</text>

          {/* Shell 层 */}
          <rect x="240" y="70" width="180" height="70" rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="330" y="96" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Shell（Bash）</text>
          <text x="330" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">词法分析：拆分命令+参数</text>
          <text x="330" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">路径查找：PATH中定位ls</text>

          {/* 内核层 */}
          <rect x="480" y="70" width="180" height="70" rx="10" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="570" y="96" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Linux 内核</text>
          <text x="570" y="116" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">系统调用：read目录项</text>
          <text x="570" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">返回 inode 列表</text>

          {/* 箭头 */}
          <text x="205" y="108" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>
          <text x="450" y="108" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 输出区 */}
          <rect x="120" y="170" width="500" height="110" rx="10" fill="var(--bg-secondary)" fillOpacity="0.5" stroke="var(--border)" strokeWidth="1" />
          <text x="140" y="192" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">drwxr-xr-x  2 user user 4096  Documents</text>
          <text x="140" y="210" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">-rw-r--r--  1 user user  812  notes.txt</text>
          <text x="140" y="228" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">drwxr-xr-x  3 user user 4096  projects</text>
          <text x="140" y="246" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">-rwxr-xr-x  1 user user  256  deploy.sh</text>
          <text x="140" y="268" fontSize="10" fill="var(--text-tertiary)">stdout 标准输出回显到终端</text>

          {/* 命令结构解析 */}
          <rect x="40" y="300" width="660" height="100" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="60" y="322" fontSize="13" fontWeight="600" fill="var(--success)">命令结构：command [options] [arguments]</text>

          <text x="80" y="348" fontSize="12" fill="var(--warning)" fontWeight="600">ls</text>
          <text x="80" y="366" fontSize="10" fill="var(--text-secondary)">命令名</text>

          <text x="170" y="348" fontSize="12" fill="var(--accent)" fontWeight="600">-la</text>
          <text x="170" y="366" fontSize="10" fill="var(--text-secondary)">选项（短/l 长--long）</text>

          <text x="330" y="348" fontSize="12" fill="var(--danger)" fontWeight="600">/home</text>
          <text x="330" y="366" fontSize="10" fill="var(--text-secondary)">参数（目标路径）</text>

          <text x="490" y="348" fontSize="12" fill="var(--text-primary)" fontFamily="monospace">| &gt; &amp;</text>
          <text x="490" y="366" fontSize="10" fill="var(--text-secondary)">管道/重定向/后台</text>

          <text x={VIEW_W / 2} y="392" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            核心模型：Shell 是用户与内核之间的「命令翻译器」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        命令行基础——Shell交互模型：命令解析、路径查找、内核执行与输出回显
      </figcaption>
    </figure>
  );
}
