/**
 * <DakLearningMapDiagram>：深入理解Android内核设计思想 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function DakLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="深入理解Android内核设计思想全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            深入理解Android内核设计思想——全书学习地图
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            架构总览 → Init启动 → Binder → Handler → AMS → WMS → PMS → 音频摄像头 → 复习
          </text>

          <rect x="30" y="62" width="680" height="502" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：学习地图 与 架构总览 */}
          <rect x="50" y="80" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">全书学习地图</text>
          <text x="205" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第0章 知识体系总览</text>
          <text x="205" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">九阶段递进路径</text>

          <rect x="380" y="80" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="102" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Android架构总览</text>
          <text x="535" y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第1章 五层架构/系统启动</text>
          <text x="535" y="132" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">内核/HAL/Framework</text>

          <text x="205" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="156" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：Init进程启动 与 Binder通信体系 */}
          <rect x="50" y="170" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Init进程与启动</text>
          <text x="205" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第2章 init/Zygote/system_server</text>
          <text x="205" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">启动流程/COW/fork</text>

          <rect x="380" y="170" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="535" y="192" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Binder通信体系</text>
          <text x="535" y="210" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第3章 Binder驱动/ServiceManager</text>
          <text x="535" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">一次拷贝/Proxy-Stub</text>

          <text x="205" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="246" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：Handler线程模型 与 AMS与四大组件 */}
          <rect x="50" y="260" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Handler与线程模型</text>
          <text x="205" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第4章 Looper/MessageQueue</text>
          <text x="205" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">消息循环/线程通信</text>

          <rect x="380" y="260" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="282" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">AMS与四大组件</text>
          <text x="535" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第5章 Activity栈/组件调度</text>
          <text x="535" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">进程管理/OOM Adj</text>

          <text x="205" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="336" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：WMS与View体系 与 PMS与包管理 */}
          <rect x="50" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">WMS与View体系</text>
          <text x="205" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第6章 Window/Surface</text>
          <text x="205" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">窗口层级/绘制流程</text>

          <rect x="380" y="350" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">PMS与包管理</text>
          <text x="535" y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第7章 APK解析/安装</text>
          <text x="535" y="402" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">权限管理/签名校验</text>

          <text x="205" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="426" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第五排：音频与摄像头服务 与 全书复习 */}
          <rect x="50" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="205" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">音频与摄像头服务</text>
          <text x="205" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第8章 AudioFlinger/CameraService</text>
          <text x="205" y="492" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">媒体管线/硬件服务</text>

          <rect x="380" y="440" width="310" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="535" y="462" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">全书复习</text>
          <text x="535" y="480" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第9章 知识图谱/选型矩阵</text>
          <text x="535" y="492" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">架构→启动→通信→服务</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        深入理解Android内核设计思想全书学习地图——架构、启动、Binder、Handler、AMS、WMS、PMS、音视频九阶段递进路径
      </figcaption>
    </figure>
  );
}
