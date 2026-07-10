/**
 * <UhmHmiBasicsDiagram>：HMI 基础概念图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UhmHmiBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="HMI 基础概念图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{`
            HMI 数据流转链路
          `}</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{`
            数据采集 → 绑定映射 → 渲染显示 → 用户响应
          `}</text>

          <rect x="40" y="78" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="120" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">{`数据采集`}</text>
          <text x="130" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`总线/传感器`}</text>
          <text x="130" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`10-50Hz`}</text>

          <text x="210" y="134" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">{`&rarr;`}</text>

          <rect x="230" y="100" width="120" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="290" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">{`绑定映射`}</text>
          <text x="290" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`脏标记/事件`}</text>
          <text x="290" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`按需更新`}</text>

          <text x="370" y="134" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">{`&rarr;`}</text>

          <rect x="390" y="100" width="120" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="450" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">{`渲染显示`}</text>
          <text x="450" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`Canvas/UGUI`}</text>
          <text x="450" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`60-120fps`}</text>

          <text x="530" y="134" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">{`&rarr;`}</text>

          <rect x="550" y="100" width="120" height="60" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="610" y="124" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">{`用户响应`}</text>
          <text x="610" y="140" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`触摸/旋钮`}</text>
          <text x="610" y="154" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{`&lt;50ms`}</text>

          <text x={VIEW_W / 2} y="200" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">{`
            三大约束
          `}</text>

          <rect x="80" y="218" width="170" height="56" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="165" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">{`实时性`}</text>
          <text x="165" y="258" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`延迟 &lt;100ms`}</text>

          <rect x="275" y="218" width="170" height="56" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="360" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">{`安全性`}</text>
          <text x="360" y="258" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`不崩溃/不误显`}</text>

          <rect x="470" y="218" width="170" height="56" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="555" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">{`确定性`}</text>
          <text x="555" y="258" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`同输入同输出`}</text>

          <text x={VIEW_W / 2} y="308" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{`
            HMI 核心矛盾：信息要快但不能乱，界面要美但不能误导
          `}</text>
          <text x={VIEW_W / 2} y="326" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">{`
            每个像素都有含义，每次刷新都有数据来源
          `}</text>
          <text x={VIEW_W / 2} y="344" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">{`
            信息层级：紧急（红）> 重要（高对比）> 辅助（小字）
          `}</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        HMI 数据流转链路——从采集到响应的完整路径与三大约束
      </figcaption>
    </figure>
  );
}
