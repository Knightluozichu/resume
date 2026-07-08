/**
 * <UidFinalReviewDiagram>: Unity UI 设计全书复习
 *
 * 四大板块知识点总结图
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

export function UidFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity UI设计全书复习。四大板块核心知识点总结。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Unity UI 设计全书复习
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            四大板块核心知识点串联
          </text>
          {/* 系统认知 */}
          <g>
            <rect x={36} y={76} width={316} height={80} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>系统认知</text>
            <text x={52} y={118} fontSize="11" fill={primary}>Canvas(渲染) + EventSystem(事件) + InputModule(输入)</text>
            <text x={52} y={136} fontSize="11" fill={secondary}>三层架构；3种RenderMode；GraphicRaycaster射线检测</text>
          </g>
          {/* UGUI核心 */}
          <g>
            <rect x={368} y={76} width={316} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={384} y={98} fontSize="13" fontWeight="700" fill={success}>UGUI核心</text>
            <text x={384} y={118} fontSize="11" fill={primary}>RectTransform + Image/Text + Button/Toggle/Slider</text>
            <text x={384} y={136} fontSize="11" fill={secondary}>LayoutGroup + LayoutElement + ContentSizeFitter</text>
          </g>
          {/* 进阶技术 */}
          <g>
            <rect x={36} y={168} width={316} height={80} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={190} fontSize="13" fontWeight="700" fill={warning}>进阶技术</text>
            <text x={52} y={210} fontSize="11" fill={primary}>DOTween动画 + UI Toolkit(UXML/USS/C#)</text>
            <text x={52} y={228} fontSize="11" fill={secondary}>Sequence编排；Flexbox布局；保留模式渲染</text>
          </g>
          {/* 优化总结 */}
          <g>
            <rect x={368} y={168} width={316} height={80} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={384} y={190} fontSize="13" fontWeight="700" fill={danger}>优化与适配</text>
            <text x={384} y={210} fontSize="11" fill={primary}>合批 + 图集 + Overdraw + Canvas分组</text>
            <text x={384} y={228} fontSize="11" fill={secondary}>Canvas Scaler + Anchor + Safe Area</text>
          </g>
          {/* 核心原则 */}
          <g>
            <rect x={36} y={262} width={648} height={110} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={284} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>核心原则回顾</text>
            <text x={52} y={306} fontSize="11" fill={accent}>1. 事件驱动：用接口被动接收事件，不在Update轮询</text>
            <text x={52} y={324} fontSize="11" fill={success}>2. 布局优先：用LayoutGroup自动排列，不手动算坐标</text>
            <text x={52} y={342} fontSize="11" fill={warning}>3. 动画用DOTween：一行代码完成，Sequence编排复杂动画</text>
            <text x={52} y={360} fontSize="11" fill={danger}>4. 性能三步：查DrawCall→查图集→查Overdraw；静态动态分Canvas</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书复习：四大板块知识点串联，四条核心原则贯穿全书。
      </figcaption>
    </figure>
  );
}
