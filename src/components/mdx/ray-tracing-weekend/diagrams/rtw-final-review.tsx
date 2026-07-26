/**
 * <RtwFinalReviewDiagram>：全书数据流与 bug 速查
 * 纯静态 SVG，无交互。Server Component。
 */
export function RtwFinalReviewDiagram() {
  const flow = [
    { x: 60, t: "get_ray", c: "相机产射线", ch: "第3、8章" },
    { x: 188, t: "world.hit", c: "求交得 hit_record", ch: "第2、4章" },
    { x: 316, t: "scatter", c: "材质算衰减+方向", ch: "第5、6、7章" },
    { x: 444, t: "ray_color", c: "递归弹射", ch: "第5章" },
    { x: 572, t: "write_color", c: "采样+伽马", ch: "第6章" },
  ];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="全书数据流与 bug 速查" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">全书数据流：射线 → 求交 → 散射 → 递归 → 输出</text>

          {/* 数据流节点 */}
          {flow.map((n, i) => (
            <g key={n.t}>
              <rect x={n.x} y="64" width="116" height="64" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" />
              <text x={n.x + 58} y="88" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">{n.t}</text>
              <text x={n.x + 58} y="104" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{n.c}</text>
              <text x={n.x + 58} y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{n.ch}</text>
              {i < flow.length - 1 && (
                <line x1={n.x + 116} y1="96" x2={n.x + 128} y2="96" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#frArrow)" />
              )}
            </g>
          ))}
          <defs>
            <marker id="frArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L7,4.5 L0,9 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* bug 速查表 */}
          <rect x="40" y="160" width="640" height="200" rx="8" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="182" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">常见 bug 速查（症状 → 环节 → 根因）</text>
          {[
            { y: 206, s: "全黑", e: "ray_color", r: "max_depth=0 或 scatter 返回 false" },
            { y: 230, s: "整体偏暗", e: "write_color", r: "漏伽马校正（未开平方）" },
            { y: 254, s: "穿透/选远点", e: "world.hit", r: "列表未收紧 t_max" },
            { y: 278, s: "玻璃发黑", e: "scatter(电介质)", r: "depth 太小或漏判全内反射" },
            { y: 302, s: "画面拉歪", e: "get_ray", r: "宽高比算反或视口尺寸错" },
            { y: 326, s: "金属黑斑", e: "scatter(金属)", r: "反射方向钻入表面未校验" },
          ].map((row) => (
            <g key={row.s}>
              <text x="60" y={row.y} fontSize="11" fontWeight="700" fill="var(--accent)">{row.s}</text>
              <text x="200" y={row.y} fontSize="11" fill="var(--text-primary)">{row.e}</text>
              <text x="360" y={row.y} fontSize="11" fill="var(--text-secondary)">{row.r}</text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">全书数据流串成一条链，bug 先定位环节再回归公式核对</figcaption>
    </figure>
  );
}
