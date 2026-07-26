/**
 * <Poeaa24Pattern29TransformView>：转换视图结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 300;
export function Poeaa24Pattern29TransformView() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="转换视图结构图。Model 数据以 XML/JSON 形式提供，由 XSLT 或转换程序将其转换为 HTML 输出，视图逻辑完全在转换规则中。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Transform View：数据 → 转换规则 → HTML" />
          {/* Model 数据 */}
          <rect x={48} y={72} width={180} height={100} rx="8" fill="#3FB97F" fillOpacity="0.06" stroke="#3FB97F" strokeWidth="1.2" />
          <text x={138} y={94} textAnchor="middle" fontSize="11" fontWeight="700" fill="#3FB97F">Model（XML/JSON）</text>
          <text x={64} y={118} fontSize="11" fontFamily="monospace" fill={T.primary}>&lt;order id="42"&gt;</text>
          <text x={64} y={136} fontSize="11" fontFamily="monospace" fill={T.primary}>  &lt;total&gt;597&lt;/total&gt;</text>
          <text x={64} y={154} fontSize="11" fontFamily="monospace" fill={T.primary}>  &lt;items&gt;...&lt;/items&gt;</text>
          {/* 箭头 */}
          <line x1={228} y1={122} x2={290} y2={122} stroke={T.accent} strokeWidth="1.5" />
          {/* 转换规则 */}
          <rect x={290} y={72} width={160} height={100} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <rect x={290} y={72} width={160} height={28} rx="8" fill={T.accent} fillOpacity="0.12" />
          <rect x={290} y={92} width={160} height={8} fill={T.accent} fillOpacity="0.12" />
          <text x={370} y={91} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>XSLT / 转换器</text>
          <text x={306} y={120} fontSize="11" fontFamily="monospace" fill={T.primary}>template match</text>
          <text x={306} y={138} fontSize="11" fontFamily="monospace" fill={T.primary}>for-each select</text>
          <text x={306} y={156} fontSize="11" fontFamily="monospace" fill={T.primary}>value-of</text>
          {/* 箭头 */}
          <line x1={450} y1={122} x2={510} y2={122} stroke="#E5B567" strokeWidth="1.5" />
          {/* 输出 */}
          <rect x={510} y={72} width={170} height={100} rx="8" fill="#E5B567" fillOpacity="0.06" stroke="#E5B567" strokeWidth="1.2" />
          <text x={595} y={94} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E5B567">HTML 输出</text>
          <text x={526} y={118} fontSize="11" fontFamily="monospace" fill={T.primary}>&lt;h1&gt;42&lt;/h1&gt;</text>
          <text x={526} y={136} fontSize="11" fontFamily="monospace" fill={T.primary}>&lt;p&gt;¥597&lt;/p&gt;</text>
          <text x={526} y={154} fontSize="11" fontFamily="monospace" fill={T.primary}>&lt;ul&gt;...&lt;/ul&gt;</text>
          {/* 底部说明 */}
          <rect x={48} y={200} width={624} height={48} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={222} fontSize="11" fill={T.secondary}>• 视图逻辑完全在转换规则中，Model 只提供纯数据</text>
          <text x={64} y={240} fontSize="11" fill={T.secondary}>• 同一数据可用不同 XSLT 输出 HTML/PDF/邮件等多种格式</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="转换规则将结构化数据变为 HTML，视图逻辑与数据完全分离" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Transform View 用转换规则（如 XSLT）将 Model 数据转换为 HTML。
        视图逻辑完全在转换规则中，同一数据可输出多种格式。
      </figcaption>
    </figure>
  );
}
