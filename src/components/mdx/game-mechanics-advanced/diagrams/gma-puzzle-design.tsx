/**
 * <GmaPuzzleDesignDiagram>：谜题设计与渐进难度图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmaPuzzleDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="谜题设计与渐进难度图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            谜题设计：渐进难度曲线
          </text>

          {/* 难度曲线 */}
          <line x1="60" y1="320" x2="660" y2="320" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <line x1="60" y1="60" x2="60" y2="320" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="50" y="64" textAnchor="end" fontSize="10" fill="var(--text-secondary)">难度</text>
          <text x="665" y="324" fontSize="10" fill="var(--text-secondary)">进度</text>

          {/* 心流通道 */}
          <path d="M 60 280 Q 200 260 340 220 Q 480 180 660 120" fill="none" stroke="var(--success)" strokeWidth="2.5" />
          <text x="360" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">心流通道</text>

          {/* 焦虑区（上方） */}
          <path d="M 60 100 Q 200 80 340 70 Q 480 60 660 50" fill="none" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="5 3" />
          <rect x="540" y="40" width="100" height="20" rx="4" fill="var(--warning)" fillOpacity="0.12" />
          <text x="590" y="54" textAnchor="middle" fontSize="9" fill="var(--warning)">焦虑区（太难）</text>

          {/* 无聊区（下方） */}
          <path d="M 60 300 Q 200 310 340 312 Q 480 314 660 316" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="5 3" />
          <rect x="540" y="306" width="100" height="20" rx="4" fill="var(--text-tertiary)" fillOpacity="0.1" />
          <text x="590" y="320" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">无聊区（太易）</text>

          {/* 关卡标记 */}
          {[
            { x: 100, y: 275, label: "L1" },
            { x: 180, y: 262, label: "L2" },
            { x: 260, y: 245, label: "L3" },
            { x: 340, y: 222, label: "L4" },
            { x: 420, y: 200, label: "L5" },
            { x: 500, y: 175, label: "L6" },
            { x: 580, y: 150, label: "L7" },
            { x: 640, y: 130, label: "L8" },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="6" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="1.2" />
              <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="8" fill="var(--text-secondary)">{p.label}</text>
            </g>
          ))}

          {/* 底部：谜题设计原则 */}
          <rect x="40" y="340" width="640" height="48" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="360" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            谜题三原则：单一解 → 多解 → 涌现解
          </text>
          <text x={VIEW_W / 2} y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            每个新机制先教学 → 再挑战 → 后组合
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        谜题渐进难度——心流通道在焦虑区与无聊区之间
      </figcaption>
    </figure>
  );
}
