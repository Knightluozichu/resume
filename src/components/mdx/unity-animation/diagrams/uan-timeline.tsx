/**
 * <UanTimelineDiagram>: Unity Timeline 系统
 *
 * Track轨道 + Clip片段 + 混合 + 信号
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

export function UanTimelineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity Timeline系统。Track轨道+Clip片段+混合+信号。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Unity Timeline 系统
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            Track(轨道) + Clip(片段) + 混合 + 信号
          </text>
          {/* 时间轴 */}
          <g>
            <rect x={36} y={76} width={648} height={180} rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>Timeline 编辑器</text>
            {/* 时间标尺 */}
            <line x1={140} y1={106} x2={660} y2={106} stroke={border} strokeWidth="1" />
            <text x={148} y={102} fontSize="10" fill={secondary}>0s</text>
            <text x={268} y={102} fontSize="10" fill={secondary}>2s</text>
            <text x={388} y={102} fontSize="10" fill={secondary}>4s</text>
            <text x={508} y={102} fontSize="10" fill={secondary}>6s</text>
            <text x={628} y={102} fontSize="10" fill={secondary}>8s</text>
            {/* 播放头 */}
            <line x1={320} y1={100} x2={320} y2={250} stroke={accent} strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Animation Track */}
            <rect x={52} y={112} width={80} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={92} y={130} textAnchor="middle" fontSize="11" fill={primary}>Animation</text>
            <rect x={140} y={112} width={120} height={28} rx="4" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1" />
            <text x={200} y={130} textAnchor="middle" fontSize="11" fill={primary}>角色A动画</text>
            <rect x={380} y={112} width={120} height={28} rx="4" fill={accent} fillOpacity="0.2" stroke={accent} strokeWidth="1" />
            <text x={440} y={130} textAnchor="middle" fontSize="11" fill={primary}>角色B动画</text>
            {/* Activation Track */}
            <rect x={52} y={148} width={80} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={92} y={166} textAnchor="middle" fontSize="11" fill={primary}>Activation</text>
            <rect x={140} y={148} width={240} height={28} rx="4" fill={success} fillOpacity="0.2" stroke={success} strokeWidth="1" />
            <text x={260} y={166} textAnchor="middle" fontSize="11" fill={primary}>特效激活</text>
            {/* Audio Track */}
            <rect x={52} y={184} width={80} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={92} y={202} textAnchor="middle" fontSize="11" fill={primary}>Audio</text>
            <rect x={200} y={184} width={100} height={28} rx="4" fill={warning} fillOpacity="0.2" stroke={warning} strokeWidth="1" />
            <text x={250} y={202} textAnchor="middle" fontSize="11" fill={primary}>BGM</text>
            <rect x={400} y={184} width={100} height={28} rx="4" fill={warning} fillOpacity="0.2" stroke={warning} strokeWidth="1" />
            <text x={450} y={202} textAnchor="middle" fontSize="11" fill={primary}>音效</text>
            {/* Signal Track */}
            <rect x={52} y={220} width={80} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={92} y={238} textAnchor="middle" fontSize="11" fill={primary}>Signal</text>
            <circle cx={320} cy={234} r="6" fill={danger} />
            <text x={320} y={250} textAnchor="middle" fontSize="10" fill={danger}>信号</text>
          </g>
          {/* Track 类型 */}
          <g>
            <rect x={36} y={268} width={648} height={52} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={52} y={290} fontSize="12" fontWeight="700" fill={primary}>Track 类型</text>
            <text x={52} y={308} fontSize="11" fill={secondary}>Animation(动画) / Activation(激活) / Audio(音频) / Signal(信号) / Control(控制) / Playable(自定义)</text>
          </g>
          {/* 底部 */}
          <g>
            <rect x={36} y={332} width={648} height={48} rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
            <text x={360} y={354} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>Timeline = 多轨道时间线编排，适合过场动画/剧情序列</text>
            <text x={360} y={372} textAnchor="middle" fontSize="11" fill={secondary}>与 Animator 区别：Timeline 是线性编排（导播），Animator 是状态机（交互）</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Timeline：多轨道时间线编排——动画/音频/特效/信号同步播放，适合过场动画。
      </figcaption>
    </figure>
  );
}
