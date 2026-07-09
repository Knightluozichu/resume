/**
 * <AalFinalReviewDiagram>：全书知识图谱与选型矩阵图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function AalFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android进阶之光全书知识图谱图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android进阶之光——全书知识图谱
          </text>

          {/* 中心节点 */}
          <circle cx="370" cy="270" r="50" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="266" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">Android</text>
          <text x="370" y="282" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">进阶体系</text>

          {/* 六大分支 */}
          {/* 架构层 */}
          <rect x="30" y="50" width="170" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">架构层</text>
          <text x="115" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">五层架构 / 系统启动</text>
          <text x="115" y="104" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Linux内核 / HAL</text>
          <line x1="200" y1="95" x2="325" y2="245" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />

          {/* 虚拟机层 */}
          <rect x="30" y="160" width="170" height="60" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="115" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">虚拟机层</text>
          <text x="115" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Dalvik / ART</text>
          <text x="115" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DEX / AOT / JIT / GC</text>
          <line x1="200" y1="190" x2="325" y2="260" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />

          {/* 通信层 */}
          <rect x="30" y="270" width="170" height="60" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="115" y="292" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">通信层</text>
          <text x="115" y="310" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Binder IPC</text>
          <text x="115" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一次拷贝 / Proxy-Stub</text>
          <line x1="200" y1="300" x2="325" y2="278" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />

          {/* 服务层 */}
          <rect x="540" y="50" width="170" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="625" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">服务层</text>
          <text x="625" y="90" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">AMS / PMS / WMS</text>
          <text x="625" y="104" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">组件调度 / 窗口管理</text>
          <line x1="540" y1="95" x2="415" y2="245" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

          {/* 插件化层 */}
          <rect x="540" y="160" width="170" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="625" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">插件化层</text>
          <text x="625" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ClassLoader / 双亲委派</text>
          <text x="625" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DexClassLoader / 热修复</text>
          <line x1="540" y1="190" x2="415" y2="260" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />

          {/* 性能层 */}
          <rect x="540" y="270" width="170" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="625" y="292" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">性能层</text>
          <text x="625" y="310" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">启动 / 内存 / 渲染</text>
          <text x="625" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">ANR / 电量 / 稳定性</text>
          <line x1="540" y1="300" x2="415" y2="278" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />

          {/* 底部：核心问题矩阵 */}
          <rect x="30" y="370" width="680" height="130" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="392" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">核心问题速查</text>
          <text x="50" y="414" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Q: Android有哪几层架构？ → A: 系统应用/应用框架/原生库与运行时/HAL/Linux内核</text>
          <text x="50" y="432" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Q: ART与Dalvik的区别？ → A: AOT预编译 vs JIT即时编译；GC并发 vs STW；OAT vs DEX</text>
          <text x="50" y="450" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Q: Binder为什么只需一次拷贝？ → A: mmap让用户空间与内核共享内存，省去第二次copy_to_user</text>
          <text x="50" y="468" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Q: AMS和PMS各负责什么？ → A: AMS调度四大组件与进程；PMS管理包解析安装权限</text>
          <text x="50" y="486" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Q: 热修复原理？ → A: DexClassLoader加载补丁dex，插入dexElements头部优先加载</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android进阶之光全书知识图谱——架构、虚拟机、通信、服务、插件化、性能六大分支
      </figcaption>
    </figure>
  );
}
