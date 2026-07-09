/**
 * <DakInitBootDiagram>：Android系统启动流程图解（init → Zygote → system_server）。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function DakInitBootDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android系统启动流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android系统启动全流程
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            BootROM → Bootloader → Kernel → init → Zygote → system_server → Launcher
          </text>

          {/* Step 1: BootROM / Bootloader */}
          <rect x="120" y="68" width="500" height="44" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="88" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">BootROM &rarr; Bootloader</text>
          <text x="370" y="104" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">上电自检 → 加载 bootloader → 初始化硬件 → 加载内核</text>

          <text x="370" y="128" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* Step 2: Linux Kernel */}
          <rect x="120" y="138" width="500" height="44" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="158" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">Linux Kernel 启动</text>
          <text x="370" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">初始化驱动 / 挂载文件系统 / 启动 init 进程（PID=1）</text>

          <text x="370" y="198" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* Step 3: init */}
          <rect x="120" y="208" width="500" height="44" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="228" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">init 进程（PID=1）</text>
          <text x="370" y="244" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">解析 init.rc → 启动关键守护进程 → 启动 Zygote</text>

          <text x="370" y="268" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* Step 4: Zygote */}
          <rect x="120" y="278" width="500" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="298" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Zygote 进程孵化器</text>
          <text x="370" y="314" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">预加载资源/类库 → 启动 ART → fork system_server → fork 应用进程（COW）</text>

          <text x="370" y="338" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* Step 5: system_server */}
          <rect x="120" y="348" width="500" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="368" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">system_server 进程</text>
          <text x="370" y="384" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">启动 AMS / PMS / WMS 等核心服务 → 注册到 ServiceManager</text>

          <text x="370" y="408" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* Step 6: Launcher */}
          <rect x="120" y="418" width="500" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="438" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Launcher 桌面</text>
          <text x="370" y="454" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">AMS 启动 Launcher → 显示桌面 → 系统启动完成</text>

          {/* 侧标注 */}
          <text x="650" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)" transform="rotate(0 650 300)">fork + COW</text>
          <text x="650" y="370" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Binder 注册</text>

          <text x="370" y="490" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Zygote 用 fork + COW（写时复制）快速创建进程，避免重复加载资源</text>
          <text x="370" y="508" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">system_server 承载所有系统核心服务，App 进程由 Zygote fork 产生</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android启动流程——从BootROM到Launcher，init解析rc、Zygote fork孵化、system_server启动核心服务
      </figcaption>
    </figure>
  );
}
