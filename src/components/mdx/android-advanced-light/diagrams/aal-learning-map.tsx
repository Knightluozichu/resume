/**
 * <AalLearningMapDiagram>：Android进阶之光 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function AalLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android进阶之光全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android进阶之光——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            架构 → 虚拟机 → Binder → AMS/PMS → WMS → 包管理 → 插件化 → 性能 → 复习
          </text>

          <rect x="30" y="62" width="680" height="502" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：学习地图 与 系统架构 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">全书学习地图</text>
          <text x="205" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第0章 知识体系总览</text>
          <text x="205" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">九阶段递进路径</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Android系统架构</text>
          <text x="535" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第1章 五层架构/系统启动</text>
          <text x="535" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Linux内核/HAL/Framework</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：Dalvik与ART 与 Binder IPC */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Dalvik与ART虚拟机</text>
          <text x="205" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第2章 DEX/AOT/JIT</text>
          <text x="205" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">GC机制/编译流程</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Binder IPC原理</text>
          <text x="535" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第3章 Binder驱动/ServiceManager</text>
          <text x="535" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">一次拷贝/Proxy-Stub</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：AMS与PMS 与 WMS与窗口管理 */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">AMS与PMS</text>
          <text x="205" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第4章 Activity栈/进程管理</text>
          <text x="205" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">包解析/权限管理</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">WMS与窗口管理</text>
          <text x="535" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第5章 Window类型/Surface</text>
          <text x="535" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">窗口层级/绘制流程</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：PackageManager 与 类加载器与插件化 */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">PackageManager</text>
          <text x="205" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第6章 APK解析/PMS交互</text>
          <text x="205" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">组件扫描/签名校验</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">类加载器与插件化</text>
          <text x="535" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第7章 ClassLoader/双亲委派</text>
          <text x="535" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">DexClassLoader/热修复</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：高级性能优化 与 全书复习 */}
          <rect x="50" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="205" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">高级性能优化</text>
          <text x="205" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第8章 内存/渲染/启动优化</text>
          <text x="205" y="492" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ANR/卡顿/电量</text>

          <rect x="380" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="535" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="535" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第9章 知识图谱/选型矩阵</text>
          <text x="535" y="492" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">架构→虚拟机→Binder→服务</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Android进阶之光全书学习地图——架构、虚拟机、Binder、核心服务、包管理、插件化、性能优化九阶段递进路径
      </figcaption>
    </figure>
  );
}
