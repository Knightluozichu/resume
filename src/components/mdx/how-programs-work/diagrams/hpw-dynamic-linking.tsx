/**
 * <HpwDynamicLinkingDiagram>：动态链接图解（静态 vs 动态 + 共享映射 + PLT/GOT 延迟绑定）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function HpwDynamicLinkingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="动态链接图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            静态链接 vs 动态链接
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            动态链接：库代码只读段多进程共享同一物理页
          </text>

          {/* 左侧：静态链接 */}
          <rect x="40" y="68" width="320" height="170" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="200" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">静态链接：每个程序拷一份库代码</text>

          {[
            { y: 104, label: "程序 A" },
            { y: 168, label: "程序 B" },
          ].map((p) => (
            <g key={p.label}>
              <rect x="60" y={p.y} width="120" height="48" rx="4" fill="var(--bg-secondary)" stroke="var(--danger)" strokeWidth="1" />
              <text x="120" y={p.y + 20} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">{p.label}</text>
              <text x="120" y={p.y + 36} textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">自有代码</text>
              <rect x="190" y={p.y} width="100" height="48" rx="4" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1" />
              <text x="240" y={p.y + 20} textAnchor="middle" fontSize="10" fill="var(--danger)">printf 拷贝</text>
              <text x="240" y={p.y + 36} textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">完整拷贝</text>
            </g>
          ))}
          <text x="200" y="232" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">2 个程序 = 2 份 printf，内存浪费</text>

          {/* 右侧：动态链接 */}
          <rect x="380" y="68" width="320" height="170" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="540" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">动态链接：多进程共享一份库代码</text>

          <rect x="400" y="104" width="120" height="48" rx="4" fill="var(--bg-secondary)" stroke="var(--success)" strokeWidth="1" />
          <text x="460" y="124" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">程序 A</text>
          <text x="460" y="140" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">自有代码</text>

          <rect x="400" y="168" width="120" height="48" rx="4" fill="var(--bg-secondary)" stroke="var(--success)" strokeWidth="1" />
          <text x="460" y="188" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">程序 B</text>
          <text x="460" y="204" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">自有代码</text>

          {/* 共享库 */}
          <rect x="550" y="124" width="130" height="72" rx="6" fill="var(--success)" fillOpacity="0.20" stroke="var(--success)" strokeWidth="1.4" />
          <text x="615" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">libc.so</text>
          <text x="615" y="164" textAnchor="middle" fontSize="10" fill="var(--success)">printf 代码段</text>
          <text x="615" y="180" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">只读，1 份共享</text>
          <path d="M 520 128 L 550 150" stroke="var(--success)" strokeWidth="1.2" fill="none" markerEnd="url(#dlArrow)" />
          <path d="M 520 192 L 550 172" stroke="var(--success)" strokeWidth="1.2" fill="none" markerEnd="url(#dlArrow)" />
          <defs>
            <marker id="dlArrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="var(--success)" />
            </marker>
          </defs>
          <text x="540" y="232" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">N 个进程共用 1 份 printf，省内存</text>

          {/* 下方：PLT/GOT 延迟绑定 */}
          <rect x="40" y="254" width="660" height="150" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="276" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">PLT/GOT 延迟绑定：首次调用才解析符号</text>

          {[
            { x: 60, step: "①", title: "首次调用", desc: "跳 PLT 项 → GOT 存的是\n「回动态链接器解析」入口" },
            { x: 250, step: "②", title: "解析符号", desc: "动态链接器找到 printf\n真实地址，写进 GOT" },
            { x: 440, step: "③", title: "再次调用", desc: "直接经 GOT 跳到 printf\n无解析开销" },
          ].map((s) => (
            <g key={s.step}>
              <rect x={s.x} y="290" width="200" height="86" rx="6" fill="var(--bg-secondary)" stroke="var(--accent)" strokeWidth="1" />
              <text x={s.x + 14} y="310" fontSize="12" fontWeight="600" fill="var(--accent)">{s.step} {s.title}</text>
              {s.desc.split("\n").map((line, j) => (
                <text key={j} x={s.x + 14} y={330 + j * 16} fontSize="10" fill="var(--text-secondary)">{line}</text>
              ))}
            </g>
          ))}
          <text x="370" y="394" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">没用到的库函数永不解析 → 启动更快（立即绑定则加载时全解析，启动慢）</text>

          <text x={VIEW_W / 2} y="430" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：代码段只读可共享，数据段靠写时复制各进程独立
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        动态链接——静态/动态对比、共享映射与 PLT/GOT 延迟绑定
      </figcaption>
    </figure>
  );
}
