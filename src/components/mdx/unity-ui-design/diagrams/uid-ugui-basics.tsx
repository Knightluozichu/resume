/**
 * <UidUguiBasicsDiagram>: UGUI 基础组件体系
 *
 * Canvas -> RectTransform -> Visual(Image/Text/RawImage) -> Interactive(Button/Toggle/Slider)
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function UidUguiBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="UGUI 基础组件体系。从Canvas到RectTransform到视觉组件到交互组件的层级结构。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            UGUI 基础组件体系
          `}</text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>{`
            Canvas -> RectTransform -> 视觉组件 -> 交互组件
          `}</text>
          {/* Canvas 层 */}
          <g>
            <rect x={280} y={76} width={160} height={44} rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.5" />
            <text x={360} y={96} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>{`Canvas`}</text>
            <text x={360} y={112} textAnchor="middle" fontSize="11" fill={secondary}>{`渲染根节点`}</text>
          </g>
          {/* 连接线 */}
          <line x1={360} y1={120} x2={360} y2={138} stroke={border} strokeWidth="1.5" markerEnd="url(#uidUguiBasics-arrow)" />
          {/* RectTransform 层 */}
          <g>
            <rect x={280} y={140} width={160} height={44} rx="8" fill={success} fillOpacity="0.1" stroke={success} strokeWidth="1.5" />
            <text x={360} y={160} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>{`RectTransform`}</text>
            <text x={360} y={176} textAnchor="middle" fontSize="11" fill={secondary}>{`锚点+轴心+尺寸`}</text>
          </g>
          {/* 分叉连接线 */}
          <line x1={360} y1={184} x2={360} y2={198} stroke={border} strokeWidth="1.5" />
          <line x1={180} y1={198} x2={540} y2={198} stroke={border} strokeWidth="1.5" />
          <line x1={180} y1={198} x2={180} y2={210} stroke={border} strokeWidth="1.5" markerEnd="url(#uidUguiBasics-arrow)" />
          <line x1={540} y1={198} x2={540} y2={210} stroke={border} strokeWidth="1.5" markerEnd="url(#uidUguiBasics-arrow)" />
          {/* 视觉组件 */}
          <g>
            <rect x={36} y={212} width={288} height={90} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={234} fontSize="13" fontWeight="700" fill={warning}>{`视觉组件`}</text>
            <rect x={52} y={244} width={80} height={44} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={92} y={262} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`Image`}</text>
            <text x={92} y={276} textAnchor="middle" fontSize="11" fill={secondary}>{`精灵图`}</text>
            <rect x={144} y={244} width={80} height={44} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={184} y={262} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`Text`}</text>
            <text x={184} y={276} textAnchor="middle" fontSize="11" fill={secondary}>{`文本`}</text>
            <rect x={236} y={244} width={80} height={44} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={276} y={262} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`RawImage`}</text>
            <text x={276} y={276} textAnchor="middle" fontSize="11" fill={secondary}>{`纹理`}</text>
          </g>
          {/* 交互组件 */}
          <g>
            <rect x={396} y={212} width={288} height={90} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={412} y={234} fontSize="13" fontWeight="700" fill="var(--danger)">{`交互组件`}</text>
            <rect x={412} y={244} width={80} height={44} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={452} y={262} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`Button`}</text>
            <text x={452} y={276} textAnchor="middle" fontSize="11" fill={secondary}>{`按钮`}</text>
            <rect x={504} y={244} width={80} height={44} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={544} y={262} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`Toggle`}</text>
            <text x={544} y={276} textAnchor="middle" fontSize="11" fill={secondary}>{`开关`}</text>
            <rect x={596} y={244} width={80} height={44} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={636} y={262} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`Slider`}</text>
            <text x={636} y={276} textAnchor="middle" fontSize="11" fill={secondary}>{`滑块`}</text>
          </g>
          {/* 底部总结 */}
          <g>
            <rect x={36} y={318} width={648} height={56} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={340} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>{`核心原则：所有UI元素都是GameObject，挂在Canvas下，用RectTransform定位`}</text>
            <text x={360} y={360} textAnchor="middle" fontSize="11" fill={secondary}>{`视觉组件负责显示，交互组件 = 视觉组件 + Selectable基类 + 事件接口`}</text>
          </g>
          <defs>
            <marker id="uidUguiBasics-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        UGUI 组件层级：Canvas→RectTransform→视觉组件/交互组件，交互组件继承自 Selectable。
      </figcaption>
    </figure>
  );
}
