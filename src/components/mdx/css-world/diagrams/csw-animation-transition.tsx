/**
 * <CswAnimationTransitionDiagram>：动画与过渡图解。
 * 展示 @keyframes、transition 与 will-change 合成层。纯静态，Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function CswAnimationTransitionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="动画与过渡图解：keyframes、transition 与 will-change"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            动画与过渡：@keyframes、transition 与 will-change
          </text>

          {/* 左侧：transition 过渡 */}
          <text x="180" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">transition 过渡（状态触发）</text>
          <rect x="40" y="70" width="280" height="150" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" />

          {/* 起始态 */}
          <rect x="60" y="90" width="60" height="40" rx="4" fill="var(--success)" fillOpacity="0.25" stroke="var(--success)" strokeWidth="1.2" />
          <text x="90" y="114" textAnchor="middle" fontSize="9" fill="var(--success)">起始</text>

          {/* 过渡曲线 */}
          <path d="M 130 110 Q 180 110, 220 80 T 290 60" fill="none" stroke="var(--accent)" strokeWidth="2" />
          <text x="210" y="100" textAnchor="middle" fontSize="8" fill="var(--accent)">ease 过渡曲线</text>

          {/* 终止态 */}
          <rect x="250" y="50" width="60" height="40" rx="4" fill="var(--danger)" fillOpacity="0.25" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="280" y="74" textAnchor="middle" fontSize="9" fill="var(--danger)">终止</text>

          <text x="180" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">transition: all 0.3s ease 0.1s</text>
          <text x="180" y="168" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">property | duration | timing | delay</text>
          <text x="180" y="190" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">需明确起止两态，自动补间</text>
          <text x="180" y="206" textAnchor="middle" fontSize="9" fill="var(--danger)">display / auto 值不可过渡</text>

          {/* 右侧：@keyframes 动画 */}
          <text x="560" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">@keyframes 动画（自驱动）</text>
          <rect x="420" y="70" width="280" height="150" rx="8" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1.2" />

          {/* 时间轴 */}
          <line x1="440" y1="120" x2="680" y2="120" stroke="var(--text-tertiary)" strokeWidth="1" />
          <circle cx="440" cy="120" r="4" fill="var(--success)" />
          <text x="440" y="140" textAnchor="middle" fontSize="8" fill="var(--success)">0%</text>
          <circle cx="560" cy="120" r="4" fill="var(--accent)" />
          <text x="560" y="140" textAnchor="middle" fontSize="8" fill="var(--accent)">50%</text>
          <circle cx="680" cy="120" r="4" fill="var(--danger)" />
          <text x="680" y="140" textAnchor="middle" fontSize="8" fill="var(--danger)">100%</text>

          {/* 关键帧矩形 */}
          <rect x="425" y="92" width="30" height="20" rx="2" fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="1" />
          <rect x="545" y="82" width="30" height="20" rx="2" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1" />
          <rect x="665" y="100" width="30" height="20" rx="2" fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="1" />

          <text x="560" y="168" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">animation: spin 2s linear infinite</text>
          <text x="560" y="186" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">name | duration | timing | count</text>
          <text x="560" y="206" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">无需状态触发，自动循环播放</text>

          {/* 下半：timing-function */}
          <text x="370" y="248" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">timing-function 缓动函数</text>

          <rect x="50" y="260" width="150" height="50" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <path d="M 60 300 Q 100 300, 190 270" fill="none" stroke="var(--success)" strokeWidth="1.5" />
          <text x="125" y="282" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">ease-out</text>
          <text x="125" y="304" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">快→慢，出场首选</text>

          <rect x="215" y="260" width="150" height="50" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <path d="M 225 270 Q 305 270, 355 300" fill="none" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="290" y="282" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">ease-in</text>
          <text x="290" y="304" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">慢→快，进场</text>

          <rect x="380" y="260" width="150" height="50" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <path d="M 390 300 C 420 300, 460 270, 490 270 S 540 300, 520 270" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="455" y="282" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">ease-in-out</text>
          <text x="455" y="304" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">慢-快-慢</text>

          <rect x="545" y="260" width="145" height="50" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <line x1="555" y1="300" x2="680" y2="270" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="617" y="282" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">linear</text>
          <text x="617" y="304" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">匀速，慎用</text>

          {/* will-change 合成层 */}
          <rect x="40" y="328" width="660" height="112" rx="8" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">性能：will-change 与合成层</text>

          <rect x="60" y="362" width="190" height="64" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="155" y="382" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">优先动画属性</text>
          <text x="155" y="400" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">transform / opacity</text>
          <text x="155" y="416" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">只触发合成，不重排重绘</text>

          <rect x="265" y="362" width="190" height="64" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="360" y="382" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">次选属性</text>
          <text x="360" y="400" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">color / background</text>
          <text x="360" y="416" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">触发重绘，不重排</text>

          <rect x="470" y="362" width="210" height="64" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="575" y="382" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">避免动画属性</text>
          <text x="575" y="400" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">width / margin / top</text>
          <text x="575" y="416" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">触发重排，性能最差</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        动画与过渡——transition 与 @keyframes 区别、缓动函数曲线、合成层性能分级
      </figcaption>
    </figure>
  );
}
