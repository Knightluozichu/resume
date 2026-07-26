/**
 * <RtwFinalSceneDiagram>：最终场景渲染
 * 纯静态 SVG，无交互。Server Component。
 */
export function RtwFinalSceneDiagram() {
  // 用一组小圆代表随机小球
  const balls = [
    { x: 110, y: 300, r: 10, o: 0.5 },
    { x: 150, y: 312, r: 8, o: 0.3 },
    { x: 200, y: 304, r: 11, o: 0.6 },
    { x: 245, y: 316, r: 7, o: 0.35 },
    { x: 470, y: 308, r: 9, o: 0.4 },
    { x: 515, y: 314, r: 8, o: 0.55 },
    { x: 560, y: 302, r: 11, o: 0.3 },
    { x: 605, y: 316, r: 7, o: 0.5 },
    { x: 640, y: 308, r: 9, o: 0.4 },
    { x: 90, y: 314, r: 7, o: 0.45 },
    { x: 285, y: 306, r: 9, o: 0.5 },
    { x: 430, y: 316, r: 7, o: 0.35 },
  ];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="最终场景渲染示意" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">最终场景：地面 + 三主角 + 随机小球</text>

          {/* 天空背景渐变（用两块矩形示意） */}
          <rect x="40" y="48" width="640" height="170" fill="var(--accent)" fillOpacity="0.06" />
          <rect x="40" y="180" width="640" height="38" fill="var(--accent)" fillOpacity="0.12" />

          {/* 地面 */}
          <line x1="40" y1="328" x2="680" y2="328" stroke="var(--text-secondary)" strokeWidth="1.4" />
          <text x="660" y="346" fontSize="11" fill="var(--text-secondary)">地面（r=1000 漫反射球）</text>

          {/* 三主角 */}
          <circle cx="300" cy="288" r="40" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="300" y="292" textAnchor="middle" fontSize="11" fill="var(--accent)">玻璃</text>
          <circle cx="200" cy="294" r="34" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="200" y="298" textAnchor="middle" fontSize="11" fill="var(--accent)">哑光</text>
          <circle cx="400" cy="290" r="38" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="400" y="294" textAnchor="middle" fontSize="11" fill="var(--accent)">金属</text>

          {/* 随机小球 */}
          {balls.map((b, i) => (
            <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="var(--accent)" fillOpacity={b.o * 0.4} stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.5" />
          ))}

          {/* 相机 */}
          <rect x="60" y="120" width="40" height="26" rx="4" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1.2" />
          <text x="80" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">相机</text>
          <line x1="100" y1="133" x2="300" y2="200" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="3 3" />

          {/* 参数卡 */}
          <rect x="470" y="60" width="210" height="92" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="575" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">渲染参数</text>
          <text x="484" y="100" fontSize="11" fill="var(--text-secondary)">samples_per_pixel = 500</text>
          <text x="484" y="116" fontSize="11" fill="var(--text-secondary)">max_depth = 50</text>
          <text x="484" y="132" fontSize="11" fill="var(--text-secondary)">fov = 20°, aspect = 16:9</text>
          <text x="484" y="148" fontSize="11" fill="var(--text-secondary)">aperture = 0.1, focus = 10</text>

          <text x="360" y="380" textAnchor="middle" fontSize="11" fill="var(--text-primary)">材质抽样：80% 漫反射 · 15% 金属 · 5% 玻璃</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">地面与三主角构成骨架，随机小球填充细节，三种材质相互映照</figcaption>
    </figure>
  );
}
