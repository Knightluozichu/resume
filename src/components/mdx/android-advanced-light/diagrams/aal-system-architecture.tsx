/**
 * <AalSystemArchitectureDiagram>：Android系统五层架构图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function AalSystemArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android系统五层架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android系统五层架构
          </text>

          {/* 第一层：System Apps */}
          <rect x="60" y="50" width="620" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="72" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--success)">System Apps（系统应用层）</text>
          <text x="370" y="90" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Launcher / Settings / Phone / Contacts / Browser</text>
          <text x="370" y="102" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">开发者通过 Intent 调用系统应用</text>

          {/* 第二层：Java API Framework */}
          <rect x="60" y="120" width="620" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="142" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">Java API Framework（应用框架层）</text>
          <text x="370" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Activity Manager / Window Manager / Package Manager / View System</text>
          <text x="370" y="172" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Content Provider / Notification Manager / Resource Manager</text>

          {/* 第三层：Native C/C++ Libraries & Android Runtime */}
          <rect x="60" y="190" width="300" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="210" y="212" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Native C/C++ Libraries</text>
          <text x="210" y="230" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">OpenGL ES / SQLite / WebKit</text>
          <text x="210" y="242" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Surface Flinger / Media Framework</text>

          <rect x="380" y="190" width="300" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="530" y="212" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Android Runtime</text>
          <text x="530" y="230" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Core Libraries（核心类库）</text>
          <text x="530" y="242" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ART虚拟机（AOT + JIT编译）</text>

          {/* 第四层：HAL */}
          <rect x="60" y="260" width="620" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="282" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--warning)">Hardware Abstraction Layer（硬件抽象层）</text>
          <text x="370" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Camera / Bluetooth / Audio / Display / Sensor HAL</text>
          <text x="370" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">为上层提供统一硬件接口，屏蔽厂商差异</text>

          {/* 第五层：Linux Kernel */}
          <rect x="60" y="330" width="620" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="352" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">Linux Kernel（Linux内核层）</text>
          <text x="370" y="370" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Binder驱动 / Display驱动 / Camera驱动 / WiFi驱动</text>
          <text x="370" y="382" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Power Management / 进程调度 / 内存管理</text>

          {/* 箭头标注 */}
          <text x="30" y="82" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)" transform="rotate(-90 30 82)">用户空间</text>
          <text x="30" y="280" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)" transform="rotate(-90 30 280)">内核空间</text>
          <line x1="45" y1="60" x2="45" y2="330" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="45" y1="330" x2="45" y2="380" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />

          <text x="370" y="420" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从上到下依次调用，下层为上层提供服务</text>
          <text x="370" y="438" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Binder IPC 是跨进程通信的核心桥梁</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android系统五层架构——系统应用、应用框架、原生库与运行时、硬件抽象层、Linux内核
      </figcaption>
    </figure>
  );
}
