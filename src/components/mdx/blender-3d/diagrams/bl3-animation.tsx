/**
 * <Bl3AnimationDiagram>：Blender 动画基础图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function Bl3AnimationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Blender 动画基础图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Blender 动画基础</text>
          <text x="360" y="60" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">关键帧时间线</text>
          <line x1="60" y1="100" x2="660" y2="100" stroke="var(--text-tertiary)" strokeWidth="2" />
          <circle cx="60" cy="100" r="8" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="2" />
          <text x="60" y="85" textAnchor="middle" fontSize="11" fill="var(--accent)">帧 1</text>
          <circle cx="360" cy="100" r="8" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="2" />
          <text x="360" y="85" textAnchor="middle" fontSize="11" fill="var(--accent)">帧 15</text>
          <circle cx="660" cy="100" r="8" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="2" />
          <text x="660" y="85" textAnchor="middle" fontSize="11" fill="var(--accent)">帧 30</text>
          <text x="60" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">起点</text>
          <text x="360" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">最高点</text>
          <text x="660" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">终点</text>
          <text x="140" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">线性(机械)</text>
          <line x1="80" y1="240" x2="240" y2="170" stroke="var(--warning)" strokeWidth="2" />
          <text x="140" y="270" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">匀速无加减速</text>
          <text x="500" y="180" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">贝塞尔(自然)</text>
          <path d="M 400 240 Q 500 160 600 170" fill="none" stroke="var(--success)" strokeWidth="2" />
          <text x="500" y="270" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">缓入缓出有节奏</text>
          <rect x="60" y="300" width="600" height="50" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="360" y="325" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">节奏原则：缓入缓出 + 预备动作 + 余动</text>
          <text x="360" y="342" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">动画好不好看取决于节奏而非帧数</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Blender 动画基础——玩转 Blender
      </figcaption>
    </figure>
  );
}
