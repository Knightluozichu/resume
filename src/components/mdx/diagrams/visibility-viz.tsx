import type { FC } from "react";

const VIEW_W = 760;
const VIEW_H = 280;

type Technique = {
  label: string;
  x: number;
  w: number;
  note: string;
  cost: string;
};

const TECHNIQUES: Technique[] = [
  { label: "视锥体剔除", x: 40, w: 200, note: "相机视野外的物体不画", cost: "O(1) per object" },
  { label: "遮挡剔除", x: 280, w: 200, note: "被前面物体挡住的后面不画", cost: "O(scene) raster" },
  { label: "LOD 切换", x: 520, w: 200, note: "远处物体用简模, 省顶点", cost: "O(1) per object" },
];

export const VisibilityViz: FC = () => (
  <figure className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-4">
    <figcaption className="mb-3">
      <p className="text-xs font-medium text-accent">可见性技术栈</p>
      <h4 className="text-base font-semibold text-primary">三级过滤：从全部物体到最终提交的 Draw Call</h4>
    </figcaption>
    <div className="overflow-x-auto rounded-card border border-border bg-bg">
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="可见性剔除流程" className="block w-full min-w-[660px]">
        {/* Three stages as cascading filters */}
        <text x="340" y="28" textAnchor="middle" className="fill-secondary text-[11px]">场景物体总数：10,000</text>

        {TECHNIQUES.map((t, i) => (
          <g key={t.label}>
            <rect x={t.x} y={48} width={t.w} height={160} rx="10" className="fill-elevated stroke-border" strokeWidth="1.5" />
            <text x={t.x + t.w / 2} y={74} textAnchor="middle" className="fill-primary text-[13px] font-semibold">{t.label}</text>
            <text x={t.x + t.w / 2} y={96} textAnchor="middle" className="fill-secondary text-[10px]">{t.note}</text>
            <text x={t.x + t.w / 2} y={116} textAnchor="middle" className="fill-secondary text-[10px]">{t.cost}</text>

            {/* Remaining after each filter */}
            <rect x={t.x + 16} y={136} width={t.w - 32} height="28" rx="4" className="fill-accent-glow stroke-accent" strokeWidth="1" />
            <text x={t.x + t.w / 2} y={155} textAnchor="middle" className="fill-primary text-[12px] font-semibold">
              剩余: {[3500, 1200, 400][i]}
            </text>
          </g>
        ))}

        {/* Arrow between stages */}
        {[{ x1: 240, x2: 272 }, { x1: 480, x2: 512 }].map(({ x1, x2 }, i) => (
          <g key={i}>
            <line x1={x1} y1={128} x2={x2} y2={128} className="stroke-accent" strokeWidth="2" markerEnd="url(#vis-arrow)" />
          </g>
        ))}

        {/* Bottom: final draw calls */}
        <rect x="240" y="228" width="280" height="32" rx="6" className="fill-success/20 stroke-success" strokeWidth="1.5" />
        <text x="380" y="249" textAnchor="middle" className="fill-success text-[13px] font-semibold">
          最终提交 Draw Call: 400
        </text>

        <defs>
          <marker id="vis-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 8 4 0 8Z" className="fill-accent" />
          </marker>
        </defs>
      </svg>
    </div>
  </figure>
);
