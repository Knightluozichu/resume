/**
 * <DakFinalReviewDiagram>：全书知识图谱与核心主线图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function DakFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="深入理解Android内核设计思想全书知识图谱"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书知识图谱——七大领域与核心主线
          </text>

          {/* 中心节点：内核设计思想 */}
          <ellipse cx="370" cy="280" rx="110" ry="40" fill="var(--text-primary)" fillOpacity="0.1" stroke="var(--text-primary)" strokeWidth="1.5" />
          <text x="370" y="276" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">Android内核</text>
          <text x="370" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">设计思想</text>

          {/* 七大领域节点 */}
          {/* 架构总览（左上） */}
          <rect x="40" y="60" width="140" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="110" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">架构总览</text>
          <text x="110" y="98" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">五层架构</text>
          <text x="110" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分层解耦</text>
          <line x1="180" y1="116" x2="290" y2="250" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* Init启动（上中） */}
          <rect x="200" y="60" width="140" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="270" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Init启动</text>
          <text x="270" y="98" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">init/Zygote</text>
          <text x="270" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">fork+COW</text>
          <line x1="310" y1="116" x2="350" y2="240" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* Binder通信（上右） */}
          <rect x="360" y="60" width="140" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="430" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">Binder通信</text>
          <text x="430" y="98" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一次拷贝</text>
          <text x="430" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Proxy-Stub</text>
          <line x1="430" y1="116" x2="390" y2="240" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* Handler线程（右上） */}
          <rect x="520" y="60" width="160" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="82" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Handler线程</text>
          <text x="600" y="98" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">消息循环</text>
          <text x="600" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Looper/MQ</text>
          <line x1="520" y1="116" x2="450" y2="250" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* AMS组件（左下） */}
          <rect x="40" y="440" width="140" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="110" y="462" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">AMS组件</text>
          <text x="110" y="478" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">四大组件</text>
          <text x="110" y="490" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">OOM Adj</text>
          <line x1="180" y1="440" x2="290" y2="310" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* WMS窗口（下中） */}
          <rect x="200" y="440" width="140" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="270" y="462" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">WMS窗口</text>
          <text x="270" y="478" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Surface</text>
          <text x="270" y="490" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">绘制三步</text>
          <line x1="310" y1="440" x2="350" y2="320" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* PMS包管理（右下） */}
          <rect x="360" y="440" width="140" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="430" y="462" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">PMS包管理</text>
          <text x="430" y="478" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">APK解析</text>
          <text x="430" y="490" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">权限签名</text>
          <line x1="430" y1="440" x2="390" y2="320" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 音频摄像头（右下角） */}
          <rect x="520" y="440" width="160" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="600" y="462" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">音频摄像头</text>
          <text x="600" y="478" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">媒体服务</text>
          <text x="600" y="490" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">HAL管线</text>
          <line x1="520" y1="440" x2="450" y2="310" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 底部核心主线 */}
          <rect x="40" y="516" width="660" height="20" rx="4" fill="var(--accent)" fillOpacity="0.06" />
          <text x="370" y="530" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            核心主线：架构分层 → 系统启动 → Binder通信 → 消息驱动 → 组件调度 → 窗口显示 → 包管理 → 媒体服务
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识图谱——七大核心领域围绕「内核设计思想」，从架构到服务到媒体的完整体系
      </figcaption>
    </figure>
  );
}
