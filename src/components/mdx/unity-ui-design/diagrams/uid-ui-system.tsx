/**
 * <UidUiSystemDiagram>: Unity UI 系统架构
 *
 * Canvas渲染层 -> EventSystem事件层 -> InputModule输入层
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function UidUiSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity UI 系统架构。三层：Canvas渲染层、EventSystem事件层、InputModule输入层。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            Unity UI 系统架构
          `}</text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>{`
            渲染层(Canvas) -> 事件层(EventSystem) -> 输入层(InputModule)
          `}</text>
          {/* Canvas 渲染层 */}
          <g>
            <rect x={36} y={76} width={648} height={90} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>{`渲染层 Canvas`}</text>
            <rect x={120} y={108} width={130} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={185} y={126} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`ScreenSpace`}</text>
            <text x={185} y={140} textAnchor="middle" fontSize="11" fill={secondary}>{`-Overlay`}</text>
            <rect x={270} y={108} width={130} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={335} y={126} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`ScreenSpace`}</text>
            <text x={335} y={140} textAnchor="middle" fontSize="11" fill={secondary}>{`-Camera`}</text>
            <rect x={420} y={108} width={130} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={485} y={126} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`WorldSpace`}</text>
            <text x={485} y={140} textAnchor="middle" fontSize="11" fill={secondary}>{`3D UI`}</text>
            <rect x={570} y={108} width={100} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={620} y={126} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`Canvas`}</text>
            <text x={620} y={140} textAnchor="middle" fontSize="11" fill={secondary}>{`Scaler`}</text>
          </g>
          {/* EventSystem 事件层 */}
          <g>
            <rect x={36} y={178} width={648} height={90} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={200} fontSize="13" fontWeight="700" fill={success}>{`事件层 EventSystem`}</text>
            <rect x={120} y={210} width={140} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={190} y={228} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`RaycastTarget`}</text>
            <text x={190} y={242} textAnchor="middle" fontSize="11" fill={secondary}>{`射线检测`}</text>
            <rect x={280} y={210} width={140} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={350} y={228} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`GraphicRaycaster`}</text>
            <text x={350} y={242} textAnchor="middle" fontSize="11" fill={secondary}>{`UGUI射线`}</text>
            <rect x={440} y={210} width={140} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={510} y={228} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`ExecuteEvents`}</text>
            <text x={510} y={242} textAnchor="middle" fontSize="11" fill={secondary}>{`事件派发`}</text>
            <rect x={600} y={210} width={72} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={636} y={228} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`ISubmit`}</text>
            <text x={636} y={242} textAnchor="middle" fontSize="11" fill={secondary}>{`Handler`}</text>
          </g>
          {/* Input 输入层 */}
          <g>
            <rect x={36} y={280} width={648} height={90} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={302} fontSize="13" fontWeight="700" fill={warning}>{`输入层 InputModule`}</text>
            <rect x={120} y={312} width={140} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={190} y={330} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`StandaloneInput`}</text>
            <text x={190} y={344} textAnchor="middle" fontSize="11" fill={secondary}>{`键鼠输入`}</text>
            <rect x={280} y={312} width={140} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={350} y={330} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`TouchInput`}</text>
            <text x={350} y={344} textAnchor="middle" fontSize="11" fill={secondary}>{`触摸输入`}</text>
            <rect x={440} y={312} width={140} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={510} y={330} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`XRInput`}</text>
            <text x={510} y={344} textAnchor="middle" fontSize="11" fill={secondary}>{`VR/AR输入`}</text>
            <rect x={600} y={312} width={72} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={636} y={330} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`新输入`}</text>
            <text x={636} y={344} textAnchor="middle" fontSize="11" fill={secondary}>{`系统`}</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity UI 三层架构：Canvas 负责渲染、EventSystem 负责事件路由、InputModule 负责输入采集。
      </figcaption>
    </figure>
  );
}
