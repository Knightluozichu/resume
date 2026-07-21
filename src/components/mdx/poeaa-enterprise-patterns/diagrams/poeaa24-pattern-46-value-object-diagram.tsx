/**
 * <Poeaa24Pattern46ValueObject>：值对象结构图。Server Component。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";
const VIEW_W = 720; const VIEW_H = 300;
export function Poeaa24Pattern46ValueObject() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Value Object 结构图。值对象通过属性值判断相等性，不可变，可自由共享和替换，如 Money(100, CNY) 等于另一个 Money(100, CNY)。" className="mx-auto block h-auto w-full max-w-[720px]">
          <DiagramTitle x={VIEW_W / 2} y={36} text="Value Object：按值相等，不可变，可共享" />
          {/* 两个相等的值对象 */}
          <rect x={80} y={64} width={200} height={80} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <text x={180} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>DateRange A</text>
          <text x={96} y={110} fontSize="9" fontFamily="monospace" fill={T.primary}>start: 2024-01-01</text>
          <text x={96} y={128} fontSize="9" fontFamily="monospace" fill={T.primary}>end: 2024-12-31</text>
          <rect x={440} y={64} width={200} height={80} rx="8" fill={T.accent} fillOpacity="0.06" stroke={T.accent} strokeWidth="1.5" />
          <text x={540} y={86} textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>DateRange B</text>
          <text x={456} y={110} fontSize="9" fontFamily="monospace" fill={T.primary}>start: 2024-01-01</text>
          <text x={456} y={128} fontSize="9" fontFamily="monospace" fill={T.primary}>end: 2024-12-31</text>
          {/* 相等符号 */}
          <text x={360} y={110} textAnchor="middle" fontSize="16" fontWeight="700" fill="#3FB97F">==</text>
          <text x={360} y={130} textAnchor="middle" fontSize="9" fill="#3FB97F">属性值相同即相等</text>
          {/* 底部说明 */}
          <rect x={48} y={172} width={624} height={72} rx="8" fill={T.primary} fillOpacity="0.03" stroke={T.border} strokeWidth="1" />
          <text x={64} y={196} fontSize="11" fontWeight="600" fill={T.primary}>vs 引用对象（Entity）：</text>
          <text x={64} y={218} fontSize="11" fill={T.secondary}>• 值对象：按值相等、不可变、可自由共享替换（Money、DateRange、Address）</text>
          <text x={64} y={236} fontSize="11" fill={T.secondary}>• 引用对象：按 ID 相等、可变、需跟踪生命周期（Customer、Order）</text>
          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="值对象按属性值判断相等，不可变，可自由共享" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        值对象通过属性值判断相等性，不可变，可自由共享和替换。
        与引用对象（Entity）相对：后者按 ID 相等，需跟踪生命周期。
      </figcaption>
    </figure>
  );
}
